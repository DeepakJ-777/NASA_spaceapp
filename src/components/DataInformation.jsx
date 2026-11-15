const information = [
  {
    number: '01',
    title: 'Reading precipitation',
    text: 'Precipitation is water falling from the atmosphere as rain, snow, sleet, or hail. This first experience focuses on satellite rainfall measurements in millimeters per hour (mm/hr).',
  },
  {
    number: '02',
    title: 'Turning values into sound',
    text: 'Each hourly NASA GPM observation triggers an acoustic event, translating numerical precipitation rates into audible synthesizer tones.',
  },
  {
    number: '03',
    title: 'Mapping pitch to rainfall',
    text: 'The active mapping uses higher pitches (up to 800 Hz) for heavy rainfall and lower pitches (down to 200 Hz) for dry baselines and light rain, allowing listeners to hear storm progression.',
  },
]

function DataInformation() {
  return (
    <section className="information-section" aria-labelledby="information-title">
      <div className="information-intro">
        <p className="section-index">How to listen</p>
        <h2 id="information-title">From rainfall to rhythm</h2>
        <p>Three principles behind the sonification engine.</p>
      </div>

      <div className="information-list">
        {information.map((item) => (
          <article className="information-item" key={item.number}>
            <span>{item.number}</span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default DataInformation
