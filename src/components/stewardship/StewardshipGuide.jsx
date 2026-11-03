// The Stewardship of AI guidebook, as a page of the site (it used to run as a
// separate document in a frame, on its own copy of React). The behaviour below
// is the original guidebook's logic class kept as-is — scroll-driven painting,
// scenes, the side rail, scripture pop-ups, footnotes — now a React class
// component. The only changes are marked under "Site integration": the view
// follows the page address, and the guide uses the site's fonts.
import { Component } from 'react'
import HomeView from './HomeView.jsx'
import AgencyView from './AgencyView.jsx'
import BecomingView from './BecomingView.jsx'
import FellowshipView from './FellowshipView.jsx'
import DiscernmentView from './DiscernmentView.jsx'
import IntegrityView from './IntegrityView.jsx'
import { asset } from './util.js'
import { slugForView } from '../../data/stewardship.js'

// The site header's current height. The guide used to sit below the header in
// its own frame; now it's on the page, so jumps to a section of a principle
// page (the step rail, footnote links) stop below the header too.
function siteHeaderHeight() {
  return parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-cur')) || 0
}

// The shell every view shares: image preloads and the painting behind the
// guide (the logic zooms and moves it as you scroll or change view).
function GuideShell({ V }) {
  return (
    <div style={{ background: '#FFFFFF', minHeight: '100dvh', color: '#FFFFFF', fontFamily: "'IBM Plex Sans',system-ui,sans-serif", WebkitFontSmoothing: 'antialiased' }}>
      <div style={{ position: 'fixed', width: '1px', height: '1px', overflow: 'hidden', opacity: '0', pointerEvents: 'none', top: '-9999px', left: '-9999px' }}>
        <img src={asset('agency-dixon-hiker.png')} alt="" />
        {" "}
        <img src={asset('becoming-pissarro-garden.jpg')} alt="" />
        {" "}
        <img src={asset('fellowship-catlin-council.jpg')} alt="" />
        {" "}
        <img src={asset('discernment-candlelight-reader.png')} alt="" />
        {" "}
        <img src={asset('integrity-mirror-cropped.png')} alt="" />
        {" "}
        <img src={asset('stewardship-hudson-valley.jpg')} alt="" />
      </div>
      <div className="stew-hero-fixed" style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100dvh', overflow: 'hidden', zIndex: '0' }} data-hero-bounds="true">
        <p className="stew-hero-fade stew-hero-caption" style={{ position: 'absolute', left: '20px', bottom: '14px', zIndex: '2', margin: '0', fontFamily: "'IBM Plex Sans',system-ui,sans-serif", fontSize: '11px', letterSpacing: '.05em', color: 'rgba(255,255,255,0.6)', whiteSpace: 'nowrap' }}>
          George Inness, The Lackawanna Valley, 1855
        </p>
        <div className="stew-paper" style={{ position: 'absolute', inset: '0', background: '#FFFFFF', display: 'block', opacity: '0', zIndex: '1', pointerEvents: 'none' }} />
        <img className="stew-hero-img" src={asset('stewardship-lackawanna-valley.jpg')} alt="George Inness, The Lackawanna Valley, a pastoral painting of a valley with a train winding through fields" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 100%', display: 'block', transformOrigin: '50% 100%', willChange: 'transform' }} />
      </div>
      {V.isHome ? <HomeView V={V} /> : null}
      {V.isPurpose ? <AgencyView V={V} /> : null}
      {V.isIdentity ? <BecomingView V={V} /> : null}
      {V.isRelationships ? <FellowshipView V={V} /> : null}
      {V.isGrowth ? <DiscernmentView V={V} /> : null}
      {V.isAction ? <IntegrityView V={V} /> : null}
    </div>
  )
}

export default class StewardshipGuide extends Component {
  state = { view: 'home', agencyShown: false, homeReturnPending: false, todoChecked: null, todoOpen: true, scriptureOpen: null, scripturePinned: null, footnotesOpen: {}, practiceTab: { agency: 0, becoming: 0, fellowship: 0, discernment: 0, action: 0 }, kickerPos: { x: 120, y: 130 } };
  toggleFootnotes(page) { this.setState(s => ({ footnotesOpen: { ...s.footnotesOpen, [page]: !s.footnotesOpen[page] } })); }

