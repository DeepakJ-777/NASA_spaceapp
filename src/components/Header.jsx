function Header() {
  return (
    <header className="site-header">
      <div className="brand-block">
        <span className="brand-mark" aria-hidden="true">
          <span />
        </span>
        <div>
          <p className="brand-name">Earth Jukebox</p>
          <p className="brand-subtitle">Hear the changing planet.</p>
        </div>
      </div>

      <div className="source-block">
        <p className="source-label">
          <span className="source-dot" aria-hidden="true" />
          NASA Earth Data Sonification
        </p>
        <p className="connection-label">NASA GPM Connected · Verified V07 Data</p>
      </div>
    </header>
  )
}

export default Header
