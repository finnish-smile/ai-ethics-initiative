// The "Watch & Learn" video carousel used on each principle page, rebuilt
// from the original guidebook's VideoCarousel.dc.html (markup, styles and
// logic unchanged).
import React, { Component } from 'react'
import { Fragment } from 'react'
import { asList, interp, toStyle } from './util.js'

export default class VideoCarousel extends Component {
  state = { cur: 0 };
  vids() { return Array.isArray(this.props.videos) ? this.props.videos : []; }
  go(i) {
    const n = this.vids().length || 1;
    this.setState({ cur: Math.max(0, Math.min(n - 1, i)) });
  }
  step(d) { this.go(this.state.cur + d); }
  ts(e) { this._x = e.touches[0].clientX; this._d = 0; }
  tm(e) { if (this._x != null) this._d = e.touches[0].clientX - this._x; }
  te() {
    const d = this._d || 0;
    if (Math.abs(d) > 40) this.step(d < 0 ? 1 : -1);
    this._x = null; this._d = 0;
  }
  renderVals() {
    const vids = this.vids();
    const n = vids.length;
    const cur = Math.min(this.state.cur, Math.max(0, n - 1));
    const slides = vids.map((v) => {
      const isQuoteCard = v.type === 'quote';
      const isEmbed = !!v.id;
      const isLink = !isEmbed && !isQuoteCard && !!v.href;
      return {
        isQuoteCard,
        isLink,
        isEmbed,
        href: v.href || '#',
        thumb: v.thumb || '',
        embed: v.id ? `https://www.youtube.com/embed/${v.id}` : '',
        title: v.title || '',
        kind: v.kind || (isQuoteCard ? 'Quote' : isLink ? 'Devotional' : 'Video'),
        hasQuote: !!v.quote,
        hasStaticQuote: !!v.quote && isEmbed,
        quote: v.quote || '',
        hasCite: !!v.cite,
        cite: v.cite || '',
      };
    });
    const trackStyle = {
      display: 'flex',
      transform: `translateX(-${cur * 100}%)`,
      transition: 'transform .42s cubic-bezier(.2,.7,.2,1)',
      touchAction: 'pan-y',
    };
    const arrowBase = {
      all: 'unset', cursor: 'pointer', position: 'absolute', top: '50%',
      transform: 'translateY(-50%)', width: '44px', height: '44px',
      display: n > 1 ? 'flex' : 'none', alignItems: 'center', justifyContent: 'center',
      borderRadius: '50%', background: 'rgba(251,248,242,.92)',
      border: '1px solid #CCCCCC', color: '#141414', fontSize: '26px',
      boxShadow: '0 4px 14px rgba(20,20,20,.16)', zIndex: 5,
      transition: 'opacity .2s ease',
    };
    const prevStyle = { ...arrowBase, left: '12px', opacity: cur === 0 ? '0' : '1', pointerEvents: cur === 0 ? 'none' : 'auto' };
    const nextStyle = { ...arrowBase, right: '12px', opacity: cur >= n - 1 ? '0' : '1', pointerEvents: cur >= n - 1 ? 'none' : 'auto' };
    const R = React.createElement;
    const dotsEl = n < 2 ? null : R('div', {
      style: { display: 'flex', justifyContent: 'center', gap: '9px' },
    }, vids.map((_, i) => {
      const active = i === cur;
      return R('button', {
        key: i + (active ? '-a' : '-i'),
        'aria-label': 'Go to item',
        onClick: () => this.go(i),
        style: {
          all: 'unset', cursor: 'pointer', display: 'block',
          width: active ? '26px' : '9px', height: '9px', borderRadius: '999px',
          background: active ? '#0047BA' : '#CCCCCC',
          transition: 'width .25s ease, background .2s ease',
        },
      });
    }));
    return {
      isEmpty: n === 0,
      hasVideos: n > 0,
      slides,
      trackStyle,
      prevStyle,
      nextStyle,
      dotsEl,
      prev: () => this.step(-1),
      next: () => this.step(1),
      ts: (e) => this.ts(e),
      tm: (e) => this.tm(e),
      te: () => this.te(),
    };
  }

