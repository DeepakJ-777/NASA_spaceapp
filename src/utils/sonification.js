// Web Audio API Data Sonification Engine for NASA GPM Precipitation Data
// Converts rainfall measurements (mm/hr) into audible sound frequencies.

export const MIN_FREQUENCY = 200 // Hz (Low pitch for 0 or near-zero rainfall)
export const MAX_FREQUENCY = 800 // Hz (High pitch for peak 10.22 mm/hr rainfall)
export const MIN_RAINFALL = 0.0
export const MAX_RAINFALL = 10.22
export const DEFAULT_STEP_INTERVAL_MS = 600 // ~600ms per hourly reading (total ~15s for 25 readings)

/**
 * Normalizes rainfall rate (mm/hr) to a frequency in Hz (200 Hz - 800 Hz)
 */
export function rainfallToFrequency(
  rainfallMmPerHour,
  minRain = MIN_RAINFALL,
  maxRain = MAX_RAINFALL,
  minFreq = MIN_FREQUENCY,
  maxFreq = MAX_FREQUENCY
) {
  if (maxRain <= minRain) return minFreq
  const clamped = Math.max(minRain, Math.min(maxRain, Number(rainfallMmPerHour) || 0))
  const normalized = (clamped - minRain) / (maxRain - minRain)
  return Math.round(minFreq + normalized * (maxFreq - minFreq))
}

export class SonificationEngine {
  constructor({
    values = [],
    intervalMs = DEFAULT_STEP_INTERVAL_MS,
    onStep = () => {},
    onStateChange = () => {},
    onEnded = () => {},
  } = {}) {
    this.values = values
    this.intervalMs = intervalMs
    this.onStep = onStep
    this.onStateChange = onStateChange
    this.onEnded = onEnded

    this.currentIndex = 0
    this.state = 'stopped' // 'stopped' | 'playing' | 'paused'
    this.volume = 0.65 // 0.0 to 1.0

    this.audioCtx = null
    this.masterGain = null
    this.timerId = null
    this.activeOscillator = null
    this.activeGain = null
  }

