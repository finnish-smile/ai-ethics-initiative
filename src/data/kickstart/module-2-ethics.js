// Module 2 — AI Ethics. The heart of the course: real cases where AI went
// wrong, Elder Gong's counsel on AI and faith, the team's guidebook, an
// explanation of Claude's Constitution, and the capstone — writing your
// own Personal AI Constitution.

import { CASE_STUDIES, GONG_STEWARDSHIP_QUOTE, GONG_NOSE_MOMENT, GONG_VIDEO_URL } from './quotes.js'
import { GUIDEBOOK_URL } from './principles.js'

export default {
  id: 'ethics',
  steps: [
    {
      id: 'welcome',
      label: 'Welcome',
      title: 'Thinking about AI ethics isn’t niche',
      blocks: [
        {
          type: 'text',
          text: 'It’s easy to assume "AI ethics" is an academic exercise for philosophers and policy wonks. It isn’t. Religious leaders, universities, and organizations like the United Nations are all actively working through it right now — because the decisions get made either way, on purpose or by default.',
        },
        {
          type: 'text',
          text: 'This module walks through three real cases where AI use went wrong, an apostle’s counsel on AI and faith, our own team’s guidebook, a real-world example of an AI company writing its values down on purpose — and ends with you writing yours.',
        },
      ],
    },
    {
      id: 'stakes-uber',
      label: 'Case: safety',
      title: 'When "mostly working" isn’t good enough',
      blocks: [
        { type: 'case-study', ...CASE_STUDIES[0] },
      ],
    },
    {
      id: 'stakes-bias',
      label: 'Case: fairness',
      title: 'Bias doesn’t announce itself',
      blocks: [
        { type: 'case-study', ...CASE_STUDIES[1] },
      ],
    },
    {
      id: 'stakes-privacy',
      label: 'Case: privacy',
      title: 'Who’s protecting your data?',
      blocks: [
        { type: 'case-study', ...CASE_STUDIES[2] },
      ],
    },
    {
      id: 'gong-intro',
      label: 'An apostle’s counsel',
      title: 'Faith, Dignity, and Human Flourishing',
      blocks: [
        {
          type: 'text',
          text: 'Elder Gerrit W. Gong, a member of the Quorum of the Twelve Apostles, addressed AI directly in a talk called "Faith, Dignity, and Human Flourishing: Hearing God’s Voice in an Age of Artificial Intelligence." It’s the emotional and spiritual core of this module.',
        },
        {
          type: 'text',
          text: GONG_NOSE_MOMENT.description,
        },
        {
          type: 'callout',
          variant: 'link-out',
          title: 'Worth watching in full',
          text: 'The quotes on the next step are organized by principle, but the full address has much more context.',
          href: GONG_VIDEO_URL,
          cta: 'Watch the address',
        },
      ],
    },
    {
      id: 'gong-principles',
      label: 'By principle',
      title: 'His counsel, organized by principle',
      blocks: [
        {
          type: 'text',
          text: 'Click through each principle to see what he said about it, directly.',
        },
        { type: 'widget', component: 'PrincipleTabs' },
        {
          type: 'quote',
          text: GONG_STEWARDSHIP_QUOTE.text,
          attribution: 'Elder Gerrit W. Gong, on AI’s environmental cost',
        },
      ],
    },
    {
      id: 'our-guidelines',
      label: 'Our guidebook',
      title: 'Our own team’s guidebook',
      blocks: [
        {
          type: 'text',
          text: 'Our own team has been writing a guidebook — Stewardship of AI — built around these same five principles, each paired with a "Pause" question you can actually ask yourself in the moment.',
        },
        {
          type: 'callout',
          variant: 'link-out',
          title: 'Still being written',
          text: 'The guidebook is a work in progress — some sections are drafts. Worth reading now, and worth checking back on later.',
          href: GUIDEBOOK_URL,
          cta: 'Read the guidebook',
        },
      ],
    },
    {
      id: 'claude-constitution',
      label: 'Claude’s Constitution',
      title: 'When a company writes its values down on purpose',
      blocks: [
        {
          type: 'text',
          text: 'Anthropic — the company behind Claude — publishes something called Claude’s Constitution: a detailed, public description of the values and behavior they’re training Claude toward. Instead of letting an AI’s values emerge by accident from whatever data and incentives happen to shape it, they wrote down, on purpose, what they actually want.',
        },
        {
          type: 'text',
          text: 'In their words, they want Claude to be: broadly safe, broadly ethical, compliant with their more specific guidelines, and genuinely helpful — roughly in that order when those things conflict. The document is public, and Anthropic has released it for anyone to use freely.',
        },
        {
          type: 'text',
          text: 'This is the same move Elder Gong is asking you to make, at a much larger scale: instead of drifting into whatever a chatbot optimizes for by default, decide on purpose what you actually value — and write it down.',
        },
        {
          type: 'callout',
          variant: 'link-out',
          title: 'Read it yourself',
          text: 'It’s written for Claude as much as for humans, so it reads a little differently than you’d expect — worth a skim regardless.',
          href: 'https://www.anthropic.com/constitution',
          cta: 'Read Claude’s Constitution',
        },
      ],
    },
    {
      id: 'build-constitution',
      label: 'Build it',
      title: 'Your Personal AI Constitution',
      blocks: [
        {
          type: 'text',
          text: 'This is the payoff of the whole module. Below are the five principles and their Pause questions again — write one honest sentence per principle, in your own words. You’ll come back to this in Module 5.',
        },
        { type: 'widget', component: 'ConstitutionBuilder' },
      ],
    },
  ],
}