  render() {
    const V = { ...this.props, ...this.renderVals() }
    // the wrapper the original runtime put around every embedded component
    return (
      <div className="sc-host" data-sc-name="VideoCarousel">
      <div style={{ width: '100%' }}>
        {V.isEmpty ? (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '44px 24px', border: '1.5px dashed #CCCCCC', borderRadius: '12px', background: '#F5F6F8' }}>
              <span style={{ fontSize: '24px', color: '#8C8C8C' }}>▶</span>
              <span style={{ fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '14px', color: '#666666', textAlign: 'center' }}>
                No videos here yet — share links to add them.
              </span>
            </div>
          </>
        ) : null}
        {V.hasVideos ? (
          <>
            <div style={{ overflowX: 'clip' }}>
              <div style={toStyle(V.trackStyle)} onTouchStart={V.ts} onTouchMove={V.tm} onTouchEnd={V.te}>
                {asList(V.slides).map((__item, __i) =>
                  ((V) => (
                    <Fragment key={__i}>
                      <div style={{ flex: '0 0 100%', boxSizing: 'border-box', padding: '0 2px' }}>
                        {V.vid?.isEmbed ? (
                          <>
                            <div>
                              <div className="vc-frame" style={{ position: 'relative' }}>
                                <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #E3E3E3', background: '#000' }}>
                                  <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
                                    <iframe src={V.vid?.embed} title={V.vid?.title} style={{ position: 'absolute', inset: '0', width: '100%', height: '100%', border: '0' }} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen="" />
                                  </div>
                                </div>
                                <button onClick={V.prev} aria-label="Previous" style={toStyle(V.prevStyle)}>‹</button>
                                {" "}
                                <button onClick={V.next} aria-label="Next" style={toStyle(V.nextStyle)}>›</button>
                              </div>
                              {V.vid?.hasQuote ? (
                                <>
                                  <div className="vc-quotebelow" style={{ marginTop: '10px', background: '#FFFFFF', border: '1px solid #E3E3E3', borderRadius: '10px', boxShadow: '0 10px 26px rgba(20,20,20,.14)', padding: '0 18px', maxHeight: '0', opacity: '0', overflow: 'hidden', transition: 'max-height .5s cubic-bezier(.2,.7,.2,1), opacity .35s ease, padding .4s ease' }}>
                                    <blockquote style={{ margin: '0', padding: '20px 0 20px 20px', borderLeft: '3px solid #0047BA' }}>
                                      {" "}
                                      <span style={{ display: 'block', fontSize: '24px', lineHeight: '1.65', color: '#666666' }}>
                                        “
                                        {interp(V.vid?.quote)}
                                        ”
                                      </span>
                                      {" "}
                                      {V.vid?.hasCite ? (
                                        <>
                                          <span style={{ display: 'block', marginTop: '12px', fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '14px', letterSpacing: '.06em', color: '#0047BA' }}>
                                            —
                                            {" "}
                                            {interp(V.vid?.cite)}
                                          </span>
                                        </>
                                      ) : null}
                                      {" "}
                                    </blockquote>
                                  </div>
                                </>
                              ) : null}
                            </div>
                          </>
                        ) : null}
                        {V.vid?.isLink ? (
                          <>
                            <div>
                              <div className="vc-frame" style={{ position: 'relative' }}>
                                <a href={V.vid?.href} target="_blank" rel="noopener" style={{ display: 'block', borderRadius: '12px', overflow: 'hidden', border: '1px solid #E3E3E3', textDecoration: 'none' }}>
                                  {" "}
                                  <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', background: '#1B2A4A' }}>
                                    <img src={V.vid?.thumb} alt="" style={{ position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover' }} />
                                    <div style={{ position: 'absolute', inset: '0', background: 'linear-gradient(180deg,rgba(10,15,30,.05) 40%,rgba(10,15,30,.55) 100%)' }} />
                                    <div style={{ position: 'absolute', inset: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                      <span style={{ width: '66px', height: '66px', borderRadius: '50%', background: 'rgba(0,71,186,.86)', border: '1.5px solid rgba(255,255,255,.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '24px', paddingLeft: '5px', boxShadow: '0 6px 22px rgba(0,0,0,.35)' }}>
                                        ▶
                                      </span>
                                    </div>
                                    <span style={{ position: 'absolute', left: '14px', bottom: '12px', display: 'flex', alignItems: 'center', gap: '7px', fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '12.5px', fontWeight: '600', color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,.6)' }}>
                                      Watch on churchofjesuschrist.org
                                      {" "}
                                      <span style={{ fontSize: '14px' }}>↗</span>
                                    </span>
                                  </div>
                                  {" "}
                                </a>
                                {" "}
                                <button onClick={V.prev} aria-label="Previous" style={toStyle(V.prevStyle)}>‹</button>
                                {" "}
                                <button onClick={V.next} aria-label="Next" style={toStyle(V.nextStyle)}>›</button>
                              </div>
                              {V.vid?.hasQuote ? (
                                <>
                                  <div className="vc-quotebelow" style={{ marginTop: '10px', background: '#FFFFFF', border: '1px solid #E3E3E3', borderRadius: '10px', boxShadow: '0 10px 26px rgba(20,20,20,.14)', padding: '0 18px', maxHeight: '0', opacity: '0', overflow: 'hidden', transition: 'max-height .5s cubic-bezier(.2,.7,.2,1), opacity .35s ease, padding .4s ease' }}>
                                    <blockquote style={{ margin: '0', padding: '20px 0 20px 20px', borderLeft: '3px solid #0047BA' }}>
                                      {" "}
                                      <span style={{ display: 'block', fontSize: '24px', lineHeight: '1.65', color: '#666666' }}>
                                        “
                                        {interp(V.vid?.quote)}
                                        ”
                                      </span>
                                      {" "}
                                      {V.vid?.hasCite ? (
                                        <>
                                          <span style={{ display: 'block', marginTop: '12px', fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '14px', letterSpacing: '.06em', color: '#0047BA' }}>
                                            —
                                            {" "}
                                            {interp(V.vid?.cite)}
                                          </span>
                                        </>
                                      ) : null}
                                      {" "}
                                    </blockquote>
                                  </div>
                                </>
                              ) : null}
                            </div>
                          </>
                        ) : null}
                        {V.vid?.isQuoteCard ? (
                          <>
                            <div className="vc-frame" style={{ position: 'relative', width: '100%', minHeight: '340px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRadius: '12px', border: '1px solid #E3E3E3', background: '#F5F6F8', padding: '48px 52px', boxSizing: 'border-box' }}>
                              <span style={{ position: 'absolute', left: '22px', top: '10px', fontFamily: 'Georgia,serif', fontSize: '72px', lineHeight: '1', color: '#E3E3E3' }}>“</span>
                              <span style={{ position: 'relative', fontSize: '26px', lineHeight: '1.65', color: '#666666' }}>
                                {interp(V.vid?.quote)}
                              </span>
                              {V.vid?.hasCite ? (
                                <>
                                  <span style={{ position: 'relative', marginTop: '22px', fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '14px', letterSpacing: '.05em', color: '#0047BA' }}>
                                    —
                                    {" "}
                                    {interp(V.vid?.cite)}
                                  </span>
                                </>
                              ) : null}
                              <button onClick={V.prev} aria-label="Previous" style={toStyle(V.prevStyle)}>‹</button>
                              <button onClick={V.next} aria-label="Next" style={toStyle(V.nextStyle)}>›</button>
                            </div>
                          </>
                        ) : null}
                      </div>
                    </Fragment>
                  ))({ ...V, vid: __item, $index: __i })
                )}
              </div>
            </div>
            <div style={{ marginTop: '16px' }}>
              {interp(V.dotsEl)}
            </div>
          </>
        ) : null}
      </div>
      </div>
    )
  }
}