  onKickerDragStart = (e) => {
    e.preventDefault();
    const startX = e.clientX, startY = e.clientY;
    const origin = this.state.kickerPos;
    const hero = e.currentTarget.closest('[data-hero-bounds]');
    const move = (ev) => {
      const dx = ev.clientX - startX, dy = ev.clientY - startY;
      let x = origin.x + dx, y = origin.y + dy;
      if (hero) {
        const r = hero.getBoundingClientRect();
        x = Math.max(0, Math.min(x, r.width - 40));
        y = Math.max(0, Math.min(y, r.height - 40));
      }
      this.setState({ kickerPos: { x, y } });
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };

  // --- Progress spine (Agency page) -----------------------------------
  // Config lives in one place: reorder/relabel sections here, and give the
  // matching section a `data-spine-key` + `ref="{{ agencySectionRef }}"` in
  // the template to wire it up.
  agencySpineDefs = [
    { key: 'principle', label: 'Principle' },
    { key: 'pause', label: 'Pause' },
    { key: 'practice', label: 'Practice' },
    { key: 'watch', label: 'Watch & Learn' },
  ];

  // Sets up spine tracking (called once, merged into the app's existing
  // componentDidMount below). Active-section detection is scroll-driven with
  // hysteresis: a section stays active until scrolling ~1/4 of the viewport
  // past the trigger line into the next (or back into the previous) one,
  // so it doesn't flip the instant a new section peeks into view.
  agencySpineInit = () => {
    // Spine shows once the Principle section scrolls into view, and stays
    // shown for the rest of the page (only hides if scrolled back above it).
    this.agencyHeroObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) this.setState({ agencySpineVisible: true });
        else if (entry.boundingClientRect.top > 0) this.setState({ agencySpineVisible: false });
      });
    }, { threshold: 0 });
    this._onAgencySpineScroll = () => this.agencySpineCompute();
    window.addEventListener('scroll', this._onAgencySpineScroll, { passive: true });
    window.addEventListener('resize', this._onAgencySpineScroll);
    this.agencySpineScan();
    this._onAgencyFadeScroll = () => {
      const hero = document.querySelector('.view .agency-step.first');
      if (!hero) return;
      const past = hero.getBoundingClientRect().bottom < window.innerHeight * 0.75;
      [document.querySelector('.view nav[aria-label="Section progress"]'),
       document.querySelector('.view [data-spine-key="principle"]')].forEach((el) => {
        if (!el) return;
        el.style.setProperty('transition', 'opacity .9s ease, transform .9s ease', 'important');
        el.style.setProperty('opacity', past ? '1' : '0', 'important');
        el.style.setProperty('transform', past ? 'none' : 'translateY(26px)', 'important');
      });
    };
    window.addEventListener('scroll', this._onAgencyFadeScroll, { passive: true });
    window.addEventListener('resize', this._onAgencyFadeScroll);
    this._onAgencyFadeScroll();
  };

  // This runtime doesn't support element `ref` callbacks, so we pick up
  // newly-mounted spine/hero nodes (e.g. after navigating to the Agency
  // page) by re-scanning the DOM after every render instead (called from
  // the app's existing componentDidUpdate below).
  agencySpineScan = () => {
    this._spineEls = Array.from(document.querySelectorAll('[data-spine-key]'));
    if (this.agencyHeroObserver) {
      document.querySelectorAll('[data-spine-key="principle"]').forEach((hero) => {
        if (!hero.dataset.spineHeroObserved) {
          this.agencyHeroObserver.observe(hero);
          hero.dataset.spineHeroObserved = '1';
        }
      });
    }
    this.agencySpineCompute();
  };

  agencySpineCompute = () => {
    const els = this._spineEls;
    if (!els || !els.length) return;
    const vh = window.innerHeight || 1;
    const line = vh * 0.4;
    const buffer = vh * 0.25;
    let active = this.state.agencySpineActive;
    let activeIdx = els.findIndex((el) => el.getAttribute('data-spine-key') === active);
    if (activeIdx === -1) {
      for (let i = els.length - 1; i >= 0; i--) {
        if (els[i].getBoundingClientRect().top <= line) { active = els[i].getAttribute('data-spine-key'); break; }
      }
      if (!active) active = els[0].getAttribute('data-spine-key');
    } else {
      const next = els[activeIdx + 1];
      const prev = els[activeIdx - 1];
      if (next && next.getBoundingClientRect().top <= line - buffer) {
        active = next.getAttribute('data-spine-key');
      } else if (prev && prev.getBoundingClientRect().bottom >= line + buffer) {
        active = prev.getAttribute('data-spine-key');
      }
    }
    if (active !== this.state.agencySpineActive) this.setState({ agencySpineActive: active });
  };

  agencyJump = (key) => {
    const el = document.querySelector('[data-spine-key="' + key + '"]');
    if (!el) return;
    const bar = document.querySelector('.view nav[aria-label="Section progress"]');
    const off = (bar ? bar.offsetHeight : 0) + 16 + siteHeaderHeight();
    const top = el.getBoundingClientRect().top + window.scrollY - off;
    window.scrollTo({ top, behavior: 'smooth' });
  };
  goToFootnote(page, id, e) {
    if (e && e.preventDefault) e.preventDefault();
    this.setState(s => ({ footnotesOpen: { ...s.footnotesOpen, [page]: true } }));
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.pageYOffset - 120 - siteHeaderHeight();
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 60);
  }
  setPracticeTab(page, i) { this.setState(s => ({ practiceTab: { ...s.practiceTab, [page]: i } })); }
  clearPaper() {
    const p = document.querySelector('.stew-paper');
    if (p) p.style.opacity = '0';
  }
  componentDidMount() {
    // Scripture verses open on click (not hover). Clicking anywhere other
    // than a scripture reference or the open verse itself, or pressing
    // Escape, closes it.
    this._onScriptureAway = (e) => {
      if (!this.state.scripturePinned) return;
      const t = e.target;
      if (t && t.closest && t.closest('.agency-ref-btn, .stew-ref, .a-verse.is-open, .stew-verse-pop')) return;
      this.setState({ scripturePinned: null });
    };
    this._onScriptureEsc = (e) => {
      if (e.key === 'Escape' && this.state.scripturePinned) this.setState({ scripturePinned: null });
    };
    document.addEventListener('click', this._onScriptureAway);
    document.addEventListener('keydown', this._onScriptureEsc);
    try {
      const raw = localStorage.getItem('stewardship_todo');
      if (raw) this.setState({ todoChecked: JSON.parse(raw) });
    } catch (e) {}
    this._onFnClick = (e) => {
      const a = e.target.closest('a[href^="#fn-"]');
      if (!a) return;
      const id = a.getAttribute('href').slice(1);
      const m = id.match(/^fn-([a-z]+)-/);
      if (!m) return;
      e.preventDefault();
      this.setState((s) => ({ footnotesOpen: { ...s.footnotesOpen, [m[1]]: true } }), () => {
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el && el.scrollIntoView) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 50);
      });
    };
    document.addEventListener('click', this._onFnClick);
    this._driveScenes();
    this.agencySpineInit();
    this.applySizeVars();
    this._lastView = this.state.view;
    this._paintHeroZoom();
    window.addEventListener('scroll', this._paintHeroZoom, { passive: true });
    window.addEventListener('resize', this._paintHeroZoom);
    // Opened straight on a principle's address: switch to it the same way a
    // card click does (so its opening animation plays).
    if (this.props.routeView !== 'home') this._showView(this.props.routeView);
  }
  _paintHeroZoom = () => {
    const fixed = document.querySelector('.stew-hero-fixed');
    if (!fixed) return;
    const img = document.querySelector('.stew-hero-img');
    const caption = document.querySelector('.stew-hero-caption');
    const view = this.state.view;
    fixed.style.transition = 'opacity .6s ease';
    if (view === 'home') {
      fixed.style.opacity = '1';
      fixed.style.position = 'absolute';
      fixed.style.top = '0';
      fixed.style.height = '58dvh';
      fixed.style.borderBottom = 'none';
      {
        const tb = document.querySelector('.stew-hero-content > div:first-child');
        const sp = document.querySelector('.stew-hero-spacer');
        if (tb && sp) { const h = Math.ceil(Math.max(tb.getBoundingClientRect().bottom + window.scrollY + 24, window.innerHeight)) + 'px'; if (sp.style.height !== h) sp.style.height = h; }
      }
      if (img) img.style.transition = this._justReturnedHome ? 'transform .5s ease, object-position .5s ease' : 'none';
      const fades = document.querySelectorAll('.stew-hero-fade');
      const title = document.querySelector('.stew-morph-title');
      const target = document.querySelector('.stew-title-target');
      const vh = window.innerHeight || 1;
      const spacerEl = document.querySelector('.stew-hero-spacer');
      const range = Math.max(spacerEl ? spacerEl.offsetHeight : (document.documentElement.scrollHeight - vh), 1);
      const scrolled = Math.min(Math.max(window.scrollY, 0), range);
      const p = scrolled / range;
      // image keeps zooming for the whole scroll
      const homeScale = 1;
      this._imgScale = homeScale; this._imgPos = [50, 100];
      if (img) { img.style.transform = 'none'; img.style.objectPosition = '50% 62%'; }
      // surrounding hero text is fully gone well before the next section
      const fadeOut = 1;
      fades.forEach((el) => { el.style.opacity = '1'; });
      // painting dissolves into paper as the hero leaves
      const paper = document.querySelector('.stew-paper');
      let paperT = 0;
      if (paper) paper.style.opacity = '0';
      // hero title simply fades with the rest of the hero
      if (title) {
        title.style.transform = 'none';
        title.style.opacity = '1';
      }
      if (target) target.style.visibility = 'visible';
    } else if (view === 'purpose' || view === 'identity' || view === 'relationships' || view === 'growth' || view === 'action') {
      const paperOff = document.querySelector('.stew-paper');
      if (paperOff) { paperOff.style.transition = 'none'; paperOff.style.opacity = '1'; }
      fixed.style.position = 'fixed';
      fixed.style.top = '0';
      fixed.style.height = '100dvh';
      fixed.style.borderBottom = 'none';
      fixed.style.opacity = '1';
      if (caption) caption.style.opacity = '0';
      if (img) {
        img.style.transition = 'none';
        if (this._purposeSettled) {
          const py = Math.min(window.scrollY * 0.03, window.innerHeight * 0.35);
          img.style.transform = 'scale(2.15) translateY(' + py.toFixed(1) + 'px)';
          img.style.objectPosition = '29% 46%';
        }
      }
    } else {
      fixed.style.opacity = '0';
    }
  };
  _flowToPurpose = () => {
    const img = document.querySelector('.stew-hero-img');
    const fixed = document.querySelector('.stew-hero-fixed');
    const caption = document.querySelector('.stew-hero-caption');
    if (!img || !fixed) return;
    fixed.style.transition = 'none';
    fixed.style.opacity = '1';
    if (caption) caption.style.opacity = '0';
    img.style.transition = 'none';
    this._purposeSettled = false;
    const startScale = this._imgScale ?? 1;
    const startPos = this._imgPos ?? [50, 100];
    const endScale = 2.15;
    const endPos = [29, 46];
    const duration = 1150;
    const t0 = performance.now();
    if (this._flowRaf) cancelAnimationFrame(this._flowRaf);
    const step = (t) => {
      const raw = Math.min(1, (t - t0) / duration);
      const e = raw * raw * (3 - 2 * raw);
      const scale = startScale + (endScale - startScale) * e;
      const x = startPos[0] + (endPos[0] - startPos[0]) * e;
      const y = startPos[1] + (endPos[1] - startPos[1]) * e;
      img.style.transform = 'scale(' + scale.toFixed(4) + ')';
      img.style.objectPosition = x.toFixed(2) + '% ' + y.toFixed(2) + '%';
      this._imgScale = scale; this._imgPos = [x, y];
      if (raw < 1) { this._flowRaf = requestAnimationFrame(step); } else { this._purposeSettled = true; }
    };
    this._flowRaf = requestAnimationFrame(step);
  };
  applySizeVars() {
    const r = document.documentElement.style;
    const p = this.props;
    r.setProperty('--title-font-size', (p.titleFontSize ?? 92) + 'px');
    r.setProperty('--title-box-width', (p.titleBoxWidth ?? 1800) + 'px');
    r.setProperty('--principle-font-size', (p.principleFontSize ?? 42) + 'px');
    r.setProperty('--principle-box-width', (p.principleBoxWidth ?? 900) + 'px');
    r.setProperty('--pause-font-size', (p.pauseFontSize ?? 76) + 'px');
    r.setProperty('--pause-box-width', (p.pauseBoxWidth ?? 900) + 'px');
    r.setProperty('--practice-font-size', (p.practiceFontSize ?? 22) + 'px');
    r.setProperty('--practice-box-width', (p.practiceBoxWidth ?? 1180) + 'px');
  }
  _driveScenes() {
    const paint = () => {
      const scenes = document.querySelectorAll('.agency-step:not(.agency-flow)');
      if (!scenes.length) return;
      const vh = window.innerHeight || 1;
      const viewCenter = window.scrollY + vh / 2;
      scenes.forEach((el) => {
        // layout box (offset*) so the measurement is unaffected by the scale we set
        let top = 0;
        for (let node = el; node; node = node.offsetParent) top += node.offsetTop;
        const d = Math.abs(top + el.offsetHeight / 2 - viewCenter) / vh;
        // ramp spans the full 1vh spacing between scene centres, so neighbours crossfade
        const op = Math.max(0, Math.min(1, (1.05 - d) / 0.8));
        const next = op.toFixed(3);
        if (el.dataset.sceneOp !== next) {
          el.dataset.sceneOp = next;
          el.style.opacity = next;
          el.style.transform = 'scale(' + (0.9 + 0.1 * op).toFixed(3) + ')';
        }
      });
    };
    this._paintScenes = paint;
    window.addEventListener('scroll', paint, { passive: true });
    window.addEventListener('resize', paint);
    const observe = () => {
      if (!window.IntersectionObserver) return;
      if (this._sceneIo) this._sceneIo.disconnect();
      this._sceneIo = new IntersectionObserver(paint, { threshold: Array.from({ length: 21 }, (_, i) => i / 20) });
      document.querySelectorAll('.agency-step:not(.agency-flow)').forEach((el) => this._sceneIo.observe(el));
    };
    this._observeScenes = observe;
    observe();
    let lastY = -1;
    const tick = () => {
      if (window.scrollY !== lastY) { lastY = window.scrollY; paint(); }
      this._sceneRaf = requestAnimationFrame(tick);
    };
    this._sceneRaf = requestAnimationFrame(tick);
    if (this._sceneTimer) clearInterval(this._sceneTimer);
    this._sceneTimer = setInterval(paint, 200);
    paint();
    [60, 250, 600].forEach((t) => setTimeout(paint, t));
  }
  componentDidUpdate(prevProps) {
    if (prevProps.locationKey !== this.props.locationKey) this._followRoute()
    if (this._lastView !== this.state.view && this.state.view !== 'home') this.clearPaper();
    if (this._lastView !== this.state.view && (this.state.view === 'purpose' || this.state.view === 'identity' || this.state.view === 'relationships' || this.state.view === 'growth' || this.state.view === 'action')) {
      this._flowToPurpose();
      this.setState({ agencyShown: false });
      requestAnimationFrame(() => requestAnimationFrame(() => this.setState({ agencyShown: true })));
    }
    if ((this._lastView === 'purpose' || this._lastView === 'identity' || this._lastView === 'relationships' || this._lastView === 'growth' || this._lastView === 'action') && this.state.view !== this._lastView && this.state.agencyShown) {
      this.setState({ agencyShown: false });
    }
    this._lastView = this.state.view;
    if (this._paintHeroZoom) this._paintHeroZoom();
    if (this._paintScenes) this._paintScenes();
    if (this._observeScenes) this._observeScenes();
    this.agencySpineScan();
    if (this._onAgencyFadeScroll) this._onAgencyFadeScroll();
    this.applySizeVars();
  }
  componentWillUnmount() {
    document.removeEventListener('click', this._onScriptureAway);
    document.removeEventListener('keydown', this._onScriptureEsc);
    if (this._paintHeroZoom) {
      window.removeEventListener('scroll', this._paintHeroZoom);
      window.removeEventListener('resize', this._paintHeroZoom);
    }
    if (this._onFnClick) document.removeEventListener('click', this._onFnClick);
    if (this._paintScenes) {
      window.removeEventListener('scroll', this._paintScenes);
      window.removeEventListener('resize', this._paintScenes);
    }
    if (this._sceneIo) this._sceneIo.disconnect();
    if (this._sceneRaf) cancelAnimationFrame(this._sceneRaf);
    if (this._sceneTimer) clearInterval(this._sceneTimer);
    if (this.agencyHeroObserver) this.agencyHeroObserver.disconnect();
    if (this._onAgencySpineScroll) {
      window.removeEventListener('scroll', this._onAgencySpineScroll);
      window.removeEventListener('resize', this._onAgencySpineScroll);
    }
    if (this._onAgencyFadeScroll) {
      window.removeEventListener('scroll', this._onAgencyFadeScroll);
      window.removeEventListener('resize', this._onAgencyFadeScroll);
    }
  }
  // Original "Back to Principles" animation (was `goHomeToContent`): fade the
  // principle out, then show home scrolled to the five cards.
  _returnHome() {
    this.setState({ agencyShown: false });
    this._flowBackFromPurpose();
    setTimeout(() => {
      window.scrollTo({ top: window.innerHeight * 2, behavior: 'auto' });
      this._justReturnedHome = true;
      this.setState({ view: 'home', homeReturnPending: true }, () => this._clampToGuide());
      setTimeout(() => { this._justReturnedHome = false; }, 550);
      requestAnimationFrame(() => requestAnimationFrame(() => this.setState({ homeReturnPending: false })));
    }, 950);
  }
  _flowBackFromPurpose = () => {
    const img = document.querySelector('.stew-hero-img');
    if (!img) return;
    this._purposeSettled = false;
    img.style.transition = 'none';
    const startScale = this._imgScale ?? 2.15;
    const startPos = this._imgPos ?? [29, 46];
    const endScale = 1.4;
    const endPos = [50, 100];
    const duration = 900;
    const t0 = performance.now();
    if (this._flowRaf) cancelAnimationFrame(this._flowRaf);
    const step = (t) => {
      const raw = Math.min(1, (t - t0) / duration);
      const e = raw * raw * (3 - 2 * raw);
      const scale = startScale + (endScale - startScale) * e;
      const x = startPos[0] + (endPos[0] - startPos[0]) * e;
      const y = startPos[1] + (endPos[1] - startPos[1]) * e;
      img.style.transform = 'scale(' + scale.toFixed(4) + ')';
      img.style.objectPosition = x.toFixed(2) + '% ' + y.toFixed(2) + '%';
      this._imgScale = scale; this._imgPos = [x, y];
      if (raw < 1) this._flowRaf = requestAnimationFrame(step);
    };
    this._flowRaf = requestAnimationFrame(step);
  };
  // Original view switch (was `go`): show a principle (or home at the top).
  _showView(view) {
    this.setState({ view, scripturePinned: null });
    requestAnimationFrame(() => {
      const preHero = view === 'purpose' ? document.getElementById('agency-prehero-nav') : null;
      window.scrollTo({ top: preHero ? preHero.offsetHeight : 0, behavior: 'auto' });
    });
  }
  openScripture(key) {
    this.setState({ scriptureOpen: key });
  }
  closeScripture() {
    this.setState({ scriptureOpen: null });
  }
  toggleScripturePin(key) {
    this.setState(s => ({ scripturePinned: s.scripturePinned === key ? null : key }));
  }
  renderVals() {
    const v = this.state.view;
    const go = (id) => () => this.go(id);
    const onAgencyEscape = () => this.goHomeToContent();
    const onBecomingEscape = () => this.goHomeToContent();
    const onFellowshipEscape = () => this.goHomeToContent();
    const onDiscernmentEscape = () => this.goHomeToContent();
    const onIntegrityEscape = () => this.goHomeToContent();
    const agencyShownClass = this.state.agencyShown ? 'is-shown' : '';
    const homeReturnClass = this.state.homeReturnPending ? 'fade-pending' : '';
    const isBecomingScriptureOpen = this.state.scriptureOpen === 'becoming';
    const clearBecoming = () => this.setState(s => ({
      scriptureOpen: null,
      scripturePinned: (s.scripturePinned === 'becoming' || s.scripturePinned === 'becoming2') ? null : s.scripturePinned
    }));
    const onBecomingScriptureEnter = () => {}; // verses open on click (see onBecomingScriptureToggle)
    const onBecomingScriptureLeave = () => {};
    const isBecoming2ScriptureOpen = this.state.scriptureOpen === 'becoming2';
    const onBecoming2ScriptureEnter = () => {}; // verses open on click (see onBecoming2ScriptureToggle)
    const onBecoming2ScriptureLeave = () => {};
    const isAgencyScriptureOpen = this.state.scriptureOpen === 'agency';
    const onAgencyScriptureEnter = () => {}; // verses open on click (see onAgencyScriptureToggle)
    const onAgencyScriptureLeave = () => {};
    const onAgencyHeroLeave = () => {};
    const isBednarTooltipOpen = this.state.scriptureOpen === 'bednar-link';
    const onBednarLinkEnter = () => this.openScripture('bednar-link');
    const onBednarLinkLeave = () => this.closeScripture();
    const isAgency2ScriptureOpen = this.state.scriptureOpen === 'agency2';
    const onAgency2ScriptureEnter = () => {}; // verses open on click (see onAgency2ScriptureToggle)
    const onAgency2ScriptureLeave = () => {};
    const agencyRefOpenKey = this.state.scriptureOpen || this.state.scripturePinned;
    const isAgencyVerseOpen = agencyRefOpenKey === 'agency' || agencyRefOpenKey === 'agency2';
    if (isAgencyVerseOpen) this._lastAgencyKey = agencyRefOpenKey;
    const agencyShowKey = isAgencyVerseOpen ? agencyRefOpenKey : (this._lastAgencyKey || '');
    const agencyVerseText = agencyShowKey === 'agency'
      ? 'And because that they are redeemed from the fall they have become free forever, knowing good from evil; to act for themselves and not to be acted upon.'
      : agencyShowKey === 'agency2'
      ? 'For the earth is full, and there is enough and to spare; yea, I prepared all things, and have given unto the children of men to be agents unto themselves.'
      : '';
    const agencyScriptureClass = 'agency-scripture' + (isAgencyVerseOpen ? ' is-open' : '');
    const agencyVerseBoxClass = 'a-verse' + (isAgencyVerseOpen ? ' is-open' : '');
    const agencyVerseRef = agencyShowKey === 'agency' ? '2 Nephi 2:26' : agencyShowKey === 'agency2' ? 'D&C 104:17' : '';
    const becomingRefOpenKey = this.state.scriptureOpen || this.state.scripturePinned;
    const isBecomingVerseOpen = becomingRefOpenKey === 'becoming' || becomingRefOpenKey === 'becoming2';
    if (isBecomingVerseOpen) this._lastBecomingKey = becomingRefOpenKey;
    const becomingShowKey = isBecomingVerseOpen ? becomingRefOpenKey : (this._lastBecomingKey || '');
    const becomingVerseBoxClass = 'a-verse' + (isBecomingVerseOpen ? ' is-open' : '');
    const onBecomingHeroLeave = () => {};
    const becomingVerseText = becomingShowKey === 'becoming'
      ? 'Behold, I have refined thee, but not with silver; I have chosen thee in the furnace of affliction.'
      : becomingShowKey === 'becoming2'
      ? 'And not only so, but we glory in tribulations also: knowing that tribulation worketh patience; and patience, experience; and experience, hope: and hope maketh not ashamed; because the love of God is shed abroad in our hearts by the Holy Ghost which is given unto us.'
      : '';
    const becomingVerseRef = becomingShowKey === 'becoming' ? 'Isaiah 48:10' : becomingShowKey === 'becoming2' ? 'Romans 5:3-5' : '';
    const becomingScriptureClass = 'agency-scripture' + (isBecomingVerseOpen ? ' is-open' : '');
    const becomingVerseFontSize = becomingRefOpenKey === 'becoming' ? 37 : 27;
    const onBecomingScriptureToggle = () => this.toggleScripturePin('becoming');
    const onBecoming2ScriptureToggle = () => this.toggleScripturePin('becoming2');
    const fellowshipRefOpenKey = this.state.scriptureOpen || this.state.scripturePinned;
    const isFellowshipVerseOpen = fellowshipRefOpenKey === 'fellowship' || fellowshipRefOpenKey === 'fellowship2' || fellowshipRefOpenKey === 'fellowship3';
    if (isFellowshipVerseOpen) this._lastFellowshipKey = fellowshipRefOpenKey;
    const fellowshipShowKey = isFellowshipVerseOpen ? fellowshipRefOpenKey : (this._lastFellowshipKey || '');
    const fellowshipVerseBoxClass = 'a-verse' + (isFellowshipVerseOpen ? ' is-open' : '');
    const onFellowshipHeroLeave = () => {};
    const fellowshipVerseText = fellowshipShowKey === 'fellowship'
      ? '"Umuntu ngumuntu ngabantu" — often translated as "A person is a person through other people."'
      : fellowshipShowKey === 'fellowship2'
      ? "And it came to pass that he said unto them: Behold, here are the waters of Mormon, and now, as ye are desirous to come into the fold of God, and are willing to bear one another's burdens, that they may be light; yea, and are willing to mourn with those that mourn; yea, and comfort those that stand in need of comfort ..."
      : fellowshipShowKey === 'fellowship3'
      ? 'Iron sharpeneth iron; so a man sharpeneth the countenance of his friend.'
      : '';
    const fellowshipVerseRef = fellowshipShowKey === 'fellowship' ? 'Ubuntu Philosophy' : fellowshipShowKey === 'fellowship2' ? 'Mosiah 18:8-9' : fellowshipShowKey === 'fellowship3' ? 'Mosiah 27:17' : '';
    const fellowshipScriptureClass = 'agency-scripture' + (isFellowshipVerseOpen ? ' is-open' : '');
    const fellowshipVerseFontSize = fellowshipRefOpenKey === 'fellowship2' ? 24 : fellowshipRefOpenKey === 'fellowship' ? 34 : 27;
    const onFellowshipScriptureToggle = () => this.toggleScripturePin('fellowship');
    const onFellowship2ScriptureToggle = () => this.toggleScripturePin('fellowship2');
    const onFellowship3ScriptureToggle = () => this.toggleScripturePin('fellowship3');
    const discernmentRefOpenKey = this.state.scriptureOpen || this.state.scripturePinned;
    const isDiscernmentVerseOpen = discernmentRefOpenKey === 'discernment';
    if (isDiscernmentVerseOpen) this._lastDiscernmentKey = discernmentRefOpenKey;
    const discernmentShowKey = isDiscernmentVerseOpen ? discernmentRefOpenKey : (this._lastDiscernmentKey || '');
    const discernmentVerseBoxClass = 'a-verse' + (isDiscernmentVerseOpen ? ' is-open' : '');
    const onDiscernmentHeroLeave = () => {};
    const discernmentVerseText = discernmentShowKey === 'discernment'
      ? 'For behold, my brethren, it is given unto you to judge, that ye may know good from evil; and the way to judge is as plain, that ye may know with a perfect knowledge, as the daylight is from the dark night.'
      : '';
    const discernmentVerseRef = discernmentShowKey === 'discernment' ? 'Mosiah 7:15' : '';
    const discernmentScriptureClass = 'agency-scripture' + (isDiscernmentVerseOpen ? ' is-open' : '');
    const onDiscernmentScriptureToggle = () => this.toggleScripturePin('discernment');
    const integrityRefOpenKey = this.state.scriptureOpen || this.state.scripturePinned;
    const isIntegrityVerseOpen = integrityRefOpenKey === 'integrity';
    if (isIntegrityVerseOpen) this._lastIntegrityKey = integrityRefOpenKey;
    const integrityShowKey = isIntegrityVerseOpen ? integrityRefOpenKey : (this._lastIntegrityKey || '');
    const integrityVerseBoxClass = 'a-verse' + (isIntegrityVerseOpen ? ' is-open' : '');
    const onIntegrityHeroLeave = () => {};
    const integrityVerseText = integrityShowKey === 'integrity'
      ? 'And they were all young men, and they were exceedingly valiant for courage, and also for strength and activity; but behold, this was not all\u2014they were men who were true at all times in whatsoever thing they were entrusted. Yea, they were men of truth and soberness, for they had been taught to keep the commandments of God and to walk uprightly before him.'
      : '';
    const integrityVerseRef = integrityShowKey === 'integrity' ? 'Alma 53:20-21' : '';
    const integrityScriptureClass = 'agency-scripture' + (isIntegrityVerseOpen ? ' is-open' : '');
    const onIntegrityScriptureToggle = () => this.toggleScripturePin('integrity');
    const agencySpineActiveKey = this.state.agencySpineActive || 'principle';
    const agencySpineActiveIdx = this.agencySpineDefs.findIndex(s => s.key === agencySpineActiveKey);
    const AGENCY_ROW_H = 190; // keep in sync with .agency-rail-item min-height in CSS
    const agencySpineItems = this.agencySpineDefs.map((s, i) => ({
      key: s.key,
      label: s.label,
      statusClass: i === agencySpineActiveIdx ? 'is-active' : (i < agencySpineActiveIdx ? 'is-passed' : 'is-upcoming'),
      onClick: () => this.agencyJump(s.key),
    }));
    const agencySpineClass = 'agency-spine' + (this.state.agencySpineVisible ? ' is-visible' : '');
    // Glide-dot: an absolutely-positioned glow that eases between rows instead
    // of snapping, driven by the active row's index * fixed row height.
    const agencyGlowTop = Math.max(0, agencySpineActiveIdx) * AGENCY_ROW_H + AGENCY_ROW_H / 2 - 10;
    const agencyActiveSpineKey = agencySpineActiveKey;
    const agencyStepClass = (key) => 'agency-step' + (agencyActiveSpineKey === key ? ' is-spine-active' : '');
    const agencyPrincipleClass = agencyStepClass('principle');
    const agencyPauseClass = agencyStepClass('pause');
    const agencyPauseHeight = (this.props.agencyPauseHeightVh ?? 100) + 'vh';
    const agencyPracticeClass = 'agency-step agency-flow' + (agencyActiveSpineKey === 'practice' ? ' is-spine-active' : '');
    const agencyWatchClass = 'agency-step agency-flow last' + (agencyActiveSpineKey === 'watch' ? ' is-spine-active' : '');
    const onAgencyScriptureToggle = () => this.toggleScripturePin('agency');
    const onAgency2ScriptureToggle = () => this.toggleScripturePin('agency2');
    const isFellowshipScriptureOpen = this.state.scriptureOpen === 'fellowship';
    const onFellowshipScriptureEnter = () => {}; // verses open on click (see onFellowshipScriptureToggle)
    const onFellowshipScriptureLeave = () => {};
    const isFellowship2ScriptureOpen = this.state.scriptureOpen === 'fellowship2';
    const onFellowship2ScriptureEnter = () => {}; // verses open on click (see onFellowship2ScriptureToggle)
    const onFellowship2ScriptureLeave = () => {};
    const isFellowship3ScriptureOpen = this.state.scriptureOpen === 'fellowship3';
    const onFellowship3ScriptureEnter = () => {}; // verses open on click (see onFellowship3ScriptureToggle)
    const onFellowship3ScriptureLeave = () => {};
    const isDiscernmentScriptureOpen = this.state.scriptureOpen === 'discernment';
    const onDiscernmentScriptureEnter = () => {}; // verses open on click (see onDiscernmentScriptureToggle)
    const onDiscernmentScriptureLeave = () => {};
    const isIntegrityScriptureOpen = this.state.scriptureOpen === 'integrity';
    const onIntegrityScriptureEnter = () => {}; // verses open on click (see onIntegrityScriptureToggle)
    const onIntegrityScriptureLeave = () => {};
    const isStewardshipScriptureOpen = this.state.scripturePinned === 'stewardship';
    const cardOn = this.state.cardOn;
    const cardEnter = (k) => () => { if (this.state.cardOn !== k) this.setState({ cardOn: k }); };
    const onCardLeave = () => { if (this.state.cardOn) this.setState({ cardOn: null }); };
    const onCardAgencyEnter = cardEnter('Agency');
    const onCardBecomingEnter = cardEnter('Becoming');
    const onCardFellowshipEnter = cardEnter('Fellowship');
    const onCardDiscernmentEnter = cardEnter('Discernment');
    const onCardIntegrityEnter = cardEnter('Integrity');
    const cardAgencyClass = cardOn === 'Agency' ? 'is-on' : '';
    const cardBecomingClass = cardOn === 'Becoming' ? 'is-on' : '';
    const cardFellowshipClass = cardOn === 'Fellowship' ? 'is-on' : '';
    const cardDiscernmentClass = cardOn === 'Discernment' ? 'is-on' : '';
    const cardIntegrityClass = cardOn === 'Integrity' ? 'is-on' : '';
    const cardIndex = { Agency: 1, Becoming: 2, Fellowship: 3, Discernment: 4, Integrity: 5 };
    const cardRowClass = cardOn ? 'has-on on-' + cardIndex[cardOn] : '';
    const onStewardshipScriptureEnter = () => {};
    const onStewardshipScriptureLeave = () => {};
    const onStewardshipScriptureToggle = () => this.toggleScripturePin('stewardship');
    const onStewardshipScriptureKey = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.toggleScripturePin('stewardship'); } };
    const goToAgencyFn1 = (e) => this.goToFootnote('agency', 'fn-agency-1', e);
    const goToAgencyFn2 = (e) => this.goToFootnote('agency', 'fn-agency-2', e);
    const goToAgencyFn3 = (e) => this.goToFootnote('agency', 'fn-agency-3', e);
    const goToAgencyFn4 = (e) => this.goToFootnote('agency', 'fn-agency-4', e);
    const goToBecomingFn1 = (e) => this.goToFootnote('becoming', 'fn-becoming-1', e);
    const goToBecomingFn2 = (e) => this.goToFootnote('becoming', 'fn-becoming-2', e);
    const goToBecomingFn3 = (e) => this.goToFootnote('becoming', 'fn-becoming-3', e);
    const goToBecomingFn4 = (e) => this.goToFootnote('becoming', 'fn-becoming-4', e);
    const goToDiscernmentFn1 = (e) => this.goToFootnote('discernment', 'fn-discernment-1', e);
    const goToDiscernmentFn2 = (e) => this.goToFootnote('discernment', 'fn-discernment-2', e);
    const isAgencyFootnotesOpen = !!this.state.footnotesOpen.agency;
    const onAgencyFootnotesToggle = () => this.toggleFootnotes('agency');
    const isBecomingFootnotesOpen = !!this.state.footnotesOpen.becoming;
    const onBecomingFootnotesToggle = () => this.toggleFootnotes('becoming');
    const isFellowshipFootnotesOpen = !!this.state.footnotesOpen.fellowship;
    const onFellowshipFootnotesToggle = () => this.toggleFootnotes('fellowship');
    const isDiscernmentFootnotesOpen = !!this.state.footnotesOpen.discernment;
    const onDiscernmentFootnotesToggle = () => this.toggleFootnotes('discernment');
    const isIntegrityFootnotesOpen = !!this.state.footnotesOpen.integrity;
    const onIntegrityFootnotesToggle = () => this.toggleFootnotes('integrity');

    const agencyScenarioData = [
      { label: 'Your future', exampleTitle: 'You are uncertain about what to do with your future', misuseLabel: 'Misuse — Delegating decisions to AI', misuseSummary: 'Decide for me.', misusePrompts: ['What should I study?', 'Where should I live?', 'Should I marry this person?', 'When should I have children?'], bestLabel: 'Wise use — Inquiring after options', bestSummary: 'Inform me so I can decide.', bestPrompts: ['Help me explore majors and schools.', 'What career options might I be overlooking?', 'What questions should I ask myself before making this decision?', 'Help me compare these two choices.'] },
      { label: 'Your values', exampleTitle: 'You are trying to understand your personal values and beliefs', misuseLabel: 'Misuse — Outsourcing values', misuseSummary: 'Tell me what is right and wrong.', misusePrompts: ['I did this today. Tell me why I am a good or bad person.', 'What religion is true?', 'What type of person should I be?'], bestLabel: 'Wise use — Clarifying values', bestSummary: 'This is discernment fuel.', bestPrompts: ['Can you help me think through this?', 'What are the core arguments on each side of this issue?', 'What steps should I take to understand this?', 'What books/scriptures will help me understand this more?'] },
      { label: 'Political views', exampleTitle: 'You are deciding your political views', misuseLabel: 'Misuse', misuseSummary: 'Just tell me what to think.', misusePrompts: ['Who should I vote for?', 'What is correct?', 'What is wrong?', 'Figure out my ideology.', 'What should I think about this?'], bestLabel: 'Wise use', bestSummary: 'Challenge my thinking, not replace it.', bestPrompts: ['Here is what I think about X, give me the strongest objection to it.', 'Many people believe X. Help me see where they are coming from.'] },
      { label: 'Your relationships', exampleTitle: 'You are navigating a difficult conversation or conflict with someone', misuseLabel: 'Misuse — Letting AI speak for you', misuseSummary: 'Write what I should say to them.', misusePrompts: ['Write a text to break up with my partner.', 'Draft an apology so I don\u2019t have to think about what I did.', 'Tell me exactly what to say so I win the argument.'], bestLabel: 'Wise use \u2014 Preparing to show up', bestSummary: 'Help me understand and engage, not avoid.', bestPrompts: ['Help me see this from their perspective.', 'What are some ways to open this conversation with care?', 'What questions could I ask to understand them better?'] },
      { label: 'Your work', exampleTitle: 'You are completing an assignment or work task', misuseLabel: 'Misuse \u2014 Outsourcing the work itself', misuseSummary: 'Do this for me.', misusePrompts: ['Write this essay for me.', 'Solve this problem so I can submit it.', 'Do my job so I don\u2019t have to learn it.'], bestLabel: 'Wise use \u2014 Strengthening your own effort', bestSummary: 'Help me do this better myself.', bestPrompts: ['Give me feedback on what I\u2019ve written.', 'Explain this concept so I can solve it myself.', 'What am I missing in my approach?'] },
    ];
    const agencyPracticeIdx = this.state.practiceTab.agency ?? 0;
    const agencyTabClick0 = () => this.setPracticeTab('agency', 0);
    const agencyTabClick1 = () => this.setPracticeTab('agency', 1);
    const agencyTabClick2 = () => this.setPracticeTab('agency', 2);
    const agencyTabClick3 = () => this.setPracticeTab('agency', 3);
    const agencyTabClick4 = () => this.setPracticeTab('agency', 4);
    const agencyTab0Active = agencyPracticeIdx === 0;
    const agencyTab0Inactive = agencyPracticeIdx !== 0;
    const agencyTab1Active = agencyPracticeIdx === 1;
    const agencyTab1Inactive = agencyPracticeIdx !== 1;
    const agencyTab2Active = agencyPracticeIdx === 2;
    const agencyTab2Inactive = agencyPracticeIdx !== 2;
    const agencyActiveScenario = agencyScenarioData[agencyPracticeIdx];

    const buildPractice = (key, scenarios) => {
      const idx = this.state.practiceTab[key] ?? 0;
      return {
        tab0Active: idx === 0, tab0Inactive: idx !== 0,
        tab1Active: idx === 1, tab1Inactive: idx !== 1,
        tab2Active: idx === 2, tab2Inactive: idx !== 2,
        tabClick0: () => this.setPracticeTab(key, 0),
        tabClick1: () => this.setPracticeTab(key, 1),
        tabClick2: () => this.setPracticeTab(key, 2),
        active: scenarios[idx],
      };
    };

    const becomingScenarioData = [
      { exampleTitle: 'You are behind on some difficult coursework', misuseLabel: 'Misuse', misuseSummary: '', misusePrompts: ['Write this paper for me', 'Show me all the steps to solving this problem', 'What are the key points in this reading', 'Make my writing sound better'], bestLabel: 'Wise use', bestSummary: '', bestPrompts: ['Teach me this concept, give me some practice problems', 'Where is my argument weak in this paper? Have I made any blatant mistakes?', 'Here is what I got from this reading, did I miss anything?', "I can't solve this problem. Help me figure out where I am getting stuck."] },
      { exampleTitle: 'You are working on a creative venture', misuseLabel: 'Misuse', misuseSummary: '', misusePrompts: ['What do you think of this project I am working on?', 'What should I say in this birthday card/letter', 'Generate lyrics/a story for me on this topic'], bestLabel: 'Wise use', bestSummary: '', bestPrompts: ['Space to write…'] },
      { exampleTitle: 'Space to write', misuseLabel: 'Misuse', misuseSummary: '', misusePrompts: ['Space to write…'], bestLabel: 'Wise use', bestSummary: '', bestPrompts: ['Space to write…'] },
    ];
    const becomingPractice = buildPractice('becoming', becomingScenarioData);

    const fellowshipScenarioData = [
      { exampleTitle: 'call your mom and ask for a recipie', misuseLabel: 'Misuse', misuseSummary: '', misusePrompts: ['Space to write…'], bestLabel: 'Wise use', bestSummary: '', bestPrompts: ['Space to write…'] },
      { exampleTitle: 'Space to write', misuseLabel: 'Misuse', misuseSummary: '', misusePrompts: ['Space to write…'], bestLabel: 'Wise use', bestSummary: '', bestPrompts: ['Space to write…'] },
      { exampleTitle: 'Space to write', misuseLabel: 'Misuse', misuseSummary: '', misusePrompts: ['Space to write…'], bestLabel: 'Wise use', bestSummary: '', bestPrompts: ['Space to write…'] },
    ];
    const fellowshipPractice = buildPractice('fellowship', fellowshipScenarioData);

    const discernmentScenarioData = [
      { exampleTitle: 'Space to write', misuseLabel: 'Misuse', misuseSummary: '', misusePrompts: ['Space to write…'], bestLabel: 'Wise use', bestSummary: '', bestPrompts: ['Space to write…'] },
      { exampleTitle: 'Space to write', misuseLabel: 'Misuse', misuseSummary: '', misusePrompts: ['Space to write…'], bestLabel: 'Wise use', bestSummary: '', bestPrompts: ['Space to write…'] },
      { exampleTitle: 'Space to write', misuseLabel: 'Misuse', misuseSummary: '', misusePrompts: ['Space to write…'], bestLabel: 'Wise use', bestSummary: '', bestPrompts: ['Space to write…'] },
    ];
    const discernmentPractice = buildPractice('discernment', discernmentScenarioData);

    const integrityScenarioData = [
      { exampleTitle: 'Space to write', misuseLabel: 'Misuse', misuseSummary: '', misusePrompts: ['Space to write…'], bestLabel: 'Wise use', bestSummary: '', bestPrompts: ['Space to write…'] },
      { exampleTitle: 'Space to write', misuseLabel: 'Misuse', misuseSummary: '', misusePrompts: ['Space to write…'], bestLabel: 'Wise use', bestSummary: '', bestPrompts: ['Space to write…'] },
      { exampleTitle: 'Space to write', misuseLabel: 'Misuse', misuseSummary: '', misusePrompts: ['Space to write…'], bestLabel: 'Wise use', bestSummary: '', bestPrompts: ['Space to write…'] },
    ];
    const integrityPractice = buildPractice('action', integrityScenarioData);

    const devotional = {
      href: 'https://www.churchofjesuschrist.org/study/broadcasts/worldwide-devotional-for-young-adults/2024/11/13bednar?lang=eng',
      thumb: asset('devotional-bednar.png'),
      title: 'Things as They Really Are 2.0 — Elder David A. Bednar',
      kind: 'Devotional',
      quote: this.props.devotionalQuote ?? 'As you strive to learn the gospel of Jesus Christ and perform the work you have to do, I specifically exhort you to be wise in your use of contemporary technological tools. Innovations such as artificial intelligence [can] both (1) assist you in receiving magnificent blessings and (2) diminish and suffocate your moral agency. Please do not allow the supposed accuracy, speed, and ease of modern technologies to entice you to avoid or circumvent the righteous work that invites into your life the blessings you will need. My beloved brothers and sisters, there are no spiritual shortcuts or quick fixes.',
      cite: 'Elder David A. Bednar',
    };
    const agencyVideos = [
      { id: '4qcpXcvtYoY', title: 'A short message on agency', kind: 'Short', quote: 'Letting technology inform us is wise, but letting it define us is not.', cite: 'Elder Gerrit W. Gong' },
      { id: '4WIuG9VqG4M', title: 'On agency', kind: 'Video' },
      devotional,
    ];
    const becomingVideos = [
      { id: 'KOEPOzZZuKI', title: 'The short — a quick spark', kind: 'Short' },
      { type: 'quote', quote: "God left the world unfinished for [men and women] to work [their] skill upon. He left the electricity in the cloud, the oil in the earth. He left the rivers unbridged and the forests unfelled and the cities unbuilt. God gives to [us] the challenge of raw materials, not the ease of finished things. He leaves the pictures unpainted and the music unsung and the problems unsolved, that [we] might know the joys and glories of creation.", cite: "Thomas S. Monson, In Quest of the Abundant Life" },
      { id: 'AgBaU9mmceQ', title: 'The Importance of Effort', kind: 'Video' },
      { id: 'ijkHtE1EkyI', title: 'On becoming', kind: 'Video' },
      { type: 'quote', quote: "For an algorithm, an error is a flaw to be corrected; for a person, however, an error can be a catalyst for profound change. A person's future is not calculable, but depends on one's freedom — elevated by the inexhaustible grace of God — and on the relationships cultivated.", cite: "Pope Leo XIV, Magnifica Humanitas" },
      { id: 'zneerF-ZcnE', title: 'On becoming', kind: 'Short' },
      { id: 'rYlEhpf0hqs', title: 'On becoming', kind: 'Short' },
    ];
    const fellowshipVideos = [
      { id: 'MYsw7Z26lJM', title: 'On fellowship', kind: 'Video' },
      { id: 'D7nZe5jEDr8', title: 'On fellowship', kind: 'Video' },
      { id: '5WJx2xRKucw', title: 'On fellowship', kind: 'Video' },
      { id: 'hVCBrkrFrBE', title: 'On fellowship', kind: 'Video' },
      { id: '8KkKuTCFvzI', title: 'On fellowship', kind: 'Video' },
      { id: 'zGq5RkhY9_I', title: 'On fellowship', kind: 'Video' },
    ];
    const discernmentVideos = [
      { id: 'HrroZUkuuiA', title: 'On discernment', kind: 'Video' },
      { id: 'mEVl0NS0vu8', title: 'On discernment', kind: 'Video' },
      { id: 'tviVGA0eLdY', title: 'On discernment', kind: 'Video' },
      { id: 'oxXpB9pSETo', title: 'On discernment', kind: 'Video' },
      { id: 'V2V3uGItYlw', title: 'On discernment', kind: 'Short' },
      devotional,
    ];
    const integrityVideos = [
      { id: '4W7NH-QYjig', title: 'On integrity', kind: 'Video' },
      { id: 'SCzRRhSAuW4', title: 'On integrity', kind: 'Short' },
    ];
    return {
      onAgencyEscape,
      onBecomingEscape,
      onFellowshipEscape,
      onDiscernmentEscape,
      onIntegrityEscape,
      agencyShownClass,
      homeReturnClass,
      isHome: v === 'home',
      isBecomingScriptureOpen,
      onBecomingScriptureEnter,
      onBecomingScriptureLeave,
      isBecoming2ScriptureOpen,
      onBecoming2ScriptureEnter,
      onBecoming2ScriptureLeave,
      isAgencyScriptureOpen,
      onAgencyScriptureEnter,
      onAgencyScriptureLeave,
      onAgencyHeroLeave,
      onIntegrityHeroLeave,
      integrityVerseBoxClass,
      onDiscernmentHeroLeave,
      discernmentVerseBoxClass,
      onFellowshipHeroLeave,
      fellowshipVerseBoxClass,
      onBecomingHeroLeave,
      becomingVerseBoxClass,
      isAgency2ScriptureOpen,
      onAgency2ScriptureEnter,
      onAgency2ScriptureLeave,
      isAgencyVerseOpen,
      agencyVerseText,
      agencyVerseRef,
      agencyVerseBoxClass, agencyScriptureClass,
      isBecomingVerseOpen,
      becomingVerseText,
      becomingVerseRef,
      becomingScriptureClass,
      becomingVerseFontSize,
      onBecomingScriptureToggle,
      onBecoming2ScriptureToggle,
      isFellowshipVerseOpen,
      fellowshipVerseText,
      fellowshipVerseRef,
      fellowshipScriptureClass,
      fellowshipVerseFontSize,
      onFellowshipScriptureToggle,
      onFellowship2ScriptureToggle,
      onFellowship3ScriptureToggle,
      isDiscernmentVerseOpen,
      discernmentVerseText,
      discernmentVerseRef,
      discernmentScriptureClass,
      onDiscernmentScriptureToggle,
      isIntegrityVerseOpen,
      integrityVerseText,
      integrityVerseRef,
      integrityScriptureClass,
      onIntegrityScriptureToggle,
      agencySpineItems,
      agencySpineClass,
      agencyGlowTop,
      agencyActiveSpineKey,
      agencyPrincipleClass,
      agencyPauseClass,
      agencyPauseHeight,
      agencyPracticeClass,
      agencyWatchClass,
      onAgencyScriptureToggle,
      onAgency2ScriptureToggle,
      isBednarTooltipOpen,
      onBednarLinkEnter,
      onBednarLinkLeave,
      isFellowshipScriptureOpen,
      onFellowshipScriptureEnter,
      onFellowshipScriptureLeave,
      isFellowship2ScriptureOpen,
      onFellowship2ScriptureEnter,
      onFellowship2ScriptureLeave,
      isFellowship3ScriptureOpen,
      onFellowship3ScriptureEnter,
      onFellowship3ScriptureLeave,
      isDiscernmentScriptureOpen,
      onDiscernmentScriptureEnter,
      onDiscernmentScriptureLeave,
      isIntegrityScriptureOpen,
      onIntegrityScriptureEnter,
      onIntegrityScriptureLeave,
      isStewardshipScriptureOpen,
      onCardAgencyEnter,
      onCardBecomingEnter,
      onCardFellowshipEnter,
      onCardDiscernmentEnter,
      onCardIntegrityEnter,
      onCardLeave,
      cardAgencyClass,
      cardBecomingClass,
      cardFellowshipClass,
      cardDiscernmentClass,
      cardIntegrityClass,
      cardRowClass,
      onStewardshipScriptureEnter,
      onStewardshipScriptureLeave,
      onStewardshipScriptureToggle,
      onStewardshipScriptureKey,
      kickerStyle: { position: 'absolute', top: this.state.kickerPos.y, left: this.state.kickerPos.x, maxWidth: '260px', textAlign: 'left', cursor: 'grab', userSelect: 'none', zIndex: 50, background: 'rgba(20,17,12,0.45)', padding: '10px 14px', borderRadius: '4px' },
      onKickerDragStart: this.onKickerDragStart,
      goToAgencyFn1,
      goToAgencyFn2,
      goToAgencyFn3,
      goToAgencyFn4,
      goToBecomingFn1,
      goToBecomingFn2,
      goToBecomingFn3,
      goToDiscernmentFn1,
      goToDiscernmentFn2,
      isAgencyFootnotesOpen,
      onAgencyFootnotesToggle,
      isBecomingFootnotesOpen,
      onBecomingFootnotesToggle,
      isFellowshipFootnotesOpen,
      onFellowshipFootnotesToggle,
      isDiscernmentFootnotesOpen,
      onDiscernmentFootnotesToggle,
      isIntegrityFootnotesOpen,
      onIntegrityFootnotesToggle,
      agencyTabClick0,
      agencyTabClick1,
      agencyTabClick2,
      agencyTabClick3,
      agencyTabClick4,
      agencyTab0Active,
      agencyTab0Inactive,
      agencyTab1Active,
      agencyTab1Inactive,
      agencyTab2Active,
      agencyTab2Inactive,
      agencyActiveScenario,
      becomingPractice,
      fellowshipPractice,
      discernmentPractice,
      integrityPractice,
      isPurpose: v === 'purpose',
      isIdentity: v === 'identity',
      isRelationships: v === 'relationships',
      isGrowth: v === 'growth',
      isAction: v === 'action',
      agencyVideos,
      becomingVideos,
      fellowshipVideos,
      discernmentVideos,
      integrityVideos,
      nav: {
        home: go('home'),
        purpose: go('purpose'),
        identity: go('identity'),
        relationships: go('relationships'),
        growth: go('growth'),
        action: go('action'),
      },
    };
  }

  // ---- Site integration -------------------------------------------------
  // Each principle has its own address (/principles/<slug>); the guide's view
  // follows the address. Opening a principle or going "Back to Principles"
  // changes the address, and the view change happens in _followRoute.
  go(view) {
    const to = view === 'home' ? '/principles' : '/principles/' + slugForView(view)
    this.props.navigate(to, view === 'home' ? { state: { stewLanding: 'top' } } : undefined)
  }
  goHomeToContent() {
    this.props.navigate('/principles', { state: { stewLanding: 'cards' } })
  }
  _followRoute() {
    const target = this.props.routeView
    if (target !== 'home') {
      if (target !== this.state.view) this._showView(target)
      return
    }
    if (this.state.view === 'home') return
    // Back to the guide's home: the browser's Back button and "Back to
    // Principles" land on the five cards; opening Principles fresh (the
    // menu, a link) starts at the top.
    const landing = this.props.navigationType === 'POP' ? 'cards' : this.props.landing
    if (landing === 'cards') this._returnHome()
    else this._showView('home')
  }
  // In its own frame the guide ended the page, so returning home (which
  // scrolls two screens down) stopped at the bottom of the home view, on the
  // five cards. The site footer now follows the guide, so stop at the same
  // place: no further than the guide's own end.
  _clampToGuide() {
    const root = document.querySelector('.stew')
    if (!root) return
    const end = root.getBoundingClientRect().bottom + window.scrollY
    const max = Math.max(0, end - window.innerHeight)
    if (window.scrollY > max) window.scrollTo({ top: max, behavior: 'auto' })
  }

  render() {
    const V = { ...this.props, ...this.renderVals() }
    return <GuideShell V={V} />
  }
}

// Defaults the original exposed as editor settings (sizes of the big type).
StewardshipGuide.defaultProps = { titleFontSize: 92, titleBoxWidth: 1800, principleFontSize: 42, principleBoxWidth: 900, pauseFontSize: 76, pauseBoxWidth: 900, practiceFontSize: 22, practiceBoxWidth: 1180 }
