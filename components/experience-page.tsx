'use client';

import { useState } from 'react';
import { HoloScene, type SceneMode } from './holo-scene';
import { SiteNav } from './site-nav';
import { useLanguage, type Language } from './use-language';

type Concept = {
  number: string;
  mode: SceneMode;
  en: { label: string; title: string; body: string; note: string };
  zh: { label: string; title: string; body: string; note: string };
};

const systemConcepts: Concept[] = [
  {
    number: '01', mode: 'sense',
    en: { label: 'SENSE', title: 'Detect the player in space', body: 'A camera array locates the player and establishes a live spatial coordinate before gameplay begins.', note: 'Concept focus: camera coverage, entry detection and spatial calibration.' },
    zh: { label: '感知', title: '检测进入空间的玩家', body: '摄像系统在游戏开始前定位玩家，并建立实时空间坐标。', note: '概念重点：摄像覆盖、入场检测与空间校准。' },
  },
  {
    number: '02', mode: 'identify',
    en: { label: 'IDENTIFY', title: 'Keep one stable player identity', body: 'Vision processing maintains a continuous lock on the player while separating intentional movement from background activity.', note: 'Concept focus: player identity, pose estimation and low-latency tracking.' },
    zh: { label: '识别', title: '持续锁定同一个玩家', body: '视觉处理持续锁定玩家，并将有意动作与背景活动区分开。', note: '概念重点：玩家身份、姿态估计与低延迟追踪。' },
  },
  {
    number: '03', mode: 'generate',
    en: { label: 'GENERATE', title: 'Prepare content for every angle', body: 'A game asset enters an AI-assisted 3D pipeline, producing a spatial character prepared for real-time rendering.', note: 'Concept focus: asset reconstruction, multi-view consistency and optimized runtime content.' },
    zh: { label: '生成', title: '为不同视角准备空间内容', body: '游戏资产进入 AI 辅助的 3D 管线，生成适合实时渲染的空间角色。', note: '概念重点：资产重建、多视角一致性与运行时优化。' },
  },
  {
    number: '04', mode: 'track',
    en: { label: 'TRACK', title: 'Render for the player’s viewpoint', body: 'As the player moves around the character, the rendered view changes so the hologram remains spatially convincing.', note: 'Concept focus: viewpoint tracking, perspective correction and stable visual output.' },
    zh: { label: '追踪', title: '根据玩家视角实时渲染', body: '玩家围绕角色移动时，渲染视角同步变化，使全息形象保持可信的空间关系。', note: '概念重点：视角追踪、透视校正与稳定视觉输出。' },
  },
];

const gameplayConcepts: Concept[] = [
  {
    number: '01', mode: 'dodge',
    en: { label: 'DODGE', title: 'A real step becomes a dodge', body: 'The boss telegraphs a directional attack. The player moves out of the tracked danger zone before impact.', note: 'Concept focus: readable warning, physical movement and immediate hit feedback.' },
    zh: { label: '闪避', title: '现实中的一步就是闪避', body: 'Boss 提前显示攻击方向，玩家需要在命中前走出被追踪的危险区域。', note: '概念重点：清晰预警、身体位移与即时命中反馈。' },
  },
  {
    number: '02', mode: 'flank',
    en: { label: 'FLANK', title: 'Walk around the boss to find its weak point', body: 'The boss turns toward the tracked player. Reaching its back opens a short damage window.', note: 'Concept focus: physical circling, limited boss rotation and positional strategy.' },
    zh: { label: '绕后', title: '绕到 Boss 身后寻找弱点', body: 'Boss 会转向被追踪的玩家。移动到其背后即可打开短暂的伤害窗口。', note: '概念重点：现实绕行、Boss 转向限制与位置策略。' },
  },
  {
    number: '03', mode: 'strike',
    en: { label: 'STRIKE', title: 'A deliberate gesture triggers the attack', body: 'The camera reads a clear hand movement and converts it into an in-game action with light, sound and impact feedback.', note: 'Concept focus: gesture recognition, low perceived latency and satisfying response.' },
    zh: { label: '攻击', title: '明确手势触发游戏招式', body: '摄像系统识别清晰的手部动作，并转换成带有声光与命中反馈的游戏招式。', note: '概念重点：手势识别、低感知延迟与明确反馈。' },
  },
];

