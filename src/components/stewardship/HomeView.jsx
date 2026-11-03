// Generated from the original Stewardship guidebook (Outline.dc.html) and kept
// identical to it: same markup, inline styles and class names. Values that
// change (classes, handlers, open/closed states) come from StewardshipGuide's
// renderVals(), passed in as V.
import { asset } from './util.js'

// The guidebook's home view: the title over the painting, the "Stewardship"
// introduction and the five principle cards.
export default function HomeView({ V }) {
  return (
    <>
    <div className="view" style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div className="stew-hero-content" style={{ position: 'absolute', left: '0', right: '0', top: '0', height: '100dvh', zIndex: '1' }}>
        <div style={{ position: 'absolute', left: '0', right: '0', top: '50%', transform: 'translateY(-50%)', textAlign: 'center', padding: '0 4vw', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(8px,1.1vw,20px)' }}>
          <div className="stew-hero-fade">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', margin: '0 auto', width: 'min(1025px, 92vw)' }}>
              <span className="stew-hero-rule" style={{ flex: '1', height: '1px', background: 'rgba(255,255,255,0.6)' }} />
              <span style={{ fontFamily: "'Newsreader',Georgia,serif", fontStyle: 'italic', fontWeight: '400', fontSize: 'clamp(20px,2.4vw,40px)', color: '#FFFFFF', whiteSpace: 'nowrap' }}>
                A Guidebook for the Wise and Ethical
              </span>
              <span className="stew-hero-rule" style={{ flex: '1', height: '1px', background: 'rgba(255,255,255,0.6)' }} />
            </div>
          </div>
          <h1 className="stew-morph-title" style={{ fontFamily: "'Newsreader',Georgia,serif", display: 'inline-block', transformOrigin: 'left top', willChange: 'transform', fontSize: 'clamp(40px, 9vw, 130px)', lineHeight: '1', fontWeight: '400', letterSpacing: '.075em', textTransform: 'uppercase', margin: '0.05em 0 -0.23em', color: '#FFFFFF', textShadow: '0 2px 18px rgba(20,17,12,0.55)' }}>
            Stewardship
          </h1>
          <div className="stew-hero-fade">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', margin: '0 auto', width: 'min(1025px, 92vw)' }}>
              <span className="stew-hero-rule" style={{ flex: '1', height: '1px', background: 'rgba(255,255,255,0.6)' }} />
              <span style={{ fontFamily: "'Newsreader',Georgia,serif", fontStyle: 'italic', fontWeight: '400', fontSize: 'clamp(20px,2.4vw,40px)', color: '#FFFFFF' }}>
                &nbsp;of AI&nbsp;
              </span>
              <span className="stew-hero-rule" style={{ flex: '1', height: '1px', background: 'rgba(255,255,255,0.6)' }} />
            </div>
            <span className="stew-ref" role="button" tabIndex="0" onClick={V.onStewardshipScriptureToggle} onKeyDown={V.onStewardshipScriptureKey} onMouseEnter={V.onStewardshipScriptureEnter} onMouseLeave={V.onStewardshipScriptureLeave} style={{ position: 'relative', display: 'inline-block', cursor: 'pointer', marginTop: '2.2vw' }}>
              {" "}
              <p style={{ fontFamily: "'Newsreader',Georgia,serif", fontSize: 'clamp(14px,1.5vw,20px)', letterSpacing: '.14em', color: '#FFFFFF', margin: '0', whiteSpace: 'nowrap', borderBottom: '1px dotted rgba(255,255,255,0.6)', paddingBottom: '2px' }}>
                D&amp;C 136:27
              </p>
              {" "}
            </span>
          </div>
        </div>
        {V.isStewardshipScriptureOpen ? (
          <>
            <div className="stew-verse-pop" style={{ position: 'fixed', left: '50%', top: '70%', transform: 'translate(-50%,0)', width: 'min(860px, 84vw)', background: 'rgba(20,17,12,0.3)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.22)', borderRadius: '6px', padding: '32px 40px', zIndex: '10', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', overflow: 'hidden', boxSizing: 'border-box' }}>
              <p style={{ fontSize: '24px', lineHeight: '1.5', color: '#FFFFFF', fontStyle: 'normal', margin: '0', textShadow: '0 1px 8px rgba(20,17,12,0.6)' }}>
                "Thou shalt be diligent in preserving what thou hast, that thou mayest be a wise steward; for it is the free gift of the Lord thy God, and thou art his steward."
              </p>
            </div>
          </>
        ) : null}
      </div>
      <div className="stew-hero-spacer" style={{ height: '100dvh', width: '100%' }} />
      <div className={`stew-content-panel ${V.homeReturnClass ?? ''}`} style={{ position: 'relative', zIndex: '1', display: 'block', background: 'transparent' }}>
        <section style={{ width: '100%', height: '100dvh', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 'clamp(22px,4vh,44px)', padding: 'clamp(36px,6vh,80px) max(32px, calc((100% - 1320px)/2))', boxSizing: 'border-box' }}>
          <h1 className="stew-title-target" style={{ fontFamily: "'Newsreader',Georgia,serif", position: 'relative', zIndex: '1', fontSize: 'clamp(30px,min(3.6vw,6vh),56px)', fontWeight: '400', letterSpacing: '.075em', textTransform: 'uppercase', margin: '0', color: '#141414' }}>
            Stewardship
          </h1>
          <div style={{ position: 'relative', zIndex: '1', display: 'grid', gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,1fr)', gap: 'clamp(34px,5vw,88px)', alignItems: 'start' }}>
            <div>
              <p style={{ fontSize: 'clamp(18px,min(1.7vw,3vh),27px)', lineHeight: '1.48', color: '#141414', margin: '0 0 clamp(14px,2.4vh,24px)', textWrap: 'pretty' }}>
                As society continues to adapt to the ever-evolving technology of AI, it is important to remember that we are each stewards of our individual use of it and responsible for how it affects us, those around us, and the world we live in.
              </p>
              <p style={{ fontSize: 'clamp(16px,min(1.4vw,2.5vh),22px)', lineHeight: '1.55', color: 'rgba(20,20,20,0.9)', margin: '0' }}>
                The purpose of this guidebook is not to give you a list of rules for how you should use AI, but rather to provide five principles that will sharpen the wise and ethical judgment you bring to it. Each principle is broken into three parts:
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(16px,2.6vh,28px)', marginTop: 'calc(-1 * clamp(12px,2vh,18px))' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(12px,2vh,20px)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 'clamp(14px,1.4vw,22px)', alignItems: 'baseline', borderTop: '1px solid rgba(20,20,20,0.22)', padding: 'clamp(12px,2vh,18px) 0 0' }}>
                  <span style={{ fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '13px', letterSpacing: '.2em', color: '#0047BA' }}>01</span>
                  <span>
                    {" "}
                    <span style={{ display: 'block', fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '14px', letterSpacing: '.18em', textTransform: 'uppercase', color: '#141414', margin: '0 0 6px' }}>
                      Principle
                    </span>
                    {" "}
                    <span style={{ display: 'block', fontSize: 'clamp(14px,min(1.1vw,2vh),17px)', lineHeight: '1.5', color: 'rgba(20,20,20,0.86)' }}>
                      A definition of what we are trying to safeguard.
                    </span>
                    {" "}
                  </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 'clamp(14px,1.4vw,22px)', alignItems: 'baseline', borderTop: '1px solid rgba(20,20,20,0.22)', padding: 'clamp(12px,2vh,18px) 0 0' }}>
                  <span style={{ fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '13px', letterSpacing: '.2em', color: '#0047BA' }}>02</span>
                  <span>
                    {" "}
                    <span style={{ display: 'block', fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '14px', letterSpacing: '.18em', textTransform: 'uppercase', color: '#141414', margin: '0 0 6px' }}>
                      Pause
                    </span>
                    {" "}
                    <span style={{ display: 'block', fontSize: 'clamp(14px,min(1.1vw,2vh),17px)', lineHeight: '1.5', color: 'rgba(20,20,20,0.86)' }}>
                      A question you can ask yourself when you’re uncertain about how to best use AI.
                    </span>
                    {" "}
                  </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 'clamp(14px,1.4vw,22px)', alignItems: 'baseline', borderTop: '1px solid rgba(20,20,20,0.22)', padding: 'clamp(12px,2vh,18px) 0 0' }}>
                  <span style={{ fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '13px', letterSpacing: '.2em', color: '#0047BA' }}>03</span>
                  <span>
                    {" "}
                    <span style={{ display: 'block', fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '14px', letterSpacing: '.18em', textTransform: 'uppercase', color: '#141414', margin: '0 0 6px' }}>
                      Practice
                    </span>
                    {" "}
                    <span style={{ display: 'block', fontSize: 'clamp(14px,min(1.1vw,2vh),17px)', lineHeight: '1.5', color: 'rgba(20,20,20,0.86)' }}>
                      Examples of applying the principle and the pause. Each practice includes examples of AI
                      {" "}
                      <i>misuse</i>
                      {" "}
                      and AI
                      {" "}
                      <i>wise use</i>
                      .
                    </span>
                    {" "}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div style={{ position: 'relative', zIndex: '1', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '32px', flexWrap: 'wrap', borderTop: '1px solid rgba(20,20,20,0.18)', paddingTop: 'clamp(12px,2vh,20px)' }}>
            <span className="scroll-hint" style={{ fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '12px', letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(20,20,20,0.7)' }}>
              Scroll ↓&nbsp;&nbsp;The five principles
            </span>
          </div>
        </section>
        <section style={{ width: '100%', height: '100dvh', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 'clamp(18px,3.4vh,40px)', padding: 'clamp(36px,6vh,80px) max(32px, calc((100% - 1400px)/2))', boxSizing: 'border-box' }}>
          <h2 style={{ fontFamily: "'Newsreader',Georgia,serif", fontSize: 'clamp(34px,min(4.4vw,7vh),68px)', fontWeight: '400', letterSpacing: '.04em', textTransform: 'uppercase', lineHeight: '1.05', margin: '0', color: '#141414' }}>
            The Five Principles
          </h2>
          <div className={`pcard-row ${V.cardRowClass ?? ''}`} style={{ flex: '1 1 auto', minHeight: '0', maxHeight: 'clamp(320px,58vh,520px)', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', gap: 'clamp(10px,1.2vw,18px)' }}>
            <button onClick={V.nav?.purpose} onMouseEnter={V.onCardAgencyEnter} onMouseLeave={V.onCardLeave} className={`pcard ${V.cardAgencyClass ?? ''}`} style={{ appearance: 'none', WebkitAppearance: 'none', background: 'none', font: 'inherit', color: 'inherit', textAlign: 'left', margin: '0', cursor: 'pointer', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', minWidth: '0', height: '100%', padding: 'clamp(18px,2.6vh,26px)', boxSizing: 'border-box', border: '1px solid rgba(255,255,255,0.24)', borderRadius: '12px' }}>
              <img className="pcard-img f-agency" src={asset('agency-dixon-hiker.png')} alt="" style={{ position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover', objectPosition: '26% 42%' }} />
              <span className="pcard-veil" />
              <span style={{ position: 'relative', zIndex: '1', display: 'flex', flexDirection: 'column', gap: 'clamp(8px,1.2vh,12px)' }}>
                <span style={{ fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '12px', letterSpacing: '.22em', color: '#C3D6F2' }}>01</span>
                <span style={{ fontFamily: "'Newsreader',Georgia,serif", fontSize: 'clamp(22px,2.1vw,34px)', fontWeight: '400', letterSpacing: '-0.01em', lineHeight: '1.08', color: '#FFFFFF', textShadow: '0 1px 10px rgba(20,17,12,0.7)' }}>
                  Agency
                </span>
                <span style={{ fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: 'clamp(13px,1vw,15px)', lineHeight: '1.4', color: '#FFFFFF', minHeight: '4.3em', textShadow: '0 1px 6px rgba(20,17,12,0.6)' }}>
                  Am I handing my decisions over to AI?
                </span>
                <span className="pcard-go" style={{ fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '12px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#C3D6F2', marginTop: '4px' }}>
                  Read →
                </span>
              </span>
            </button>
            <button onClick={V.nav?.identity} onMouseEnter={V.onCardBecomingEnter} onMouseLeave={V.onCardLeave} className={`pcard ${V.cardBecomingClass ?? ''}`} style={{ appearance: 'none', WebkitAppearance: 'none', background: 'none', font: 'inherit', color: 'inherit', textAlign: 'left', margin: '0', cursor: 'pointer', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', minWidth: '0', height: '100%', padding: 'clamp(18px,2.6vh,26px)', boxSizing: 'border-box', border: '1px solid rgba(255,255,255,0.24)', borderRadius: '12px' }}>
              <img className="pcard-img f-becoming" src={asset('becoming-pissarro-garden.jpg')} alt="" style={{ position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 64%' }} />
              <span className="pcard-veil" />
              <span style={{ position: 'relative', zIndex: '1', display: 'flex', flexDirection: 'column', gap: 'clamp(8px,1.2vh,12px)' }}>
                <span style={{ fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '12px', letterSpacing: '.22em', color: '#C3D6F2' }}>02</span>
                <span style={{ fontFamily: "'Newsreader',Georgia,serif", fontSize: 'clamp(22px,2.1vw,34px)', fontWeight: '400', letterSpacing: '-0.01em', lineHeight: '1.08', color: '#FFFFFF', textShadow: '0 1px 10px rgba(20,17,12,0.7)' }}>
                  Becoming
                </span>
                <span style={{ fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: 'clamp(13px,1vw,15px)', lineHeight: '1.4', color: '#FFFFFF', minHeight: '4.3em', textShadow: '0 1px 6px rgba(20,17,12,0.6)' }}>
                  Who am I growing into with AI?
                </span>
                <span className="pcard-go" style={{ fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '12px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#C3D6F2', marginTop: '4px' }}>
                  Read →
                </span>
              </span>
            </button>
            <button onClick={V.nav?.relationships} onMouseEnter={V.onCardFellowshipEnter} onMouseLeave={V.onCardLeave} className={`pcard ${V.cardFellowshipClass ?? ''}`} style={{ appearance: 'none', WebkitAppearance: 'none', background: 'none', font: 'inherit', color: 'inherit', textAlign: 'left', margin: '0', cursor: 'pointer', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', minWidth: '0', height: '100%', padding: 'clamp(18px,2.6vh,26px)', boxSizing: 'border-box', border: '1px solid rgba(255,255,255,0.24)', borderRadius: '12px' }}>
              <img className="pcard-img f-fellowship" src={asset('fellowship-council-detail.png')} alt="" style={{ position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover', objectPosition: '45% 50%' }} />
              <span className="pcard-veil" />
              <span style={{ position: 'relative', zIndex: '1', display: 'flex', flexDirection: 'column', gap: 'clamp(8px,1.2vh,12px)' }}>
                <span style={{ fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '12px', letterSpacing: '.22em', color: '#C3D6F2' }}>03</span>
                <span style={{ fontFamily: "'Newsreader',Georgia,serif", fontSize: 'clamp(22px,2.1vw,34px)', fontWeight: '400', letterSpacing: '-0.01em', lineHeight: '1.08', color: '#FFFFFF', textShadow: '0 1px 10px rgba(20,17,12,0.7)' }}>
                  Fellowship
                </span>
                <span style={{ fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: 'clamp(13px,1vw,15px)', lineHeight: '1.4', color: '#FFFFFF', minHeight: '4.3em', textShadow: '0 1px 6px rgba(20,17,12,0.6)' }}>
                  How does my AI use affect others?
                </span>
                <span className="pcard-go" style={{ fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '12px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#C3D6F2', marginTop: '4px' }}>
                  Read →
                </span>
              </span>
            </button>
            <button onClick={V.nav?.growth} onMouseEnter={V.onCardDiscernmentEnter} onMouseLeave={V.onCardLeave} className={`pcard ${V.cardDiscernmentClass ?? ''}`} style={{ appearance: 'none', WebkitAppearance: 'none', background: 'none', font: 'inherit', color: 'inherit', textAlign: 'left', margin: '0', cursor: 'pointer', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', minWidth: '0', height: '100%', padding: 'clamp(18px,2.6vh,26px)', boxSizing: 'border-box', border: '1px solid rgba(255,255,255,0.24)', borderRadius: '12px' }}>
              <img className="pcard-img f-discernment" src={asset('discernment-candlelight-reader.png')} alt="" style={{ position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 40%' }} />
              <span className="pcard-veil" />
              <span style={{ position: 'relative', zIndex: '1', display: 'flex', flexDirection: 'column', gap: 'clamp(8px,1.2vh,12px)' }}>
                <span style={{ fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '12px', letterSpacing: '.22em', color: '#C3D6F2' }}>04</span>
                <span style={{ fontFamily: "'Newsreader',Georgia,serif", fontSize: 'clamp(22px,2.1vw,34px)', fontWeight: '400', letterSpacing: '-0.01em', lineHeight: '1.08', color: '#FFFFFF', textShadow: '0 1px 10px rgba(20,17,12,0.7)' }}>
                  Discernment
                </span>
                <span style={{ fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: 'clamp(13px,1vw,15px)', lineHeight: '1.4', color: '#FFFFFF', minHeight: '4.3em', textShadow: '0 1px 6px rgba(20,17,12,0.6)' }}>
                  Can I trust what AI tells me?
                </span>
                <span className="pcard-go" style={{ fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '12px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#C3D6F2', marginTop: '4px' }}>
                  Read →
                </span>
              </span>
            </button>
            <button onClick={V.nav?.action} onMouseEnter={V.onCardIntegrityEnter} onMouseLeave={V.onCardLeave} className={`pcard ${V.cardIntegrityClass ?? ''}`} style={{ appearance: 'none', WebkitAppearance: 'none', background: 'none', font: 'inherit', color: 'inherit', textAlign: 'left', margin: '0', cursor: 'pointer', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', minWidth: '0', height: '100%', padding: 'clamp(18px,2.6vh,26px)', boxSizing: 'border-box', border: '1px solid rgba(255,255,255,0.24)', borderRadius: '12px' }}>
              <img className="pcard-img f-integrity" src={asset('integrity-mirror-reflection.png')} alt="" style={{ position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover', objectPosition: '42% 50%' }} />
              <span className="pcard-veil" />
              <span style={{ position: 'relative', zIndex: '1', display: 'flex', flexDirection: 'column', gap: 'clamp(8px,1.2vh,12px)' }}>
                <span style={{ fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '12px', letterSpacing: '.22em', color: '#C3D6F2' }}>05</span>
                <span style={{ fontFamily: "'Newsreader',Georgia,serif", fontSize: 'clamp(22px,2.1vw,34px)', fontWeight: '400', letterSpacing: '-0.01em', lineHeight: '1.08', color: '#FFFFFF', textShadow: '0 1px 10px rgba(20,17,12,0.7)' }}>
                  Integrity
                </span>
                <span style={{ fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: 'clamp(13px,1vw,15px)', lineHeight: '1.4', color: '#FFFFFF', minHeight: '4.3em', textShadow: '0 1px 6px rgba(20,17,12,0.6)' }}>
                  Am I the same, seen or unseen, with my AI use?
                </span>
                <span className="pcard-go" style={{ fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '12px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#C3D6F2', marginTop: '4px' }}>
                  Read →
                </span>
              </span>
            </button>
          </div>
        </section>
      </div>
    </div>
    </>
  )
}
