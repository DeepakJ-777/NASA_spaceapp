import gpmImage from '../assets/gpm-imerg-january-2014.png'
import { gpmPrecipitationData } from '../data/precipitationData.js'

function VisualizationPanel() {
  const { metadata } = gpmPrecipitationData

  return (
    <section className="visualization-panel" aria-labelledby="visualization-title">
      <div className="panel-heading visualization-heading">
        <div>
          <p className="section-index">01 / Planetary Baseline</p>
          <h1 id="visualization-title">Global precipitation</h1>
        </div>
        <span className="data-badge live-badge">Contextual Baseline · GPM IMERG</span>
      </div>

      <div className="earth-stage">
        <div className="coordinate coordinate-top">60° N</div>
        <div className="coordinate coordinate-bottom">60° S</div>

        <div className="nasa-image-wrap">
          <img
            src={gpmImage}
            alt="NASA GPM IMERG Monthly Mean Rain Rate planetary observation map (January 2014 baseline)"
            className="nasa-visualization-img"
          />
        </div>

        <div className="observation-overlay">
          <div className="overlay-badge">NASA Planetary Context</div>
          <h2 className="overlay-title">Global Rain Rate Baseline</h2>
          <p className="overlay-desc">
            Dual-frequency radar and microwave radiometer constellation observation (January 2014 monthly mean).
          </p>

          <div className="imagery-distinction-callout">
            <span className="distinction-tag">Important Distinction</span>
            <p>
              This planetary map provides broad global spatial context from GPM IMERG. It is distinct from the localized 24-hour storm time series sonified in the telemetry panel below.
            </p>
          </div>

          <dl className="overlay-metadata">
            <div className="meta-pair">
              <dt>Context Product</dt>
              <dd>GPM IMERG Monthly (V07)</dd>
            </div>
            <div className="meta-pair">
              <dt>Archive</dt>
              <dd>{metadata.sourceAttribution}</dd>
            </div>
            <div className="meta-pair">
              <dt>Rain Rate Units</dt>
              <dd>{metadata.units} (mm/hr accumulation rate)</dd>
            </div>
            <div className="meta-pair">
              <dt>Spatial Grid</dt>
              <dd>0.1° × 0.1° (~10 km resolution)</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}

export default VisualizationPanel
