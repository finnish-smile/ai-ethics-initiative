// Generated from the original Stewardship guidebook (Outline.dc.html) and kept
// identical to it: same markup, inline styles and class names. Values that
// change (classes, handlers, open/closed states) come from StewardshipGuide's
// renderVals(), passed in as V.
import { Fragment } from 'react'
import { asList, asset, interp, toStyle } from './util.js'
import VideoCarousel from './VideoCarousel.jsx'

// The Fellowship principle page (/principles/fellowship).
export default function FellowshipView({ V }) {
  return (
    <>
    <div className="view" data-screen-label="03 Fellowship" style={{ display: 'flex', alignItems: 'flex-start', position: 'relative' }}>
      <article className={`agency-fade-in ${V.agencyShownClass ?? ''}`} style={{ flex: '1', minWidth: '0', width: '100%', margin: '0', padding: '0', position: 'relative', zIndex: '1', boxSizing: 'border-box' }}>
        <div className={`agency-fade-in ${V.agencyShownClass ?? ''}`} style={{ position: 'absolute', left: '0', width: '100%', top: '0', bottom: '0', zIndex: '0', pointerEvents: 'none' }} />
        <div className="agency-step first" style={{ width: '100%', height: '100dvh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '40px max(32px, calc((100% - var(--title-box-width, 1800px))/2))', boxSizing: 'border-box', position: 'relative' }}>
          <div className="principles-back" style={{ width: 'auto', position: 'absolute', left: '20px', top: '20px', margin: '0', zIndex: '6' }}>
            <button id="fellowship-escape" onClick={V.onFellowshipEscape} className="agency-outline-btn" style={{ all: 'unset', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '15px', letterSpacing: '.08em', color: '#141414', padding: '9px 16px', border: '1px solid rgba(20,20,20,0.25)', borderRadius: '7px', background: 'rgba(20,20,20,0.04)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', transition: 'color .2s ease, border-color .2s ease, background .2s ease' }}>
              ←&nbsp;&nbsp;Back to Principles
            </button>
          </div>
          <div className="agency-stage" style={{ position: 'relative', flex: '0 0 auto', minHeight: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <div className="agency-pair">
              <div className="agency-painting-wrap">
                <div className="agency-painting-box">
                  <img src={asset('fellowship-catlin-council.jpg')} alt="A painting of Sioux chiefs gathered in council along a wooded shoreline" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 100%', display: 'block' }} />
                </div>
                <p style={{ margin: '14px 0 0', textAlign: 'left', fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '12px', letterSpacing: '.06em', color: 'rgba(20,20,20,0.72)', whiteSpace: 'nowrap', opacity: '0.25' }}>
                  George Catlin, Sioux Indian Council, Chiefs in Profound Deliberation, 1832–1837
                </p>
              </div>
              <div className={V.fellowshipScriptureClass}>
                <div className="agency-scripture-inner">
                  <div>
                    <p style={toStyle(`margin:0; font-size:${V.fellowshipVerseFontSize ?? ''}px; line-height:1.55; color:#141414; font-style:italic;`)}>
                      {interp(V.fellowshipVerseText)}
                    </p>
                    <p style={{ margin: '16px 0 0', fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '12px', letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(20,20,20,0.72)' }}>
                      {interp(V.fellowshipVerseRef)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="a-hero-text" onMouseLeave={V.onFellowshipHeroLeave} style={{ width: 'auto', maxWidth: '100%', alignSelf: 'center', textAlign: 'center', margin: '34px 0 0' }}>
            <p style={{ fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '13px', letterSpacing: '.2em', textTransform: 'uppercase', color: '#0047BA', margin: '0 0 18px' }}>
              Principle 03 of 05
            </p>
            <h1 style={{ fontFamily: "'Newsreader',Georgia,serif", fontSize: 'clamp(80px, 9.5vw, 115px)', fontWeight: '600', letterSpacing: '-0.02em', margin: '0 0 6px', color: '#141414', lineHeight: '1' }}>
              Fellowship
            </h1>
            <div className={V.fellowshipVerseBoxClass}>
              <p className="a-sub" style={{ fontSize: 'clamp(17px, 1.7vw, 26px)', lineHeight: '1.4', color: '#141414', fontStyle: 'italic', margin: '0' }}>I am because we are</p>
              <div className="a-verse-swap">
                <p style={{ margin: '0', fontSize: 'clamp(17px,1.35vw,21px)', lineHeight: '1.5', color: '#141414', fontStyle: 'italic' }}>
                  {interp(V.fellowshipVerseText)}
                </p>
                <p style={{ margin: '10px 0 0', fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '12px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#0047BA' }}>
                  {interp(V.fellowshipVerseRef)}
                </p>
              </div>
            </div>
            <div className="a-refs" style={{ display: 'flex', gap: '22px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={V.onFellowshipScriptureToggle} onMouseEnter={V.onFellowshipScriptureEnter} onMouseLeave={V.onFellowshipScriptureLeave} className="agency-ref-btn" style={{ all: 'unset', cursor: 'pointer', fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '13px', letterSpacing: '.08em', color: 'rgba(20,20,20,0.72)', borderBottom: '1px dotted rgba(20,20,20,0.72)', padding: '2px 0', transition: 'color .2s ease, border-color .2s ease' }}>
                Ubuntu Philosophy
              </button>
              <button onClick={V.onFellowship2ScriptureToggle} onMouseEnter={V.onFellowship2ScriptureEnter} onMouseLeave={V.onFellowship2ScriptureLeave} className="agency-ref-btn" style={{ all: 'unset', cursor: 'pointer', fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '13px', letterSpacing: '.08em', color: 'rgba(20,20,20,0.72)', borderBottom: '1px dotted rgba(20,20,20,0.72)', padding: '2px 0', transition: 'color .2s ease, border-color .2s ease' }}>
                Mosiah 18:8-9
              </button>
            </div>
          </div>
        </div>
        <div className="agency-body">
          <nav className={V.agencySpineClass} aria-label="Section progress">
            <div className="agency-rail-track">
              <div className="agency-rail-line" />
              <div className="agency-rail-glow" style={toStyle(`top:${V.agencyGlowTop ?? ''}px;`)} />
              {asList(V.agencySpineItems).map((__item, __i) =>
                ((V) => (
                  <Fragment key={__i}>
                    <button onClick={V.item?.onClick} className={`agency-rail-item ${V.item?.statusClass ?? ''}`}>
                      {" "}
                      <span className="agency-rail-dot" />
                      {" "}
                      <span className="agency-rail-label">
                        {interp(V.item?.label)}
                      </span>
                      {" "}
                    </button>
                  </Fragment>
                ))({ ...V, item: __item, $index: __i })
              )}
            </div>
          </nav>
          <div className="agency-content">
            <div className={V.agencyPrincipleClass} data-spine-key="principle" style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px max(64px, calc((100% - var(--principle-box-width, 900px))/2))', boxSizing: 'border-box' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                <div>
                  <h3 style={{ fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: 'clamp(20px, 1.7vw, 30px)', letterSpacing: '.14em', textTransform: 'uppercase', color: '#0047BA', margin: '0 0 12px' }}>
                    Principle
                  </h3>
                </div>
              </div>
              <div style={{ fontSize: 'clamp(24px, 2.2vw, var(--principle-font-size, 42px))', lineHeight: '1.6', color: '#141414', alignSelf: 'flex-start' }}>
                <p style={{ margin: '0 0 20px' }}>
                  Fellowship is determined by intentional relationships with others. These relationships are at the core of your student experiences
                  <sup>
                    <a href="#fn-fellowship-1" style={{ color: 'rgb(0,71,186)', textDecoration: 'none', fontSize: '0.6em' }}>1</a>
                  </sup>
                  and are one of the strongest predictors of a happy and healthy life
                  <sup>
                    <a href="#fn-fellowship-2" style={{ color: 'rgb(0,71,186)', textDecoration: 'none', fontSize: '0.6em' }}>2</a>
                  </sup>
                  . Technology, and now AI, can act as a frictionless supplement for human interactions
                  <sup>
                    <a href="#fn-fellowship-3" style={{ color: 'rgb(0,71,186)', textDecoration: 'none', fontSize: '0.6em' }}>3</a>
                  </sup>
                  ; it never judges or tires—but remember that it also never asks anything of you. People, who do judge and tire, can't compete with the ease of turning to that technology, but their needs will grow you and your needs will grow them
                  <sup>
                    <a href="#fn-fellowship-4" style={{ color: 'rgb(0,71,186)', textDecoration: 'none', fontSize: '0.6em' }}>4</a>
                  </sup>
                  . Be mindful of how you use AI and if your use of it is keeping you from strengthening your connections with those whom God has placed in your life.
                </p>
              </div>
              <div style={{ marginTop: '40px' }}>
                <button className="stew-fellowship-hv0" onClick={V.onFellowshipFootnotesToggle} style={{ all: 'unset', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '12px', letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(20,20,20,0.72)', padding: '9px 16px', border: '1px solid rgba(20,20,20,0.25)', borderRadius: '20px', background: 'rgba(20,20,20,0.04)', transition: 'background .2s ease, color .2s ease' }}>
                  Footnotes
                </button>
                {V.isFellowshipFootnotesOpen ? (
                  <>
                    <div style={{ marginTop: '16px', maxWidth: '680px', padding: '20px 24px', background: 'rgba(20,20,20,0.04)', border: '1px solid rgba(20,20,20,0.18)', borderRadius: '6px' }}>
                      <ol style={{ margin: '0', paddingLeft: '20px', fontSize: '15px', lineHeight: '1.7', color: '#141414' }}>
                        <li id="fn-fellowship-1">
                          Gerrit W. Gong, “Becoming BYU in an Age of Artificial Intelligence” (devotional, Brigham Young University, Provo, UT, August 2026), YouTube video,
                          {" "}
                          <a href="https://www.youtube.com/watch?v=s8oaxj8niTE&t=520s" target="_blank" rel="noopener" style={{ color: '#0047BA' }}>youtube.com/watch</a>
                          .
                        </li>
                        <li id="fn-fellowship-2">
                          Liz Mineo, “Good Genes Are Nice, but Joy Is Better,” Harvard Gazette, April 11, 2017,
                          {" "}
                          <a href="https://news.harvard.edu/gazette/story/2017/04/over-nearly-80-years-harvard-study-has-been-showing-how-to-live-a-healthy-and-happy-life/" target="_blank" rel="noopener" style={{ color: '#0047BA' }}>
                            news.harvard.edu/gazette
                          </a>
                          .
                        </li>
                        <li id="fn-fellowship-3">
                          Joseph Crawford, Kelly-Ann Allen, Bianca Pani, and Michael Cowling, “When Artificial Intelligence Substitutes Humans in Higher Education: The Cost of Loneliness, Student Success, and Retention,” Studies in Higher Education 49, no. 5 (2024): 883–897,
                          {" "}
                          <a href="https://doi.org/10.1080/03075079.2024.2326956" target="_blank" rel="noopener" style={{ color: '#0047BA' }}>doi.org/10.1080/03075079.2024.2326956</a>
                          .
                        </li>
                        <li id="fn-fellowship-4">
                          Mosiah 18:8–9.
                          {" "}
                          <a href="https://www.churchofjesuschrist.org/study/scriptures/bofm/mosiah/18?lang=eng&id=p8-p9#p8" target="_blank" rel="noopener" style={{ color: '#0047BA' }}>
                            churchofjesuschrist.org/study/scriptures
                          </a>
                          .
                        </li>
                      </ol>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
            <div className={V.agencyPauseClass} data-spine-key="pause" style={toStyle(`min-height:${V.agencyPauseHeight ?? ''}; display:flex; flex-direction:column; justify-content:center; padding:48px max(64px, calc((100% - var(--pause-box-width, 900px))/2)); box-sizing:border-box;`)}>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h3 style={{ fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: 'clamp(20px, 1.7vw, 30px)', letterSpacing: '.14em', textTransform: 'uppercase', color: '#0047BA', margin: '0 0 16px', opacity: '1' }}>
                  Pause
                </h3>
                <p style={{ fontFamily: "'Newsreader',Georgia,serif", fontSize: 'clamp(34px, 4.4vw, var(--pause-font-size, 76px))', lineHeight: '1.2', color: '#141414EB', margin: '0', fontWeight: '700' }}>
                  Will my AI use strengthen or weaken my relationships with others?
                </p>
                <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid rgba(20,20,20,0.12)', maxWidth: '640px' }}>
                  <p style={{ fontFamily: "'Newsreader',Georgia,serif", fontSize: '19px', lineHeight: '1.6', color: '#141414', margin: '0' }}>
                    Before moving forward, pause to reflect on how you use AI. Do you use it as a supplement for friend, family, teachers, or God?
                  </p>
                </div>
              </div>
            </div>
            <div className={V.agencyPracticeClass} data-spine-key="practice" style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px max(64px, calc((100% - var(--principle-box-width, 900px))/2))', boxSizing: 'border-box' }}>
              <div style={{ margin: '0' }}>
                <h3 style={{ fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: 'clamp(20px, 1.7vw, 30px)', letterSpacing: '.14em', textTransform: 'uppercase', color: '#0047BA', margin: '0 0 28px' }}>
                  Practice
                </h3>
                <p style={{ fontSize: 'var(--practice-font-size, 22px)', lineHeight: '1.6', color: '#141414', margin: '0 0 32px' }}>
                  What you take to a machine, take to a person. Sometimes, the best use is no use. Be mindful when to use and not use AI. Talk to friends, family, professors, mentors, or spend time by yourself to sit and contemplate decisions you need to make.
                </p>
                <p style={{ fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '13px', letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(20,20,20,0.72)', margin: '0 0 10px' }}>
                  Scenario
                </p>
                <p style={{ fontFamily: "'Newsreader',Georgia,serif", margin: '0 0 32px', fontSize: 'clamp(26px,2.4vw,36px)', fontWeight: '600', lineHeight: '1.2', color: '#141414', textWrap: 'pretty' }}>
                  You are going through something hard and need advice.
                </p>
                <div className="p-paths" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', alignItems: 'stretch' }}>
                  <div className="p-path" style={{ display: 'flex', flexDirection: 'column', gap: '18px', padding: '32px 34px', borderRadius: '16px', background: '#FFFFFF', border: '1px solid rgba(20,20,20,0.1)', borderTop: '4px solid #A5452F', boxShadow: '0 18px 40px -30px rgba(20,20,20,0.45)', minWidth: '0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#A5452F', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', lineHeight: '1', flexShrink: '0' }}>
                        ✕
                      </span>
                      <span style={{ fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '13px', fontWeight: '600', letterSpacing: '.16em', textTransform: 'uppercase', color: '#A5452F' }}>
                        Misuse
                      </span>
                    </div>
                    <p style={{ fontFamily: "'Newsreader',Georgia,serif", fontSize: 'clamp(22px,1.9vw,28px)', fontWeight: '600', fontStyle: 'italic', lineHeight: '1.3', color: '#141414', margin: '0', textWrap: 'pretty' }}>
                      “Just tell me what to do. I don’t want to bother anyone.”
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <span style={{ display: 'block', fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '16px', lineHeight: '1.45', color: '#333333', background: '#F5F6F8', borderRadius: '10px', padding: '10px 14px' }}>
                        I’m really struggling. What should I do?
                      </span>
                      <span style={{ display: 'block', fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '16px', lineHeight: '1.45', color: '#333333', background: '#F5F6F8', borderRadius: '10px', padding: '10px 14px' }}>
                        Talk me through this so I don’t have to tell anyone.
                      </span>
                      <span style={{ display: 'block', fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '16px', lineHeight: '1.45', color: '#333333', background: '#F5F6F8', borderRadius: '10px', padding: '10px 14px' }}>
                        Be the one I come to when things get hard.
                      </span>
                      <span style={{ display: 'block', fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '16px', lineHeight: '1.45', color: '#333333', background: '#F5F6F8', borderRadius: '10px', padding: '10px 14px' }}>
                        Write what I should say so I don’t have to explain myself.
                      </span>
                    </div>
                  </div>
                  <div className="p-path" style={{ display: 'flex', flexDirection: 'column', gap: '18px', padding: '32px 34px', borderRadius: '16px', background: '#FFFFFF', border: '1px solid rgba(20,20,20,0.1)', borderTop: '4px solid #2F6B48', boxShadow: '0 18px 40px -30px rgba(20,20,20,0.45)', minWidth: '0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#2F6B48', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', lineHeight: '1', flexShrink: '0' }}>
                        ✓
                      </span>
                      <span style={{ fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '13px', fontWeight: '600', letterSpacing: '.16em', textTransform: 'uppercase', color: '#2F6B48' }}>
                        Wise use
                      </span>
                    </div>
                    <p style={{ fontFamily: "'Newsreader',Georgia,serif", fontSize: 'clamp(22px,1.9vw,28px)', fontWeight: '600', fontStyle: 'italic', lineHeight: '1.3', color: '#141414', margin: '0', textWrap: 'pretty' }}>
                      “Help me find the right people to turn to.”
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <span style={{ display: 'block', fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '16px', lineHeight: '1.45', color: '#333333', background: '#F5F6F8', borderRadius: '10px', padding: '10px 14px' }}>
                        Who in my life might understand what I’m going through?
                      </span>
                      <span style={{ display: 'block', fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '16px', lineHeight: '1.45', color: '#333333', background: '#F5F6F8', borderRadius: '10px', padding: '10px 14px' }}>
                        Help me find the words to ask a friend for help.
                      </span>
                      <span style={{ display: 'block', fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '16px', lineHeight: '1.45', color: '#333333', background: '#F5F6F8', borderRadius: '10px', padding: '10px 14px' }}>
                        How do I bring this up with my family?
                      </span>
                      <span style={{ display: 'block', fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '16px', lineHeight: '1.45', color: '#333333', background: '#F5F6F8', borderRadius: '10px', padding: '10px 14px' }}>
                        What campus resources could support me right now?
                      </span>
                    </div>
                  </div>
                </div>
                {V.fellowshipPractice?.tab1Active ? (
                  <>
                    <p style={{ fontFamily: "'Newsreader',Georgia,serif", margin: '0 0 32px', fontSize: '30px', fontWeight: '600', color: '#141414' }}>Space to write</p>
                    <div style={{ display: 'flex', gap: '28px', alignItems: 'stretch', flexWrap: 'wrap' }}>
                      <div className="upractice-col" style={{ width: 'calc(50% - 14px)', flex: '0 0 auto', minWidth: '220px', padding: '28px 32px', borderRadius: '10px', background: 'rgba(20,20,20,0.04)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ width: '20px', height: '20px', borderRadius: '50%', border: '1.5px solid #C96A58', color: '#C96A58', boxShadow: '0 0 8px rgba(201,106,88,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', lineHeight: '1', flexShrink: '0' }}>
                            ✕
                          </span>
                          <span style={{ fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '13px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#C96A58' }}>
                            Misuse
                          </span>
                        </div>
                        <p style={{ fontFamily: "'Newsreader',Georgia,serif", fontSize: '27px', fontWeight: '600', fontStyle: 'italic', lineHeight: '1.35', color: '#141414', margin: '12px 0 0' }}>
                          Space to write
                        </p>
                        <span className="upractice-hint" style={{ display: 'block', marginTop: '14px', fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '12px', letterSpacing: '.08em', color: '#8C8C8C' }}>
                          Hover to see examples
                        </span>
                        <div className="upractice-reveal">
                          <ul style={{ margin: '0', paddingLeft: '18px', color: '#141414' }}>
                            <li style={{ fontSize: '18px' }}>Space to write…</li>
                          </ul>
                          <p style={{ margin: '20px 0 0', fontSize: '16px', lineHeight: '1.6', color: '#C96A58', fontStyle: 'italic' }}>
                            Using AI to build your case against someone can harden your heart before the conversation even starts.
                          </p>
                        </div>
                      </div>
                      <div className="upractice-col" style={{ width: 'calc(50% - 14px)', flex: '0 0 auto', minWidth: '220px', padding: '28px 32px', borderRadius: '10px', background: 'rgba(20,20,20,0.04)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ width: '20px', height: '20px', borderRadius: '50%', border: '1.5px solid #79A98A', color: '#79A98A', boxShadow: '0 0 8px rgba(121,169,138,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', lineHeight: '1', flexShrink: '0' }}>
                            ✓
                          </span>
                          <span style={{ fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '13px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#79A98A', whiteSpace: 'nowrap', flexShrink: '0' }}>
                            Wise use
                          </span>
                        </div>
                        <p style={{ fontFamily: "'Newsreader',Georgia,serif", fontSize: '27px', fontWeight: '600', fontStyle: 'italic', lineHeight: '1.35', color: '#141414', margin: '12px 0 0' }}>
                          Space to write
                          <br />
                        </p>
                        <span className="upractice-hint" style={{ display: 'block', marginTop: '14px', fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '12px', letterSpacing: '.08em', color: '#8C8C8C' }}>
                          Hover to see examples
                        </span>
                        <div className="upractice-reveal">
                          <ul style={{ margin: '0', paddingLeft: '18px', color: '#141414' }}>
                            <li style={{ fontSize: '18px' }}>Space to write…</li>
                          </ul>
                          <p style={{ margin: '20px 0 0', fontSize: '16px', lineHeight: '1.6', color: '#79A98A', fontStyle: 'italic' }}>
                            AI can help you prepare to listen and speak with clarity — not to win, but to understand.
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
                {V.fellowshipPractice?.tab2Active ? (
                  <>
                    <p style={{ fontFamily: "'Newsreader',Georgia,serif", margin: '0 0 32px', fontSize: '30px', fontWeight: '600', color: '#141414' }}>Space to write</p>
                    <div style={{ display: 'flex', gap: '28px', alignItems: 'stretch', flexWrap: 'wrap' }}>
                      <div className="upractice-col" style={{ width: 'calc(50% - 14px)', flex: '0 0 auto', minWidth: '220px', padding: '28px 32px', borderRadius: '10px', background: 'rgba(20,20,20,0.04)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ width: '20px', height: '20px', borderRadius: '50%', border: '1.5px solid #C96A58', color: '#C96A58', boxShadow: '0 0 8px rgba(201,106,88,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', lineHeight: '1', flexShrink: '0' }}>
                            ✕
                          </span>
                          <span style={{ fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '13px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#C96A58' }}>
                            Misuse
                          </span>
                        </div>
                        <p style={{ fontFamily: "'Newsreader',Georgia,serif", fontSize: '27px', fontWeight: '600', fontStyle: 'italic', lineHeight: '1.35', color: '#141414', margin: '12px 0 0' }}>
                          "Space to write…"
                        </p>
                        <span className="upractice-hint" style={{ display: 'block', marginTop: '14px', fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '12px', letterSpacing: '.08em', color: '#8C8C8C' }}>
                          Hover to see examples
                        </span>
                        <div className="upractice-reveal">
                          <ul style={{ margin: '0', paddingLeft: '18px', color: '#141414' }}>
                            <li style={{ fontSize: '18px' }}>Space to write…</li>
                          </ul>
                        </div>
                      </div>
                      <div className="upractice-col" style={{ width: 'calc(50% - 14px)', flex: '0 0 auto', minWidth: '220px', padding: '28px 32px', borderRadius: '10px', background: 'rgba(20,20,20,0.04)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ width: '20px', height: '20px', borderRadius: '50%', border: '1.5px solid #79A98A', color: '#79A98A', boxShadow: '0 0 8px rgba(121,169,138,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', lineHeight: '1', flexShrink: '0' }}>
                            ✓
                          </span>
                          <span style={{ fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '13px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#79A98A', whiteSpace: 'nowrap', flexShrink: '0' }}>
                            Wise use
                          </span>
                        </div>
                        <p style={{ fontFamily: "'Newsreader',Georgia,serif", fontSize: '27px', fontWeight: '600', fontStyle: 'italic', lineHeight: '1.35', color: '#141414', margin: '12px 0 0' }}>
                          "Space to write…"
                        </p>
                        <span className="upractice-hint" style={{ display: 'block', marginTop: '14px', fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '12px', letterSpacing: '.08em', color: '#8C8C8C' }}>
                          Hover to see examples
                        </span>
                        <div className="upractice-reveal">
                          <ul style={{ margin: '0', paddingLeft: '18px', color: '#141414' }}>
                            <li style={{ fontSize: '18px' }}>Space to write…</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
            <div className={V.agencyWatchClass} data-spine-key="watch" style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px max(64px, calc((100% - var(--principle-box-width, 900px))/2))', boxSizing: 'border-box' }}>
              <div style={{ margin: '0', position: 'relative' }}>
                <h3 style={{ fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '12px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#141414', margin: '0 0 16px' }}>
                  Watch &amp; explore
                </h3>
                <VideoCarousel videos={V.fellowshipVideos} />
                <nav className="principle-continue-nav" style={{ width: '100%', maxWidth: '1180px', margin: '96px auto 0', padding: '32px 24px', borderRadius: '14px', background: 'rgba(20,20,20,0.04)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', border: '1px solid rgba(20,20,20,0.18)', display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: '8px', boxSizing: 'border-box' }}>
                  <span style={{ gridColumn: '1/-1', fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '12px', letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(20,20,20,0.72)', margin: '0 0 8px' }}>
                    Continue with another principle
                  </span>
                  <button onClick={V.nav?.purpose} className="prow" style={{ all: 'unset', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '6px', padding: '18px 12px', borderRadius: '8px' }}>
                    <span className="pname" style={{ fontFamily: "'Newsreader',Georgia,serif", fontSize: '26px', fontWeight: '500', letterSpacing: '-0.02em', lineHeight: '1', color: '#141414' }}>
                      Agency
                    </span>
                    <span style={{ fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '14px', color: 'rgba(20,20,20,0.72)' }}>Am I handing my decisions over to AI?</span>
                  </button>
                  <button onClick={V.nav?.identity} className="prow" style={{ all: 'unset', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '6px', padding: '18px 12px', borderRadius: '8px' }}>
                    <span className="pname" style={{ fontFamily: "'Newsreader',Georgia,serif", fontSize: '26px', fontWeight: '500', letterSpacing: '-0.02em', lineHeight: '1', color: '#141414' }}>
                      Becoming
                    </span>
                    <span style={{ fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '14px', color: 'rgba(20,20,20,0.72)' }}>Who am I growing into with AI?</span>
                  </button>
                  <button onClick={V.nav?.relationships} className="prow" style={{ all: 'unset', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '6px', padding: '18px 12px', borderRadius: '8px', background: 'rgba(0,71,186,0.08)' }}>
                    <span className="pname" style={{ fontFamily: "'Newsreader',Georgia,serif", fontSize: '26px', fontWeight: '500', letterSpacing: '-0.02em', lineHeight: '1', color: '#0047BA' }}>
                      Fellowship
                    </span>
                    <span style={{ fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '14px', color: 'rgba(20,20,20,0.72)' }}>How does my AI use affect others?</span>
                  </button>
                  <button onClick={V.nav?.growth} className="prow" style={{ all: 'unset', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '6px', padding: '18px 12px', borderRadius: '8px' }}>
                    <span className="pname" style={{ fontFamily: "'Newsreader',Georgia,serif", fontSize: '26px', fontWeight: '500', letterSpacing: '-0.02em', lineHeight: '1', color: '#141414' }}>
                      Discernment
                    </span>
                    <span style={{ fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '14px', color: 'rgba(20,20,20,0.72)' }}>Can I trust what AI tells me?</span>
                  </button>
                  <button onClick={V.nav?.action} className="prow" style={{ all: 'unset', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '6px', padding: '18px 12px', borderRadius: '8px' }}>
                    <span className="pname" style={{ fontFamily: "'Newsreader',Georgia,serif", fontSize: '26px', fontWeight: '500', letterSpacing: '-0.02em', lineHeight: '1', color: '#141414' }}>
                      Integrity
                    </span>
                    <span style={{ fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '14px', color: 'rgba(20,20,20,0.72)' }}>
                      Am I the same, seen or unseen, with my AI use?
                    </span>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
    </>
  )
}
