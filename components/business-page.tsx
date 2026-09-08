'use client';

import { HoloScene } from './holo-scene';
import { Brand, SiteNav } from './site-nav';
import { useLanguage } from './use-language';

const displayBenefits = [
  {
    number: '01',
    en: ['TRANSPARENT & OPEN', 'Preserve sightlines and the open character of the entrance while adding visible digital content.'],
    zh: ['通透开放', '在增加数字内容的同时，保留入口视线与空间的开放感。'],
  },
  {
    number: '02',
    en: ['3D DYNAMIC VISUALS', 'Present products and brand assets as animated spatial objects instead of a static printed sign.'],
    zh: ['动态三维视觉', '以动画化空间物体展示产品与品牌资产，替代静态印刷标牌。'],
  },
  {
    number: '03',
    en: ['HIGH ATTENTION CAPTURE', 'Create a premium, technology-forward first impression in high-traffic commercial environments.'],
    zh: ['高注意力捕捉', '在高客流商业空间中建立更高级、更具科技感的第一印象。'],
  },
  {
    number: '04',
    en: ['NEW MEDIA INVENTORY', 'Turn an underused transparent surface into a programmable advertising and sponsorship position.'],
    zh: ['新增媒体资源', '把利用率较低的透明表面转化为可编排的广告与赞助媒体位。'],
  },
];

const gamingPrinciples = [
  { number: '01', en: ['SENSE', 'Locate the player and establish a stable spatial coordinate.'], zh: ['感知', '定位玩家并建立稳定的空间坐标。'] },
  { number: '02', en: ['RENDER', 'Generate a convincing character view for the player’s position.'], zh: ['渲染', '根据玩家位置生成可信的角色视图。'] },
  { number: '03', en: ['RESPOND', 'Convert body movement and gestures into immediate game actions.'], zh: ['响应', '把身体移动和手势转换成即时游戏动作。'] },
  { number: '04', en: ['PROJECT', 'Place the complete interactive game image directly in open air.'], zh: ['投影', '把完整的可交互游戏画面直接呈现在空气中。'] },
];

const systemFlow = [
  { number: '01', en: ['SENSE', 'Detect the player entering', 'A calibrated camera array covers the play volume, detects entry and establishes the player’s live spatial coordinate.'], zh: ['感知', '检测玩家进入', '校准后的摄像阵列覆盖游戏空间，检测玩家入场并建立实时空间坐标。'] },
  { number: '02', en: ['IDENTIFY', 'Lock the primary player', 'AI vision confirms the primary player, maintains identity lock and turns viewpoint tracking on before content begins.'], zh: ['识别', '锁定主玩家', 'AI 视觉确认主玩家身份、保持身份锁定，并在内容开始前开启视角追踪。'] },
  { number: '03', en: ['GENERATE', 'Turn one image into a full-view character', '2D input → AI 3D reconstruction → 360° multi-view pre-render → optimized storage. Runtime playback stays lightweight.'], zh: ['生成', '一张图片变成全息角色', '二维输入 → AI 三维重建 → 360° 多视角预渲染 → 优化存储，让运行时调用保持轻量。'] },
  { number: '04', en: ['TRACK', 'See the correct side from every angle', 'Viewpoint AI stays locked to the player: see the front from the front, walk behind and the character reveals its back.'], zh: ['追踪', '走到哪个角度，看见对应一面', '视角 AI 持续锁定玩家：正面看到正面，绕到背后即可看到角色背面。'] },
];

const combatMechanics = [
  { number: '01', en: ['DODGE', 'Move or take the hit', 'A ray attack gives a one-second directional warning. Stand still: hit, HP −1. Physically sidestep out of the danger lane: dodge successful.', 'Warning → judge direction → step out → dodge in about one second.'], zh: ['闪避', '站着不动就会挨打', '射线攻击提前一秒给出方向预警。原地不动：命中、HP −1；现实侧步离开危险区：闪避成功。', '看到预警 → 判断方向 → 现实侧步 → 约一秒内完成闪避。'] },
  { number: '02', en: ['FLANK', 'The front is armored; the back is lethal', 'Front defense blocks damage (DMG × 0). Circle behind the boss to expose its rear weak point (DMG × 2).', 'Boss rotation is limited and tunable. Rotation speed controls difficulty; the flank window creates the play.'], zh: ['绕后', '正面打不动，绕背才致命', '正面护甲抵消伤害（DMG × 0）；绕到 Boss 背后打开弱点窗口（DMG × 2）。', 'Boss 转向速度有限且可参数化。转速控制难度，“绕背窗口期”构成玩法乐趣。'] },
  { number: '03', en: ['STRIKE', 'Wave your hand to attack', 'Player gesture → camera capture → edge-AI pose recognition → attack execution → enemy damage or defeat.', 'A lightweight edge model keeps perceived latency low; light, sound and impact feedback make every hit immediate.'], zh: ['攻击', '挥手就是出招', '玩家挥手 → 摄像捕捉 → 端侧 AI 姿态识别 → 执行攻击 → 怪物减血或死亡。', '端侧轻量模型降低感知延迟；声、光与冲击反馈让每次命中都即时明确。'] },
];

