// Generated from the original Stewardship guidebook (Outline.dc.html) and kept
// identical to it: same markup, inline styles and class names. Values that
// change (classes, handlers, open/closed states) come from StewardshipGuide's
// renderVals(), passed in as V.
import { Fragment } from 'react'
import { asList, asset, interp, toStyle } from './util.js'
import VideoCarousel from './VideoCarousel.jsx'

// The Agency principle page (/principles/agency).
export default function AgencyView({ V }) {
  return (
    <>
    <div className="view" data-screen-label="01 Agency" style={{ display: 'flex', alignItems: 'flex-start', position: 'relative' }}>
      <article className={`agency-fade-in ${V.agencyShownClass ?? ''}`} style={{ flex: '1', minWidth: '0', width: '100%', margin: '0', padding: '0', position: 'relative', zIndex: '1', boxSizing: 'border-box' }}>
        <div className={`agency-fade-in ${V.agencyShownClass ?? ''}`} style={{ position: 'absolute', left: '0', width: '100%', top: '0', bottom: '0', zIndex: '0', pointerEvents: 'none' }} />
        <div id="agency-prehero-nav" style={{ width: '100%', padding: '56px max(32px, calc((100% - 1180px)/2))', boxSizing: 'border-box', position: 'relative' }}>
          <nav className="principle-continue-nav" style={{ width: '100%', maxWidth: '1180px', margin: '0 auto', padding: '32px 24px', borderRadius: '14px', background: 'rgba(20,20,20,0.04)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', border: '1px solid rgba(20,20,20,0.18)', display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: '8px', boxSizing: 'border-box' }}>
            <span style={{ gridColumn: '1/-1', fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '12px', letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(20,20,20,0.72)', margin: '0 0 8px' }}>
              Jump to another principle
            </span>
            <button onClick={V.nav?.purpose} className="prow" style={{ all: 'unset', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '6px', padding: '18px 12px', borderRadius: '8px', background: 'rgba(0,71,186,0.08)' }}>
              <span className="pname" style={{ fontFamily: "'Newsreader',Georgia,serif", fontSize: '26px', fontWeight: '500', letterSpacing: '-0.02em', lineHeight: '1', color: '#0047BA' }}>
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
            <button onClick={V.nav?.relationships} className="prow" style={{ all: 'unset', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '6px', padding: '18px 12px', borderRadius: '8px' }}>
              <span className="pname" style={{ fontFamily: "'Newsreader',Georgia,serif", fontSize: '26px', fontWeight: '500', letterSpacing: '-0.02em', lineHeight: '1', color: '#141414' }}>
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
        <div className="agency-step first" style={{ width: '100%', height: '100dvh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '40px max(32px, calc((100% - var(--title-box-width, 1800px))/2))', boxSizing: 'border-box', position: 'relative' }}>
          <div className="principles-back" style={{ width: 'auto', position: 'absolute', left: '20px', top: '20px', margin: '0', zIndex: '6' }}>
            <button id="agency-escape" onClick={V.onAgencyEscape} className="agency-outline-btn" style={{ all: 'unset', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '18px', letterSpacing: '.08em', color: '#141414', padding: '14px 24px', border: '1px solid rgba(20,20,20,0.3)', borderRadius: '9px', background: 'transparent', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', transition: 'color .2s ease, border-color .2s ease, background .2s ease' }}>
              ←&nbsp;&nbsp;Back to Principles
            </button>
          </div>
          <div className="agency-stage" style={{ position: 'relative', flex: '0 0 auto', minHeight: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <div className="agency-pair" style={{ flexShrink: '0' }}>
              <div className="agency-painting-wrap" style={{ animation: 'fadeUp 1.3s ease .3s both', width: '620px', flex: 'none' }}>
                <div className="agency-painting-box" style={{ width: '620px', height: '412px', position: 'relative' }}>
                  <img src={asset('agency-dixon-hiker.png')} alt="A painting of a hiker pausing at a fork in a fenced path" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 22%', display: 'block' }} />
                </div>
                <p style={{ margin: '14px 0 0', textAlign: 'left', fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '10px', letterSpacing: '.06em', color: '#141414', whiteSpace: 'nowrap', opacity: '0.25' }}>
                  Maynard Dixon, No Place to Go, 1935
                </p>
              </div>
              <div className={V.agencyScriptureClass}>
                <div className="agency-scripture-inner">
                  <div>
                    <p style={{ margin: '0', fontSize: 'clamp(19px,2vw,27px)', lineHeight: '1.55', color: '#FFFFFF', fontStyle: 'italic', textShadow: '0 1px 6px rgba(20,17,12,0.6)' }}>
                      {interp(V.agencyVerseText)}
                    </p>
                    <p style={{ margin: '16px 0 0', fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '12px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#FFFFFF', textShadow: '0 1px 6px rgba(20,17,12,0.6)' }}>
                      {interp(V.agencyVerseRef)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="a-hero-text" onMouseLeave={V.onAgencyHeroLeave} style={{ width: 'min(1100px, 92vw)', maxWidth: '100%', alignSelf: 'center', textAlign: 'center', margin: '18px 0 0' }}>
            <p style={{ fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '13px', letterSpacing: '.2em', textTransform: 'uppercase', color: '#0047BA', margin: '0 0 18px' }}>
              Principle 01 of 05
            </p>
            <h1 style={{ fontFamily: "'Newsreader',Georgia,serif", fontSize: 'clamp(70px, 9.5vw, 100px)', fontWeight: '600', letterSpacing: '-0.02em', margin: '0 0 6px', color: '#141414', lineHeight: '1', textAlign: 'center' }}>
              Agency
            </h1>
            <div className={V.agencyVerseBoxClass}>
              <p className="a-sub" style={{ fontSize: 'clamp(17px, 1.7vw, 26px)', lineHeight: '1.4', color: '#141414', fontStyle: 'italic', margin: '0' }}>
                You are free to choose
              </p>
              <div className="a-verse-swap">
                <p style={{ margin: '0', fontSize: 'clamp(17px,1.35vw,21px)', lineHeight: '1.5', color: '#141414', fontStyle: 'italic' }}>
                  {interp(V.agencyVerseText)}
                </p>
                <p style={{ margin: '10px 0 0', fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '12px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#0047BA' }}>
                  {interp(V.agencyVerseRef)}
                </p>
              </div>
            </div>
            <div className="a-refs" style={{ display: 'flex', gap: '22px', justifyContent: 'center' }}>
              <button onClick={V.onAgencyScriptureToggle} onMouseEnter={V.onAgencyScriptureEnter} onMouseLeave={V.onAgencyScriptureLeave} className="agency-ref-btn" style={{ all: 'unset', cursor: 'pointer', fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '13px', letterSpacing: '.08em', color: '#141414', borderBottom: '1px dotted rgba(20,20,20,0.72)', padding: '2px 0', transition: 'color .2s ease, border-color .2s ease' }}>
                2 Nephi 2:26
              </button>
              <button onClick={V.onAgency2ScriptureToggle} onMouseEnter={V.onAgency2ScriptureEnter} onMouseLeave={V.onAgency2ScriptureLeave} className="agency-ref-btn" style={{ all: 'unset', cursor: 'pointer', fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '13px', letterSpacing: '.08em', color: '#141414', borderBottom: '1px dotted rgba(20,20,20,0.72)', padding: '2px 0', transition: 'color .2s ease, border-color .2s ease' }}>
                D&amp;C 104:17
              </button>
            </div>
          </div>
        </div>
        <div className="agency-body" style={{ position: 'relative' }}>
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
          <div className="agency-content" style={{ position: 'relative', zIndex: '1' }}>
            <div className={V.agencyPrincipleClass} data-spine-key="principle" style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px max(64px, calc((100% - var(--principle-box-width, 900px))/2))', boxSizing: 'border-box' }}>
              <h3 style={{ fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: 'clamp(20px, 1.7vw, 30px)', letterSpacing: '.14em', textTransform: 'uppercase', color: '#0047BA', margin: '0 0 16px' }}>
                Principle
              </h3>
              <p style={{ fontFamily: "'Newsreader',Georgia,serif", fontSize: 'clamp(24px, 2.5vw, var(--principle-font-size, 42px))', lineHeight: '1.6', color: '#141414', margin: '0', maxWidth: 'min(1006px, 100%)' }}>
                Agency is the God-given gift to choose for yourself
                <sup>
                  <a href="#fn-agency-1" style={{ color: '#0047BA', textDecoration: 'none', fontSize: '0.6em' }}>1</a>
                </sup>
                {" "}
                how to act and what to believe. AI can easily “diminish and suffocate [this] moral agency”
                <sup>
                  <a href="#fn-agency-2" style={{ color: '#0047BA', textDecoration: 'none', fontSize: '0.6em' }}>2</a>
                </sup>
                &nbsp;when you allow it to make decisions or form opinions for you. Letting AI inform you is wise
                <sup>
                  <a href="#fn-agency-3" style={{ color: '#0047BA', textDecoration: 'none', fontSize: '0.6em' }}>3</a>
                </sup>
                . Letting it take the reins in your life is not. You are an agent to act and not to be acted upon
                <sup>
                  <a href="#fn-agency-4" style={{ color: '#0047BA', textDecoration: 'none', fontSize: '0.6em' }}>4</a>
                </sup>
                —not by any other person or technology. Cherish and protect your opportunities to use this gift.&nbsp;
              </p>
              <div style={{ marginTop: '16px', maxWidth: 'min(1006px, 100%)' }}>
                <button className="stew-agency-hv0" onClick={V.onAgencyFootnotesToggle} style={{ all: 'unset', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '12px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#141414', padding: '9px 16px', border: '1px solid rgba(20,20,20,0.25)', borderRadius: '20px', background: 'rgba(20,20,20,0.04)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', transition: 'background .2s ease, color .2s ease' }}>
                  Footnotes
                </button>
                {V.isAgencyFootnotesOpen ? (
                  <>
                    <div style={{ marginTop: '16px', maxWidth: '680px', padding: '20px 24px', background: 'rgba(20,20,20,0.04)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', border: '1px solid rgba(20,20,20,0.18)', borderRadius: '6px' }}>
                      <ol style={{ margin: '0', paddingLeft: '20px', fontSize: '15px', lineHeight: '1.7', color: '#141414' }}>
                        <li id="fn-agency-1">
                          Moses 3:17.
                          {" "}
                          <a href="https://www.churchofjesuschrist.org/study/scriptures/pgp/moses/3?lang=eng&id=p17#p17" target="_blank" rel="noopener" style={{ color: '#0047BA' }}>
                            churchofjesuschrist.org/study/scriptures
                          </a>
                          .
                        </li>
                        <li id="fn-agency-2">
                          David A. Bednar, “Things as They Really Are 2.0” (Worldwide Devotional for Young Adults, November 3, 2024),
                          {" "}
                          <a href="https://www.churchofjesuschrist.org/study/broadcasts/worldwide-devotional-for-young-adults/2024/11/13bednar?lang=eng&id=p16#p16" target="_blank" rel="noopener" style={{ color: '#0047BA' }}>
                            churchofjesuschrist.org/study/broadcasts
                          </a>
                          .
                        </li>
                        <li id="fn-agency-3">
                          “Letting AI inform you is wise,” YouTube Short,
                          {" "}
                          <a href="https://www.youtube.com/shorts/4qcpXcvtYoY" target="_blank" rel="noopener" style={{ color: '#0047BA' }}>youtube.com/shorts</a>
                          .
                        </li>
                        <li id="fn-agency-4">
                          2 Nephi 2:26.
                          {" "}
                          <a href="https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/2?lang=eng&id=p26#p26" target="_blank" rel="noopener" style={{ color: '#0047BA' }}>
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
                <p style={{ fontFamily: "'Newsreader',Georgia,serif", fontSize: 'clamp(34px, 4.4vw, var(--pause-font-size, 76px))', lineHeight: '1.2', color: '#141414', margin: '0', fontWeight: '700' }}>
                  Am I making this decision, or allowing AI to make it for me?
                </p>
                <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid rgba(20,20,20,0.12)', maxWidth: '640px' }}>
                  <p style={{ fontFamily: "'Newsreader',Georgia,serif", fontSize: '19px', lineHeight: '1.6', color: '#141414', margin: '0' }}>
                    Before moving forward, pause to reflect on how you use AI. Are there situations where you have given it your agency?
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
                  Here is one example of how AI can both aid and inhibit your decision making. Be mindful that in any given situation, the wisest use of AI may be no use at all. Talk to people you trust, ask for heavenly guidance, or contemplate on your own the decisions you need to make.
                </p>
                <p style={{ fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '13px', letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(20,20,20,0.72)', margin: '0 0 10px' }}>
                  Scenario
                </p>
                <p style={{ fontFamily: "'Newsreader',Georgia,serif", margin: '0 0 32px', fontSize: 'clamp(26px,2.4vw,36px)', fontWeight: '600', lineHeight: '1.2', color: '#141414', textWrap: 'pretty' }}>
                  You are uncertain about what to do with your future.
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
                      “Decide my future for me.”
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <span style={{ display: 'block', fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '16px', lineHeight: '1.45', color: '#333333', background: '#F5F6F8', borderRadius: '10px', padding: '10px 14px' }}>
                        What should I study?
                      </span>
                      <span style={{ display: 'block', fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '16px', lineHeight: '1.45', color: '#333333', background: '#F5F6F8', borderRadius: '10px', padding: '10px 14px' }}>
                        Where should I live?
                      </span>
                      <span style={{ display: 'block', fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '16px', lineHeight: '1.45', color: '#333333', background: '#F5F6F8', borderRadius: '10px', padding: '10px 14px' }}>
                        Should I marry this person?
                      </span>
                      <span style={{ display: 'block', fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '16px', lineHeight: '1.45', color: '#333333', background: '#F5F6F8', borderRadius: '10px', padding: '10px 14px' }}>
                        When should I have children?
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
                      “Help me understand my options so I can decide.”
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <span style={{ display: 'block', fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '16px', lineHeight: '1.45', color: '#333333', background: '#F5F6F8', borderRadius: '10px', padding: '10px 14px' }}>
                        Help me explore majors and schools.
                      </span>
                      <span style={{ display: 'block', fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '16px', lineHeight: '1.45', color: '#333333', background: '#F5F6F8', borderRadius: '10px', padding: '10px 14px' }}>
                        What career options might I be overlooking?
                      </span>
                      <span style={{ display: 'block', fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '16px', lineHeight: '1.45', color: '#333333', background: '#F5F6F8', borderRadius: '10px', padding: '10px 14px' }}>
                        What questions should I ask myself before making this decision?
                      </span>
                      <span style={{ display: 'block', fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '16px', lineHeight: '1.45', color: '#333333', background: '#F5F6F8', borderRadius: '10px', padding: '10px 14px' }}>
                        Help me compare these two choices.
                      </span>
                    </div>
                  </div>
                </div>
                {V.agencyTab1Active ? (
                  <>
                    <p style={{ fontFamily: "'Newsreader',Georgia,serif", margin: '0 0 32px', fontSize: '30px', fontWeight: '600', color: '#141414' }}>
                      You make a mistake at work or in a relationship
                    </p>
                    <div style={{ display: 'flex', gap: '28px', alignItems: 'stretch', flexWrap: 'wrap' }}>
                      <div className="upractice-col" style={{ width: 'calc(50% - 14px)', flex: '0 0 auto', minWidth: '220px', padding: '28px 32px', borderRadius: '10px', background: 'rgba(20,20,20,0.04)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ width: '20px', height: '20px', borderRadius: '50%', border: '1.5px solid #C96A58', color: '#C96A58', boxShadow: '0 0 8px rgba(201,106,88,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', lineHeight: '1', flexShrink: '0' }}>
                            ✕
                          </span>
                          <span style={{ fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '13px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#C96A58', whiteSpace: 'nowrap', flexShrink: '0' }}>
                            Misuse
                          </span>
                        </div>
                        <p style={{ fontFamily: "'Newsreader',Georgia,serif", fontSize: '27px', fontWeight: '600', fontStyle: 'italic', lineHeight: '1.35', color: '#141414', margin: '12px 0 0' }}>
                          “Tell me what is right and wrong.”
                        </p>
                        <span className="upractice-hint" style={{ display: 'block', marginTop: '14px', fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '12px', letterSpacing: '.08em', color: '#8C8C8C' }}>
                          Hover to see examples
                        </span>
                        <div className="upractice-reveal">
                          <ul style={{ margin: '0', paddingLeft: '18px', color: '#141414' }}>
                            <li style={{ fontSize: '18px', marginBottom: '8px' }}>What should I say to make this better? Generate an apology.</li>
                            <li style={{ fontSize: '18px', marginBottom: '8px' }}>Help me explain why this isn't my fault.</li>
                            <li style={{ fontSize: '18px' }}>Did I actually do something wrong?</li>
                          </ul>
                          <p style={{ margin: '20px 0 0', fontSize: '16px', lineHeight: '1.6', color: '#C98A78', fontStyle: 'italic' }}>
                            Outsourcing moral judgment to AI can weaken your own conscience and growth.
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
                          “This is discernment fuel.”
                        </p>
                        <span className="upractice-hint" style={{ display: 'block', marginTop: '14px', fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '12px', letterSpacing: '.08em', color: '#8C8C8C' }}>
                          Hover to see examples
                        </span>
                        <div className="upractice-reveal">
                          <ul style={{ margin: '0', paddingLeft: '18px', color: '#141414' }}>
                            <li style={{ fontSize: '18px', marginBottom: '8px' }}>How can I learn from this mistake?</li>
                            <li style={{ fontSize: '18px', marginBottom: '8px' }}>
                              How can I go about taking responsibility for this mistake? What questions can I ask others to understand their point of view?
                            </li>
                            <li style={{ fontSize: '18px' }}>How can I go about finding solutions?</li>
                          </ul>
                          <p style={{ margin: '20px 0 0', fontSize: '16px', lineHeight: '1.6', color: '#86AD93', fontStyle: 'italic' }}>
                            Working through a mistake with AI can sharpen your judgment and sense of responsibility.
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
                {V.agencyTab2Active ? (
                  <>
                    <p style={{ fontFamily: "'Newsreader',Georgia,serif", margin: '0 0 32px', fontSize: '30px', fontWeight: '600', color: '#141414' }}>
                      You are deciding your political views
                    </p>
                    <div style={{ display: 'flex', gap: '28px', alignItems: 'stretch', flexWrap: 'wrap' }}>
                      <div className="upractice-col" style={{ width: 'calc(50% - 14px)', flex: '0 0 auto', minWidth: '220px', padding: '28px 32px', borderRadius: '10px', background: 'rgba(20,20,20,0.04)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ width: '20px', height: '20px', borderRadius: '50%', border: '1.5px solid #C96A58', color: '#C96A58', boxShadow: '0 0 8px rgba(201,106,88,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', lineHeight: '1', flexShrink: '0' }}>
                            ✕
                          </span>
                          <span style={{ fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '13px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#C96A58', whiteSpace: 'nowrap', flexShrink: '0' }}>
                            Misuse
                          </span>
                        </div>
                        <p style={{ fontFamily: "'Newsreader',Georgia,serif", fontSize: '27px', fontWeight: '600', fontStyle: 'italic', lineHeight: '1.35', color: '#141414', margin: '12px 0 0' }}>
                          “Just tell me what to think.”
                        </p>
                        <span className="upractice-hint" style={{ display: 'block', marginTop: '14px', fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '12px', letterSpacing: '.08em', color: '#8C8C8C' }}>
                          Hover to see examples
                        </span>
                        <div className="upractice-reveal">
                          <ul style={{ margin: '0', paddingLeft: '18px', color: '#141414' }}>
                            <li style={{ fontSize: '18px', marginBottom: '8px' }}>Who should I vote for?</li>
                            <li style={{ fontSize: '18px', marginBottom: '8px' }}>What is correct? What is wrong?</li>
                            <li style={{ fontSize: '18px', marginBottom: '8px' }}>Figure out my ideology.</li>
                            <li style={{ fontSize: '18px' }}>What should I think about this?</li>
                          </ul>
                          <p style={{ margin: '20px 0 0', fontSize: '16px', lineHeight: '1.6', color: '#C98A78', fontStyle: 'italic' }}>
                            Letting AI dictate your political views can weaken your ability to reason and choose for yourself.
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
                          “Challenge my thinking, not replace it.”
                        </p>
                        <span className="upractice-hint" style={{ display: 'block', marginTop: '14px', fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '12px', letterSpacing: '.08em', color: '#8C8C8C' }}>
                          Hover to see examples
                        </span>
                        <div className="upractice-reveal">
                          <ul style={{ margin: '0', paddingLeft: '18px', color: '#141414' }}>
                            <li style={{ fontSize: '18px', marginBottom: '8px' }}>Here is what I think about X, give me the strongest objection to it.</li>
                            <li style={{ fontSize: '18px' }}>Many people believe X. Help me see where they are coming from.</li>
                          </ul>
                          <p style={{ margin: '20px 0 0', fontSize: '16px', lineHeight: '1.6', color: '#86AD93', fontStyle: 'italic' }}>
                            Using AI to test and refine your views strengthens your own thinking.
                          </p>
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
                <VideoCarousel videos={V.agencyVideos} />
                <nav id="agency-nav" className="principle-continue-nav" style={{ width: '100%', maxWidth: '1180px', margin: '96px auto 0', padding: '32px 24px', borderRadius: '14px', background: 'rgba(20,20,20,0.04)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', border: '1px solid rgba(20,20,20,0.18)', display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: '8px', boxSizing: 'border-box' }}>
                  <span style={{ gridColumn: '1/-1', fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '12px', letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(20,20,20,0.72)', margin: '0 0 8px' }}>
                    Continue with another principle
                  </span>
                  <button onClick={V.nav?.purpose} className="prow" style={{ all: 'unset', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '6px', padding: '18px 12px', borderRadius: '8px', background: 'rgba(0,71,186,0.08)' }}>
                    <span className="pname" style={{ fontFamily: "'Newsreader',Georgia,serif", fontSize: '26px', fontWeight: '500', letterSpacing: '-0.02em', lineHeight: '1', color: '#0047BA' }}>
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
                  <button onClick={V.nav?.relationships} className="prow" style={{ all: 'unset', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '6px', padding: '18px 12px', borderRadius: '8px' }}>
                    <span className="pname" style={{ fontFamily: "'Newsreader',Georgia,serif", fontSize: '26px', fontWeight: '500', letterSpacing: '-0.02em', lineHeight: '1', color: '#141414' }}>
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
                <svg width="0" height="0" style={{ display: 'none' }}>
                  <path d="M16 52 L16 54 L16 56 L16 59 L16 61 L16 64 L16 66 L16 68 L17 70 L18 72 L18 76 L19 79 L19 82 L19 84 L19 86 L19 89 L19 91 L20 95 L20 98 L20 101 L20 103 L20 107 L20 109 L20 113 L20 115 L20 119 L20 121 L22 121 L25 121 L29 121 L31 121 L36 121 L40 121 L47 121 L52 121 L56 121 L64 121 L68 121 L76 121 L82 121 L90 122 L100 122 L106 124 L109 124 L114 124 L118 124 L124 124 L133 124 L143 124 L151 124 L163 124 L172 124 L184 124 L190 124 L196 124 L204 124 L208 124 L220 124 L227 124 L234 124 L242 124 L248 124 L253 124 L262 124 L266 124 L275 124 L281 124 L283 124 L286 124 L289 124 L293 124 L295 124 L298 124 L300 124 L302 124 L305 124 L307 124 L312 124 L317 124 L320 124 L323 124 L326 124 L328 124 L330 124 L332 124 L335 124 L337 124 L340 124 L342 124 L344 124 L346 124 L346 121 L346 116 L344 107 L344 101 L343 96 L342 89 L341 84 L341 79 L338 76 L338 71 L337 66 L337 62 L335 58 L335 55 L334 53 L334 49 L334 46 L334 43 L334 40 L334 37 L334 34 L334 32 L334 30 L334 28 L334 26 L332 26 L330 25 L325 25 L322 25 L317 25 L307 25 L298 25 L282 26 L270 28 L262 28 L246 28 L236 28 L223 25 L217 25 L209 24 L203 23 L193 22 L186 22 L181 22 L175 20 L167 20 L164 20 L160 19 L154 19 L150 19 L144 19 L138 19 L136 19 L130 20 L126 20 L121 23 L115 23 L109 24 L104 25 L100 26 L97 26 L90 28 L85 28 L79 29 L74 30 L72 31 L68 31 L65 32 L62 32 L58 32 L54 32 L52 32 L49 34 L44 34 L42 34 L40 35 L37 36 L32 36 L30 36 L28 36 L26 36 L24 36 L20 36 L18 36 L14 37 L12 37 L10 37 L8 37 L8 40 L10 41 L12 44 L12 48 L12 50 L12 54 L12 58 L12 60 L12 64 L12 67 L12 70 L12 73 L12 76 L12 78 L12 83 L12 85 L12 89 L12 91 L12 94 L11 97 L11 100 L11 102 L11 106 L11 109 L11 112 L11 115 L11 118 L11 120 L11 124 L11 126 L14 126 L19 126 L25 126 L40 126 L50 125 L64 122 L72 121 L79 120 L86 119 L102 116 L113 116 L130 114 L140 114 L150 113 L158 113 L162 113 L167 113 L172 113 L175 112 L179 112 L185 109 L188 109 L193 109 L199 108 L204 108 L206 108 L212 108 L214 108 L218 108 L221 108 L223 108 L229 108 L232 108 L236 109 L239 110 L242 112 L247 113 L252 115 L254 116 L258 118 L264 119 L271 121 L278 124 L284 125 L293 127 L296 127 L300 128 L304 130 L308 132 L311 132 L313 132 L317 132 L319 132 L323 132 L326 132 L328 132 L331 130 L335 130 L336 128 L338 127 L340 127 L341 125 L341 122 L341 120 L341 118 L340 112 L338 108 L338 100 L337 95 L336 91 L336 86 L336 84 L336 82 L336 78 L336 76 L336 73 L336 71 L336 67 L336 64 L336 61 L336 58 L336 55 L336 53 L336 47 L336 42 L336 37 L336 35 L336 30 L336 26 L336 23 L336 20 L336 18 L336 16 L334 16 L328 18 L311 22 L301 24 L289 26 L283 26 L278 28 L272 28 L266 28 L256 28 L246 26 L235 26 L218 26 L212 26 L204 26 L194 26 L191 26 L186 26 L178 26 L172 26 L163 26 L157 26 L152 26 L149 26 L145 26 L142 26 L139 26 L136 26 L132 26 L130 26 L126 26 L124 26 L121 26 L116 26 L114 26 L109 26 L106 26 L103 25 L98 24 L95 24 L89 24 L85 22 L80 22 L78 22 L74 22 L72 22 L67 22 L64 22 L60 22 L58 22 L54 22 L52 22 L49 22 L47 22 L43 22 L41 22 L36 22 L30 22 L28 22 L25 23 L22 23 L19 23 L17 24 L13 24 L10 25 L7 25 L4 25 L4 28 L4 30 L5 34 L5 37 L5 42 L5 50 L2 62 L2 70 L1 76 L1 78 L1 80 L1 82 L1 85 L1 89 L1 92 L1 95 L1 98 L1 101 L1 103 L1 107 L1 109 L1 113 L1 116 L1 120 L2 124 L2 126 L4 126 L6 126 L10 126 L22 126 L28 126 L38 126 L48 126 L56 126 L61 126 L71 126 L76 126 L80 126 L86 126 L91 127 L97 128 L103 128 L107 128 L113 128 L116 128 L125 130 L131 130 L137 130 L144 130 L149 130 L158 130 L163 130 L169 130 L178 130 L184 131 L187 131 L197 132 L200 132 L209 132 L215 133 L220 133 L230 133 L239 133 L246 133 L252 133 L257 133 L264 133 L269 133 L274 134 L281 136 L284 136 L288 136 L290 136 L293 136 L296 136 L299 136 L302 136 L304 136 L306 136 L308 136 L312 136 L314 136 L318 136 L320 136 L324 136 L326 136 L329 136 L331 136 L334 136 L336 136 L338 134 L340 134 L342 134 L344 134 L346 134 L348 134 L348 132 L348 130 L348 128 L348 126 L348 124 L348 121 L348 119 L349 115 L350 112 L350 109 L350 106 L352 101 L353 97 L353 95 L353 92 L353 90 L353 88 L353 85 L353 82 L353 78 L355 71 L355 68 L356 64 L358 61 L358 59 L358 55 L358 52 L358 49 L358 47 L358 44 L358 38 L358 36 L356 34 L355 31 L355 29 L355 25 L354 23 L353 19 L353 17 L353 13 L353 11 L353 7 L353 4 L353 2 L352 0 L350 0 L348 0 L344 0 L337 1 L330 2 L314 6 L310 8 L299 11 L289 13 L281 14 L275 16 L270 17 L268 17 L259 17 L254 18 L250 18 L238 19 L229 19 L220 22 L205 24 L199 24 L190 26 L182 28 L176 29 L169 29 L166 30 L162 30 L155 30 L152 30 L143 30 L137 29 L132 29 L126 28 L122 28 L120 28 L113 25 L108 25 L101 25 L97 25 L95 24 L88 24 L83 24 L79 24 L71 24 L66 24 L60 24 L56 24 L53 24 L48 24 L44 24 L42 24 L35 24 L32 25 L28 25 L26 25 L23 25 L19 25 L17 25 L11 25 L7 25 L5 25 L2 25 L0 25" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
    </>
  )
}
