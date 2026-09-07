'use client';

import { useEffect, useState } from 'react';

const systemSteps = [
  {
    number: '01',
    label: 'SENSE',
    title: 'A player enters the space.',
    body: 'Cameras detect position and establish a live spatial coordinate. The room knows when the game begins.',
    crop: 'crop-sense',
  },
  {
    number: '02',
    label: 'IDENTIFY',
    title: 'Vision locks onto the player.',
    body: 'Continuous visual tracking keeps the player, viewpoint and movement connected to one stable identity.',
    crop: 'crop-identify',
  },
  {
    number: '03',
    label: 'GENERATE',
    title: 'A flat asset becomes spatial.',
    body: 'Game art or a single image moves through an AI-native 3D content pipeline, prepared for multiple viewing angles.',
    crop: 'crop-generate',
  },
  {
    number: '04',
    label: 'TRACK',
    title: 'The world answers every viewpoint.',
    body: 'Walk around the character and the visible side changes with you. Where you stand becomes part of the design.',
    crop: 'crop-track',
  },
];

const experiences = [
  {
    number: '01',
    label: 'DODGE',
    title: 'Move to survive.',
    body: 'A directional warning gives the player one second to react. A real step sideways becomes an in-game dodge.',
    crop: 'crop-dodge',
    motion: 'motion-dodge',
  },
  {
    number: '02',
    label: 'FLANK',
    title: 'Walk around the threat.',
    body: 'The boss turns to follow the player. Reach its back, reveal the weak point and open a short damage window.',
    crop: 'crop-flank',
    motion: 'motion-flank',
  },
  {
    number: '03',
    label: 'STRIKE',
    title: 'Gesture to attack.',
    body: 'The camera reads a deliberate hand movement and triggers the move with light, sound and visual impact.',
    crop: 'crop-strike',
    motion: 'motion-strike',
  },
];

const partners = [
  ['GAME STUDIOS & IP', 'Bring a character, world or boss. Together we create the first public playable encounter.'],
  ['DISPLAY & HARDWARE', 'Validate the display, camera coverage, local compute and a dependable physical setup.'],
  ['AI & SPATIAL COMPUTING', 'Build the vision tracking, gesture recognition and image-to-3D content pipeline.'],
  ['VENUES & COMMERCIAL', 'Test with real players in exhibitions, entertainment spaces and live activations.'],
];

function IntroGate() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 3200);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="intro-gate" aria-label="VISTRX AI entry sequence">
      <button className="intro-skip" type="button" onClick={() => setVisible(false)}>SKIP</button>
      <p className="intro-status"><span>01</span> PLAYER DETECTED</p>
      <div className="intro-figure intro-neutral" aria-hidden="true" />
      <div className="intro-figure intro-touch" aria-hidden="true" />
      <div className="intro-scan" aria-hidden="true" />
      <div className="intro-interface" aria-hidden="true">
        <span>VISTRX / GATE 01</span>
        <strong>ENTER EXPERIENCE</strong>
        <small>TOUCH TO CONTINUE</small>
        <i />
      </div>
      <div className="intro-ripple" aria-hidden="true" />
    </div>
  );
}

function Brand() {
  return (
    <span className="brand-lockup">
      <i aria-hidden="true" />
      <b>VISTRX AI</b>
    </span>
  );
}

