const systemStages = [
  {
    number: '01',
    kicker: 'SENSE',
    title: '检测玩家进入',
    body: '摄像头捕捉玩家位置，建立空间坐标，让系统知道玩家何时进入战斗范围。',
  },
  {
    number: '02',
    kicker: 'IDENTIFY',
    title: '锁定玩家身份',
    body: '视觉识别持续跟踪当前玩家，为每个动作和视角变化提供稳定输入。',
  },
  {
    number: '03',
    kicker: 'GENERATE',
    title: '生成全息角色',
    body: '从图片或游戏资产生成 3D 内容，并预渲染多角度画面，接入实时运行管线。',
  },
  {
    number: '04',
    kicker: 'TRACK',
    title: '视角实时追踪',
    body: '玩家走到哪个角度，系统就呈现角色对应的一面，让空间移动成为玩法本身。',
  },
];

const gameMechanics = [
  {
    number: '01',
    label: 'DODGE',
    title: '移动，就是闪避',
    body: 'Boss 的攻击先给出方向预警。玩家只需要侧身或跨步，摄像头就能把真实位置变化转成躲避动作。',
    demo: 'dodge',
  },
  {
    number: '02',
    label: 'FLANK',
    title: '绕到背后，发现弱点',
    body: '角色会持续面对玩家。只有真实走到背面，才能看见弱点并获得更高伤害窗口。',
    demo: 'flank',
  },
  {
    number: '03',
    label: 'STRIKE',
    title: '挥手，直接出招',
    body: '视觉模型识别攻击手势，系统即时触发技能与声光反馈，让身体成为最直觉的控制器。',
    demo: 'strike',
  },
];

const progressItems = [
  ['READY', '体验概念与玩法', '完整系统流程、Boss 战机制与首个体验方向'],
  ['READY', '内容制作能力', 'CG、UE5、AIGC 与游戏试玩内容的成熟制作团队'],
  ['VALIDATING', '端到端互动原型', '显示、追踪、内容生成与实时渲染的联合验证'],
  ['SEEKING', '首批共创伙伴', '游戏 IP、硬件、空间 AI、试点场地与商业合作'],
];

const partners = [
  ['01', '游戏公司与 IP 方', '选择一个角色或 Boss，共同完成首个可公开展示的战斗 Demo。'],
  ['02', '显示与硬件伙伴', '联合验证显示方案、摄像头覆盖、设备集成与现场稳定性。'],
  ['03', 'AI 与空间计算伙伴', '共建单图转 3D、视觉追踪、动作识别与实时内容管线。'],
  ['04', '场地与商业伙伴', '在展会、商业空间或线下娱乐场景进行真实玩家测试。'],
];

