// Real headlines for the "doom vs. hope" cinematic sequence on the
// homepage (see components/cinema/*). Content and framing per Paige's build
// spec. `url` is the real source link; several are still unverified — see
// the TODOs below. DO NOT fill those in with a guessed/placeholder URL —
// HeadlineCard renders a "Source link coming soon" state instead of a link
// when `url` is null, which is the correct behavior until Paige supplies
// the real one.
export const DOOM_HEADLINES = [
  {
    source: 'Fox News',
    headline:
      'Fox News AI Newsletter: ‘Uncontrollable’ systems could turn on humans, report warns',
    byline: 'Published March 13, 2024',
    url: 'https://www.foxnews.com/tech/fox-news-ai-newsletter-uncontrollable-systems-could-turn-humans-report-warns.amp',
  },
  {
    source: 'CNN Business',
    headline:
      'The ‘father of the internet’ and hundreds of tech experts worry we’ll rely on AI too much',
    byline: 'By Clare Duffy, April 2, 2025',
    url: 'https://www.cnn.com/2025/04/02/tech/ai-future-of-humanity-2035-report',
  },
  {
    source: 'Wall Street Journal',
    headline: 'G20 Warned Of Growing Threat to Financial Stability Posed By New AI Models',
    byline: 'By Paul Hannon',
    // TODO(Paige): supply the exact WSJ URL from the screenshot source.
    url: null,
  },
  {
    source: 'New York Times',
    headline: 'The A.I. Prompt That Could End the World',
    byline: 'Opinion/Guest Essay — By Stephen Witt, October 10, 2025',
    url: 'https://www.nytimes.com/2025/10/10/magazine/ai-prompt-nuclear-weapon.html',
  },
  {
    source: 'Bloomberg',
    headline: 'Wall Street job losses may top 200,000 as AI replaces roles',
    byline: 'January 13, 2025',
    // TODO(Paige): supply the exact Bloomberg URL from the screenshot source.
    url: null,
  },
]

// Display text is a plain-language rephrase (per spec) — the real headline
// and source show up in the card's hover/tap-reveal detail. Every url below
// is an unverified placeholder per the build spec — TODO(Paige): supply the
// real, verified URL for each before this ships. Do not guess/fabricate one.
export const HOPE_HEADLINES = [
  {
    source: 'Forbes',
    display: 'AI-powered games are helping kids beat dyslexia.',
    headline: 'Dysolve: Using AI To Beat Dyslexia Through Generative Games',
    byline: 'Ray Ravaglia, March 2, 2024',
    url: null, // TODO(Paige): supply real URL
  },
  {
    source: 'BBC',
    display: 'Smart glasses are guiding a blind runner through a marathon.',
    headline: 'Blind marathon runner to be guided by smart glasses',
    byline: 'April 2, 2026',
    url: null, // TODO(Paige): supply real URL
  },
  {
    source: 'OpenAI',
    display: 'AI accelerators are helping startups turn ideas into real products.',
    headline: "Supporting Thailand's next generation of AI startups",
    byline: 'August 28, 2026',
    url: null, // TODO(Paige): supply real URL
  },
  {
    source: 'Good Morning America',
    display: 'AI is reshaping how parents read, soothe, and connect with their kids.',
    headline: 'From story time to stress relief: How AI is reshaping modern parenting',
    byline: null,
    url: null, // TODO(Paige): supply real URL
  },
  {
    source: 'University research news',
    display: 'Engineers gave a bionic hand a mind of its own.',
    headline: 'U engineers give a bionic hand a mind of its own',
    byline: 'December 9, 2025',
    url: null, // TODO(Paige): supply real URL
  },
  {
    source: 'Breastcancer.org',
    display: 'AI is helping radiologists catch breast cancer earlier.',
    headline: 'Using AI to Detect Breast Cancer: What We Know',
    byline: 'Updated June 11, 2026',
    url: null, // TODO(Paige): supply real URL
  },
  {
    source: 'New York Times',
    display: 'AI-powered forecasts are predicting hurricanes a day earlier.',
    headline: 'A.I. Brings Big Gains to Hurricane Forecasts, Google Researchers Say',
    byline: null,
    url: null, // TODO(Paige): supply real URL
  },
]
