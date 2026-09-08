'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Brand, SiteNav } from '@/components/site-nav';
import { useLanguage } from '@/components/use-language';

const capabilities = [
  {
    number: '01',
    en: { title: 'UA AD CREATIVE', body: 'High-volume game advertising videos in vertical, square and landscape formats, built for rapid performance testing.' },
    zh: { title: 'UA 买量视频', body: '制作竖屏、方形和横屏游戏广告素材，支持高频测试和批量稳定交付。' },
  },
  {
    number: '02',
    en: { title: 'CG GAME TRAILERS', body: 'Full 3D game trailers delivered from storyboard and visual development through animation, rendering and compositing.' },
    zh: { title: '游戏 CG 宣传片', body: '从分镜与视觉开发到动画、渲染和合成，完成全三维游戏宣传片制作。' },
  },
  {
    number: '03',
    en: { title: 'UE5 ANIMATION', body: 'A real-time Unreal Engine 5 pipeline for high-quality game animation with faster creative iteration.' },
    zh: { title: 'UE5 引擎动画', body: '使用虚幻引擎 5 实时渲染管线，更快迭代高质量游戏动画内容。' },
  },
  {
    number: '04',
    en: { title: 'PLAYABLE ADS', body: 'Interactive HTML5 experiences that let players understand and try a core mechanic before downloading the game.' },
    zh: { title: '游戏试玩开发', body: '开发 HTML5 可交互体验，让玩家在下载前直接理解并试玩核心玩法。' },
  },
  {
    number: '05',
    en: { title: 'AI-POWERED CREATIVE', body: 'AI-assisted production for scalable live-action and animated content across different visual styles.' },
    zh: { title: 'AI 原生素材', body: '以 AI 辅助真人和动画内容生产，适配多种视觉风格与批量交付需求。' },
  },
];

const teamDisciplines = [
  { en: 'Creative direction & storyboards', zh: '创意策划与分镜设计' },
  { en: '3D art & character animation', zh: '三维美术与角色动画' },
  { en: 'Lighting, effects & compositing', zh: '灯光、特效与合成' },
  { en: 'UE5 real-time production', zh: 'UE5 实时制作' },
  { en: 'AI-native content production', zh: 'AI 原生内容生产' },
  { en: 'Playable & interaction engineering', zh: '试玩与交互开发' },
  { en: 'Production management & delivery', zh: '制片管理与全球交付' },
];

const partners = [
  {
    en: ['GAME STUDIOS & IP', 'Bring a character, world or boss. Together we can build the first spatial playable encounter.'],
    zh: ['游戏工作室与 IP', '带来角色、世界观或 Boss，与我们共同制作首个空间化可玩体验。'],
  },
  {
    en: ['HOLOGRAPHIC HARDWARE', 'Develop the projection, optical path, tracking coverage and dependable physical installation.'],
    zh: ['全息显示与硬件', '共同研发投影、光路、追踪覆盖和可靠的实体安装方案。'],
  },
  {
    en: ['AI & SPATIAL COMPUTING', 'Advance player tracking, gesture recognition, viewpoint rendering and the 3D content pipeline.'],
    zh: ['AI 与空间计算', '推进玩家追踪、手势识别、视角渲染和三维内容管线。'],
  },
  {
    en: ['VENUES & COMMERCIAL', 'Test the experience with real players in exhibitions, entertainment spaces and live activations.'],
    zh: ['场地与商业合作', '在展览、娱乐空间和现场活动中与真实玩家验证体验。'],
  },
];