const pageText = {
  system: {
    en: { eyebrow: 'EXPERIENCE 01 / SYSTEM', title: 'THE SPACE\nUNDERSTANDS YOU', body: 'Select a stage to inspect the live 3D concept. Drag to rotate and scroll to zoom.', next: 'NEXT: COMBAT EXPERIENCE', route: '/experience/gameplay' },
    zh: { eyebrow: '体验 01 / 系统', title: '让空间\n理解玩家', body: '点击阶段查看实时 3D 概念。拖动旋转，滚动缩放。', next: '下一个：战斗体验', route: '/experience/gameplay' },
  },
  gameplay: {
    en: { eyebrow: 'EXPERIENCE 02 / COMBAT', title: 'YOUR BODY\nIS THE INPUT', body: 'Select a mechanic to inspect the live 3D concept. Drag to rotate and scroll to zoom.', next: 'BACK TO SYSTEM EXPERIENCE', route: '/experience/system' },
    zh: { eyebrow: '体验 02 / 战斗', title: '你的身体\n就是输入', body: '点击玩法查看实时 3D 概念。拖动旋转，滚动缩放。', next: '返回：系统体验', route: '/experience/system' },
  },
};

export function ExperiencePage({ kind }: { kind: 'system' | 'gameplay' }) {
  const { language, setLanguage } = useLanguage();
  const concepts = kind === 'system' ? systemConcepts : gameplayConcepts;
  const [active, setActive] = useState(0);
  const content = pageText[kind][language];
  const concept = concepts[active];
  const copy = concept[language as Language];

  return (
    <main className="experience-page">
      <SiteNav language={language} onLanguageChange={setLanguage} />
      <header className="experience-page-hero">
        <a href="/#experience" className="back-link">← {language === 'zh' ? '返回全部体验' : 'ALL EXPERIENCES'}</a>
        <p>{content.eyebrow}</p>
        <h1>{content.title.split('\n').map((line) => <span key={line}>{line}</span>)}</h1>
        <div className="experience-page-intro">
          <p>{content.body}</p>
          <span>{language === 'zh' ? '实时 WebGL 概念模型' : 'LIVE WEBGL CONCEPT MODEL'}</span>
        </div>
      </header>

      <section className="concept-lab">
        <aside className="concept-nav" aria-label={language === 'zh' ? '概念阶段' : 'Concept stages'}>
          <p>{language === 'zh' ? '选择一个概念' : 'SELECT A CONCEPT'}</p>
          {concepts.map((item, index) => (
            <button type="button" className={index === active ? 'active' : ''} onClick={() => setActive(index)} key={item.number}>
              <span>{item.number}</span>
              <b>{item[language].label}</b>
              <i>↗</i>
            </button>
          ))}
        </aside>

        <div className="concept-stage">
          <div className="concept-stage-bar">
            <span><i /> {language === 'zh' ? '实时模型' : 'LIVE MODEL'}</span>
            <span>{language === 'zh' ? '拖动旋转 / 滚动缩放' : 'DRAG TO ROTATE / SCROLL TO ZOOM'}</span>
          </div>
          <HoloScene mode={concept.mode} />
        </div>

        <article className="concept-copy">
          <p>{concept.number} / {copy.label}</p>
          <h2>{copy.title}</h2>
          <div>
            <p>{copy.body}</p>
            <small>{copy.note}</small>
          </div>
        </article>
      </section>

      <a className="next-experience" href={content.route}>
        <span>{language === 'zh' ? '继续探索' : 'CONTINUE EXPLORING'}</span>
        <strong>{content.next}</strong>
        <b>↗</b>
      </a>
    </main>
  );
}
