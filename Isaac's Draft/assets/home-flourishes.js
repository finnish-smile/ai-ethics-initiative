/* =========================================================================
   AI Ethics Initiative — home page flourishes
   Vanilla-JS port of the React prototype's scroll-reveal mission lines
   and growing "Welcome" line. Runs only on the home page.
   ========================================================================= */
(function () {
  "use strict";

  if (document.body.getAttribute("data-page") !== "home") return;

  // Same constants/formula as the React prototype: scale grows linearly
  // with absolute scroll position over the first 500px, capped at +0.5.
  var GROW_DISTANCE = 500;
  var MAX_GROW = 0.5;

  function onScroll() {
    var welcome = document.getElementById("missionWelcome");
    if (welcome) {
      var progress = Math.max(0, Math.min(1, window.scrollY / GROW_DISTANCE));
      welcome.style.transform = "scale(" + (1 + progress * MAX_GROW) + ")";
    }

    var lines = document.querySelectorAll(".mission-line, .mission-line-item");
    lines.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      // Matches the React version's threshold exactly (0.75 * viewport height).
      var shouldShow = rect.top < window.innerHeight * 0.75;
      var isShown = el.classList.contains("revealed");

      if (shouldShow && !isShown) {
        var delay = el.getAttribute("data-delay");
        el.style.transitionDelay = delay ? parseInt(delay, 10) / 1000 + "s" : "0s";
        el.classList.add("revealed");
      } else if (!shouldShow && isShown) {
        el.classList.remove("revealed");
        el.style.transitionDelay = "0s";
      }
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);

  // ---- Worm cursor easter egg: shake the mouse to summon it ----------------
  var SHAKE_REVERSALS = 5; // direction changes needed
  var SHAKE_WINDOW_MS = 1000; // ...within this many milliseconds
  var WORM_DURATION_MS = 2500; // how long the worm cursor stays once summoned

  var lastX = null;
  var lastDir = 0;
  var reversalTimes = [];
  var wormTimeout = null;

  function onMouseMove(e) {
    if (lastX !== null) {
      var dx = e.clientX - lastX;
      if (Math.abs(dx) > 4) {
        var dir = dx > 0 ? 1 : -1;
        if (lastDir !== 0 && dir !== lastDir) {
          var now = Date.now();
          reversalTimes.push(now);
          reversalTimes = reversalTimes.filter(function (t) { return now - t < SHAKE_WINDOW_MS; });
          if (reversalTimes.length >= SHAKE_REVERSALS) {
            reversalTimes = [];
            summonWorm();
          }
        }
        lastDir = dir;
      }
    }
    lastX = e.clientX;
  }

  function summonWorm() {
    document.body.classList.add("worm-active");
    if (wormTimeout) clearTimeout(wormTimeout);
    wormTimeout = setTimeout(function () {
      document.body.classList.remove("worm-active");
    }, WORM_DURATION_MS);
  }

  window.addEventListener("mousemove", onMouseMove);

  function init() { onScroll(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
