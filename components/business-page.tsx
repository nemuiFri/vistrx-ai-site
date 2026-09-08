'use client';

import Link from 'next/link';
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

export function BusinessPage({ kind }: { kind: 'display' | 'gaming' }) {
  const { language, setLanguage } = useLanguage();
  const zh = language === 'zh';
  const display = kind === 'display';

  const benefits = display ? displayBenefits : gamingPrinciples;

  return (
    <main className={`business-page business-page-${kind}`}>
      <SiteNav language={language} onLanguageChange={setLanguage} />

      <header className="business-hero">
        <Link href="/#experience" className="back-link">← {zh ? '返回两项业务' : 'BACK TO TWO BUSINESS LINES'}</Link>
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
            <Link href="/experience/system"><span>01 / {zh ? '系统体验' : 'SYSTEM EXPERIENCE'}</span><h3>{zh ? '感知、识别、生成、追踪' : 'Sense, identify, generate, track'}</h3><p>{zh ? '查看从玩家进入空间到系统持续渲染的四个阶段。' : 'Inspect the four stages from player entry to continuous spatial rendering.'}</p><b>{zh ? '进入实时模型' : 'OPEN LIVE MODELS'} ↗</b></Link>
            <Link href="/experience/gameplay"><span>02 / {zh ? '战斗体验' : 'COMBAT EXPERIENCE'}</span><h3>{zh ? '闪避、绕后、手势攻击' : 'Dodge, flank, gesture strike'}</h3><p>{zh ? '查看身体位置和动作如何成为游戏输入。' : 'See how body position and movement become game inputs.'}</p><b>{zh ? '进入实时模型' : 'OPEN LIVE MODELS'} ↗</b></Link>
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
