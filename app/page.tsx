'use client';

import { useEffect, useState } from 'react';
import { HoloScene } from '@/components/holo-scene';
import { IntroScene } from '@/components/intro-scene';
import { Brand, SiteNav } from '@/components/site-nav';
import { useLanguage, type Language } from '@/components/use-language';

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

function IntroGate({ language }: { language: Language }) {
  const [visible, setVisible] = useState(true);
  const zh = language === 'zh';

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 3200);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="intro-gate" aria-label={zh ? 'VISTRX AI 进入动画' : 'VISTRX AI entry sequence'}>
      <button className="intro-skip" type="button" onClick={() => setVisible(false)}>{zh ? '跳过' : 'SKIP'}</button>
      <p className="intro-status"><span>01</span>{zh ? '检测到玩家' : 'PLAYER DETECTED'}</p>
      <IntroScene />
      <div className="intro-phase" aria-hidden="true">
        <span>{zh ? '扫描玩家' : 'SCAN PLAYER'}</span>
        <span>{zh ? '生成界面' : 'PROJECT INTERFACE'}</span>
        <span>{zh ? '触控确认' : 'TOUCH CONFIRMED'}</span>
      </div>
    </div>
  );
}

export default function Home() {
  const { language, setLanguage } = useLanguage();
  const zh = language === 'zh';

  return (
    <main>
      <IntroGate language={language} />
      <SiteNav language={language} onLanguageChange={setLanguage} />

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <p className="micro-label">{zh ? '空间游戏 · 无需穿戴设备' : 'SPATIAL GAMEPLAY · WITHOUT WEARABLES'}</p>
          <h1>{zh ? <>走进<br /><em>游戏。</em></> : <>STEP INTO<br />THE <em>GAME.</em></>}</h1>
          <p className="hero-lede">{zh ? '一个面向游戏行业的全息互动项目，让身体位置、观看视角和动作成为控制方式。' : 'A holographic interaction project for the game industry, where body position, viewpoint and movement become the controls.'}</p>
          <a className="line-link" href="#experience">{zh ? '探索体验' : 'EXPLORE THE EXPERIENCE'} <span>↓</span></a>
        </div>
        <div className="hero-figure" aria-hidden="true">
          <div className="hero-person" />
          <div className="hero-ring ring-one" />
          <div className="hero-ring ring-two" />
          <div className="hero-cross cross-x" />
          <div className="hero-cross cross-y" />
          <span className="hero-tag tag-view">{zh ? '视角 / 锁定' : 'VIEWPOINT / LOCKED'}</span>
          <span className="hero-tag tag-body">{zh ? '身体 / 输入' : 'BODY / INPUT'}</span>
        </div>
        <div className="hero-foot"><span>CONCEPT 001 · 2026</span><span>{zh ? '向下滚动' : 'SCROLL TO ENTER'}</span></div>
      </section>

      <section className="about" id="about">
        <div className="section-index">01 / {zh ? '关于我们' : 'ABOUT US'}</div>
        <div className="about-head">
          <h2>{zh ? <>完整团队<br />完整管线</> : <>ONE TEAM.<br />FULL PIPELINE.</>}</h2>
          <div className="about-copy">
            <p>{zh ? 'VISTRX AI 由芒狗动画团队发起。芒狗动画是一家位于天津的游戏视觉制作公司，拥有 18 年动画与 CG 制作积淀，服务全球游戏客户。' : 'VISTRX AI is initiated by MDOG Animation, a Tianjin-based game visual production studio with 18 years of animation and CG experience serving global game clients.'}</p>
            <p>{zh ? '我们的完整制作团队覆盖前期创意、三维制作、实时引擎、AI 内容、交互开发和制片交付。这个项目把现有内容能力延伸到空间计算和全息游戏。' : 'Our complete production team covers creative development, 3D production, real-time engines, AI content, interaction engineering and delivery. This project extends that foundation into spatial computing and holographic games.'}</p>
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

      <section className="experience" id="experience">
        <header className="experience-head">
          <div className="section-index">02 / {zh ? '体验' : 'EXPERIENCE'}</div>
          <h2>{zh ? <>两个体验<br />实时 3D 概念</> : <>TWO EXPERIENCES.<br />LIVE 3D CONCEPTS.</>}</h2>
          <p>{zh ? '进入两个独立体验页，点击每个步骤查看对应的实时三维模型。模型可旋转、缩放，并展示概念动作。' : 'Enter two dedicated experience pages. Select each stage to inspect a live 3D model that rotates, zooms and demonstrates the concept in motion.'}</p>
        </header>
        <div className="experience-gates">
          <a className="experience-gate" href="/experience/system">
            <div className="gate-model"><HoloScene mode="track" interactive={false} /></div>
            <span>01 / {zh ? '系统体验' : 'SYSTEM EXPERIENCE'}</span>
            <h3>{zh ? '从玩家出现到系统响应' : 'From presence to response'}</h3>
            <p>{zh ? '查看感知、身份识别、空间内容生成和视角追踪四个实时 3D 概念。' : 'Explore four real-time 3D concepts for sensing, identity, spatial content generation and viewpoint tracking.'}</p>
            <b>{zh ? '进入系统体验' : 'OPEN SYSTEM EXPERIENCE'} ↗</b>
          </a>
          <a className="experience-gate" href="/experience/gameplay">
            <div className="gate-model"><HoloScene mode="flank" interactive={false} /></div>
            <span>02 / {zh ? '战斗体验' : 'COMBAT EXPERIENCE'}</span>
            <h3>{zh ? '身体动作成为游戏输入' : 'Your body becomes input'}</h3>
            <p>{zh ? '查看闪避、绕后和手势攻击三个实时 3D 战斗玩法概念。' : 'Enter three real-time 3D combat concepts for dodging, flanking and gesture-driven attacks.'}</p>
            <b>{zh ? '进入战斗体验' : 'OPEN COMBAT EXPERIENCE'} ↗</b>
          </a>
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
        <button type="button">{zh ? '开始沟通' : 'START A CONVERSATION'} <span>↗</span></button>
        <small>{zh ? '联系方式待确认' : 'CONTACT CHANNEL · TO BE CONFIRMED'}</small>
      </section>

      <footer>
        <Brand />
        <span>{zh ? '全息游戏 · 概念 2026' : 'HOLOGRAPHIC GAMING · CONCEPT 2026'}</span>
        <span>{zh ? '内容伙伴 · 芒狗动画' : 'CONTENT PARTNER · MDOG ANIMATION'}</span>
      </footer>
    </main>
  );
}
