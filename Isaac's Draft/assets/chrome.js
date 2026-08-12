/* =========================================================================
   AI Ethics Initiative — shared chrome
   Builds: top utility strip, primary nav (logo top-left), footer, and the
   design switcher. State (typography / accent / hero layout) persists in
   localStorage and re-applies on every page so variations carry across nav.
   Each page sets <body data-page="home|about|principles|events|news|connections">.
   ========================================================================= */
(function () {
  "use strict";

  // ---- Placeholder logo mark (simple geometry — swap for real asset) -------
  var MARK =
    '<svg class="brand__mark" viewBox="0 0 40 40" fill="none" aria-hidden="true">' +
      '<rect x="1.2" y="1.2" width="37.6" height="37.6" rx="8" fill="#102a43"/>' +
      '<circle cx="20" cy="20" r="11" fill="none" stroke="#ffffff" stroke-width="2.2"/>' +
      '<circle cx="20" cy="20" r="3.4" fill="#ffffff"/>' +
      '<circle cx="20" cy="6.6" r="2.1" fill="#ffffff"/>' +
      '<circle cx="20" cy="33.4" r="2.1" fill="#ffffff"/>' +
    '</svg>';

  var NAV = [
    { id: "home",          label: "Home",          href: "index.html" },
    { id: "get-involved",  label: "Get Involved",  href: "get-involved.html" },
    { id: "about",         label: "About",         href: "about.html" },
    { id: "principles",    label: "Principles",    href: "principles.html" },
    { id: "events",        label: "Events",        href: "events.html" },
    { id: "news",          label: "News",          href: "news.html" },
    { id: "connections",   label: "Connections",   href: "connections.html" }
  ];

  var page = document.body.getAttribute("data-page") || "home";

  // ---- Small inline icons for footer social --------------------------------
  function sicon(name) {
    var p = {
      mail: '<path d="M3 5h18v14H3z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3 6l9 7 9-7" fill="none" stroke="currentColor" stroke-width="1.6"/>',
      news: '<rect x="3" y="4" width="14" height="16" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M17 8h4v9a3 3 0 0 1-3 3" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M6 8h8M6 12h8M6 16h5" stroke="currentColor" stroke-width="1.6"/>',
      link: '<path d="M9 15l6-6" stroke="currentColor" stroke-width="1.8"/><path d="M8 11l-2 2a3 3 0 0 0 4 4l2-2M16 13l2-2a3 3 0 0 0-4-4l-2 2" fill="none" stroke="currentColor" stroke-width="1.8"/>',
      play: '<rect x="3" y="5" width="18" height="14" rx="3" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M10 9l5 3-5 3z" fill="currentColor"/>'
    };
    return '<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">' + (p[name] || "") + "</svg>";
  }

  // ---- Top utility strip + nav ---------------------------------------------
  function buildHeader() {
    var links = NAV.map(function (n) {
      var cur = n.id === page ? ' aria-current="page"' : "";
      return '<a href="' + n.href + '"' + cur + '><span class="nav__label">' + n.label + "</span></a>";
    }).join("");

    var html =
      '<header class="nav"><div class="wrap">' +
        '<a class="brand" href="index.html" aria-label="AI & Ethics Initiative — home">' +
          '<span class="scroll-logo" id="scrollLogo">' +
            '<span class="scroll-logo__word" data-word="byu">BYU</span>' +
            '<span class="scroll-logo__word" data-word="marriott">Marriott</span>' +
            '<span class="scroll-logo__word">AI</span>' +
            '<span class="scroll-logo__swap">' +
              '<span class="scroll-logo__and">and</span>' +
              '<span class="scroll-logo__amp">&amp;</span>' +
            "</span>" +
            '<span class="scroll-logo__word">Ethics</span>' +
            '<span class="scroll-logo__word">Initiative</span>' +
          "</span>" +
        "</a>" +
        '<nav class="nav__links" aria-label="Primary">' + links + "</nav>" +
        '<button class="nav__toggle" type="button" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>' +
      "</div></header>";

    // Insert the real header as a sibling of the placeholder (not nested
    // inside it), then drop the placeholder. A sticky element is bounded by
    // its parent's box — leaving it inside the 79px-tall placeholder div
    // would let it "stick" for exactly zero scroll distance. As a direct
    // child of <body> (which spans the whole page) it stays pinned properly.
    var host = document.getElementById("site-header");
    if (host) {
      host.insertAdjacentHTML("afterend", html);
      host.remove();
    }

    var nav = document.querySelector(".nav");
    var tog = document.querySelector(".nav__toggle");
    if (tog && nav) {
      tog.addEventListener("click", function () {
        var open = nav.getAttribute("data-open") === "true";
        nav.setAttribute("data-open", String(!open));
        tog.setAttribute("aria-expanded", String(!open));
      });
    }

    initScrollLogo();
  }

  // ---- Animated scroll-morph wordmark logo ----------------------------------
  // On scroll (0-100px), "BYU", "Marriott", and the leading "A" collapse away
  // and "and" swaps to "&", leaving a short "AI & Ethics Initiative" mark.
  function initScrollLogo() {
    var el = document.getElementById("scrollLogo");
    if (!el) return;

    var byu = el.querySelector('[data-word="byu"]');
    var marriott = el.querySelector('[data-word="marriott"]');
    var and = el.querySelector(".scroll-logo__and");
    var amp = el.querySelector(".scroll-logo__amp");
    var swap = el.querySelector(".scroll-logo__swap");
    if (!byu || !marriott || !and || !amp || !swap) return;

    var widths = {};
    function measure() {
      // Clear any previously-applied widths first — otherwise offsetWidth
      // just echoes back the last forced value instead of the natural size.
      byu.style.width = "";
      marriott.style.width = "";
      widths.byu = byu.offsetWidth;
      widths.marriott = marriott.offsetWidth;
      widths.and = and.offsetWidth;
      widths.amp = amp.offsetWidth;
    }
    measure();

    function ease(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }
    function tween(from, to, start, end, t) {
      if (t <= start) return from;
      if (t >= end) return to;
      return from + (to - from) * ease((t - start) / (end - start));
    }

    function update() {
      var p = Math.max(0, Math.min(1, window.scrollY / 100));

      var byuP = tween(1, 0, 0, 0.5, p);
      byu.style.width = widths.byu * byuP + "px";
      byu.style.opacity = byuP;
      byu.style.marginRight = 8 * byuP + "px";

      var marriottP = tween(1, 0, 0.12, 0.62, p);
      marriott.style.width = widths.marriott * marriottP + "px";
      marriott.style.opacity = marriottP;
      marriott.style.marginRight = 8 * marriottP + "px";

      var sp = tween(0, 1, 0.35, 0.85, p);
      swap.style.width = (widths.and + (widths.amp - widths.and) * sp) + "px";
      and.style.opacity = 1 - sp;
      amp.style.opacity = sp;
    }

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", function () { measure(); update(); });
    update();

    // Re-measure once the real webfont has finished loading — the initial
    // measure() can run before Newsreader is ready, baking in fallback-font
    // widths that don't match the actual glyphs (visible as odd gaps/overlap
    // once the real font swaps in).
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () { measure(); update(); });
    }
  }

  // ---- Footer ---------------------------------------------------------------
  function buildFooter() {
    var html =
      '<footer class="foot"><div class="wrap"><div class="foot__cols">' +
        '<div class="foot__contact">' +
          '<h4 class="foot__h">Contact</h4>' +
          '<p>Email: <a href="mailto:ai-ethics@byu.edu">ai-ethics@byu.edu</a></p>' +
          "<p>Office hours: Mon&ndash;Fri, 8&ndash;5</p>" +
        "</div>" +
        '<div><h4 class="foot__h">Explore</h4><ul>' +
          '<li><a href="about.html">About the Initiative</a></li>' +
          '<li><a href="principles.html">Principles of Ethical AI Use</a></li>' +
          '<li><a href="events.html">Events Calendar</a></li>' +
          '<li><a href="news.html">News &amp; Newsletter</a></li>' +
        "</ul></div>" +
        '<div><h4 class="foot__h">Resources</h4><ul>' +
          '<li><a href="principles.html#coursework">Using AI in Coursework</a></li>' +
          '<li><a href="principles.html#disclosure">Disclosure &amp; Citation</a></li>' +
          '<li><a href="connections.html">Campus Partners</a></li>' +
          '<li><a href="about.html#contact">Request a Workshop</a></li>' +
        "</ul></div>" +
        '<div><h4 class="foot__h">Connect</h4>' +
          '<div class="foot__social">' +
            '<a href="news.html#newsletter" aria-label="Newsletter">' + sicon("mail") + "</a>" +
            '<a href="news.html" aria-label="News">' + sicon("news") + "</a>" +
            '<a href="connections.html" aria-label="Partners">' + sicon("link") + "</a>" +
            '<a href="events.html" aria-label="Recordings">' + sicon("play") + "</a>" +
          "</div>" +
          "<ul>" +
            '<li><a href="news.html#newsletter">Join the mailing list</a></li>' +
            '<li><a href="events.html">Upcoming events</a></li>' +
            '<li><a href="about.html#team">Meet the team</a></li>' +
          "</ul>" +
        "</div>" +
      "</div></div>" +
      '<div class="foot__band">' +
        '<div class="foot__wordmark">AI Ethics Initiative</div>' +
        '<p class="foot__fine">&copy; 2026 AI Ethics Initiative &nbsp;|&nbsp; ' +
          '<a href="#">Privacy Notice</a> &nbsp;&middot;&nbsp; <a href="#">Accessibility</a></p>' +
      "</div></footer>";

    var host = document.getElementById("site-footer");
    if (host) host.innerHTML = html;
  }

  // ---- Design switcher ------------------------------------------------------
  var STORE = "aiei.design.v1";
  var DEFAULTS = { type: "editorial", accent: "blue", hero: "split", nav: "right" };

  function load() {
    try { return Object.assign({}, DEFAULTS, JSON.parse(localStorage.getItem(STORE) || "{}")); }
    catch (e) { return Object.assign({}, DEFAULTS); }
  }
  function apply(s) {
    var r = document.documentElement;
    r.setAttribute("data-type", s.type);
    r.setAttribute("data-accent", s.accent);
    r.setAttribute("data-hero", s.hero);
    r.setAttribute("data-nav", s.nav);
  }
  function save(s) { try { localStorage.setItem(STORE, JSON.stringify(s)); } catch (e) {} }

  // apply ASAP (also called inline in <head> to avoid flash — see pages)
  var state = load();
  apply(state);

  function buildSwitcher() {
    var seg = function (group, opts) {
      return opts.map(function (o) {
        var on = state[group] === o.v;
        return '<button type="button" data-group="' + group + '" data-val="' + o.v + '" aria-pressed="' + on + '">' + o.t + "</button>";
      }).join("");
    };
    var sw = function () {
      var colors = { blue: "oklch(0.52 0.13 255)", ochre: "oklch(0.58 0.11 70)", teal: "oklch(0.55 0.09 200)" };
      return Object.keys(colors).map(function (k) {
        var on = state.accent === k;
        return '<button type="button" data-group="accent" data-val="' + k + '" aria-pressed="' + on + '" aria-label="' + k + '" style="background:' + colors[k] + '"></button>';
      }).join("");
    };

    var html =
      '<button class="switch-fab" type="button" aria-expanded="false" aria-controls="switch-panel">' +
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2"/><circle cx="9" cy="7" r="2.4" fill="#102a43" stroke="#fff" stroke-width="1.6"/><circle cx="15" cy="12" r="2.4" fill="#102a43" stroke="#fff" stroke-width="1.6"/><circle cx="8" cy="17" r="2.4" fill="#102a43" stroke="#fff" stroke-width="1.6"/></svg>' +
        "Design options</button>" +
      '<div class="switch-panel" id="switch-panel" role="dialog" aria-label="Design options">' +
        "<h3>Design options</h3>" +
        '<p class="sp-note">Compare typography systems, hero layout, and accent. Your choice carries across every page.</p>' +
        '<div class="sp-group"><label>Typography</label><div class="sp-seg">' +
          seg("type", [{ v: "editorial", t: "Editorial" }, { v: "grotesque", t: "Grotesque" }, { v: "classic", t: "Classic" }]) +
        "</div></div>" +
        '<div class="sp-group"><label>Home hero layout</label><div class="sp-seg">' +
          seg("hero", [{ v: "split", t: "Split + calendar" }, { v: "stacked", t: "Stacked" }]) +
        "</div></div>" +
        '<div class="sp-group"><label>Navigation links</label><div class="sp-seg">' +
          seg("nav", [{ v: "right", t: "Right" }, { v: "center", t: "Center" }, { v: "left", t: "Left" }]) +
        "</div></div>" +
        '<div class="sp-group"><label>Accent</label><div class="sp-swatches">' + sw() + "</div></div>" +
        '<button class="sp-reset" type="button">Reset to default</button>' +
      "</div>";

    var host = document.getElementById("site-switcher");
    if (!host) { host = document.createElement("div"); host.id = "site-switcher"; document.body.appendChild(host); }
    host.innerHTML = html;

    var fab = host.querySelector(".switch-fab");
    var panel = host.querySelector(".switch-panel");
    fab.addEventListener("click", function () {
      var open = panel.getAttribute("data-open") === "true";
      panel.setAttribute("data-open", String(!open));
      fab.setAttribute("aria-expanded", String(!open));
    });
    document.addEventListener("click", function (e) {
      if (!host.contains(e.target)) { panel.setAttribute("data-open", "false"); fab.setAttribute("aria-expanded", "false"); }
    });
    host.querySelectorAll(".sp-seg button, .sp-swatches button").forEach(function (b) {
      b.addEventListener("click", function () {
        var g = b.getAttribute("data-group"), v = b.getAttribute("data-val");
        state[g] = v; apply(state); save(state);
        host.querySelectorAll('[data-group="' + g + '"]').forEach(function (x) {
          x.setAttribute("aria-pressed", String(x.getAttribute("data-val") === v));
        });
        document.dispatchEvent(new CustomEvent("aiei:design", { detail: state }));
      });
    });
    host.querySelector(".sp-reset").addEventListener("click", function () {
      state = Object.assign({}, DEFAULTS); apply(state); save(state); buildSwitcher();
      document.dispatchEvent(new CustomEvent("aiei:design", { detail: state }));
    });
  }

  function init() { buildHeader(); buildFooter(); buildSwitcher(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
