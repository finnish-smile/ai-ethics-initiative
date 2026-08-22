// Module 4 — Context & prompting. How to write a prompt that actually
// works, why it works mechanically, and talking to AI with your voice.

export default {
  id: 'prompting',
  steps: [
    {
      id: 'welcome',
      label: 'Welcome',
      title: 'A good prompt isn’t a trick, it’s clarity',
      blocks: [
        {
          type: 'text',
          text: 'Most disappointing AI answers trace back to a vague ask. This module gives you one simple template, shows you why it actually works, and gets you talking to AI with your voice at least once.',
        },
      ],
    },
    {
      id: 'goal-context-rules',
      label: 'Goal · Context · Rules',
      title: 'A simple template for any prompt',
      blocks: [
        {
          type: 'text',
          text: 'Three things turn a vague ask into a useful one:',
        },
        {
          type: 'text',
          text: '• Goal — the one thing you actually want, in a sentence.\n• Context — everything AI would need to know to hit that goal: your situation, your audience, what you’ve already tried.\n• Rules — how you want the work done, and what "good" looks like when it’s finished.',
        },
        {
          type: 'text',
          text: 'You don’t need all three every time, but reaching for them when a prompt isn’t landing will fix most problems.',
        },
        {
          type: 'widget',
          component: 'PromptCompare',
          props: {
            weak: 'What should I ask on my podcast?',
            strong: 'I’m interviewing a marine biologist for a 20-minute podcast aimed at curious teenagers. Give me 5 questions that get past the textbook answers into what actually surprised her in her own research. Keep them conversational, not clinical.',
            note: 'Same request, but now it has a Goal (5 surprising questions), Context (marine biologist, teen audience, 20 minutes), and Rules (conversational, not clinical). The AI has almost nothing to guess at.',
          },
        },
      ],
    },
    {
      id: 'why-it-works',
      label: 'Why it works',
      title: 'Why more detail actually helps',
      blocks: [
        {
          type: 'text',
          text: 'Remember from Module 1: AI predicts likely next words based on patterns in your prompt. A prompt is context for prediction — every word you add shifts what the model considers likely to come next. A vague prompt leaves it guessing between a hundred plausible directions; a specific one narrows that down to a few good ones.',
        },
        {
          type: 'widget',
          component: 'PromptCompare',
          props: {
            weak: 'Tell me about Python.',
            strong: 'I know basic Python syntax but I’ve never used it for data analysis. Explain list comprehensions with an example pulled from cleaning up a messy spreadsheet, not an abstract math example.',
            note: 'The weak version could reasonably return a history lesson, a syntax overview, or a snake documentary. The strong version tells the model exactly who’s asking, what they already know, and what kind of example will actually land.',
          },
        },
      ],
    },
    {
      id: 'context-window',
      label: 'Why AI "forgets"',
      title: 'Why a long conversation starts losing the thread',
      blocks: [
        {
          type: 'text',
          text: 'AI tools have a limited "context window" — the amount of the conversation they can actually look at when predicting the next word. It’s not memory loss. Once a conversation gets long enough, the oldest messages get truncated out of that window entirely; the model literally can’t see them anymore.',
        },
        { type: 'widget', component: 'ContextWindowFill' },
      ],
    },
    {
      id: 'roles-exercise',
      label: 'Build: four roles',
      title: 'Build: run your work through four roles',
      blocks: [
        {
          type: 'text',
          text: 'Same piece of your own work, four different roles for the AI to play. Pick something real — an essay draft, a project idea, anything you’re actually working on — and run it through each role below in your own AI tool.',
        },
        { type: 'widget', component: 'RolesExercise' },
      ],
    },
    {
      id: 'voice',
      label: 'Try your voice',
      title: 'Talking to AI instead of typing',
      blocks: [
        {
          type: 'text',
          text: 'Most tools support two different things worth telling apart: dictation (your voice becomes typed text you can still edit) and voice mode (a real back-and-forth spoken conversation). Try both once.',
        },
        {
          type: 'text',
          text: 'When you talk instead of type, you naturally include more — the why, the background, the nuance you’d otherwise skip typing out. On a Mac, double-tapping the Fn key often starts dictation anywhere on the system; inside most AI apps, look for a microphone icon to start voice mode specifically.',
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Optional: try it in another language',
          text: 'If you’re learning or fluent in a language besides English, try voice mode in it — a fun, low-stakes way to see how naturally the tool actually flexes. Nothing to submit here, just something fun to try.',
        },
      ],
    },
    {
      id: 'finish',
      label: 'Finish',
      title: 'You can write a prompt that works',
      blocks: [
        {
          type: 'text',
          text: 'Goal, Context, Rules; why more detail helps; why long conversations lose the thread; four roles for the same material; and your voice as an input. Module 5 puts all of it — plus your constitution from Module 2 — toward building something real.',
        },
      ],
    },
  ],
}