export default function Home() {
  return (
    <main>
      <IntroGate />

      <nav className="site-nav" aria-label="Main navigation">
        <a href="#top" aria-label="VISTRX AI home"><Brand /></a>
        <div className="nav-links">
          <a href="#about">ABOUT US</a>
          <a href="#experience">EXPERIENCE</a>
          <a href="#mission">MISSION</a>
        </div>
        <a className="nav-action" href="#collaborate">PARTNER WITH US <span>↗</span></a>
      </nav>

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <p className="micro-label">SPATIAL GAMEPLAY · WITHOUT THE WEARABLES</p>
          <h1>STEP INTO<br />THE <em>GAME.</em></h1>
          <p className="hero-lede">A glasses-free holographic game system where movement, viewpoint and gesture become the controls.</p>
          <a className="line-link" href="#experience">EXPLORE THE EXPERIENCE <span>↓</span></a>
        </div>
        <div className="hero-figure" aria-hidden="true">
          <div className="hero-person" />
          <div className="hero-ring ring-one" />
          <div className="hero-ring ring-two" />
          <div className="hero-cross cross-x" />
          <div className="hero-cross cross-y" />
          <span className="hero-tag tag-view">VIEWPOINT / LOCKED</span>
          <span className="hero-tag tag-body">BODY / INPUT</span>
        </div>
        <div className="hero-foot"><span>CONCEPT 001 · 2026</span><span>SCROLL TO ENTER</span></div>
      </section>

      <section className="about" id="about">
        <div className="section-index">01 / ABOUT US</div>
        <div className="about-head">
          <h2>WE TURN SPACE<br />INTO GAMEPLAY.</h2>
          <div className="about-copy">
            <p>VISTRX AI is exploring a new kind of game interface: a visible character in physical space that reacts to one player in real time.</p>
            <p>No headset. No handheld controller. The body becomes the input and the room becomes the level.</p>
          </div>
        </div>
        <div className="proof-line">
          <div><strong>18</strong><span>YEARS OF ANIMATION<br />& CG PRODUCTION</span></div>
          <div><strong>05</strong><span>GAME CONTENT<br />CAPABILITIES</span></div>
          <p>CONTENT & PRODUCTION<br />BY MDOG ANIMATION</p>
        </div>
      </section>

      <section className="system-story" aria-label="How the system works">
        <header className="story-head">
          <div className="section-index">SYSTEM / 04 STAGES</div>
          <h2>FROM PRESENCE<br />TO RESPONSE.</h2>
        </header>
        <div className="system-steps">
          {systemSteps.map((step, index) => (
            <article className={`system-step ${index % 2 ? 'reverse' : ''}`} key={step.number}>
              <div className={`source-crop system-crop ${step.crop}`} role="img" aria-label={step.title}>
                <span className="crop-scan" aria-hidden="true" />
                <small>SOURCE CONCEPT / {step.number}</small>
              </div>
              <div className="step-copy">
                <p>{step.number} / {step.label}</p>
                <h3>{step.title}</h3>
                <span>{step.body}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="experience" id="experience">
        <header className="experience-head">
          <div className="section-index">02 / EXPERIENCE</div>
          <h2>YOUR BODY IS<br />THE CONTROLLER.</h2>
          <p>We start with one focused encounter: read the threat, change your position and strike with intent.</p>
        </header>
        <div className="experience-list">
          {experiences.map((item) => (
            <article className="experience-row" key={item.number}>
              <div className="experience-copy">
                <p>{item.number} / {item.label}</p>
                <h3>{item.title}</h3>
                <span>{item.body}</span>
              </div>
              <div className={`source-crop experience-crop ${item.crop}`} role="img" aria-label={item.title}>
                <div className={`motion-layer ${item.motion}`} aria-hidden="true"><i /><i /><i /></div>
                <small>GAMEPLAY STUDY / {item.number}</small>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mission" id="mission">
        <div className="section-index">03 / MISSION</div>
        <div className="mission-title">
          <p>OUR DIRECTION</p>
          <h2>GIVE GAMES<br />A PLACE TO <em>LIVE.</em></h2>
        </div>
        <div className="mission-grid">
          <p className="mission-statement">We want digital characters to share the room with us, respond to where we stand and invite new forms of play beyond a screen.</p>
          <div className="today-list">
            <p>WHAT EXISTS TODAY</p>
            <div><span>01</span><b>Experience concept and core combat loop</b><i>READY</i></div>
            <div><span>02</span><b>CG, UE5 and AI-native content capability</b><i>READY</i></div>
            <div><span>03</span><b>End-to-end interactive prototype</b><i>VALIDATING</i></div>
            <div><span>04</span><b>Founding partner network</b><i>OPEN</i></div>
          </div>
        </div>
      </section>

      <section className="collaborate" id="collaborate">
        <header>
          <div className="section-index">04 / COLLABORATE</div>
          <h2>BUILD THE FIRST<br />PLAYABLE WORLD<br />WITH US.</h2>
        </header>
        <div className="partner-list">
          {partners.map(([name, body], index) => (
            <article key={name}>
              <span>0{index + 1}</span>
              <h3>{name}</h3>
              <p>{body}</p>
              <b aria-hidden="true">↗</b>
            </article>
          ))}
        </div>
      </section>

      <section className="closing">
        <div className="closing-orbit" aria-hidden="true"><i /><i /><i /></div>
        <p>FOUNDING PARTNERS · OPEN</p>
        <h2>LET&apos;S MAKE IT<br />REAL.</h2>
        <button type="button">START A CONVERSATION <span>↗</span></button>
        <small>CONTACT CHANNEL · TO BE CONFIRMED</small>
      </section>

      <footer>
        <Brand />
        <span>HOLOGRAPHIC GAMING · CONCEPT 2026</span>
        <span>CONTENT PARTNER · MDOG ANIMATION</span>
      </footer>
    </main>
  );
}
