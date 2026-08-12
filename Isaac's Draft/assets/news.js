/* =========================================================================
   AI Ethics Initiative — news feed + newsletter data and renderers
   One source of truth for the news overview, the full article browser, the
   dedicated newsletter page, and the newsletter archive.

   Data shape:
     - articles[]  : scraped + tagged external coverage (newest first)
     - issues[]    : newsletter issues, newest first; issues[0] is current.
                     Each issue carries a short `summary` (cards/archive) and,
                     for the full read, an `intro`, annotated `picks`, `closing`.
   ========================================================================= */
window.AIEINews = (function () {
  "use strict";

  // Canonical topic taxonomy — the full tag set (the scraper can grow this).
  // MOST_USED drives the always-visible chips; the rest live in the dropdown.
  var TOPICS = [
    "Safety & Alignment",
    "Education & Academia",
    "Bias & Fairness",
    "Regulation & Policy",
    "Privacy & Data",
    "Misinformation",
    "Labor & Economy",
    "Healthcare",
    "Copyright & IP",
    "Transparency",
    "Governance",
    "Environment"
  ];

  // The handful surfaced as quick chips; everything else is in “More tags.”
  var MOST_USED = [
    "Safety & Alignment",
    "Education & Academia",
    "Bias & Fairness",
    "Regulation & Policy",
    "Privacy & Data",
    "Misinformation"
  ];

  // ---- Aggregated articles (scraped + tagged), newest first ---------------
  var articles = [
    { date: "2026-06-08", source: "Stanford HAI", isNew: true,
      topics: ["Safety & Alignment"],
      title: "New benchmark probes whether frontier models will refuse unsafe requests",
      excerpt: "A 2,000-prompt suite tests how reliably the latest systems decline harmful instructions \u2014 and where guardrails still slip." },

    { date: "2026-06-07", source: "MIT Technology Review", isNew: true,
      topics: ["Education & Academia"],
      title: "Universities pilot shared standards for disclosing AI in coursework",
      excerpt: "A consortium of fourteen schools is testing common language so students and faculty mean the same thing by \u201cAI-assisted.\u201d" },

    { date: "2026-06-06", source: "Reuters", isNew: true,
      topics: ["Regulation & Policy", "Transparency"],
      title: "EU finalizes guidance on general-purpose AI transparency obligations",
      excerpt: "Providers will need to publish training-data summaries and document known risks under rules taking effect this year." },

    { date: "2026-06-05", source: "Nature", isNew: true,
      topics: ["Bias & Fairness", "Labor & Economy"],
      title: "Audit finds hiring tools still penalize non-native English speakers",
      excerpt: "Resume-screening models scored identical qualifications lower when phrasing diverged from a narrow linguistic norm." },

    { date: "2026-06-04", source: "The Verge",
      topics: ["Privacy & Data", "Transparency"],
      title: "Chatbots are logging more than users assume, study finds",
      excerpt: "Researchers traced how conversational data is retained, reused for training, and shared with third parties by default." },

    { date: "2026-06-03", source: "AP News",
      topics: ["Misinformation"],
      title: "Fact-checkers brace for AI-generated clips ahead of fall elections",
      excerpt: "Newsrooms are rebuilding verification workflows as synthetic audio and video grow cheaper and more convincing." },

    { date: "2026-06-02", source: "Brookings",
      topics: ["Regulation & Policy", "Education & Academia"],
      title: "Policy brief: who is liable when an AI tutor gives wrong advice?",
      excerpt: "As automated tutoring spreads through classrooms, scholars map the gaps between vendors, schools, and instructors." },

    { date: "2026-05-30", source: "Wired",
      topics: ["Safety & Alignment"],
      title: "Inside the red teams stress-testing the next wave of models",
      excerpt: "A look at the contractors paid to break frontier systems before the public does \u2014 and what keeps slipping past them." },

    { date: "2026-05-29", source: "The Markup",
      topics: ["Education & Academia", "Bias & Fairness"],
      title: "Schools switch off AI detectors after false cheating accusations",
      excerpt: "Districts report that detection tools disproportionately flagged multilingual students for work they wrote themselves." },

    { date: "2026-05-28", source: "Financial Times",
      topics: ["Privacy & Data", "Regulation & Policy", "Copyright & IP"],
      title: "Regulators question the data brokers feeding model training sets",
      excerpt: "Investigators want to know how personal records end up in scraped corpora \u2014 and whether consent ever applied." },

    { date: "2026-05-27", source: "Science",
      topics: ["Misinformation"],
      title: "Researchers map how synthetic media spreads through social networks",
      excerpt: "A large study tracks the share patterns that let AI-generated falsehoods outrun corrections." },

    { date: "2026-05-26", source: "IEEE Spectrum",
      topics: ["Safety & Alignment"],
      title: "Alignment researchers debate the limits of interpretability",
      excerpt: "Can we trust a model we cannot fully explain? Two camps stake out very different answers." },

    { date: "2026-05-24", source: "NPR",
      topics: ["Education & Academia", "Bias & Fairness"],
      title: "Students say automated grading feels like a black box",
      excerpt: "Without explanations or appeals, learners describe losing trust in scores they cannot question." },

    { date: "2026-05-22", source: "Politico",
      topics: ["Regulation & Policy", "Governance"],
      title: "State lawmakers introduce a wave of algorithmic-transparency bills",
      excerpt: "More than a dozen statehouses are weighing disclosure rules for automated decisions in hiring, housing, and lending." }
  ];

  // ---- Newsletter issues (newest first; [0] is the current issue) ---------
  var issues = [
    {
      no: 24, date: "2026-06-05", title: "The disclosure question",
      summary: "Campuses converge on a shared vocabulary for AI use \u2014 even as detection tools fall out of favor and a fresh brief sharpens the liability question.",
      intro: "This week the story was disclosure: not whether students use AI, but how clearly everyone agrees to say so. A consortium of schools moved toward shared language, detection vendors lost more ground, and a new brief asked who answers when an AI tutor is wrong. Here is what we read, and why it matters for how we teach.",
      picks: [
        { title: "Universities pilot shared standards for disclosing AI in coursework", source: "MIT Technology Review", href: "#",
          note: "Fourteen institutions are testing common phrasing so \u201cAI-assisted\u201d means the same thing in a writing seminar and a programming lab. The draft is refreshingly short \u2014 three tiers, plain language." },
        { title: "Policy brief: who is liable when an AI tutor gives wrong advice?", source: "Brookings", href: "#",
          note: "As automated tutoring spreads, the brief maps the gaps between vendor, institution, and instructor \u2014 and argues that disclosure alone will not settle responsibility." },
        { title: "Schools switch off AI detectors after false cheating accusations", source: "The Markup", href: "#",
          note: "Several districts pulled detection tools after they disproportionately flagged multilingual students. A reminder that the cost of a false positive lands unevenly." },
        { title: "New benchmark probes whether frontier models will refuse unsafe requests", source: "Stanford HAI", href: "#",
          note: "Not strictly an education story, but the refusal data matters for any classroom deploying these tools: guardrails still slip in predictable places." },
        { title: "From the Initiative: a one-page guide to disclosing AI use", source: "AI Ethics Initiative", href: "#",
          note: "Our own quick reference \u2014 when disclosure is expected and how to phrase it for essays, code, and research. Free to adapt for your syllabus." }
      ],
      closing: "If your department is drafting disclosure language this term, we would love to compare notes. Reply to this email or reach us at ai-ethics@byu.edu."
    },
    { no: 23, date: "2026-05-29", title: "Red teams and guardrails", count: 5,
      summary: "Inside the groups paid to break frontier models before the public does \u2014 and the alignment debate over what interpretability can and cannot promise." },
    { no: 22, date: "2026-05-22", title: "Who owns the training data?", count: 6,
      summary: "Regulators turn their attention to the data brokers feeding model training sets, and the consent questions nobody answered on the way in." },
    { no: 21, date: "2026-05-15", title: "Bias in the hiring stack", count: 5,
      summary: "An audit finds resume screeners still penalize non-native speakers \u2014 and what a fairer evaluation pipeline would actually require." },
    { no: 20, date: "2026-05-08", title: "Election season, synthetic media", count: 4,
      summary: "Fact-checkers rebuild verification workflows as AI-generated audio and video grow cheaper ahead of the fall votes." },
    { no: 19, date: "2026-05-01", title: "Privacy by default", count: 5,
      summary: "Chatbots log more than users assume. We look at retention, reuse, and the handful of settings worth changing today." },
    { no: 18, date: "2026-04-24", title: "Grading in a black box", count: 6,
      summary: "Students describe losing trust in automated scores they cannot question \u2014 and what transparent grading could look like." }
  ];

  var latestIssue = issues[0];

  // ---- Helpers ------------------------------------------------------------
  var MON = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  function parse(iso) { var p = iso.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function esc(s) { return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
  function longDate(iso) { var d = parse(iso); return MON[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear(); }
  function tagsHTML(topics) {
    return topics.map(function (t) { return '<span class="topic-tag">' + esc(t) + "</span>"; }).join("");
  }

  // ---- Full article feed (compact rows) — used on articles.html -----------
  function rowHTML(a) {
    var d = parse(a.date);
    var badge = a.isNew ? '<span class="feed-new">New</span>' : "";
    return '<a class="feed-row" href="' + a.href + '" target="_blank" rel="noopener" ' +
        'data-topics="' + esc(a.topics.join("|")) + '" ' +
        'data-search="' + esc((a.title + " " + a.source + " " + a.excerpt + " " + a.topics.join(" ")).toLowerCase()) + '">' +
        '<span class="feed-date"><span class="feed-mon">' + MON[d.getMonth()] + '</span>' +
          '<span class="feed-day">' + d.getDate() + '</span></span>' +
        '<span class="feed-main">' +
          '<span class="feed-tags">' + tagsHTML(a.topics) + badge + "</span>" +
          '<span class="feed-title">' + esc(a.title) + "</span>" +
          '<span class="feed-excerpt">' + esc(a.excerpt) + "</span>" +
          '<span class="feed-source">' + esc(a.source) + '<span class="feed-ext" aria-hidden="true">&#8599;</span></span>' +
        "</span>" +
      "</a>";
  }
  function renderFeed(el) {
    if (!el) return;
    el.innerHTML = articles.map(rowHTML).join("");
  }

  // ---- Featured articles (lead + side) — used on the news overview --------
  function renderFeaturedNews(el, n) {
    if (!el) return;
    var list = articles.slice(0, n || 4);
    var lead = list[0], rest = list.slice(1);
    var dL = parse(lead.date);
    var leadHTML =
      '<article class="news-lead">' +
        '<a href="' + lead.href + '" target="_blank" rel="noopener" style="color:inherit;">' +
          '<div class="ph"><span>featured &middot; ' + esc(lead.source.toLowerCase()) + '</span></div>' +
          '<span class="feed-tags">' + tagsHTML(lead.topics) +
            (lead.isNew ? '<span class="feed-new">New</span>' : "") + "</span>" +
          "<h2>" + esc(lead.title) + "</h2>" +
          '<p class="lead" style="margin-top:0;">' + esc(lead.excerpt) + "</p>" +
          '<span class="news-lead__meta">' + esc(lead.source) + ' &middot; ' + longDate(lead.date) + "</span>" +
          '<span class="link-more" style="margin-top:14px;">Read at ' + esc(lead.source) +
            '<span class="arrow">&rarr;</span></span>' +
        "</a>" +
      "</article>";
    var sideHTML = rest.map(function (a) {
      return '<article class="news-item">' +
          '<span class="feed-tags">' + tagsHTML(a.topics) +
            (a.isNew ? '<span class="feed-new">New</span>' : "") + "</span>" +
          '<h3><a href="' + a.href + '" target="_blank" rel="noopener" style="color:inherit;">' + esc(a.title) + "</a></h3>" +
          "<p>" + esc(a.excerpt) + "</p>" +
          '<span class="news-item__meta">' + esc(a.source) + ' &middot; ' + longDate(a.date) + "</span>" +
        "</article>";
    }).join("");
    el.innerHTML = leadHTML + '<div class="news-side">' + sideHTML + "</div>";
  }

  // ---- Newsletter summary block (overview page) ---------------------------
  function renderLatestSummary(el) {
    if (!el) return;
    var iss = latestIssue;
    el.innerHTML =
      '<p class="issue-meta"><span>No. ' + iss.no + '</span><span class="dot"></span>' +
        '<span>' + longDate(iss.date) + "</span></p>" +
      "<h2>" + esc(iss.title) + "</h2>" +
      '<p class="issue-summary">' + esc(iss.summary) + "</p>";
  }

  // ---- Top referenced articles from the current issue (overview hero) -----
  function pickTitles() { return (latestIssue.picks || []).map(function (p) { return p.title; }); }

  function renderIssuePicks(el, n) {
    if (!el) return;
    var list = (latestIssue.picks || []).slice(0, n || 4);
    el.innerHTML = list.map(function (p) {
      return '<li class="issue-link">' +
          '<a href="' + p.href + '" target="_blank" rel="noopener">' + esc(p.title) + "</a>" +
          '<span class="src">' + esc(p.source) + "</span>" +
        "</li>";
    }).join("");
  }

  // ---- A few more recent articles (excluding ones the issue referenced) ---
  function renderMoreNews(el, n) {
    if (!el) return;
    var refs = pickTitles();
    var list = articles.filter(function (a) { return refs.indexOf(a.title) === -1; }).slice(0, n || 5);
    el.innerHTML = list.map(rowHTML).join("");
  }

  // ---- Featured newsletter lead (overview, replaces the lead article) -----
  function renderNewsletterLead(el) {
    if (!el) return;
    var iss = latestIssue;
    el.innerHTML =
      '<div class="ph ph--nl"><span>cover &middot; newsletter</span><span class="nl-flag">Newsletter</span></div>' +
      '<p class="nl-eyebrow">' +
        '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
          '<rect x="3" y="5" width="18" height="14" rx="1.5" stroke="currentColor" stroke-width="2"/>' +
          '<path d="M4 7l8 6 8-6" stroke="currentColor" stroke-width="2"/></svg>' +
        'The Inchworm Newsletter</p>' +
      '<span class="nl-date">Issue No. ' + iss.no + ' &middot; ' + longDate(iss.date) + "</span>" +
      "<h2>" + esc(iss.title) + "</h2>" +
      '<p class="lead">' + esc(iss.summary) + "</p>" +
      '<div class="nl-lead-actions">' +
        '<a class="btn btn--accent" href="newsletter.html">Continue reading<span class="arrow">&rarr;</span></a>' +
        '<a class="link-more" href="newsletter-archive.html">View past issues<span class="arrow">&rarr;</span></a>' +
      "</div>";
  }

  // ---- Side articles (the smaller featured items, overview) ---------------
  function renderSideArticles(el, n) {
    if (!el) return;
    el.innerHTML = articles.slice(0, n || 4).map(function (a) {
      return '<article class="news-item">' +
          '<span class="feed-tags">' + tagsHTML(a.topics) +
            (a.isNew ? '<span class="feed-new">New</span>' : "") + "</span>" +
          '<h3><a href="' + a.href + '" target="_blank" rel="noopener" style="color:inherit;">' + esc(a.title) + "</a></h3>" +
          "<p>" + esc(a.excerpt) + "</p>" +
          '<span class="news-item__meta">' + esc(a.source) + ' &middot; ' + longDate(a.date) + "</span>" +
        "</article>";
    }).join("");
  }

  // ---- Full newsletter (newsletter.html) ----------------------------------
  function renderNewsletter(el) {
    if (!el) return;
    var iss = latestIssue;
    var picks = (iss.picks || []).map(function (p, i) {
      return '<li class="nl-pick">' +
          '<span class="nl-pick__n">' + (i + 1) + "</span>" +
          '<div class="nl-pick__body">' +
            '<span class="nl-pick__src">' + esc(p.source) + "</span>" +
            '<h3 class="nl-pick__title"><a href="' + p.href + '" target="_blank" rel="noopener">' + esc(p.title) +
              '<span class="nl-pick__ext" aria-hidden="true">&#8599;</span></a></h3>' +
            '<p class="nl-pick__note">' + esc(p.note) + "</p>" +
          "</div>" +
        "</li>";
    }).join("");
    el.innerHTML =
      '<p class="nl-lead">' + esc(iss.intro) + "</p>" +
      '<h2 class="nl-section-h">In this issue</h2>' +
      '<ol class="nl-picks">' + picks + "</ol>" +
      (iss.closing ? '<div class="nl-closing"><p>' + esc(iss.closing) + "</p></div>" : "");
  }

  // ---- Newsletter archive (newsletter-archive.html) -----------------------
  function renderArchive(el, opts) {
    if (!el) return;
    opts = opts || {};
    var list = opts.includeCurrent === false ? issues.slice(1) : issues;
    el.innerHTML = list.map(function (iss, idx) {
      var current = opts.includeCurrent !== false && idx === 0;
      var count = iss.picks ? iss.picks.length : iss.count;
      return '<a class="arch-item" href="newsletter.html">' +
          '<span class="arch-meta">' +
            '<span class="arch-no">No. ' + iss.no + (current ? ' <span class="arch-badge">Current</span>' : "") + "</span>" +
            '<span class="arch-date">' + longDate(iss.date) + "</span>" +
            '<span class="arch-count">' + count + " links</span>" +
          "</span>" +
          '<span class="arch-body">' +
            "<h3>" + esc(iss.title) + "</h3>" +
            '<p class="arch-summary">' + esc(iss.summary) + "</p>" +
          "</span>" +
          '<span class="arch-go" aria-hidden="true">&rarr;</span>' +
        "</a>";
    }).join("");
  }

  return {
    TOPICS: TOPICS,
    MOST_USED: MOST_USED,
    articles: articles,
    issues: issues,
    latestIssue: latestIssue,
    renderFeed: renderFeed,
    renderFeaturedNews: renderFeaturedNews,
    renderLatestSummary: renderLatestSummary,
    renderIssuePicks: renderIssuePicks,
    renderMoreNews: renderMoreNews,
    renderNewsletterLead: renderNewsletterLead,
    renderSideArticles: renderSideArticles,
    renderNewsletter: renderNewsletter,
    renderArchive: renderArchive
  };
})();