const engineeringNotes = [
  { number: '01', en: ['360° CAMERA COVERAGE', 'The player must remain tracked wherever they move. A ring-shaped multi-camera solution becomes part of the hardware specification.'], zh: ['360° 摄像头覆盖', '玩家移动到设备前后都必须被追踪，因此需要环形多摄像方案，并写入硬件规格。'] },
  { number: '02', en: ['PARAMETERIZED BOSS ROTATION', 'Rotation speed must be tunable so the boss does not simply stick to the player. Difficulty is controlled through this parameter.'], zh: ['Boss 转向参数化', '转速必须可调，避免 Boss 始终黏住玩家；核心难度通过转速参数控制。'] },
  { number: '03', en: ['SPLIT AI ARCHITECTURE', 'Edge models handle tracking, pose and intent. Cloud models handle derived 3D assets and generative content.'], zh: ['分层 AI 架构', '端侧小模型负责追踪、姿态与意图；云端大模型负责衍生三维资产与内容生成。'] },
  { number: '04', en: ['SOUND + LIGHT AS HAPTICS', 'Hit: flash, particle burst and heavy sound. Attack: device light turns red with low-frequency vibration.'], zh: ['声光反馈就是手感', '命中：闪白、粒子碎裂与重音效；受击或攻击：设备灯带变红，并加入低频震动。'] },
];

