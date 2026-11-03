// The "Watch & Learn" carousel on each principle page. Each item is a tile:
// its quote (if it has one) on top and its video or devotional link below.
// Tiles sit flat on the page; moving to another one lifts the current tile
// into a card, slides to the next tile (which arrives lifted), and then lets
// it settle back into the page. The arrows sit in strips beside the tile and
// the whole strip is clickable; on screens too narrow for a 320px tile plus
// the strips, the arrows go away and the carousel is swiped.
import { Component, createRef } from 'react'
import { interp } from './util.js'

const LIFT_MS = 150    // the current tile lifts
const SLIDE_MS = 420   // the carousel slides to the next tile
const MIN_TILE = 320   // narrowest tile that still gets arrows beside it
const STRIP = 44       // width of each arrow strip
const GUTTER = 16      // room each side of a tile for its lifted shadow

const PLEX = "'IBM Plex Sans',system-ui,sans-serif"

function Chevron({ dir }) {
  return (
    <svg className="vc-chevron" width="16" height="28" viewBox="0 0 16 28" aria-hidden="true">
      <polyline points={dir < 0 ? '13,2 3,14 13,26' : '3,2 13,14 3,26'} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Quote({ vid, large }) {
  return (
    <blockquote className={'vc-quote' + (large ? ' vc-quote--only' : '')}>
      <span className="vc-quote__text">“{interp(vid.quote)}”</span>
      {vid.cite ? <span className="vc-quote__cite">— {interp(vid.cite)}</span> : null}
    </blockquote>
  )
}

function Media({ vid }) {
  if (vid.id) {
    return (
      <div className="vc-frame" style={{ position: 'relative' }}>
        <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #E3E3E3', background: '#000' }}>
          <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
            <iframe src={`https://www.youtube.com/embed/${vid.id}`} title={vid.title || ''} style={{ position: 'absolute', inset: '0', width: '100%', height: '100%', border: '0' }} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen="" />
          </div>
        </div>
      </div>
    )
  }
  if (vid.href) {
    return (
      <div className="vc-frame" style={{ position: 'relative' }}>
        <a href={vid.href} target="_blank" rel="noopener" style={{ display: 'block', borderRadius: '12px', overflow: 'hidden', border: '1px solid #E3E3E3', textDecoration: 'none' }}>
          <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', background: '#1B2A4A' }}>
            <img src={vid.thumb || ''} alt="" style={{ position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: '0', background: 'linear-gradient(180deg,rgba(10,15,30,.05) 40%,rgba(10,15,30,.55) 100%)' }} />
            <div style={{ position: 'absolute', inset: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ width: '66px', height: '66px', borderRadius: '50%', background: 'rgba(0,71,186,.86)', border: '1.5px solid rgba(255,255,255,.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '24px', paddingLeft: '5px', boxShadow: '0 6px 22px rgba(0,0,0,.35)' }}>
                ▶
              </span>
            </div>
            <span style={{ position: 'absolute', left: '14px', bottom: '12px', display: 'flex', alignItems: 'center', gap: '7px', fontFamily: PLEX, fontSize: '12.5px', fontWeight: '600', color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,.6)' }}>
              Watch on churchofjesuschrist.org <span style={{ fontSize: '14px' }}>↗</span>
            </span>
          </div>
        </a>
      </div>
    )
  }
  return null
}

export default class VideoCarousel extends Component {
  state = { cur: 0, lifted: [], heights: [], arrows: true };
  root = createRef();
  tiles = [];

  vids() { return Array.isArray(this.props.videos) ? this.props.videos : []; }

  componentDidMount() {
    this._ro = new ResizeObserver(() => this.measure());
    if (this.root.current) this._ro.observe(this.root.current);
    this.tiles.forEach(t => t && this._ro.observe(t));
    this.measure();
  }
  componentWillUnmount() {
    if (this._ro) this._ro.disconnect();
    clearTimeout(this._tLift);
    clearTimeout(this._tSettle);
  }
  measure() {
    const el = this.root.current;
    if (!el) return;
    const arrows = el.clientWidth >= MIN_TILE + 2 * (STRIP + GUTTER);
    const heights = this.tiles.map(t => (t ? t.offsetHeight : 0));
    const s = this.state;
    if (arrows !== s.arrows || heights.some((h, i) => h !== s.heights[i]) || heights.length !== s.heights.length) {
      this.setState({ arrows, heights });
    }
  }

  // Lift → slide → settle. A new move while one is under way carries on from
  // wherever the carousel is heading.
  moveTo(i) {
    const n = this.vids().length;
    const target = Math.max(0, Math.min(n - 1, i));
    if (target === (this._target ?? this.state.cur)) return;
    this._target = target;
    this.setState(s => ({ lifted: Array.from(new Set([...s.lifted, s.cur, target])) }));
    if (this._sliding) {
      this.setState({ cur: target });
      this._armSettle();
    } else if (!this._tLift) {
      this._tLift = setTimeout(() => {
        this._tLift = null;
        this._sliding = true;
        this.setState({ cur: this._target });
        this._armSettle();
      }, LIFT_MS);
    }
  }
  _armSettle() {
    clearTimeout(this._tSettle);
    this._tSettle = setTimeout(() => {
      this._sliding = false;
      this._target = null;
      this.setState({ lifted: [] });
    }, SLIDE_MS);
  }
  step(d) { this.moveTo((this._target ?? this.state.cur) + d); }

  ts = (e) => { this._x = e.touches[0].clientX; this._d = 0; };
  tm = (e) => { if (this._x != null) this._d = e.touches[0].clientX - this._x; };
  te = () => {
    const d = this._d || 0;
    if (Math.abs(d) > 40) this.step(d < 0 ? 1 : -1);
    this._x = null; this._d = 0;
  };

  render() {
    const vids = this.vids();
    const n = vids.length;
    if (n === 0) {
      return (
        <div className="sc-host" data-sc-name="VideoCarousel">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '44px 24px', border: '1.5px dashed #CCCCCC', borderRadius: '12px', background: '#F5F6F8' }}>
            <span style={{ fontSize: '24px', color: '#8C8C8C' }}>▶</span>
            <span style={{ fontFamily: PLEX, fontSize: '14px', color: '#666666', textAlign: 'center' }}>
              No videos here yet — share links to add them.
            </span>
          </div>
        </div>
      )
    }
    const { lifted, heights, arrows } = this.state;
    const cur = Math.min(this.state.cur, n - 1);
    const h = heights[cur];
    const many = n > 1;
    const showArrows = arrows && many;
    return (
      <div className="sc-host" data-sc-name="VideoCarousel">
        <div ref={this.root} className={'vc' + (showArrows ? ' vc--arrows' : '')} style={{ '--vc-strip': (showArrows ? STRIP : 0) + 'px', '--vc-gutter': (showArrows ? GUTTER : 8) + 'px', '--vc-pad': (showArrows ? 18 : 12) + 'px' }}>
          <div className="vc-stage" style={{ height: h ? h + 'px' : undefined }}>
            {showArrows ? (
              <button className="vc-strip vc-strip--prev" onClick={() => this.step(-1)} aria-label="Previous" tabIndex={cur === 0 ? -1 : 0} data-hidden={cur === 0 ? 'true' : undefined}>
                <Chevron dir={-1} />
              </button>
            ) : null}
            <div className="vc-viewport">
              <div className="vc-track" style={{ transform: `translateX(-${cur * 100}%)` }} onTouchStart={this.ts} onTouchMove={this.tm} onTouchEnd={this.te}>
                {vids.map((vid, i) => {
                  const quoteOnly = vid.type === 'quote';
                  return (
                    <div className="vc-slide" key={i} aria-hidden={i === cur ? undefined : 'true'}>
                      <div ref={el => { this.tiles[i] = el; }} className={'vc-tile' + (lifted.includes(i) ? ' is-lifted' : '')}>
                        {vid.quote ? <Quote vid={vid} large={quoteOnly} /> : null}
                        {quoteOnly ? null : <Media vid={vid} />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {showArrows ? (
              <button className="vc-strip vc-strip--next" onClick={() => this.step(1)} aria-label="Next" tabIndex={cur >= n - 1 ? -1 : 0} data-hidden={cur >= n - 1 ? 'true' : undefined}>
                <Chevron dir={1} />
              </button>
            ) : null}
          </div>
          {many ? (
            <div className="vc-dots">
              {vids.map((_, i) => (
                <button key={i} aria-label="Go to item" aria-current={i === cur ? 'true' : undefined} className={'vc-dot' + (i === cur ? ' is-active' : '')} onClick={() => this.moveTo(i)} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    )
  }
}
