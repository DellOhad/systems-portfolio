import { useEffect, useState, type MouseEvent } from 'react'
import './App.css'
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
  const [expandedImage, setExpandedImage] = useState<{ src: string; alt: string; caption: string } | null>(null)
  const [storyOpen, setStoryOpen] = useState(false)
  const [tablesHeight, setTablesHeight] = useState(460)
  const [explorerHeight, setExplorerHeight] = useState(720)

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return
      if (event.data?.type === 'case-file-open') {
        setStoryOpen(true)
        return
      }
      if (event.data?.type === 'case-file-close') {
        setStoryOpen(false)
        return
      }
      const height = Number(event.data?.type === 'case-file-height' ? event.data.height : NaN)
      if (height <= 180 || height >= 5000) return
      if (event.data.part === 'explorer') setExplorerHeight(height + 8)
      if (event.data.part === 'tables') setTablesHeight(height + 8)
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  function openImage(event: MouseEvent<HTMLElement>) {
    if (!(event.target instanceof HTMLImageElement)) return

    const figure = event.target.closest('figure.personal-visual')
    if (!figure) return

    setExpandedImage({
      src: event.target.currentSrc || event.target.src,
      alt: event.target.alt,
      caption: figure.querySelector('figcaption')?.textContent?.trim() ?? '',
    })
  }

  return (
    <main onClick={openImage}>
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
            <h1>If you made it this far, we are already off to a good start - now let’s see what we could build together.</h1>
            <div>
              <p>
                My work spans backend systems, embedded devices, data, and the tools that improve
                system accuracy, reduce R&amp;D investigation time, and make complex technology
                easier for operations teams to use.
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
          <div className="shell exploration-layout">
            <div>
              <p className="personal-case-number">02 / EXPLORATION</p>
              <h2>Turning fragmented data into focused investigation.</h2>
              <p>
                I built an investigation workspace that replaced manual work across several data
                sources with one connected view of a case.
              </p>
              <p>
                Bringing together the relevant signals, events, and possible interpretations made
                investigations faster and easier to follow—helping us in R&amp;D focus on the real
                issue, understand edge cases, and spend less time assembling evidence.
              </p>
              <p className="personal-result"><strong>What changed:</strong> we could investigate the right issue faster, with a clearer view of complex behavior.</p>
            </div>
            <figure className="exploration-demo exploration-tables">
              <iframe
                title="Files for one visit"
                src={`${import.meta.env.BASE_URL}case-file.html?part=tables&v=3`}
                style={{ height: tablesHeight }}
              />
            </figure>
            {storyOpen ? (
              <figure className="exploration-demo exploration-stage">
                <iframe
                  title="Visit review"
                  src={`${import.meta.env.BASE_URL}case-file.html?part=explorer&v=3`}
                  style={{ height: explorerHeight }}
                />
              </figure>
            ) : null}
          </div>
        </article>

        <article className="personal-case configuration-case">
          <div className="shell personal-case-grid reverse">
            <div>
              <p className="personal-case-number">01 / CONFIGURATION</p>
              <h2>Changing device configuration should not require a new release.</h2>
              <p className="personal-subheading">THE PROBLEM</p>
              <p>
                The same detector runs across different shelf mechanics and environments.
                Adapting it to specific conditions previously required building and deploying a
                dedicated firmware version for each configuration.
              </p>
              <p className="personal-subheading">HIGH-LEVEL SOLUTION</p>
              <p>
                I built a centrally managed configuration layer that lets operators define
                detector settings remotely by product category or individual shelf, and
                synchronizes updates only to the affected devices.
              </p>
              <p className="personal-result"><strong>What changed:</strong> device behavior can be tuned remotely, persistently, and without a firmware release.</p>
              <button
                className="personal-detail-button"
                onClick={() => setConfigurationExpanded((expanded) => !expanded)}
                aria-expanded={configurationExpanded}
                aria-controls="configuration-details"
              >
                {configurationExpanded ? 'Hide implementation details' : 'How it works'} <span>{configurationExpanded ? '↑' : '↓'}</span>
              </button>
            </div>
            <figure className="personal-visual">
              <img src={remoteConfigurationFlow} alt="A configuration flow from an operations dashboard to an embedded device." />
              <figcaption>Configuration moves to deployed devices through backend services from the operations interface.</figcaption>
            </figure>
          </div>
          <div className={`configuration-details-wrapper${configurationExpanded ? ' is-open' : ''}`} aria-hidden={!configurationExpanded}>
            <div className="shell configuration-details" id="configuration-details">
              <div>
                <p className="personal-case-number">HOW IT WORKS</p>
                <h3>A full path from the dashboard to live device behavior.</h3>
                <p>
                  I designed the end-to-end path for changing device configuration: dashboard
                  configuration, backend synchronization and command delivery, then on-device
                  persistence and status reporting.
                </p>
                <p>
                  On the embedded side, concurrent tasks detect the update and reload safely
                  between events. The device stores the setting in non-volatile memory and reports
                  its active state back to the management layer, so the change survives a restart.
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
          </div>
        </article>

        <article className="personal-case personal-case-warm">
          <div className="shell validation-case">
            <div>
              <p className="personal-case-number">03 / VALIDATION</p>
              <h2>A live view for managing Wi-Fi across deployed sites.</h2>
              <p>
                I created a live 3D view that brings a physical environment, its connected
                devices, and its network state into one place.
              </p>
              <p>
                It supports both site setup and ongoing operations: checking network readiness,
                managing Wi-Fi in active sites, and investigating connectivity issues with the
                right physical context.
              </p>
              <p className="personal-result"><strong>Riddle:</strong> Can you find the problematic device? Is it a reception issue, an access-point configuration issue, or perhaps a power connection issue?</p>
            </div>
            <figure className="validation-demo">
              <iframe
                title="Synthetic network validation view"
                src={`${import.meta.env.BASE_URL}network-validation.html`}
              />
              <figcaption>A synthetic site. Shelves, access points, and readings are invented.</figcaption>
            </figure>
          </div>
        </article>
      </section>

      <section className="personal-about" id="about">
        <div className="shell personal-about-grid">
          <div>
            <p className="personal-kicker">ABOUT ME</p>
            <h2>Driven by continuous learning.</h2>
          </div>
          <p>
            I am a software and systems engineer with experience across backend services,
            embedded software, data flows, and web tools. I enjoy working in unfamiliar domains,
            tracing problems across layers, and finding better solutions from different
            perspectives. My hardware and mechanics background helps me work comfortably where
            disciplines meet. I work well in collaborative teams, use AI tools thoughtfully for
            research and prototyping, and care most about seeing useful work reach the people it
            was built for.
          </p>
        </div>
        <footer className="shell personal-contact" aria-label="Contact details">
          <a href="tel:+972546964464">
            <span>PHONE</span>
            +972 54 696 4464
          </a>
          <a href="mailto:ohaddel0@gmail.com">
            <span>EMAIL</span>
            ohaddel0@gmail.com
          </a>
          <a href="https://www.linkedin.com/in/ohad-dell/" target="_blank" rel="noreferrer">
            <span>LINKEDIN</span>
            linkedin.com/in/ohad-dell
          </a>
        </footer>
      </section>

      {expandedImage && (
        <div className="image-lightbox" role="dialog" aria-modal="true" aria-label={expandedImage.alt} onClick={() => setExpandedImage(null)}>
          <div className="image-lightbox-content" onClick={(event) => event.stopPropagation()}>
            <button className="image-lightbox-close" onClick={() => setExpandedImage(null)} aria-label="Close enlarged image">
              Close ×
            </button>
            <img src={expandedImage.src} alt={expandedImage.alt} />
            {expandedImage.caption && <p>{expandedImage.caption}</p>}
          </div>
        </div>
      )}
    </main>
  )
}

export default App
