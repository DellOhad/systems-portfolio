import { useMemo, useState } from 'react'
import './App.css'

type InvestigationEvent = {
  id: string
  time: string
  label: string
  source: string
  severity: 'info' | 'warning' | 'critical'
  note: string
}

const investigationEvents: InvestigationEvent[] = [
  {
    id: 'signal',
    time: '10:41:02',
    label: 'Signal change',
    source: 'Device',
    severity: 'info',
    note: 'A sensor signal changed within the expected operating range.',
  },
  {
    id: 'detection',
    time: '10:41:03',
    label: 'Detection',
    source: 'Real-time engine',
    severity: 'warning',
    note: 'A candidate event was created and linked to the active device signal.',
  },
  {
    id: 'resolution',
    time: '10:41:05',
    label: 'Resolution',
    source: 'Decision service',
    severity: 'critical',
    note: 'The event was resolved differently from the leading candidate and requires review.',
  },
  {
    id: 'metric',
    time: '10:41:07',
    label: 'Metric update',
    source: 'Analytics',
    severity: 'info',
    note: 'The final result was published to the operational metric stream.',
  },
]

const accessPoints = [
  { id: 'north-1', label: 'North 1', x: 22, y: 28, status: 'healthy' },
  { id: 'north-2', label: 'North 2', x: 48, y: 19, status: 'healthy' },
  { id: 'east-1', label: 'East 1', x: 76, y: 30, status: 'warning' },
  { id: 'south-1', label: 'South 1', x: 64, y: 74, status: 'healthy' },
  { id: 'west-1', label: 'West 1', x: 29, y: 72, status: 'offline' },
]