export function BusinessPage({ kind }: { kind: 'display' | 'gaming' }) {
  const { language, setLanguage } = useLanguage();
  const zh = language === 'zh';
  const display = kind === 'display';

  const benefits = display ? displayBenefits : gamingPrinciples;

  return (
    <main className={`business-page business-page-${kind}`}>
      <SiteNav language={language} onLanguageChange={setLanguage} />

      <header className="business-hero">
        <a href="/#experience" className="back-link">← {zh ? '返回两项业务' : 'BACK TO TWO BUSINESS LINES'}</a>
        <p>{display ? (zh ? '业务 01 · 已有业务 / 可部署' : 'BUSINESS 01 · AVAILABLE NOW / DEPLOYABLE') : (zh ? '业务 02 · 未来业务 / 合作研发' : 'BUSINESS 02 · FUTURE VISION / PARTNER R&D')}</p>
        <h1>
          {display
            ? (zh ? <><span>透明介质</span><span>全息媒体</span></> : <><span>TRANSPARENT</span><span>HOLOGRAPHIC MEDIA</span></>)
            : (zh ? <><span>让游戏</span><span>出现在空气中</span></> : <><span>GAMES IN</span><span>OPEN AIR</span></>)}
        </h1>
        <div className="business-hero-bottom">
          <p>{display
            ? (zh ? '把既有玻璃门禁和透明表面升级为动态三维媒体，在尽量减少基础设施改造的同时，创造更强的现场注意力与新的广告展示空间。' : 'Upgrade existing glass gates and transparent surfaces into dynamic 3D media—creating stronger on-site attention and new advertising inventory with minimal infrastructure retrofit.')
            : (zh ? '我们的长期目标是完成无可见介质的全息投影系统。无需屏幕、幕布、玻璃箱、雾幕或穿戴设备，玩家直接与空气中的游戏角色互动。' : 'Our long-term goal is a holographic projection system with no visible medium. No screen, projection surface, glass enclosure, mist curtain or wearable—the player interacts directly with game characters in open air.')}</p>
          <span>{display ? (zh ? '商业解决方案' : 'COMMERCIAL SOLUTION') : (zh ? '合作研发方向' : 'COLLABORATIVE R&D')}</span>
        </div>
      </header>

      <section className="business-live">
        <div className="business-live-meta">
          <p>{zh ? '实时三维概念' : 'LIVE 3D CONCEPT'}</p>
          <h2>{display ? (zh ? '透明门禁中的动态商品' : 'Dynamic products inside a transparent gate') : (zh ? '角色随玩家视角实时响应' : 'A character that responds to the player’s viewpoint')}</h2>
          <p>{display
            ? (zh ? '模型对应有介质方案：透明门板是显示载体，三维内容在门板区域内呈现。拖动旋转，滚动缩放。' : 'This model represents the medium-based system: the transparent gate panel is the display medium and 3D content appears within that surface. Drag to rotate and scroll to zoom.')
            : (zh ? '模型对应未来系统中的视角追踪：玩家围绕角色移动时，系统持续更新呈现角度。拖动旋转，滚动缩放。' : 'This model represents viewpoint tracking in the future system: as the player moves, the rendered character view updates continuously. Drag to rotate and scroll to zoom.')}</p>
        </div>
        <div className="business-model-stage">
          <div className="concept-stage-bar">
            <span><i /> {zh ? '实时模型' : 'LIVE MODEL'}</span>
            <span>{zh ? '拖动旋转 / 滚动缩放' : 'DRAG TO ROTATE / SCROLL TO ZOOM'}</span>
          </div>
          <HoloScene mode={display ? 'display' : 'track'} />
          <div className="business-model-legend" aria-hidden="true">
            {(display
              ? (zh ? ['透明门板介质', '悬浮三维内容', '既有门禁结构'] : ['TRANSPARENT MEDIUM', 'FLOATING 3D CONTENT', 'EXISTING GATE STRUCTURE'])
              : (zh ? ['玩家位置', '视角轨道', '实时角色响应'] : ['PLAYER POSITION', 'VIEWPOINT ORBIT', 'LIVE CHARACTER RESPONSE'])
            ).map((item, index) => <span key={item}><b>0{index + 1}</b>{item}</span>)}
          </div>
        </div>
      </section>

      <section className="business-value">
        <header>
          <p>{display ? (zh ? '解决方案价值' : 'SOLUTION VALUE') : (zh ? '系统能力' : 'SYSTEM CAPABILITIES')}</p>
          <h2>{display ? (zh ? '一块透明表面，四种商业价值。' : 'One transparent surface. Four forms of value.') : (zh ? '四个环节，组成完整的空气交互。' : 'Four layers for a complete open-air interaction.')}</h2>
        </header>
        <div className="business-value-grid">
          {benefits.map((item) => (
            <article key={item.number}>
              <span>{item.number}</span>
              <h3>{item[language][0]}</h3>
              <p>{item[language][1]}</p>
            </article>
          ))}
        </div>
      </section>

      {!display && (
        <section className="game-blueprint">
          <header className="blueprint-head">
            <p>{zh ? '全息游戏系统 · 完整概念' : 'HOLOGRAPHIC GAME SYSTEM · FULL CONCEPT'}</p>
            <h2>{zh ? '单人 EGTS 视角追踪 × 生成式 AI 内容管线' : 'Single-player EGTS tracking × generative AI content pipeline'}</h2>
            <span>{zh ? '位置即输出 · 身体即手柄 · AI 原生硬件' : 'POSITION IS OUTPUT · BODY IS CONTROLLER · AI-NATIVE HARDWARE'}</span>
          </header>

          <div className="blueprint-section">
            <div className="blueprint-label"><span>01</span><p>{zh ? '系统运行流程' : 'SYSTEM FLOW'}</p></div>
            <div className="blueprint-grid blueprint-flow">
              {systemFlow.map((item) => <article key={item.number}><span>{item.number} / {item[language][0]}</span><h3>{item[language][1]}</h3><p>{item[language][2]}</p></article>)}
            </div>
          </div>

          <div className="blueprint-section">
            <div className="blueprint-label"><span>02</span><p>{zh ? '核心玩法机制' : 'CORE GAMEPLAY'}</p></div>
            <div className="blueprint-grid combat-grid">
              {combatMechanics.map((item) => <article key={item.number}><span>{item.number} / {item[language][0]}</span><h3>{item[language][1]}</h3><p>{item[language][2]}</p><small>{item[language][3]}</small></article>)}
            </div>
          </div>

          <div className="blueprint-section">
            <div className="blueprint-label"><span>03</span><p>{zh ? '四项工程要求' : 'ENGINEERING REQUIREMENTS'}</p></div>
            <div className="engineering-grid">
              {engineeringNotes.map((item) => <article key={item.number}><span>{item.number}</span><div><h3>{item[language][0]}</h3><p>{item[language][1]}</p></div></article>)}
            </div>
          </div>
        </section>
      )}

      {display ? (
        <>
          <section className="deployment-flow">
            <header>
              <p>{zh ? '部署方式' : 'HOW IT DEPLOYS'}</p>
              <h2>{zh ? '在既有入口上增加一层可编排的三维内容。' : 'Add a programmable 3D content layer to the entrance you already have.'}</h2>
            </header>
            <div>
              <article><span>01</span><h3>{zh ? '评估透明表面' : 'ASSESS THE SURFACE'}</h3><p>{zh ? '确认门禁尺寸、观看距离、光照与客流方向。' : 'Confirm gate dimensions, viewing distance, lighting and traffic direction.'}</p></article>
              <article><span>02</span><h3>{zh ? '低改造安装' : 'MINIMAL RETROFIT'}</h3><p>{zh ? '利用现有门禁或透明结构，减少对现场基础设施的改变。' : 'Use the existing gate or transparent structure and minimize changes to the site.'}</p></article>
              <article><span>03</span><h3>{zh ? '制作三维内容' : 'BUILD 3D CONTENT'}</h3><p>{zh ? '为产品、品牌与活动制作可循环播放的空间视觉。' : 'Produce loopable spatial visuals for products, brands and events.'}</p></article>
              <article><span>04</span><h3>{zh ? '排期与迭代' : 'SCHEDULE & ITERATE'}</h3><p>{zh ? '根据地点、时段与受众更新内容，并通过试点验证效果。' : 'Update content by location, time and audience, then validate results through a pilot.'}</p></article>
            </div>
          </section>
          <section className="pilot-section">
            <div>
              <p>{zh ? '示例回报框架 · 单通道' : 'ILLUSTRATIVE ROI FRAMEWORK · ONE LANE'}</p>
              <h2><span>500</span> × <span>30</span> = <em>15,000</em></h2>
              <div className="pilot-labels"><span>{zh ? '每日行人' : 'PEDESTRIANS / DAY'}</span><span>{zh ? '每月天数' : 'DAYS / MONTH'}</span><span>{zh ? '每月展示量' : 'MONTHLY IMPRESSIONS'}</span></div>
            </div>
            <p>{zh ? '这是提案中的示例计算，并非实际效果承诺。每个地点的客流、关注度、转化与媒体价值需要通过现场试点采集真实数据后确认。' : 'This is an illustrative calculation from the proposal, not a performance guarantee. Footfall, attention, conversion and media value should be validated with site-specific data in a live pilot.'}</p>
          </section>
        </>
      ) : (
        <section className="experience-labs">
          <header>
            <p>{zh ? '互动概念实验室' : 'INTERACTIVE CONCEPT LABS'}</p>
            <h2>{zh ? '进入两套实时模型，查看系统与玩法如何工作。' : 'Enter two live model sets to see how the system and gameplay work.'}</h2>
          </header>
          <div>
            <a href="/experience/system"><span>01 / {zh ? '系统体验' : 'SYSTEM EXPERIENCE'}</span><h3>{zh ? '感知、识别、生成、追踪' : 'Sense, identify, generate, track'}</h3><p>{zh ? '查看从玩家进入空间到系统持续渲染的四个阶段。' : 'Inspect the four stages from player entry to continuous spatial rendering.'}</p><b>{zh ? '进入实时模型' : 'OPEN LIVE MODELS'} ↗</b></a>
            <a href="/experience/gameplay"><span>02 / {zh ? '战斗体验' : 'COMBAT EXPERIENCE'}</span><h3>{zh ? '闪避、绕后、手势攻击' : 'Dodge, flank, gesture strike'}</h3><p>{zh ? '查看身体位置和动作如何成为游戏输入。' : 'See how body position and movement become game inputs.'}</p><b>{zh ? '进入实时模型' : 'OPEN LIVE MODELS'} ↗</b></a>
          </div>
        </section>
      )}

      <section className="business-contact">
        <p>{display ? (zh ? '需要把透明空间变成全息媒体？' : 'TURN A TRANSPARENT SPACE INTO HOLOGRAPHIC MEDIA?') : (zh ? '一起完成第一套空气全息游戏系统。' : 'HELP BUILD THE FIRST OPEN-AIR HOLOGRAPHIC GAME SYSTEM.')}</p>
        <h2>{zh ? '和我们聊聊。' : 'LET’S TALK.'}</h2>
        <div className="business-contact-addresses">
          <a href="mailto:clyde@vistrx.ai">clyde@vistrx.ai <span>↗</span></a>
          <a href="mailto:iwang@vistrx.ai">iwang@vistrx.ai <span>↗</span></a>
        </div>
      </section>

      <footer>
        <Brand />
        <span>{display ? (zh ? '有介质全息显示 · 已有业务' : 'MEDIUM-BASED DISPLAY · CURRENT BUSINESS') : (zh ? '无介质全息游戏 · 未来业务' : 'MEDIUM-FREE GAMING · FUTURE BUSINESS')}</span>
        <span>VISTRX.AI</span>
      </footer>
    </main>
  );
}
