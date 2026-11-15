import { useState } from 'react'
import AudioPlayer from './components/AudioPlayer.jsx'
import Credits from './components/Credits.jsx'
import DataInformation from './components/DataInformation.jsx'
import DatasetPanel from './components/DatasetPanel.jsx'
import Header from './components/Header.jsx'
import VisualizationPanel from './components/VisualizationPanel.jsx'

function App() {
  const [activeStep, setActiveStep] = useState(0)
  const [playbackStatus, setPlaybackStatus] = useState('stopped')

  return (
    <div className="app-shell">
      <Header />
      <main>
        {/* Quick Interactive Guide & Overview */}
        <section className="hero-guide-strip" aria-label="Quick Introduction">
          <div className="hero-strip-content">
            <span className="hero-pill">OVERVIEW</span>
            <p>
              <strong>Hear the planet rain:</strong> This jukebox translates genuine NASA satellite precipitation measurements into sound. Click <strong>Play</strong> below to listen to 24 hours of Hurricane Ida’s historic rainfall — lower notes signify dry calm, and rising pitches follow increasing storm intensity up to 10.22 mm/hr.
            </p>
          </div>
        </section>

        <VisualizationPanel />

        <div className="dashboard-grid">
          <DatasetPanel
            selectedIndex={activeStep}
            onSelectIndex={setActiveStep}
          />
          <AudioPlayer
            activeStep={activeStep}
            onStepChange={setActiveStep}
            playbackStatus={playbackStatus}
            onStatusChange={setPlaybackStatus}
          />
        </div>

        <DataInformation />
        <Credits />
      </main>

      <footer>
        <p>Earth Information Jukebox · Interactive Planetary Sonification</p>
        <p>NASA Global Precipitation Measurement (GPM) IMERG Dataset · GES DISC · Web Audio API</p>
      </footer>
    </div>
  )
}

export default App
