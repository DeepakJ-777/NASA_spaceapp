import { useEffect, useRef, useState } from 'react'
import { gpmPrecipitationData, rainfallValues } from '../data/precipitationData.js'
import {
  MAX_FREQUENCY,
  MAX_RAINFALL,
  MIN_FREQUENCY,
  rainfallToFrequency,
  SonificationEngine,
} from '../utils/sonification.js'

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 5.5v13l10-6.5z" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 5h4v14H7zm6 0h4v14h-4z" />
    </svg>
  )
}

function StopIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="6" y="6" width="12" height="12" rx="1.5" />
    </svg>
  )
}

function AudioPlayer({
  activeStep: propStep,
  onStepChange,
  playbackStatus: propStatus,
  onStatusChange,
}) {
  const { measurements } = gpmPrecipitationData
  const [localStep, setLocalStep] = useState(0)
  const [localStatus, setLocalStatus] = useState('stopped')
  const [volume, setVolume] = useState(65)
  const [currentFreq, setCurrentFreq] = useState(rainfallToFrequency(rainfallValues[0]))

  const currentStep = propStep !== undefined ? propStep : localStep
  const playbackStatus = propStatus !== undefined ? propStatus : localStatus
  const engineRef = useRef(null)

  // Initialize Sonification Engine once on mount
  useEffect(() => {
    const engine = new SonificationEngine({
      values: rainfallValues,
      intervalMs: 600,
      onStep: (index, val, freq) => {
        setLocalStep(index)
        setCurrentFreq(freq)
        onStepChange?.(index)
      },
      onStateChange: (state) => {
        setLocalStatus(state)
        onStatusChange?.(state)
      },
      onEnded: () => {
        setLocalStatus('stopped')
        onStatusChange?.('stopped')
        setLocalStep(0)
        onStepChange?.(0)
        setCurrentFreq(rainfallToFrequency(rainfallValues[0]))
      },
    })

    engine.setVolume(volume / 100)
    engineRef.current = engine

    return () => {
      engine.dispose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Sync external step changes (e.g. user clicked bar in DatasetPanel)
  useEffect(() => {
    if (propStep !== undefined && engineRef.current) {
      if (engineRef.current.currentIndex !== propStep && playbackStatus !== 'playing') {
        engineRef.current.seek(propStep)
        setCurrentFreq(rainfallToFrequency(rainfallValues[propStep]))
      }
    }
  }, [propStep, playbackStatus])

  const handlePlay = () => {
    engineRef.current?.play()
  }

  const handlePause = () => {
    engineRef.current?.pause()
  }

  const handleStop = () => {
    engineRef.current?.stop()
    setLocalStep(0)
    onStepChange?.(0)
    setCurrentFreq(rainfallToFrequency(rainfallValues[0]))
  }

  const handleVolumeChange = (e) => {
    const newVol = Number(e.target.value)
    setVolume(newVol)
    engineRef.current?.setVolume(newVol / 100)
  }

  const handleWaveformClick = (index) => {
    engineRef.current?.seek(index)
    setLocalStep(index)
    onStepChange?.(index)
    setCurrentFreq(rainfallToFrequency(rainfallValues[index]))
  }

  const activeMeasurement = measurements[currentStep] || measurements[0]
  const currentRainfall = rainfallValues[currentStep] ?? 0
  const progressPercent = Math.round(((currentStep + 1) / rainfallValues.length) * 100)

  return (
    <section className="audio-panel" aria-labelledby="audio-title">
      <div className="audio-meta">
        <p className="section-index">03 / Sonification Engine</p>
        <h2 id="audio-title">Listen to the rainfall</h2>

        {/* Live Playback Status & Step Indicators */}
        <div className={`audio-status-pill status-${playbackStatus}`}>
          <span className="status-indicator-dot" aria-hidden="true" />
          <span className="status-text">
            {playbackStatus === 'playing' && `Playing · Reading ${currentStep + 1} of ${rainfallValues.length}`}
            {playbackStatus === 'paused' && `Paused at Reading ${currentStep + 1} of ${rainfallValues.length}`}
            {playbackStatus === 'stopped' && `Stopped · 25 readings ready`}
          </span>
        </div>

        {/* Current Measurement Telemetry Readout */}
        <div className="current-reading-card">
          <div className="reading-stat">
            <span className="reading-label">Current Reading</span>
            <span className="reading-value">{currentStep + 1} / {rainfallValues.length}</span>
            <span className="reading-time">{activeMeasurement.timeDisplay}</span>
          </div>
          <div className="reading-stat">
            <span className="reading-label">Rainfall Rate</span>
            <span className="reading-value rainfall-val">
              {currentRainfall.toFixed(2)} <small>mm/hr</small>
            </span>
            <span className="reading-pitch">Tone: {currentFreq} Hz</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="playback-progress-wrap">
          <div className="progress-labels">
            <span>Playback Progress: {progressPercent}%</span>
            <span>{currentStep + 1} of {rainfallValues.length} hrs</span>
          </div>
          <div
            className="playback-progress-bar"
            role="progressbar"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Sonification playback progress"
          >
            <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
      </div>

      {/* Synchronized Interactive Waveform */}
      <div className="waveform-container">
        <div className="waveform-header">
          <span>Rainfall Intensity Waveform ({rainfallValues.length} readings)</span>
          <span className="waveform-hint">Click any bar to seek & hear pitch</span>
        </div>
        <div className="waveform" aria-label="Interactive 25-reading rainfall waveform">
          {rainfallValues.map((val, index) => {
            const height = Math.max(8, Math.round((val / MAX_RAINFALL) * 100))
            const isActive = index === currentStep
            const isPast = index < currentStep
            return (
              <button
                type="button"
                key={`wave-${index}`}
                className={`waveform-bar ${isActive ? 'is-active' : ''} ${isPast ? 'is-past' : ''}`}
                style={{ '--bar-height': `${height}%` }}
                onClick={() => handleWaveformClick(index)}
                title={`Reading ${index + 1}: ${val.toFixed(2)} mm/hr (${rainfallToFrequency(val)} Hz)`}
                aria-label={`Reading ${index + 1}: ${val.toFixed(2)} mm/hr`}
              />
            )
          })}
        </div>
      </div>

      {/* Playback Controls */}
      <div className="audio-controls">
        <button
          className={`control-button control-button-primary ${playbackStatus === 'playing' ? 'is-active' : ''}`}
          type="button"
          onClick={handlePlay}
          disabled={playbackStatus === 'playing'}
          aria-label="Play rainfall sonification"
        >
          <PlayIcon />
          Play
        </button>

        <button
          className="control-button"
          type="button"
          onClick={handlePause}
          disabled={playbackStatus !== 'playing'}
          aria-label="Pause playback"
        >
          <PauseIcon />
          Pause
        </button>

        <button
          className="control-button"
          type="button"
          onClick={handleStop}
          disabled={playbackStatus === 'stopped'}
          aria-label="Stop playback"
        >
          <StopIcon />
          Stop
        </button>

        <label className="volume-control">
          <span>Volume ({volume}%)</span>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            aria-label="Volume slider"
          />
        </label>
      </div>

      {/* Task 2 & 5: Sonification Scientific Explanation */}
      <div className="sonification-explanation">
        <p className="explanation-core">
          Each sound represents an hourly NASA rainfall measurement. Higher rainfall produces a higher-pitched tone, while lower rainfall produces a lower-pitched tone.
        </p>
        <p className="frequency-range-readout">
          Frequency mapping range: <strong>{MIN_FREQUENCY} Hz</strong> (0.00 mm/hr baseline calm) to <strong>{MAX_FREQUENCY} Hz</strong> ({MAX_RAINFALL} mm/hr torrential peak).
        </p>
        <p className="explanation-rationale">
          <em>Why pitch?</em> Mapping precipitation intensity to acoustic pitch mimics human perceptual intuition: escalating storm energy and rainfall accumulation naturally translate to rising audible frequencies.
        </p>
      </div>
    </section>
  )
}

export default AudioPlayer
