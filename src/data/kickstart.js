// Draft content for the Kickstart course. Structure (dashboard + per-lesson
// sidebar with numbered steps + progress bar) is modeled on a course
// platform we liked; all copy here is our own original draft, written for
// the Initiative specifically — refine freely.

export const LESSONS = [
  {
    id: 'discover-ai',
    number: 1,
    kind: 'core',
    title: 'Get oriented with AI',
    description: 'A plain-language look at what AI actually does well, and where it falls short.',
    steps: [
      {
        id: 'welcome',
        label: 'Welcome',
        title: 'Welcome to Kickstart',
        body: [
          'Kickstart is a short, hands-on introduction to AI — built for students who want to use these tools well, not just use them. No technical background required.',
          'Each lesson pairs a quick explanation with something to actually try, so by the end you’ll have real practice, not just notes.',
        ],
      },
      {
        id: 'how-ai-works',
        label: 'How AI works',
        title: 'What a chatbot is actually doing',
        body: [
          'At a high level: a large language model predicts the next likely word, over and over, based on patterns in the text it was trained on. It isn’t "thinking" or "knowing" the way a person does — which is exactly why it can sound confident while being wrong.',
          'Keeping that in mind changes how you use it: as a fast drafting partner and idea generator, not an authority.',
        ],
      },
      {
        id: 'build-1',
        label: 'Build 1 · Write a real prompt',
        title: 'Build: write a specific prompt',
        body: [
          'Try the same request two ways — once vague ("help me with my essay") and once specific (give it your actual topic, audience, and what kind of help you want). Compare the two outputs.',
          'Notice how much the quality of your input shapes the quality of what you get back.',
        ],
      },
      {
        id: 'build-2',
        label: 'Build 2 · Stress-test an answer',
        title: 'Build: stress-test an AI answer',
        body: [
          'Ask AI a factual question in your field of study, then verify the answer against a real source. Note anything it got wrong, oversimplified, or made up.',
        ],
      },
      {
        id: 'finish',
        label: 'Finish',
        title: 'You’re oriented',
        body: [
          'You now have a working sense of what AI is good at and where it needs a human double-check. Lesson 2 turns that into a habit you can rely on.',
        ],
      },
    ],
  },
  {
    id: 'use-it-ethically',
    number: 2,
    kind: 'core',
    title: 'Practice the Principles',
    description: 'Put Stewardship, Discernment, and Integrity to work on a real piece of AI output.',
    steps: [
      {
        id: 'welcome',
        label: 'Welcome',
        title: 'From principles to practice',
        body: [
          'The Initiative’s six Principles — Stewardship, Agency, Becoming, Fellowship, Discernment, and Integrity — aren’t meant to stay abstract. This lesson is about applying a couple of them to something you’d actually do this week.',
        ],
      },
      {
        id: 'bias-hallucination',
        label: 'Bias & hallucination',
        title: 'Discernment: spotting bias and hallucination',
        body: [
          'AI models can confidently state things that are false ("hallucination"), and they can reproduce the biases in their training data without flagging them. Discernment means treating fluent, confident-sounding output as a first draft to verify — not a finished answer.',
        ],
      },
      {
        id: 'build-1',
        label: 'Build 1 · Fact-check',
        title: 'Build: fact-check an AI answer',
        body: [
          'Take a claim AI gave you in Lesson 1 (or generate a new one) and trace it back to a primary source. If you can’t verify it, that’s useful information too.',
        ],
      },
      {
        id: 'build-2',
        label: 'Build 2 · Draft a disclosure',
        title: 'Integrity: draft a disclosure statement',
        body: [
          'Write a one- or two-sentence disclosure you could attach to a piece of AI-assisted coursework — clear about what AI helped with and what was yours. Compare it with the disclosure guidance on the Principles page.',
        ],
      },
      {
        id: 'finish',
        label: 'Finish',
        title: 'Nice work',
        body: ['You’ve turned two Principles into habits you can reuse. Next: putting all six into one document.'],
      },
    ],
  },
  {
    id: 'personal-constitution',
    number: 3,
    kind: 'core',
    title: 'Build your Personal AI Constitution',
    description: 'Turn the six Principles into your own written framework for using AI at BYU and beyond.',
    steps: [
      {
        id: 'welcome',
        label: 'Welcome',
        title: 'Why write your own constitution',
        body: [
          'A Personal AI Constitution is a short, written set of commitments for how you’ll use AI — your own rules, grounded in the Initiative’s Principles, that you can actually hold yourself to.',
          'It doesn’t need to be long. The goal is clarity you can return to before an important decision, not a legal document.',
        ],
      },
      {
        id: 'review-principles',
        label: 'Review the Principles',
        title: 'Revisit Stewardship, Agency, Becoming, Fellowship, Discernment, and Integrity',
        body: [
          'Skim the full Principles page and jot down which one or two feel most relevant to how you actually use AI right now — in classes, at work, or in your personal life.',
        ],
      },
      {
        id: 'build-1',
        label: 'Build 1 · Draft your constitution',
        title: 'Build: draft your Personal AI Constitution',
        body: [
          'Write three to five short commitments, each tied to a Principle. For example: "I will disclose AI assistance on graded work (Integrity)," or "I will use AI to explore ideas, not replace my own judgment (Agency)."',
        ],
      },
      {
        id: 'build-2',
        label: 'Build 2 · Pressure-test it',
        title: 'Build: pressure-test it against a real scenario',
        body: [
          'Pick one recent situation where you used (or considered using) AI, and check it against what you just wrote. Revise anything that didn’t hold up.',
        ],
      },
      {
        id: 'finish',
        label: 'Finish',
        title: 'You have a constitution',
        body: [
          'Keep it somewhere you’ll actually see again — notes app, desk, wherever. Lesson 4 is about putting it to work on something real.',
        ],
      },
    ],
  },
  {
    id: 'put-it-to-work',
    number: 4,
    kind: 'core',
    title: 'Put it to work',
    description: 'Apply your constitution to one real project, assignment, or decision — and get feedback.',
    steps: [
      {
        id: 'welcome',
        label: 'Welcome',
        title: 'From constitution to practice',
        body: [
          'The real test of a constitution is whether it changes what you actually do. This lesson asks you to use it once, on purpose, before you finish the course.',
        ],
      },
      {
        id: 'pick-a-project',
        label: 'Pick a project',
        title: 'Choose one real thing to work on',
        body: [
          'It can be small: a class assignment, a club project, something for work. The only requirement is that it’s real, not hypothetical.',
        ],
      },
      {
        id: 'build-1',
        label: 'Build 1 · Work the project',
        title: 'Build: work the project with your constitution open',
        body: [
          'Use AI where it genuinely helps, and note any moment where your constitution changed a decision — what you disclosed, double-checked, or chose to do yourself instead.',
        ],
      },
      {
        id: 'build-2',
        label: 'Build 2 · Get feedback',
        title: 'Build: share it with someone else',
        body: [
          'Show your work — and your constitution — to a classmate, mentor, or the Initiative. Ask where they’d push back.',
        ],
      },
      {
        id: 'finish',
        label: 'Finish',
        title: 'You finished Kickstart',
        body: [
          'You now have a working framework and real practice using it. From here, the Optional lessons below go deeper on specific situations — or dive into the full Principles.',
        ],
      },
    ],
  },
  {
    id: 'ai-security',
    number: 5,
    kind: 'optional',
    title: 'Keep your information safe',
    description: 'What not to paste into a chat window, and how to think about AI tools handling your data.',
    steps: [
      {
        id: 'welcome',
        label: 'Welcome',
        title: 'Stewardship extends to your data',
        body: [
          'Stewardship isn’t only about how you use AI’s output — it includes what you feed into it. This lesson is a short, practical pass on AI and privacy.',
        ],
      },
      {
        id: 'staying-safe',
        label: 'Staying safe',
        title: 'What not to paste into a chat window',
        body: [
          'A rule of thumb: if you wouldn’t post it publicly, don’t paste it into a general-purpose AI tool — that includes unpublished research, other people’s personal information, and anything covered by BYU data policy.',
        ],
      },
      {
        id: 'build-1',
        label: 'Build · Audit your own use',
        title: 'Build: audit your own AI use',
        body: [
          'Look back at your last few AI conversations. Flag anything you wouldn’t want made public, and think through what you’d do differently.',
        ],
      },
      {
        id: 'finish',
        label: 'Finish',
        title: 'Nice work',
        body: ['A few good habits here go a long way. See the Principles page for more on Stewardship.'],
      },
    ],
  },
  {
    id: 'honesty-with-ai',
    number: 6,
    kind: 'optional',
    title: 'Disclosure & academic integrity',
    description: 'When and how to disclose AI use in coursework, without overthinking it.',
    steps: [
      {
        id: 'welcome',
        label: 'Welcome',
        title: 'Disclosure is a habit, not a confession',
        body: [
          'Disclosing AI use isn’t an admission of guilt — it’s a normal, expected part of academic honesty, the same as citing a source. This lesson makes it quick and routine.',
        ],
      },
      {
        id: 'when-to-disclose',
        label: 'When and how to disclose',
        title: 'A simple rule of thumb',
        body: [
          'If AI shaped the final product — wording, structure, code, analysis — say so, briefly, and say how. When in doubt, check your course syllabus or ask your instructor directly.',
        ],
      },
      {
        id: 'build-1',
        label: 'Build · Write your policy',
        title: 'Build: write a reusable disclosure line',
        body: [
          'Draft one sentence you can adapt across assignments this semester — something like: "AI was used to [specific task]; all analysis and conclusions are my own."',
        ],
      },
      {
        id: 'finish',
        label: 'Finish',
        title: 'Nice work',
        body: ['See the Principles page’s "Disclosure & Citation" section for more detail.'],
      },
    ],
  },
  {
    id: 'managing-costs',
    number: 7,
    kind: 'optional',
    title: 'Use AI with intention',
    description: 'Pick the right tool for the job, and think about cost, time, and impact before you reach for AI.',
    steps: [
      {
        id: 'welcome',
        label: 'Welcome',
        title: 'Not every task needs AI',
        body: [
          'Part of using AI well is knowing when not to use it — when it’s slower, less accurate, or just unnecessary for the task in front of you.',
        ],
      },
      {
        id: 'cost-tradeoffs',
        label: 'Weighing the tradeoffs',
        title: 'Free tools, paid tools, and your own judgment',
        body: [
          'Different tools trade off cost, speed, and quality differently. Before defaulting to AI, ask what you’re actually optimizing for — and whether doing it yourself might be faster or better here.',
        ],
      },
      {
        id: 'build-1',
        label: 'Build · Reflect on your habits',
        title: 'Build: reflect on your own AI habits',
        body: [
          'Look back at a week of your own AI use. Which uses saved real time or added real value — and which were just reflex?',
        ],
      },
      {
        id: 'finish',
        label: 'Finish',
        title: 'Nice work',
        body: ['That’s the last optional lesson — thanks for working through Kickstart.'],
      },
    ],
  },
]

export const lessonById = (id) => LESSONS.find((l) => l.id === id)
export const coreLessons = LESSONS.filter((l) => l.kind === 'core')
export const optionalLessons = LESSONS.filter((l) => l.kind === 'optional')