  /**
   * Initializes AudioContext on user interaction to comply with autoplay policy.
   */
  _ensureAudioContext() {
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext
      if (!AudioCtxClass) {
        throw new Error('Web Audio API is not supported in this browser.')
      }
      this.audioCtx = new AudioCtxClass()

      // Master Gain for smooth volume control
      this.masterGain = this.audioCtx.createGain()
      this.masterGain.gain.setValueAtTime(this.volume, this.audioCtx.currentTime)
      this.masterGain.connect(this.audioCtx.destination)
    }

    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume()
    }
  }

  /**
   * Plays a single soft synthesized tone corresponding to a frequency.
   */
  playTone(freq, duration = 0.42, isZeroRain = false) {
    try {
      this._ensureAudioContext()
    } catch (e) {
      console.error('AudioContext initialization failed:', e)
      return
    }

    const ctx = this.audioCtx
    const now = ctx.currentTime

    // Stop and disconnect previous active note if overlapping
    if (this.activeOscillator) {
      try {
        this.activeOscillator.stop()
        this.activeOscillator.disconnect()
      } catch {
        // Ignored if already ended
      }
      this.activeOscillator = null
    }

    // Oscillator node: Soft Sine wave
    const osc = ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, now)

    // Note Gain Envelope to prevent clicks/pops
    const noteGain = ctx.createGain()
    const targetPeakGain = isZeroRain ? 0.08 : 0.28 // Subtler tone for dry baseline readings

    noteGain.gain.setValueAtTime(0.0001, now)
    // Gentle attack (30ms)
    noteGain.gain.exponentialRampToValueAtTime(targetPeakGain, now + 0.03)
    // Smooth decay to near-silence
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration)

    osc.connect(noteGain)
    noteGain.connect(this.masterGain)

    osc.start(now)
    osc.stop(now + duration)

    this.activeOscillator = osc
    this.activeGain = noteGain

    osc.onended = () => {
      try {
        osc.disconnect()
        noteGain.disconnect()
      } catch {
        // Ignored
      }
      if (this.activeOscillator === osc) {
        this.activeOscillator = null
        this.activeGain = null
      }
    }
  }

  /**
   * Step function that plays the current reading and schedules the next.
   */
  _step() {
    if (this.state !== 'playing') return

    if (this.currentIndex >= this.values.length) {
      this.stop()
      this.onEnded()
      return
    }

    const currentVal = this.values[this.currentIndex]
    const freq = rainfallToFrequency(currentVal)
    const isZero = currentVal <= 0.01

    this.playTone(freq, 0.42, isZero)
    this.onStep(this.currentIndex, currentVal, freq)

    this.currentIndex += 1

    if (this.currentIndex < this.values.length) {
      this.timerId = setTimeout(() => {
        this._step()
      }, this.intervalMs)
    } else {
      // Completed last reading
      this.timerId = setTimeout(() => {
        this.stop()
        this.onEnded()
      }, this.intervalMs)
    }
  }

  /**
   * Starts or resumes playback.
   */
  play() {
    if (this.state === 'playing') return // Avoid overlapping loops

    this._ensureAudioContext()

    if (this.currentIndex >= this.values.length) {
      this.currentIndex = 0
    }

    this.state = 'playing'
    this.onStateChange(this.state)
    this._step()
  }

  /**
   * Pauses playback at the current index.
   */
  pause() {
    if (this.state !== 'playing') return

    if (this.timerId) {
      clearTimeout(this.timerId)
      this.timerId = null
    }

    this.state = 'paused'
    this.onStateChange(this.state)

    if (this.activeOscillator) {
      try {
        this.activeOscillator.stop()
      } catch {
        // Ignored
      }
    }
  }

  /**
   * Stops playback and resets to the beginning (index 0).
   */
  stop() {
    if (this.timerId) {
      clearTimeout(this.timerId)
      this.timerId = null
    }

    this.currentIndex = 0
    this.state = 'stopped'
    this.onStateChange(this.state)

    if (this.activeOscillator) {
      try {
        this.activeOscillator.stop()
      } catch {
        // Ignored
      }
    }
  }

  /**
   * Seeks to a specific measurement index.
   * If playing, immediately plays the target note and smoothly continues playback.
   */
  seek(index) {
    const clampedIndex = Math.max(0, Math.min(this.values.length - 1, index))
    this.currentIndex = clampedIndex

    const val = this.values[clampedIndex]
    const freq = rainfallToFrequency(val)
    const isZero = val <= 0.01

    this.onStep(clampedIndex, val, freq)

    if (this.state === 'playing') {
      if (this.timerId) {
        clearTimeout(this.timerId)
        this.timerId = null
      }
      this.playTone(freq, 0.42, isZero)
      this.currentIndex = clampedIndex + 1

      if (this.currentIndex < this.values.length) {
        this.timerId = setTimeout(() => {
          this._step()
        }, this.intervalMs)
      } else {
        this.timerId = setTimeout(() => {
          this.stop()
          this.onEnded()
        }, this.intervalMs)
      }
    } else {
      this.playTone(freq, 0.35, isZero)
    }
  }

  /**
   * Updates master volume (0.0 to 1.0).
   */
  setVolume(volumeFraction) {
    this.volume = Math.max(0, Math.min(1, Number(volumeFraction) || 0))
    if (this.masterGain && this.audioCtx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.audioCtx.currentTime)
    }
  }

  /**
   * Cleans up resources when component unmounts.
   */
  dispose() {
    if (this.timerId) {
      clearTimeout(this.timerId)
      this.timerId = null
    }
    if (this.activeOscillator) {
      try {
        this.activeOscillator.stop()
        this.activeOscillator.disconnect()
      } catch {
        // Ignored
      }
    }
    if (this.audioCtx && this.audioCtx.state !== 'closed') {
      try {
        this.audioCtx.close()
      } catch {
        // Ignored
      }
    }
    this.audioCtx = null
    this.masterGain = null
  }
}
