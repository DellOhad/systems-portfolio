import { useState } from 'react'
import './App.css'
import interactionExplorer from './work/interaction-explorer.png'
import networkValidation from './work/network-validation.png'
import remoteConfiguration from './work/remote-configuration.png'
import remoteConfigurationFlow from './work/remote-configuration-flow.png'
import remoteConfigurationUi from './work/remote-configuration-ui.png'
import configurationDurationAnalysis from './work/configuration-duration-analysis.png'
import configurationSignalAnalysis from './work/configuration-signal-analysis.png'

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function App() {
  const [configurationExpanded, setConfigurationExpanded] = useState(false)

  return (
    <main>
      <section className="personal-hero" id="top">
        <nav className="personal-nav shell" aria-label="Primary navigation">
          <button className="personal-brand" onClick={() => scrollToSection('top')} aria-label="Back to top">
            Ohad Dell
          </button>
          <div className="personal-nav-links">
            <button onClick={() => scrollToSection('work')}>Selected work</button>
            <button onClick={() => scrollToSection('about')}>About</button>
          </div>
        </nav>

        <div className="personal-hero-content shell">
          <p className="personal-kicker">SYSTEMS SOFTWARE ENGINEER</p>
          <div className="personal-intro">
            <h1>I build the bridge between real-world systems and the people who rely on them.</h1>
            <div>
              <p>
                My work spans embedded devices, backend systems, data, and the practical tools
                that help teams make sense of complex operations.
              </p>
              <button className="personal-button" onClick={() => scrollToSection('work')}>
                See selected work <span>↓</span>
              </button>
            </div>
          </div>
          <p className="personal-note">
            A short selection of work I am permitted to share. Details are simplified where needed.
          </p>
        </div>
      </section>

      <section className="personal-work" id="work">
        <div className="shell personal-section-heading">
          <div>
            <p className="personal-kicker">SELECTED WORK</p>
            <h2>Things I have made useful.</h2>
          </div>
          <p>Real projects, shown at the level I can share publicly.</p>
        </div>

        <article className="personal-case personal-case-dark exploration-case">
          <div className="shell personal-case-grid">
            <div>
              <p className="personal-case-number">02 / EXPLORATION</p>
              <h2>Making a difficult investigation easier to follow.</h2>
              <p>
                I built an investigation workspace for a problem that previously meant opening
                several sources, collecting fragments by hand, and reconstructing one case at a time.
              </p>
              <p>
                The result brings the relevant signals, events, and possible interpretations into
                one place, so the person investigating can ask better questions sooner.
              </p>
              <p className="personal-result"><strong>What changed:</strong> a long, fragmented investigation became a guided one.</p>
            </div>
            <figure className="personal-visual">
              <img src={interactionExplorer} alt="An investigation workspace showing an event timeline and signals." />
              <figcaption>An approved example of the investigation workspace.</figcaption>
            </figure>
          </div>
        </article>

        <article className="personal-case configuration-case">
          <div className="shell personal-case-grid reverse">
            <div>
              <p className="personal-case-number">01 / CONFIGURATION</p>
              <h2>A simpler way to tune devices in the field.</h2>
              <p>
                A change in how a device interprets its sensor signal used to require preparing
                and releasing new firmware. I built the complete path for making those changes
                remotely instead.
              </p>
              <p>
                The work connected an operations interface, backend configuration rules, and
                embedded firmware. Teams can set sensible defaults, make targeted overrides where
                needed, and see which settings a device is using.
              </p>
              <p className="personal-result"><strong>What changed:</strong> device behavior can be adjusted remotely without a firmware release.</p>
              <button
                className="personal-detail-button"
                onClick={() => setConfigurationExpanded((expanded) => !expanded)}
                aria-expanded={configurationExpanded}
                aria-controls="configuration-details"
              >
                {configurationExpanded ? 'Hide implementation details' : 'See how it works'} <span>{configurationExpanded ? '↑' : '↓'}</span>
              </button>
            </div>
            <figure className="personal-visual">
              <img src={remoteConfigurationFlow} alt="A configuration flow from an operations dashboard to an embedded device." />
              <figcaption>Configuration moves from the operations interface through backend services to deployed devices.</figcaption>
            </figure>
          </div>
          {configurationExpanded && (
            <div className="shell configuration-details" id="configuration-details">
              <div>
                <p className="personal-case-number">HOW IT WORKS</p>
                <h3>Settings, delivery, and feedback.</h3>
                <p>
                  A user can define a default setting or a targeted override. The backend resolves
                  the right configuration for each device, and the firmware receives it during its
                  next sync. The device then reports its current state back.
                </p>
                <p>
                  Before applying a change more widely, I used signal-analysis tools to test the
                  configuration against difficult cases.
                </p>
              </div>
              <div className="configuration-detail-images">
                <figure className="personal-visual personal-visual-light">
                  <img src={remoteConfiguration} alt="A hand-drawn sketch of device-side configuration and syncing." />
                  <figcaption>An early device-side configuration and sync design.</figcaption>
                </figure>
                <figure className="personal-visual">
                  <img src={remoteConfigurationUi} alt="Interface screens for setting device configuration values." />
                  <figcaption>The interface for defining defaults and targeted overrides.</figcaption>
                </figure>
              </div>
              <div className="configuration-analysis">
                <div>
                  <p className="personal-case-number">CLOSING THE LOOP</p>
                  <h3>From a setting change to what happens in the field.</h3>
                  <p>
                    After a configuration change, I compared real device behavior before and after
                    deployment. When the result needed improvement, I could inspect the underlying
                    signals and test parameter combinations to find a better setting.
                  </p>
                </div>
                <div className="configuration-analysis-images">
                  <figure className="personal-visual">
                    <img src={configurationDurationAnalysis} alt="A before-and-after comparison of event durations." />
                    <figcaption>Measuring how a configuration change affected real event behavior.</figcaption>
                  </figure>
                  <figure className="personal-visual">
                    <img src={configurationSignalAnalysis} alt="Raw sensing hardware signals being inspected around an event." />
                    <figcaption>Inspecting real hardware signals behind an unexpected result.</figcaption>
                  </figure>
                </div>
              </div>
            </div>
          )}
        </article>

        <article className="personal-case personal-case-warm">
          <div className="shell personal-case-grid">
            <div>
              <p className="personal-case-number">03 / VALIDATION</p>
              <h2>Seeing network readiness before a site goes live.</h2>
              <p>
                I created a live 3D view that makes a physical environment, its connected devices,
                and its network state understandable at a glance during setup.
              </p>
              <p>
                It gives the people launching a site a clearer way to find Wi-Fi and connectivity
                problems while they are still straightforward to address.
              </p>
              <p className="personal-result"><strong>What changed:</strong> connectivity issues are visible before they become launch-day surprises.</p>
            </div>
            <figure className="personal-visual">
              <img src={networkValidation} alt="A three-dimensional network validation view of a site." />
              <figcaption>An approved example of the network-validation view.</figcaption>
            </figure>
          </div>
        </article>
      </section>

      <section className="personal-about" id="about">
        <div className="shell personal-about-grid">
          <div>
            <p className="personal-kicker">ABOUT ME</p>
            <h2>Systems work is people work.</h2>
          </div>
          <p>
            I bring a hardware and mechanics background to software problems, and I enjoy the
            moments where different disciplines need to meet. I learn quickly, work well in
            collaborative teams, and use AI tools thoughtfully for research, prototyping, and
            communicating ideas clearly. What matters most to me is seeing useful work reach the
            people it was built for.
          </p>
        </div>
      </section>
    </main>
  )
}

export default App
