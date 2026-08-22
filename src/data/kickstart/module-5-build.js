// Module 5 — Build something real. The capstone: understand how agents
// actually work, when to trust them, then build one small real thing for
// one real person — and check it against the constitution from Module 2.

export default {
  id: 'build',
  steps: [
    {
      id: 'welcome',
      label: 'Welcome',
      title: 'The last module is the payoff',
      blocks: [
        {
          type: 'text',
          text: 'Everything so far has been building toward this: you’ll understand how AI "agents" actually work, know when to trust one and when not to, and then build one small, real thing that helps one real person — checked against the constitution you wrote in Module 2.',
        },
      ],
    },
    {
      id: 'how-agents-work',
      label: 'How agents work',
      title: 'What "AI agent" actually means',
      blocks: [
        {
          type: 'text',
          text: 'An agent is a model in a loop: it thinks about the goal, writes an action, the surrounding software actually performs that action, the result gets pasted back into the model’s context window, and the loop repeats until the goal is met.',
        },
        {
          type: 'text',
          text: 'Three pieces make that work: Tools are what an agent can actually do — search the web, run code, edit a file. Skills are how it does a particular job your way — your specific format, your process. Connectors (sometimes called MCP) are how outside tools get plugged in in the first place.',
        },
        { type: 'widget', component: 'AgentLoopSimulator' },
      ],
    },
    {
      id: 'human-in-the-loop',
      label: 'Trust & reversibility',
      title: 'Approve the action, not the vibe',
      blocks: [
        {
          type: 'text',
          text: 'Remember Agency from Module 2 — AI informs, you decide? This is where that principle gets literal. An agent that can actually DO things (not just talk) needs a human checking the specific action before it happens, not just a general sense that "this seems fine."',
        },
        {
          type: 'quote',
          text: 'Approve the action, not the vibe. Match trust to reversibility. A draft can be thrown away... A sent message, a payment, or a deleted file can’t be un-done.',
        },
        { type: 'widget', component: 'ReversibilitySort' },
      ],
    },
    {
      id: 'why-build-to-serve',
      label: 'Why this matters',
      title: 'Practice for a real shift, not just an assignment',
      blocks: [
        {
          type: 'text',
          text: 'Automation has always displaced some kinds of work while creating others — that’s not new. What’s growing right now is work that’s more variable and creative, and work that depends on real human connection. AI can support that second kind of work; it can’t replace it. Building something small to genuinely help one specific person is practice for exactly that shift, not just a class exercise.',
        },
      ],
    },
    {
      id: 'pick-a-person',
      label: 'Pick a person',
      title: 'Not a hypothetical audience — one real person',
      blocks: [
        {
          type: 'text',
          text: 'A simple study guide for a sibling. A meal-planning helper for a busy parent. A first-draft cover letter for a friend who’s job hunting. Keep the technical bar low — a well-built AI project or a reusable prompt template counts, this doesn’t need to be code.',
        },
        { type: 'widget', component: 'ProjectPlanner' },
      ],
    },
    {
      id: 'build-it',
      label: 'Build it',
      title: 'Build it, then check in',
      blocks: [
        {
          type: 'text',
          text: 'Go build it, using whatever tool you set up in Module 3 and whatever you learned about prompting in Module 4.',
        },
        {
          type: 'widget',
          component: 'Checklist',
          props: {
            items: [
              'Build the actual thing, not just a plan for it',
              'Before you hand it over, check any action it takes for reversibility — see the last step',
              'Show it to the actual person before calling it done',
              'Ask them directly: does this actually help, or does it just look impressive?',
            ],
          },
        },
      ],
    },
    {
      id: 'check-constitution',
      label: 'Check your constitution',
      title: 'Check it against what you wrote',
      blocks: [
        {
          type: 'text',
          text: 'This is where the course closes the loop. You learned the principles in Module 2, wrote your own commitments, and now you’re checking a real thing you built against them.',
        },
        { type: 'widget', component: 'ConstitutionCheck' },
      ],
    },
    {
      id: 'finish',
      label: 'Finish',
      title: 'You finished Kickstart',
      blocks: [
        {
          type: 'text',
          text: 'You now understand what AI actually is and isn’t, have a personal constitution grounded in real principles, have a working account and know how to prompt well, and have built one real thing for one real person. That’s the whole course. Well done.',
        },
      ],
    },
  ],
}
