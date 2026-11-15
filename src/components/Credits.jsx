function Credits() {
  return (
    <section className="credits-section" aria-labelledby="credits-title">
      <div className="credits-header">
        <p className="section-index">Data Provenance & Credits</p>
        <h2 id="credits-title">Sources & Technologies</h2>
      </div>

      <div className="credits-grid">
        <div className="credit-card">
          <h3>NASA GPM IMERG V07</h3>
          <p>
            Global Precipitation Measurement (GPM) Integrated Multi-satellitE Retrievals for GPM (Version 07). Provides gridded half-hourly and monthly precipitation estimates combining the NASA/JAXA GPM Core Observatory with international constellation radiometers.
          </p>
          <a
            href="https://doi.org/10.5067/GPM/IMERG/3B-HH-E/07"
            target="_blank"
            rel="noreferrer noopener"
            className="credit-link"
          >
            DOI: 10.5067/GPM/IMERG/3B-HH-E/07 ↗
          </a>
        </div>

        <div className="credit-card">
          <h3>NASA GES DISC</h3>
          <p>
            Goddard Earth Sciences Data and Information Services Center (Greenbelt, MD). Data archive, distribution, and open Earthdata GIS (EGIS) ImageServer REST endpoints powering this application without synthetic substitution.
          </p>
          <a
            href="https://disc.gsfc.nasa.gov/"
            target="_blank"
            rel="noreferrer noopener"
            className="credit-link"
          >
            NASA GES DISC Portal ↗
          </a>
        </div>

        <div className="credit-card">
          <h3>NASA Earth Information Center</h3>
          <p>
            Inspired by the NASA Earth Information Center’s public initiative to make planetary science sensory, accessible, and intuitive to researchers and the public alike through multi-modal experiences.
          </p>
          <a
            href="https://gpm.nasa.gov/data"
            target="_blank"
            rel="noreferrer noopener"
            className="credit-link"
          >
            NASA GPM Data Directory ↗
          </a>
        </div>

        <div className="credit-card">
          <h3>Built With</h3>
          <p>
            Engineered with <strong>React 19</strong>, <strong>JavaScript (ES Modules)</strong>, the browser-native <strong>Web Audio API</strong> for client-side tone synthesis, and <strong>Vite</strong>. Zero external audio frameworks or backend dependencies.
          </p>
          <span className="credit-badge">Client-Side · Pure Web Audio</span>
        </div>
      </div>
    </section>
  )
}

export default Credits

