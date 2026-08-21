// Direct quotes from Elder Gerrit W. Gong's address "Faith, Dignity, and
// Human Flourishing: Hearing God's Voice in an Age of Artificial
// Intelligence" (youtube.com/watch?v=Ts5Z64A0Vv4), organized by the
// guidebook's five principles. Quoted directly per the course brief, not
// paraphrased. Exact clip timestamps still need to be verified against the
// video before publishing — the link below points to the video generally.

export const GONG_VIDEO_URL = 'https://www.youtube.com/watch?v=Ts5Z64A0Vv4'

export const GONG_QUOTES = {
  agency: [
    {
      text: 'You are not a random data point in an unfeeling algorithm... Your eternal worth is not calculated by likes, trend lines, or predictive analytics.',
    },
    {
      text: 'Let AI inform, but you decide with the Lord. Your identity and your agency are sacred.',
    },
  ],
  becoming: [
    {
      text: 'Please do not let AI replace you in work that would otherwise help you stretch and grow. And please do not take credit and claim as your own work what you know AI has primarily done.',
    },
    {
      text: 'If we let it, AI can let us slip into being lazy, dependent, perhaps dishonest.',
    },
  ],
  fellowship: [
    {
      text: 'No one sits alone... especially no one should sit alone, lonely or emotionally dependent, with an AI chatbot.',
    },
    {
      text: 'Monologue with an AI algorithm is different than dialogue with a human friend or family member.',
    },
  ],
  discernment: [
    {
      text: 'AI can answer questions, but it cannot answer prayers.',
    },
    {
      text: 'AI is math, and math is not conscious or alive.',
    },
  ],
  integrity: [
    {
      text: 'Please do not take credit and claim as your own work what you know AI has primarily done.',
    },
  ],
}

// Gong's environmental-impact section threads through "Stewardship" as the
// course's overarching frame, rather than sitting under one of the five
// principle tabs.
export const GONG_STEWARDSHIP_QUOTE = {
  text: 'AI data centers tax our natural environment... wise stewardship matters here too.',
}

// A fun, memorable moment worth calling out on its own rather than folding
// into a principle tab — Gong asks his audience to physically do this with
// him on camera.
export const GONG_NOSE_MOMENT = {
  description:
    'At one point, Elder Gong asks his audience to put a finger on their nose — a literal, physical way of marking the difference between a human and an algorithm. It’s a small, funny, surprisingly memorable moment in an otherwise weighty talk.',
}

export const CASE_STUDIES = [
  {
    id: 'uber-av',
    kicker: 'Safety & security',
    title: 'The Uber self-driving fatality',
    scenario:
      'In 2018, a self-driving Uber test vehicle struck and killed a pedestrian crossing a street in Arizona. A human safety driver was in the car, but was not watching the road at the moment of impact — the vehicle’s software had detected the pedestrian but failed to correctly classify and react in time.',
    prompt: 'What went wrong here — the software, the human backup, or how the two were supposed to work together? What would "doing this ethically" have looked like before the vehicle was ever on public roads?',
  },
  {
    id: 'bias-fairness',
    kicker: 'Fairness',
    title: 'Bias that hides behind "objective" software',
    scenario:
      'Child welfare agencies in several U.S. counties have used predictive algorithms to help flag families for investigation. Independent research found these tools can flag families with disabilities or families of certain racial groups at disproportionately higher rates — not because a human caseworker was biased in that moment, but because the patterns in the training data already were. A smaller, more everyday version of the same problem: for years, LinkedIn’s search would ask "did you mean Andrew?" when you searched for "Andrea" — a name-frequency bias baked into the system, not a deliberate choice by anyone that day.',
    prompt: 'If a tool "just reflects the data," who’s actually responsible when that data is unfair? Where else might a system you use every day be doing something similar without anyone deciding it should?',
  },
  {
    id: 'italy-privacy',
    kicker: 'Privacy',
    title: 'Italy’s 2023 ChatGPT ban',
    scenario:
      'In March 2023, Italy’s data protection authority temporarily banned ChatGPT nationwide, citing concerns including a data breach that exposed user conversations and payment details, no clear legal basis for collecting people’s data to train the model, and no age verification for a tool capable of producing content unsuitable for minors. The ban was lifted about a month later after OpenAI made changes.',
    prompt: 'Whose job is it to protect your data when you use a free AI tool — the company, the government, or you? What would you actually want to know before typing something personal into a chat window?',
  },
]
