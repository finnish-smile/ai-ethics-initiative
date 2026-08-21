// Module 1 — AI Basics. See src/components/kickstart/StepContent.jsx for
// the block types this renders (text / widget / callout).

export default {
  id: 'basics',
  steps: [
    {
      id: 'welcome',
      label: 'What AI isn’t',
      title: 'What AI actually is (and isn’t)',
      blocks: [
        {
          type: 'text',
          text: 'Picture "AI" for a second. If you pictured a red-eyed robot, a digital brain plotting world domination, or some kind of all-knowing oracle — that’s the movies talking, not reality.',
        },
        {
          type: 'text',
          text: 'Here’s a joke definition that’s more accurate than it sounds: AI is whatever computers still can’t do well. The moment a computer gets good at something — chess, translating text, recognizing your face — people stop calling it "AI" and start calling it "software." The label moves.',
        },
        {
          type: 'text',
          text: 'The real, boring-but-useful definition: something counts as AI when it has autonomy (it can perform tasks without a person guiding every step) and adaptivity (it can improve based on new information, rather than blindly following the same fixed rules forever). That’s it. No consciousness required.',
        },
        {
          type: 'text',
          text: 'One habit worth building right now: get suspicious of words like "intelligence," "understanding," and "learning" when they’re applied to AI. The computer scientist Marvin Minsky called these "suitcase words" — they’re packed so full of different meanings that a sentence like "the AI understands your question" can sound true and be almost meaningless, all at once.',
        },
      ],
    },
    {
      id: 'easy-hard-paradox',
      label: 'The easy/hard paradox',
      title: 'Why "smart" tasks are often the easy ones',
      blocks: [
        {
          type: 'text',
          text: 'Here’s something that trips people up: the tasks that feel impressively "smart" to us are often easier for AI than the tasks a toddler does without thinking.',
        },
        {
          type: 'text',
          text: 'A computer beat the world chess champion in 1997. Nearly thirty years later, reliably picking up a random object off a cluttered table is still an open, mostly-unsolved robotics problem. Chess has clear rules and a defined board. The physical, messy, ambiguous world does not.',
        },
        { type: 'widget', component: 'HarderThanItLooksToggle' },
      ],
    },
    {
      id: 'how-it-works',
      label: 'How it works',
      title: 'Prediction, not lookup',
      blocks: [
        {
          type: 'text',
          text: 'When you ask a chatbot a question, it isn’t searching a database for "the answer." It’s predicting the most likely next word, then the next, then the next — one token at a time — based on patterns it picked up from an enormous amount of text during training.',
        },
        {
          type: 'text',
          text: 'That single fact explains a lot of what feels weird about using AI. A few things worth knowing going in:',
        },
        {
          type: 'text',
          text: '• It doesn’t remember you between separate conversations, unless the tool has a specific memory feature turned on.\n• It can be confidently wrong — fluent, well-formatted, and incorrect, all at once.\n• The more relevant context you give it, the better its predictions get. Vague input gets vague (or made-up) output.\n• Its knowledge has a cutoff date. It was trained on data up to some point in time and doesn’t automatically know what’s happened since — unless it’s specifically searching the web for you.',
        },
      ],
    },
    {
      id: 'hallucinations',
      label: 'Spot the hallucination',
      title: 'When AI confidently makes things up',
      blocks: [
        {
          type: 'text',
          text: 'That prediction-based process has a well-known failure mode called hallucination: the model states something false with exactly the same confident tone it uses for something true.',
        },
        {
          type: 'quote',
          text: 'It’s not lying — it’s pattern-matching to what typically follows similar prompts. Plausibility isn’t the same thing as truth.',
        },
        {
          type: 'text',
          text: 'Try the exercise below before you scroll past it. It’s a small, well-known example — but it makes the pattern-matching-not-truth idea click in a way no explanation quite does on its own.',
        },
        { type: 'widget', component: 'HallucinationSpotter' },
      ],
    },
    {
      id: 'landscape',
      label: 'The landscape',
      title: 'Which tool is which',
      blocks: [
        {
          type: 'text',
          text: 'Right now, three companies build the major general-purpose AI models: OpenAI makes ChatGPT, Anthropic makes Claude, and Google makes Gemini. Microsoft Copilot is built on OpenAI’s technology rather than its own separate model.',
        },
        {
          type: 'text',
          text: 'Beyond general chatbots, there are specialized tools for images, music, video, and code — but for this course, one of the big three general-purpose tools is all you need.',
        },
        {
          type: 'text',
          text: 'Our advice: pick one and actually learn it, rather than lightly poking at several. You’ll get further with one tool you know well than three you’ve only skimmed. Module 3 will help you choose.',
        },
      ],
    },
    {
      id: 'recap',
      label: 'Check your intuition',
      title: 'Quick recap',
      blocks: [
        { type: 'widget', component: 'IntuitionQuiz', props: { quizId: 'module-1' } },
        {
          type: 'callout',
          variant: 'link-out',
          title: 'Want to go deeper on the mechanics?',
          text: 'Aaron, one of our own team members, built an interactive lab covering tokens, embeddings, attention, and more — worth a look if this module left you curious.',
          href: 'https://aaronmiller-info.github.io/AI-Intuition-Lab/',
          cta: 'Visit the AI Intuition Lab',
        },
      ],
    },
  ],
}
