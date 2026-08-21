// Top-level metadata for the 5 Kickstart modules. Each module's actual
// step content lives in its own file (module-1-basics.js, etc.) so the
// dashboard can stay light without pulling in every module's content.

export const MODULES_META = [
  {
    id: 'basics',
    number: 1,
    title: 'AI Basics',
    description: 'What AI actually is (and isn’t), and why it sometimes confidently makes things up.',
    minutes: 15,
    needsAccount: false,
  },
  {
    id: 'ethics',
    number: 2,
    title: 'AI Ethics',
    description:
      'Real cases where AI went wrong, an apostle’s counsel on AI and faith, and your own personal AI constitution.',
    minutes: 30,
    needsAccount: false,
  },
  {
    id: 'getting-started',
    number: 3,
    title: 'Getting started',
    description: 'Pick a tool, set up an account, and run your first real task.',
    minutes: 15,
    needsAccount: true,
  },
  {
    id: 'prompting',
    number: 4,
    title: 'Context & prompting',
    description: 'Write prompts that actually work, and why they work — plus talking to AI with your voice.',
    minutes: 20,
    needsAccount: true,
  },
  {
    id: 'build',
    number: 5,
    title: 'Build something real',
    description: 'Build one small, real thing that helps a specific person — and check it against your constitution.',
    minutes: 25,
    needsAccount: true,
  },
]

export const moduleMetaById = (id) => MODULES_META.find((m) => m.id === id)
