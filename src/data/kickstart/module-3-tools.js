// Module 3 — Getting started. This is where a total beginner leaves with
// an actual account and one real completed task. Pricing/tiers below were
// checked against each provider's live pricing page while writing this —
// re-verify before publishing, since these change often.

export default {
  id: 'getting-started',
  steps: [
    {
      id: 'welcome',
      label: 'Welcome',
      title: 'By the end of this module, you’ll have an account',
      blocks: [
        {
          type: 'text',
          text: 'Modules 1 and 2 were all conceptual — no tool required. This one is hands-on: pick a tool, create an account, and run one real task before you move on.',
        },
        {
          type: 'text',
          text: 'Three companies build the major general-purpose tools: OpenAI makes ChatGPT, Anthropic makes Claude, and Google makes Gemini. Our advice from Module 1 still holds — pick one and actually learn it, rather than lightly poking at all three.',
        },
      ],
    },
    {
      id: 'pick-a-tool',
      label: 'Pick a tool',
      title: 'Which should you start with?',
      blocks: [{ type: 'widget', component: 'ToolPicker' }],
    },
    {
      id: 'create-account',
      label: 'Create an account',
      title: 'Set up your account',
      blocks: [
        {
          type: 'text',
          text: 'Go create a free account with whichever tool you picked. A few things to know before you do:',
        },
        {
          type: 'widget',
          component: 'Checklist',
          props: {
            items: [
              'You can sign up with a personal email — you don’t need a school-issued account for a free tier',
              'Use a real, memorable password — these tools can hold a lot of your conversation history',
              'Skip any optional upsells during signup; you can always upgrade later once you know what you actually need',
              'Bookmark the tool once you’re in — you’ll be back',
            ],
          },
        },
      ],
    },
    {
      id: 'settings-worth-knowing',
      label: 'Worth knowing',
      title: 'A few settings worth finding on day one',
      blocks: [
        {
          type: 'text',
          text: 'Menu names and locations change often between updates, so treat these as "things to go look for" rather than exact click-by-click directions.',
        },
        {
          type: 'widget',
          component: 'Checklist',
          props: {
            items: [
              'Custom instructions / personalization — tell it a bit about you once, so you’re not repeating context every conversation',
              'Memory — most tools now remember things across conversations unless you turn it off; worth knowing it’s there',
              'Model picker — most tools let you choose between a fast/lightweight model and a slower/more capable one for harder tasks',
              'Data controls — check whether your conversations are used to train future models, and whether you can opt out',
            ],
          },
        },
      ],
    },
    {
      id: 'deep-research',
      label: 'Build: try Deep Research',
      title: 'Build: run a real research task',
      blocks: [
        {
          type: 'text',
          text: 'Most major tools now have a "Deep Research" mode — instead of one quick answer, it spends several minutes actually browsing multiple sources and comes back with a structured, cited report. It’s a genuinely different experience from a normal chat.',
        },
        {
          type: 'text',
          text: 'As of when this was written: ChatGPT’s free tier includes limited Deep Research; Claude’s equivalent ("Research") requires a paid Pro plan; Gemini’s Deep Research is included with the paid Google AI plans. Check the current pricing page for whatever you picked — these tiers shift often.',
        },
        {
          type: 'widget',
          component: 'Checklist',
          props: {
            items: [
              'Pick a real question you actually want answered — something with a real-ish answer to check, not "tell me about dogs"',
              'Find and start Deep Research (or the closest equivalent your tool offers) instead of a normal chat',
              'While it runs, notice that it shows its steps — it’s not a black box',
              'When it finishes, open at least one of its cited sources and check it actually says what the report claims',
            ],
          },
        },
      ],
    },
    {
      id: 'finish',
      label: 'Finish',
      title: 'You’re set up',
      blocks: [
        {
          type: 'text',
          text: 'You now have a real account, know a few settings worth adjusting, and have run one genuinely useful task. Module 4 is about getting better results out of whatever you just used.',
        },
      ],
    },
  ],
}