export default function Home() {
  return (
    <main>
      <nav className="site-nav" aria-label="主导航">
        <a className="brand" href="#top" aria-label="VISTRX AI 首页">
          <span className="brand-mark" aria-hidden="true" />
          <span>VISTRX AI</span>
        </a>
        <div className="nav-links">
          <a href="#system">系统</a>
          <a href="#experience">体验</a>
          <a href="#progress">进展</a>
        </div>
        <a className="nav-cta" href="#partners">
          成为共创伙伴
          <span aria-hidden="true">↗</span>
        </a>
      </nav>

      <section className="hero" id="top">
        <div className="hero-noise" aria-hidden="true" />
        <div className="hero-orbit orbit-one" aria-hidden="true" />
        <div className="hero-orbit orbit-two" aria-hidden="true" />

        <div className="hero-copy">
          <p className="eyebrow"><span>CONCEPT 001</span> · HOLOGRAPHIC GAMING</p>
          <h1>
            走进游戏，
            <span>亲手迎战</span>
          </h1>
          <p className="hero-lede">
            面向游戏行业的裸眼全息互动系统。无需头显或手柄，玩家通过移动、绕背与手势，直接参与眼前的战斗。
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#partners">成为首批共创伙伴 <span>↗</span></a>
            <a className="text-button" href="#system">查看系统原理 <span>↓</span></a>
          </div>
          <div className="hero-tags" aria-label="核心能力">
            <span>NAKED-EYE</span>
            <span>VISION TRACKING</span>
            <span>AI NATIVE 3D</span>
          </div>
        </div>

        <div className="hero-visual" aria-label="全息游戏玩法概念图">
          <div className="visual-frame">
            <img src="/media/gameplay.png" alt="全息 Boss 战与玩家位置交互概念" />
            <div className="scan-line" aria-hidden="true" />
            <div className="target-ring ring-a" aria-hidden="true" />
            <div className="target-ring ring-b" aria-hidden="true" />
            <div className="visual-label label-live"><i /> LIVE TRACKING</div>
            <div className="visual-label label-latency">TARGET LATENCY · LOW</div>
          </div>
          <p className="visual-caption"><span>PLAYER POSITION</span> BECOMES GAME INPUT</p>
        </div>

        <div className="hero-index" aria-hidden="true">
          <span>VISTRX / 2026</span>
          <b>01</b>
        </div>
      </section>

      <section className="system-section" id="system">
        <div className="section-heading">
          <p className="eyebrow"><span>01 / SYSTEM</span></p>
          <h2>从玩家进入，到世界回应</h2>
          <p>四个阶段组成一次完整互动。玩家的位置、视角和动作，都成为游戏实时输入。</p>
        </div>

        <div className="system-layout">
          <div className="system-visual-wrap">
            <div className="system-image-frame">
              <img src="/media/system-flow.png" alt="全息游戏系统四阶段运行流程" />
              <div className="image-sheen" aria-hidden="true" />
            </div>
            <div className="system-status">
              <span><i /> SYSTEM CONCEPT</span>
              <span>4 STAGES</span>
            </div>
          </div>

          <div className="stage-list">
            {systemStages.map((stage) => (
              <article className="stage" key={stage.number}>
                <div className="stage-number">{stage.number}</div>
                <div>
                  <p>{stage.kicker}</p>
                  <h3>{stage.title}</h3>
                  <span>{stage.body}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="gameplay-section" id="experience">
        <div className="section-heading gameplay-heading">
          <p className="eyebrow"><span>02 / GAMEPLAY</span></p>
          <h2>身体，就是游戏手柄</h2>
          <p>我们从一个 Boss 单挑开始，让位置、方向和动作直接决定战斗结果。</p>
        </div>

        <div className="gameplay-layout">
          <div className="gameplay-image-frame">
            <img src="/media/gameplay.png" alt="闪避、绕背和手势攻击的玩法机制" />
            <div className="combat-scan" aria-hidden="true" />
            <div className="combat-lock" aria-hidden="true">LOCKED</div>
          </div>
          <div className="mechanic-list">
            {gameMechanics.map((item) => (
              <article className="mechanic" key={item.number}>
                <div className={`mechanic-demo ${item.demo}`} aria-hidden="true">
                  <span className="demo-core" />
                  <span className="demo-player" />
                  <span className="demo-trace" />
                </div>
                <div className="mechanic-copy">
                  <p>{item.number} / {item.label}</p>
                  <h3>{item.title}</h3>
                  <span>{item.body}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="progress-section" id="progress">
        <div className="progress-intro">
          <p className="eyebrow"><span>03 / CURRENT STATE</span></p>
          <h2>我们已经走到哪里</h2>
          <p>首版网站将已经完成的能力、正在验证的技术和需要伙伴参与的部分分开呈现。</p>
        </div>
        <div className="progress-list">
          {progressItems.map(([status, title, body], index) => (
            <article className="progress-row" key={title}>
              <span className={`status status-${status.toLowerCase()}`}>{status}</span>
              <div className="progress-number">0{index + 1}</div>
              <div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="team-section" id="team">
        <div className="team-copy">
          <p className="eyebrow"><span>CONTENT & PRODUCTION PARTNER</span></p>
          <h2>由懂游戏内容的团队，把技术变成可玩的体验</h2>
          <p>芒狗动画提供 CG、UE5、AIGC 与可玩广告制作能力，为全息体验建立角色、动画和实时内容管线。</p>
          <a href="#partners">了解制作团队 <span>↗</span></a>
        </div>
        <div className="team-proof">
          <div className="proof-stat"><strong>18</strong><span>YEARS<br />ANIMATION & CG</span></div>
          <div className="proof-stat"><strong>05</strong><span>GAME CONTENT<br />CAPABILITIES</span></div>
          <div className="client-strip" aria-label="团队过往项目">
            <p>SELECTED TEAM WORK</p>
            <div><span>MARVEL SNAP</span><span>RISE OF KINGDOMS</span><span>MOBILE LEGENDS</span><span>RAGNAROK</span></div>
          </div>
          <small>以上为团队过往内容制作经验，不代表其已成为本全息项目合作方。</small>
        </div>
      </section>

      <section className="partners-section" id="partners">
        <div className="partners-heading">
          <p className="eyebrow"><span>04 / CO-CREATION</span></p>
          <h2>一起完成第一个<br />可玩的全息世界</h2>
          <p>我们希望从一个可验证的小型体验开始，让每一类伙伴都拥有清晰的参与方式和共同成果。</p>
        </div>
        <div className="partner-list">
          {partners.map(([number, title, body]) => (
            <article className="partner-row" key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{body}</p>
              <b aria-hidden="true">↗</b>
            </article>
          ))}
        </div>
      </section>

      <section className="final-cta" id="contact">
        <div className="cta-orbit" aria-hidden="true"><i /><i /><i /></div>
        <p className="eyebrow"><span>FOUNDING PARTNERS · OPEN</span></p>
        <h2>下一次见面，<br />让它真正运行起来</h2>
        <p>如果你拥有游戏 IP、显示硬件、空间 AI 能力或试点场景，我们希望听听你的想法。</p>
        <button className="primary-button cta-button" type="button">合作联系入口 <span>↗</span></button>
        <span className="contact-email">CONTACT METHOD · TO BE CONFIRMED</span>
      </section>

      <footer>
        <a className="brand" href="#top"><span className="brand-mark" />VISTRX AI</a>
        <p>HOLOGRAPHIC GAMING · CONCEPT 2026</p>
        <span>CONTENT PARTNER · MDOG ANIMATION</span>
      </footer>
    </main>
  );
}