const shelves = [
  { id: 'unit-04', label: 'Unit 04', x: 35, y: 37, status: 'healthy' },
  { id: 'unit-07', label: 'Unit 07', x: 54, y: 43, status: 'healthy' },
  { id: 'unit-11', label: 'Unit 11', x: 70, y: 50, status: 'warning' },
  { id: 'unit-16', label: 'Unit 16', x: 42, y: 65, status: 'offline' },
  { id: 'unit-18', label: 'Unit 18', x: 59, y: 62, status: 'healthy' },
]

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function App() {
  const [selectedEvent, setSelectedEvent] = useState(investigationEvents[2])
  const [sensitivity, setSensitivity] = useState(62)
  const [syncing, setSyncing] = useState(false)
  const [selectedSiteItem, setSelectedSiteItem] = useState('unit-11')
  const [networkFilter, setNetworkFilter] = useState<'all' | 'attention'>('all')

  const selectedLocation = useMemo(
    () => [...accessPoints, ...shelves].find((item) => item.id === selectedSiteItem),
    [selectedSiteItem],
  )

  function syncConfiguration() {
    setSyncing(true)
    window.setTimeout(() => setSyncing(false), 900)
  }

  const visibleShelves =
    networkFilter === 'all'
      ? shelves
      : shelves.filter((shelf) => shelf.status === 'warning' || shelf.status === 'offline')

  return (
    <main>
      <section className="hero" id="top">
        <nav className="nav shell" aria-label="Primary navigation">
          <button className="brand" onClick={() => scrollToSection('top')} aria-label="Back to top">
            OD<span>·</span>SYSTEMS
          </button>
          <div className="nav-links">
            <button onClick={() => scrollToSection('work')}>Work</button>
            <button onClick={() => scrollToSection('about')}>Approach</button>
          </div>
        </nav>

        <div className="hero-grid shell">
          <div className="hero-copy">
            <p className="eyebrow">SYSTEMS SOFTWARE ENGINEER</p>
            <h1>
              Turning complex
              <br />
              operations into
              <span> clear systems.</span>
            </h1>
            <p className="hero-description">
              Interactive demonstrations of how I approach operational visibility, remote device
              configuration, and pre-release validation.
            </p>
            <div className="hero-actions">
              <button className="button primary" onClick={() => scrollToSection('work')}>
                Explore the work <span>↓</span>
              </button>
              <p>All demonstrations use synthetic data.</p>
            </div>
          </div>
          <div className="hero-panel" aria-label="Portfolio overview">
            <div className="panel-header">
              <span>SELECTED SYSTEMS WORK</span>
              <span className="panel-live"><i /> INTERACTIVE</span>
            </div>
            <div className="panel-lines">
              <div><span>01</span> Operational investigation</div>
              <div><span>02</span> Remote configuration</div>
              <div><span>03</span> Network validation</div>
            </div>
            <div className="panel-footer">Production problems · simplified safely</div>
          </div>
        </div>
      </section>

      <section className="intro shell" id="about">
        <p className="eyebrow">THE APPROACH</p>
        <div className="intro-content">
          <h2>Good systems make the right action easier.</h2>
          <p>
            These demos focus on the operational problems behind the technology: finding an issue
            quickly, changing a configuration safely, and validating a release before it reaches
            production.
          </p>
        </div>
      </section>

      <section className="work" id="work">
        <div className="shell section-heading">
          <div>
            <p className="eyebrow">SELECTED CASE STUDIES</p>
            <h2>Three operational challenges.</h2>
          </div>
          <p>Explore the simplified workflows below.</p>
        </div>

        <article className="case-study investigation">
          <div className="shell case-heading">
            <div className="case-number">01</div>
            <div>
              <p className="eyebrow">OPERATIONAL INVESTIGATION</p>
              <h2>From fragmented signals to a single answer.</h2>
            </div>
            <p className="case-summary">
              Complex operational data becomes useful only when people can trace what happened,
              why it happened, and what to investigate next.
            </p>
          </div>

          <div className="shell demo-grid investigation-grid">
            <div className="demo-card timeline-card">
              <div className="card-topline">
                <div>
                  <span className="module-label">LIVE EVENT TIMELINE</span>
                  <h3>Investigation flow</h3>
                </div>
                <span className="status-chip">SYNTHETIC SESSION</span>
              </div>
              <div className="timeline">
                {investigationEvents.map((event) => (
                  <button
                    key={event.id}
                    className={`timeline-event ${selectedEvent.id === event.id ? 'active' : ''}`}
                    onClick={() => setSelectedEvent(event)}
                  >
                    <span className={`event-dot ${event.severity}`} />
                    <span className="event-time">{event.time}</span>
                    <span className="event-label">{event.label}</span>
                    <span className="event-source">{event.source}</span>
                  </button>
                ))}
              </div>
              <div className="signal-plot" aria-label="Synthetic signal visualization">
                <span className="plot-label">SIGNAL LEVEL</span>
                <svg viewBox="0 0 740 165" role="img" aria-label="Synthetic signal graph">
                  <path d="M10 120 C65 118, 70 119, 112 117 S161 112, 190 110 S226 100, 245 105 S260 42, 280 104 S295 52, 310 110 S333 81, 350 105 S377 99, 395 107 S428 82, 445 106 S480 92, 510 98 S548 89, 565 95 S590 84, 618 92 S650 70, 685 80 S714 69, 730 72" />
                  <path className="signal-overlay" d="M10 124 C80 123, 136 120, 190 119 S245 108, 280 113 S330 102, 350 111 S420 100, 445 111 S510 98, 565 103 S650 80, 730 84" />
                </svg>
                <span className="plot-axis">10:41:02</span>
                <span className="plot-axis end">10:41:07</span>
              </div>
            </div>

            <aside className="investigation-detail">
              <p className="module-label">SELECTED EVENT</p>
              <div className={`detail-icon ${selectedEvent.severity}`}>
                {selectedEvent.severity === 'critical' ? '!' : selectedEvent.severity === 'warning' ? '△' : '•'}
              </div>
              <h3>{selectedEvent.label}</h3>
              <p className="detail-source">{selectedEvent.time} · {selectedEvent.source}</p>
              <p className="detail-note">{selectedEvent.note}</p>
              <div className="detail-divider" />
              <p className="detail-key">Why this matters</p>
              <p className="detail-answer">
                The selected event is connected to the signals and decisions around it, so an
                investigation starts with context instead of a manual search.
              </p>
            </aside>
          </div>

          <div className="shell case-result">
            <span>OUTCOME</span>
            <p>Replace scattered data collection with a focused, explainable investigation workflow.</p>
          </div>
        </article>

        <article className="case-study configuration">
          <div className="shell case-heading">
            <div className="case-number">02</div>
            <div>
              <p className="eyebrow">REMOTE CONFIGURATION</p>
              <h2>Change behavior without redeploying firmware.</h2>
            </div>
            <p className="case-summary">
              Operational changes should be safe, traceable, and fast—without requiring a release
              cycle for every configuration adjustment.
            </p>
          </div>

          <div className="shell config-layout">
            <div className="architecture-flow" aria-label="Simplified configuration flow">
              {['Operations settings', 'Cloud configuration', 'Backend API', 'Embedded device'].map((stage, index) => (
                <div className="architecture-stage" key={stage}>
                  <div className="stage-index">0{index + 1}</div>
                  <div className="stage-icon">{index === 3 ? '◈' : index === 2 ? '↔' : index === 1 ? '☁' : '◎'}</div>
                  <p>{stage}</p>
                  {index < 3 && <span className="architecture-arrow">→</span>}
                </div>
              ))}
            </div>

            <div className="config-demo">
              <div className="config-header">
                <div>
                  <span className="module-label">CONFIGURATION LAB</span>
                  <h3>Live example</h3>
                </div>
                <span className={`sync-state ${syncing ? 'syncing' : ''}`}>
                  <i /> {syncing ? 'SYNCING' : 'IN SYNC'}
                </span>
              </div>

              <div className="config-body">
                <div>
                  <label htmlFor="sensitivity">Detection sensitivity <strong>{sensitivity}%</strong></label>
                  <input
                    id="sensitivity"
                    type="range"
                    min="20"
                    max="90"
                    value={sensitivity}
                    onChange={(event) => setSensitivity(Number(event.target.value))}
                  />
                  <div className="range-labels"><span>Conservative</span><span>Responsive</span></div>
                </div>
                <div className="config-preview">
                  <span className="module-label">DEVICE STATE</span>
                  <div className="gauge">
                    <div className="gauge-fill" style={{ width: `${sensitivity}%` }} />
                  </div>
                  <p>Configuration version <strong>v12</strong></p>
                </div>
              </div>

              <button className="button primary config-button" onClick={syncConfiguration} disabled={syncing}>
                {syncing ? 'Syncing to devices…' : 'Sync configuration'} <span>→</span>
              </button>
            </div>
          </div>

          <div className="shell case-result">
            <span>OUTCOME</span>
            <p>Adjust device behavior remotely without a firmware release or redeployment.</p>
          </div>
        </article>

        <article className="case-study network">
          <div className="shell case-heading">
            <div className="case-number">03</div>
            <div>
              <p className="eyebrow">NETWORK VALIDATION</p>
              <h2>Find connectivity problems before launch.</h2>
            </div>
            <p className="case-summary">
              Setup-time network issues are cheaper to understand and correct before a site becomes
              operational.
            </p>
          </div>

          <div className="shell network-layout">
            <div className="network-controls">
              <div>
                <span className="module-label">SITE HEALTH</span>
                <h3>Connectivity map</h3>
              </div>
              <div className="filter-group" aria-label="Network filters">
                <button className={networkFilter === 'all' ? 'filter active' : 'filter'} onClick={() => setNetworkFilter('all')}>
                  All units
                </button>
                <button className={networkFilter === 'attention' ? 'filter active' : 'filter'} onClick={() => setNetworkFilter('attention')}>
                  Needs attention
                </button>
              </div>
            </div>

            <div className="network-demo">
              <div className="site-map" aria-label="Synthetic site connectivity map">
                <div className="site-grid" />
                <div className="site-outline" />
                {accessPoints.map((point) => (
                  <button
                    key={point.id}
                    className={`site-node access-point ${point.status} ${selectedSiteItem === point.id ? 'selected' : ''}`}
                    style={{ left: `${point.x}%`, top: `${point.y}%` }}
                    onClick={() => setSelectedSiteItem(point.id)}
                    aria-label={`${point.label}, ${point.status}`}
                  >
                    <span className="node-ring" />
                    <span className="node-symbol">⌁</span>
                  </button>
                ))}
                {visibleShelves.map((shelf) => (
                  <button
                    key={shelf.id}
                    className={`site-node device ${shelf.status} ${selectedSiteItem === shelf.id ? 'selected' : ''}`}
                    style={{ left: `${shelf.x}%`, top: `${shelf.y}%` }}
                    onClick={() => setSelectedSiteItem(shelf.id)}
                    aria-label={`${shelf.label}, ${shelf.status}`}
                  >
                    <span className="node-symbol">□</span>
                  </button>
                ))}
                <div className="map-key">
                  <span><i className="healthy" /> Healthy</span>
                  <span><i className="warning" /> Needs attention</span>
                  <span><i className="offline" /> Offline</span>
                </div>
              </div>

              <aside className="site-detail">
                <span className="module-label">SELECTED ITEM</span>
                <h3>{selectedLocation?.label}</h3>
                <p className={`site-status ${selectedLocation?.status}`}>{selectedLocation?.status}</p>
                <div className="site-metric">
                  <span>Signal quality</span>
                  <strong>{selectedLocation?.status === 'healthy' ? 'Excellent' : selectedLocation?.status === 'warning' ? 'Review' : 'Disconnected'}</strong>
                </div>
                <div className="site-metric">
                  <span>Setup action</span>
                  <strong>{selectedLocation?.status === 'healthy' ? 'Validated' : 'Investigate'}</strong>
                </div>
              </aside>
            </div>
          </div>

          <div className="shell case-result">
            <span>OUTCOME</span>
            <p>Surface network and connectivity issues during setup, before a site launches.</p>
          </div>
        </article>
      </section>

      <footer className="footer">
        <div className="shell footer-content">
          <div>
            <p className="eyebrow">SYSTEMS SOFTWARE ENGINEER</p>
            <h2>Build systems people can trust.</h2>
          </div>
          <p>
            Interactive demonstrations use synthetic data and simplified architecture. No company
            information, customer data, screenshots, or source code is included.
          </p>
        </div>
      </footer>
    </main>
  )
}

export default App