export default function Home() {
  const { language, setLanguage } = useLanguage();
  const zh = language === 'zh';

  return (
    <main>
      <SiteNav language={language} onLanguageChange={setLanguage} />

      <section className="logo-landing" id="top" aria-label="VISTRX AI">
        <div className="logo-crop">
          <Image src="/media/vistrx-logo.jpg" alt="VISTRX AI" width={2900} height={1700} priority sizes="88vw" />
        </div>
        <a className="logo-scroll" href="#experience">
          <span>{zh ? '探索两项业务' : 'EXPLORE TWO DIRECTIONS'}</span>
          <i aria-hidden="true">↓</i>
        </a>
      </section>

      <section className="business-split" id="experience" aria-label={zh ? '两项业务' : 'Two business directions'}>
        <Link className="split-side split-holography" href="/business/display">
          {/* Add /public/video/holography.mp4 to replace the gradient background. */}
          <video className="split-video" autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
            <source src="/video/holography.mp4" type="video/mp4" />
          </video>
          <span className="split-shade" aria-hidden="true" />
          <div className="split-copy">
            <p>01 / {zh ? '现有业务' : 'CURRENT BUSINESS'}</p>
            <h1>{zh ? '全息显示' : 'HOLOGRAPHY'}</h1>
            <h2>{zh ? '有介质商业全息方案' : 'MEDIUM-BASED COMMERCIAL DISPLAY'}</h2>
            <span>{zh ? '进入业务详情' : 'ENTER BUSINESS'} <b>↗</b></span>
          </div>
        </Link>
        <Link className="split-side split-gaming" href="/business/gaming">
          {/* Add /public/video/holography-game.mp4 to replace the gradient background. */}
          <video className="split-video" autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
            <source src="/video/holography-game.mp4" type="video/mp4" />
          </video>
          <span className="split-shade" aria-hidden="true" />
          <div className="split-copy">
            <p>02 / {zh ? '未来体验' : 'FUTURE EXPERIENCE'}</p>
            <h1>{zh ? '全息游戏' : 'HOLOGRAPHY + GAME'}</h1>
            <h2>{zh ? '无介质空气交互游戏' : 'MEDIUM-FREE OPEN-AIR GAMING'}</h2>
            <span>{zh ? '进入体验详情' : 'ENTER EXPERIENCE'} <b>↗</b></span>
          </div>
        </Link>
      </section>

      <section className="about" id="about">
        <div className="section-index">01 / {zh ? '关于我们' : 'ABOUT US'}</div>
        <div className="about-head">
          <h2>{zh ? <>完整团队<br />完整管线</> : <>ONE TEAM.<br />FULL PIPELINE.</>}</h2>
          <div className="about-copy">
            <p>{zh ? 'VISTRX AI 由芒狗动画团队发起。芒狗动画是一家位于天津的游戏视觉制作公司，拥有 18 年动画与 CG 制作积淀，服务全球游戏客户。' : 'VISTRX AI is initiated by MDOG Animation, a Tianjin-based game visual production studio with 18 years of animation and CG experience serving global game clients.'}</p>
            <p>{zh ? '我们的完整团队覆盖创意、三维制作、实时引擎、AI 内容、交互开发和制片交付。现在，我们把这套能力用于两项业务：可落地的有介质全息显示，以及面向未来的无介质全息游戏。' : 'Our complete team covers creative development, 3D production, real-time engines, AI content, interaction engineering and delivery. We now apply that pipeline to two businesses: deployable medium-based holographic displays and next-generation medium-free holographic gaming.'}</p>
          </div>
        </div>

        <div className="team-band">
          <div className="team-stat"><strong>18</strong><span>{zh ? '年动画与 CG 制作经验' : 'YEARS IN ANIMATION & CG PRODUCTION'}</span></div>
          <div className="team-summary">
            <p>{zh ? '一支完整的内部制作团队' : 'A COMPLETE IN-HOUSE PRODUCTION TEAM'}</p>
            <div>{teamDisciplines.map((item, index) => <span key={item.en}><b>0{index + 1}</b>{item[language]}</span>)}</div>
          </div>
        </div>

        <header className="capability-head">
          <p>{zh ? '五大能力' : 'FIVE CORE CAPABILITIES'}</p>
          <h3>{zh ? '覆盖游戏内容生产全链路' : 'GAME CONTENT FROM FIRST IDEA TO FINAL DELIVERY'}</h3>
        </header>
        <div className="capability-list">
          {capabilities.map((item) => (
            <article key={item.number}>
              <span>{item.number}</span>
              <h4>{item[language].title}</h4>
              <p>{item[language].body}</p>
              <i aria-hidden="true">↗</i>
            </article>
          ))}
        </div>
      </section>

      <section className="mission" id="mission">
        <div className="section-index">03 / {zh ? '使命' : 'MISSION'}</div>
        <div className="mission-title">
          <p>{zh ? '我们的目标' : 'OUR DIRECTION'}</p>
          <h2>{zh ? <>让游戏真正<br />出现在<em>空气中</em></> : <>HOLOGRAPHIC GAMES<br />IN <em>OPEN AIR.</em></>}</h2>
        </div>
        <div className="mission-vision">
          <p>{zh ? '我们的使命是做出完整的无介质全息投影系统。不依赖屏幕、幕布、玻璃箱、雾幕或可穿戴显示，让可交互的三维游戏角色直接呈现在空气中。玩家通过自己的位置、观察角度和动作与游戏互动。' : 'Our mission is to create a complete holographic projection system without a visible medium. No screen, projection surface, glass enclosure, mist curtain or wearable display. Interactive 3D game characters appear directly in open air and respond to the player.'}</p>
          <div className="mission-principles">
            <span>{zh ? '无屏幕' : 'NO SCREEN'}</span>
            <span>{zh ? '无可见载体' : 'NO VISIBLE MEDIUM'}</span>
            <span>{zh ? '无穿戴设备' : 'NO WEARABLE'}</span>
            <span>{zh ? '空气中交互' : 'OPEN-AIR INTERACTION'}</span>
          </div>
        </div>
        <div className="mission-grid mission-roadmap">
          <p className="mission-statement">{zh ? '我们已经具备游戏内容、CG、UE5、AI 原生制作和互动概念设计能力。下一步需要与全息显示、空间计算和场地伙伴一起，把这些能力连接成可以公开体验的完整系统。' : 'We already have game content, CG, UE5, AI production and interactive concept capabilities. The next step is to connect them with holographic display, spatial computing and venue partners in a complete public prototype.'}</p>
          <div className="today-list">
            <p>{zh ? '项目进度' : 'PROJECT STATUS'}</p>
            <div><span>01</span><b>{zh ? '核心游戏体验与战斗概念' : 'Core game experience and combat concept'}</b><i>{zh ? '已完成' : 'READY'}</i></div>
            <div><span>02</span><b>{zh ? 'CG、UE5 与 AI 内容管线' : 'CG, UE5 and AI content pipeline'}</b><i>{zh ? '已具备' : 'READY'}</i></div>
            <div><span>03</span><b>{zh ? '空间追踪与实时交互原型' : 'Spatial tracking and real-time interaction prototype'}</b><i>{zh ? '验证中' : 'VALIDATING'}</i></div>
            <div><span>04</span><b>{zh ? '无介质全息显示系统' : 'Open-air holographic display system'}</b><i>{zh ? '寻求合作' : 'PARTNERING'}</i></div>
          </div>
        </div>
      </section>

      <section className="collaborate" id="collaborate">
        <header>
          <div className="section-index">04 / {zh ? '合作' : 'COLLABORATE'}</div>
          <h2>{zh ? <>一起完成<br />第一个可玩的<br />全息世界</> : <>BUILD THE FIRST<br />PLAYABLE<br />HOLOGRAPHIC WORLD.</>}</h2>
        </header>
        <div className="partner-list">
          {partners.map((item, index) => (
            <article key={item.en[0]}>
              <span>0{index + 1}</span>
              <h3>{item[language][0]}</h3>
              <p>{item[language][1]}</p>
              <b aria-hidden="true">↗</b>
            </article>
          ))}
        </div>
      </section>

      <section className="closing">
        <div className="closing-orbit" aria-hidden="true"><i /><i /><i /></div>
        <p>{zh ? '创始合作伙伴招募中' : 'FOUNDING PARTNERS · OPEN'}</p>
        <h2>{zh ? <>一起把它<br />变成现实</> : <>LET&apos;S MAKE IT<br />REAL.</>}</h2>
        <div className="contact-addresses">
          <a className="contact-link" href="mailto:clyde@vistrx.ai">clyde@vistrx.ai <span>↗</span></a>
          <a className="contact-link" href="mailto:iwang@vistrx.ai">iwang@vistrx.ai <span>↗</span></a>
        </div>
        <small>{zh ? '商务与合作咨询' : 'BUSINESS & PARTNERSHIP CONTACTS'}</small>
      </section>

      <footer>
        <Brand />
        <span>{zh ? '全息显示与空间游戏 · 2026' : 'HOLOGRAPHIC DISPLAY & SPATIAL GAMING · 2026'}</span>
        <span>{zh ? '内容伙伴 · 芒狗动画' : 'CONTENT PARTNER · MDOG ANIMATION'}</span>
      </footer>
    </main>
  );
}
