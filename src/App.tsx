import './App.css'

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function App() {
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

        <article className="personal-case personal-case-dark">
          <div className="shell personal-case-grid">
            <div>
              <p className="personal-case-number">01 / EXPLORATION</p>
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
              <img src="./work/interaction-explorer.png" alt="An investigation workspace showing an event timeline and signals." />
              <figcaption>An approved example of the investigation workspace.</figcaption>
            </figure>
          </div>
        </article>

        <article className="personal-case">
          <div className="shell personal-case-grid reverse">
            <div>
              <p className="personal-case-number">02 / CONFIGURATION</p>
              <h2>Changing device behavior without making a new release.</h2>
              <p>
                Some changes should not have to wait for a firmware release. I designed the path
                from a cloud-managed setting to a deployed embedded device so configuration could
                evolve safely in the field.
              </p>
              <p>
                Alongside the system itself, I made tools for exploring how configuration choices
                behave against difficult, long-tail cases.
              </p>
              <p className="personal-result"><strong>What changed:</strong> behavior can be adjusted remotely, without redeploying firmware.</p>
            </div>
            <figure className="personal-visual personal-visual-light">
              <img src="./work/remote-configuration.png" alt="A hand-drawn architecture sketch for remote device configuration." />
              <figcaption>A working architecture sketch: configuration reaches the device and is applied on its next sync.</figcaption>
            </figure>
          </div>
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
              <img src="./work/network-validation.png" alt="A three-dimensional network validation view of a site." />
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
