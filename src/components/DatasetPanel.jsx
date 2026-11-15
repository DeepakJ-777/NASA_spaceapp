import { useState } from 'react'
import { gpmPrecipitationData } from '../data/precipitationData.js'

function DatasetPanel({ selectedIndex: propIndex, onSelectIndex: propOnSelectIndex }) {
  const { metadata, measurements } = gpmPrecipitationData
  const [internalIndex, setInternalIndex] = useState(0)

  const selectedIndex = propIndex !== undefined ? propIndex : internalIndex
  const setSelectedIndex = propOnSelectIndex || setInternalIndex

  const activePoint = measurements[selectedIndex] || measurements[0]
  const maxRate = metadata.summary.maxPrecipitationMmPerHour

  return (
    <section className="content-panel dataset-panel" aria-labelledby="dataset-title">
      <div className="panel-heading">
        <div>
          <p className="section-index">02 / Local Telemetry</p>
          <h2 id="dataset-title">Precipitation Telemetry</h2>
        </div>
        <span className="telemetry-tag">NASA GPM V07 Genuine Data</span>
      </div>

      <label className="field-label" htmlFor="dataset">
        Target Storm Event & Observation Coordinates
      </label>
      <div className="select-wrap">
        <select id="dataset" defaultValue="gpm_imerg_ida">
          <option value="gpm_imerg_ida">
            Hurricane Ida Passage · Central NJ / NYC Metro ({metadata.location.latitude}°N, {Math.abs(metadata.location.longitude)}°W)
          </option>
        </select>
      </div>

      {/* Observation Metadata Banner */}
      <div className="telemetry-location-meta">
        <p className="location-name">
          <strong>Location:</strong> {metadata.location.name} ({metadata.location.latitude}°N, {Math.abs(metadata.location.longitude)}°W)
        </p>
        <p className="period-span">
          <strong>Observation Period:</strong> Sep 01, 2021 12:00 UTC – Sep 02, 2021 12:00 UTC (24 Hours · 25 Readings)
        </p>
      </div>

      <div className="dataset-stats-grid">
        <div className="stat-card">
          <span className="stat-label">Peak Rain Rate</span>
          <span className="stat-value">
            {metadata.summary.maxPrecipitationMmPerHour} <small>{metadata.units}</small>
          </span>
          <span className="stat-time">{metadata.summary.maxPrecipitationTimeDisplay}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">24h Average Rate</span>
          <span className="stat-value">
            {metadata.summary.averagePrecipitationMmPerHour} <small>{metadata.units}</small>
          </span>
          <span className="stat-time">25 Hourly Time Slices</span>
        </div>
      </div>

      {/* Rainfall Data Display: Chart */}
      <div className="rainfall-chart-section">
        <div className="chart-header">
          <span className="chart-title">Rainfall Rate Timeline ({metadata.period.duration})</span>
          <span className="chart-active-val">
            {activePoint.timeDisplay}: <strong>{activePoint.precipitationRateMmPerHour.toFixed(2)} {metadata.units}</strong>
          </span>
        </div>

        <div className="rainfall-bar-chart" role="img" aria-label="Precipitation rate over 24 hours">
          {measurements.map((m, idx) => {
            const heightPct = Math.round((m.precipitationRateMmPerHour / maxRate) * 100)
            const isSelected = idx === selectedIndex
            return (
              <button
                type="button"
                key={m.timestamp}
                className={`chart-bar-col ${isSelected ? 'is-selected' : ''}`}
                onClick={() => setSelectedIndex(idx)}
                onMouseEnter={() => setSelectedIndex(idx)}
                title={`${m.timeDisplay}: ${m.precipitationRateMmPerHour} mm/hr (Click to inspect & hear)`}
                aria-label={`${m.timeDisplay}: ${m.precipitationRateMmPerHour} mm/hr`}
              >
                <span
                  className="chart-bar-fill"
                  style={{ height: `${Math.max(4, heightPct)}%` }}
                />
              </button>
            )
          })}
        </div>
        <div className="chart-axis-labels">
          <span>{measurements[0].timeDisplay}</span>
          <span>Peak: {metadata.summary.maxPrecipitationTimeDisplay} (10.22 mm/hr)</span>
          <span>{measurements[measurements.length - 1].timeDisplay}</span>
        </div>
      </div>

      {/* Rainfall Data Display: List */}
      <div className="measurements-list-section">
        <div className="list-header">
          <span className="list-title">Actual NASA GPM Observations</span>
          <span className="list-counter">{measurements.length} readings</span>
        </div>
        <div className="measurements-scroll-table">
          <table className="measurements-table">
            <thead>
              <tr>
                <th scope="col">Timestamp (UTC)</th>
                <th scope="col">Rain Rate</th>
                <th scope="col" aria-label="Relative Intensity">Intensity</th>
              </tr>
            </thead>
            <tbody>
              {measurements.map((m, idx) => {
                const isSelected = idx === selectedIndex
                const barWidth = Math.round((m.precipitationRateMmPerHour / maxRate) * 100)
                return (
                  <tr
                    key={m.timestamp}
                    className={isSelected ? 'is-selected-row' : ''}
                    onClick={() => setSelectedIndex(idx)}
                  >
                    <td className="timestamp-cell">{m.timeDisplay}</td>
                    <td className="value-cell">
                      {m.precipitationRateMmPerHour.toFixed(2)} <span className="unit-label">{metadata.units}</span>
                    </td>
                    <td className="meter-cell">
                      <span className="mini-meter-track">
                        <span
                          className="mini-meter-fill"
                          style={{ width: `${barWidth}%` }}
                        />
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="scientific-clarity-note">
        <p>
          <strong>Scientific Measurement Note:</strong> Rainfall rate in <em>mm/hr</em> represents the depth of liquid water accumulation if precipitation continued at that instantaneous intensity for one hour over each 0.1° × 0.1° (~10 km) cell. Sourced from NASA GES DISC GPM IMERG Early Run V07.
        </p>
      </div>
    </section>
  )
}

export default DatasetPanel
