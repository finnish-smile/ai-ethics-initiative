/* =========================================================================
   AI Ethics Initiative — content data + renderers
   One source of truth for spotlights (hero carousel) and events (calendars),
   shared by the home page and the events page.
   ========================================================================= */
window.AIEI = (function () {
  "use strict";

  // ---- Hero carousel: events + products + programs -------------------------
  var spotlights = [
    {
      cat: "New Resource",
      title: "Personal AI Constitution",
      blurb: "A simple framework for self-governing your own AI use \u2014 write down your principles, set your own limits, and hold yourself to using these tools ethically, every time.",
      cta: "Read More", href: "news.html",
      ph: "cover · ai constitution", tone: "navy"
    },
    {
      cat: "Fall Launch",
      title: "Fall Grand Opening",
      blurb: "We'll be doing something somewhere at some point in time.",
      cta: "Read More", href: "events.html",
      ph: "photo · fall launch", tone: "image"
    },
    {
      cat: "Most Used",
      title: "The AI Ethics Newsletter",
      blurb: "A free, weekly newsletter that aims to provide updates on AI regulation, cases of concern, and other topics relating to AI Ethics.",
      cta: "Read More", href: "news.html#newsletter",
      ph: "photo · newsletter", tone: "image"
    },
    {
      cat: "Feedback",
      title: "Student Survey",
      blurb: "Tell us about your experience! If you have any questions, concerns, or ideas for us, fill out this survey to be a part of the growing initiative for the ethical use of AI.",
      cta: "Go to the survey", href: "news.html",
      ph: "screenshot · students", tone: "navy"
    }
  ];

  // ---- Events (ISO date, sorted ascending) ---------------------------------
  // `slug` powers the per-event detail page (event.html?event=<slug>).
  // `desc` is an array of paragraphs; `invite` is the invitation line.
  var events = [
    { date: "2026-06-09", time: "12:00 PM", title: "Lunch & Learn: Disclosing AI in Your Coursework", type: "Workshop", place: "Hartley Hall 240", host: "AI in Business Association", slug: "lunch-learn-disclosing-ai",
      desc: ["Bring your lunch and learn how to talk about AI use in your assignments with confidence. We'll walk through what \u201cdisclosure\u201d actually means, when it's expected, and how to phrase it for essays, code, and group projects.", "You'll leave with a one-page template you can adapt for any class, plus answers to the questions students ask most."],
      invite: "Open to all students \u2014 no preparation or RSVP required. Just show up with your lunch and your questions." },
    { date: "2026-06-12", time: "3:30 PM",  title: "Faculty Panel: Generative AI & Academic Integrity", type: "Panel", place: "Lewis Auditorium", host: "Office of the Provost", slug: "faculty-panel-academic-integrity",
      desc: ["Four faculty members from across the university discuss how generative AI is reshaping academic integrity \u2014 and how their courses are adapting. Expect candid takes, disagreement, and practical policy ideas.", "A moderated audience Q&A follows the panel."],
      invite: "Faculty, staff, and students are all welcome. Come with your hardest questions for the panel." },
    { date: "2026-06-18", time: "5:00 PM",  title: "Student Forum: Bias, Fairness & You", type: "Forum", place: "Commons, West Hall", host: "Students for Ethical Tech", slug: "student-forum-bias-fairness",
      desc: ["A student-led conversation about where AI bias shows up in everyday tools \u2014 from search to hiring to grading \u2014 and what fairness should mean for the people on the other side of the output.", "Small-group discussion, then a shared debrief. No expertise required."],
      invite: "All students welcome. Bring an example of AI bias you've run into \u2014 we'll discuss real cases." },
    { date: "2026-06-24", time: "10:00 AM", title: "Workshop: Prompting with Privacy in Mind", type: "Workshop", place: "Library, Room 12", host: "Cybersecurity Club", slug: "workshop-prompting-privacy",
      desc: ["A hands-on session on using AI tools without leaking personal or confidential data. We'll cover what gets logged, which settings to change, and how to strip sensitive details before you paste.", "Bring a laptop to follow along with the exercises."],
      invite: "Open to everyone. Laptops encouraged but not required \u2014 you can pair up." },
    { date: "2026-07-01", time: "4:00 PM",  title: "Guest Lecture: The Ethics of Autonomous Systems", type: "Lecture", place: "Lewis Auditorium", host: "Department of Philosophy", slug: "guest-lecture-autonomous-systems",
      desc: ["A visiting scholar explores the moral questions raised by systems that act on their own \u2014 from self-driving cars to automated decision-making \u2014 and who bears responsibility when they fail.", "A reception with light refreshments follows the lecture."],
      invite: "Free and open to the public. Arrive early for a good seat \u2014 this one fills up." },
    { date: "2026-07-09", time: "12:00 PM", title: "Reading Group: Automating Inequality", type: "Reading Group", place: "Hartley Hall 240", host: "Data Science Society", slug: "reading-group-automating-inequality",
      desc: ["A discussion of Virginia Eubanks' \u201cAutomating Inequality\u201d and what it tells us about how automated systems affect the most vulnerable. We'll focus on the first three chapters.", "Haven't finished the reading? Come anyway \u2014 the conversation stands on its own."],
      invite: "All readers welcome. Copies of the chapters are available on request \u2014 just reach out." },
    { date: "2026-07-15", time: "9:00 AM",  title: "Symposium: Algorithmic Accountability in Higher Ed", type: "Club", place: "Conference Center", host: "AI Ethics Initiative", slug: "symposium-algorithmic-accountability",
      desc: ["A half-day symposium bringing together students, faculty, and staff to examine how algorithms are used in admissions, advising, and grading \u2014 and what accountability should look like.", "Includes keynote talks, breakout sessions, and a closing roundtable."],
      invite: "Open to the whole campus community. Drop in for a single session or stay for the day." },
    { date: "2026-07-22", time: "3:30 PM",  title: "Office Hours: Bring Your AI Policy Questions", type: "Drop-in", place: "Hartley Hall 240", host: "AI Ethics Initiative", slug: "office-hours-ai-policy",
      desc: ["Informal drop-in time with the Initiative team. Bring any question about AI use, disclosure, course policy, or the principles \u2014 we'll talk it through with you.", "No appointment needed; stay as long or as little as you like."],
      invite: "Everyone welcome, any question. Come solo or bring your study group." }
  ];

  var MON = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  var MON_FULL = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  var DOW = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  var DOW_FULL = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  function parse(iso) { var p = iso.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function longDate(iso) { var d = parse(iso); return DOW_FULL[d.getDay()] + ", " + MON_FULL[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear(); }
  function eventBySlug(slug) {
    for (var i = 0; i < events.length; i++) { if (events[i].slug === slug) return events[i]; }
    return null;
  }

  // ---- Hero carousel --------------------------------------------------------
  function renderCarousel(el) {
    if (!el) return;
    var slides = spotlights.map(function (s, i) {
      var media = s.tone === "image"
        ? '<div class="hero-slide__media ph"><span>' + s.ph + "</span></div>"
        : '<div class="hero-slide__media hero-slide__media--navy ph"><span>' + s.ph + "</span></div>";
      return '<article class="hero-slide' + (i === 0 ? ' is-active' : '') + '" data-i="' + i + '">' +
          media +
          '<div class="hero-slide__body">' +
            '<p class="kicker">' + s.cat + "</p>" +
            "<h2>" + s.title + "</h2>" +
            (s.blurb ? "<p class=\"hero-slide__blurb\">" + s.blurb + "</p>" : "") +
            '<a class="btn btn--accent" href="' + s.href + '">' + s.cta + '<span class="arrow">&rarr;</span></a>' +
          "</div>" +
        "</article>";
    }).join("");

    var dots = spotlights.map(function (s, i) {
      return '<button class="hero-dot" type="button" data-i="' + i + '" aria-label="Slide ' + (i + 1) + '"' +
        (i === 0 ? ' aria-current="true"' : "") + "></button>";
    }).join("");

    el.innerHTML =
      '<div class="hero-stage">' + slides + "</div>" +
      '<div class="hero-controls">' +
        '<div class="hero-dots">' + dots + "</div>" +
      "</div>";

    var cur = 0, n = spotlights.length, timer, animating = false, hovering = false;
    var stage = el.querySelector(".hero-stage");
    var slideEls = [].slice.call(stage.querySelectorAll(".hero-slide"));
    var dotEls = [].slice.call(el.querySelectorAll(".hero-dot"));
    var dotsWrap = el.querySelector(".hero-dots");

    function setDots(i) {
      dotEls.forEach(function (d) {
        if (+d.getAttribute("data-i") === i) d.setAttribute("aria-current", "true");
        else d.removeAttribute("aria-current");
      });
    }

    function show(i) {
      i = (i + n) % n;
      if (i === cur || animating) return;
      animating = true;
      var incoming = slideEls[i], outgoing = slideEls[cur];

      // prep incoming offscreen-right with no transition, then activate next frame
      incoming.classList.remove("is-leaving");
      incoming.classList.add("is-enter");
      void incoming.offsetWidth;                 // force reflow so the snap takes
      incoming.classList.remove("is-enter");
      incoming.classList.add("is-active");       // fade in + slide from right
      outgoing.classList.remove("is-active");
      outgoing.classList.add("is-leaving");      // fade out + slide left

      // only the highlight crossfades between blue and gray (CSS transition)
      setDots(i);

      setTimeout(function () {
        outgoing.classList.remove("is-leaving");
        animating = false;
      }, 720);

      cur = i;
    }

    function reset() {
      clearInterval(timer);
      if (hovering) return;                       // don't advance while hovered
      timer = setInterval(function () { show(cur + 1); }, 6500);
    }

    dotEls.forEach(function (dt) {
      dt.addEventListener("click", function () { show(+dt.getAttribute("data-i")); reset(); });
    });

    // pause on hover, resume on leave
    el.addEventListener("mouseenter", function () { hovering = true; clearInterval(timer); });
    el.addEventListener("mouseleave", function () { hovering = false; reset(); });

    setDots(0);
    reset();
  }

  // ---- Condensed upcoming list (home + sidebar) ----------------------------
  function renderUpcoming(el, limit) {
    if (!el) return;
    var items = events.slice(0, limit || events.length).map(function (e) {
      var d = parse(e.date);
      return '<li class="up-item"><a href="event.html?event=' + encodeURIComponent(e.slug) + '">' +
          '<span class="up-date"><span class="up-dow">' + DOW[d.getDay()] + '</span>' +
            '<span class="up-day">' + d.getDate() + '</span>' +
            '<span class="up-mon">' + MON[d.getMonth()] + '</span></span>' +
          '<span class="up-meta"><span class="up-title">' + e.title + '</span>' +
            '<span class="up-sub">' + e.time + ' &middot; ' + e.place + '</span></span>' +
        "</a></li>";
    }).join("");
    el.innerHTML = items;
  }

  // ---- Full events list, grouped by month (events page) --------------------
  function renderEventList(el) {
    if (!el) return;
    var groups = {};
    events.forEach(function (e) {
      var d = parse(e.date), key = d.getFullYear() + "-" + d.getMonth();
      (groups[key] = groups[key] || { label: MON_FULL[d.getMonth()] + " " + d.getFullYear(), items: [] }).items.push(e);
    });
    var html = Object.keys(groups).map(function (k) {
      var g = groups[k];
      var rows = g.items.map(function (e) {
        var d = parse(e.date);
        return '<a class="ev-row" href="event.html?event=' + encodeURIComponent(e.slug) + '">' +
            '<span class="ev-date"><span class="ev-day">' + d.getDate() + '</span>' +
              '<span class="ev-dow">' + DOW[d.getDay()] + '</span></span>' +
            '<span class="ev-main"><span class="ev-type">' + e.type + '</span>' +
              '<span class="ev-title">' + e.title + '</span>' +
              '<span class="ev-info">' + e.time + ' &middot; ' + e.place +
                (e.host ? ' &middot; ' + e.host : '') + '</span>' +
              '</span>' +
            '<span class="ev-go" aria-hidden="true">&rarr;</span>' +
          "</a>";
      }).join("");
      return '<section class="ev-month"><h3 class="ev-month__h">' + g.label + "</h3>" + rows + "</section>";
    }).join("");
    el.innerHTML = html;
  }

  return {
    spotlights: spotlights,
    events: events,
    parse: parse,
    longDate: longDate,
    eventBySlug: eventBySlug,
    renderCarousel: renderCarousel,
    renderUpcoming: renderUpcoming,
    renderEventList: renderEventList
  };
})();
