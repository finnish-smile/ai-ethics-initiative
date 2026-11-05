# AI Ethics Initiative

Notes for Claude about this project go here.

BYU Marriott AI & Ethics Initiative — Site Overview
Live site: https://finnish-smile.github.io/ai-ethics-initiative/

Mission
We develop Christlike leaders who treat artificial intelligence as a stewardship — harnessing it ethically for people, communities, and the world.

A student-led initiative. The site helps students and faculty use AI as stewards, not servants: building judgment and values first, so AI supports learning instead of replacing it.

Goals
Give students a shared ethical framework for AI use (the five Stewardship principles).
Have students put that framework into practice by writing a personal AI constitution.
Teach how AI works and how to use it to think better, not think less.
Keep the community current on AI ethics news.
Collect real examples of good AI use from students and professors.
Navigation
Home · Principles · Learn · Events · News

Pages
Page	Path	What's on it
Home	/	Mission, featured AI Constitution Competition, Stewardship guidebook, latest news, upcoming events, newsletter signup
Principles	/principles	A Guidebook for the Wise and Ethical Stewardship of AI — five principles to sharpen judgment (not a rulebook)
Constitution	/constitution	AI Constitution Competition: assignment, rubric, and submission form
Learn	/kickstart	Courses, guides, tools, and learning modules (incl. the Constitution Builder in Module 2)
Events	/get-involved	Events calendar, workshops, competitions; form to suggest a campus event
News	/news	The Inchworm Dispatch — weekly AI ethics stories, featured article, article suggestion form
Articles	/articles	Searchable archive of all collected AI ethics articles
Newsletter	/newsletter	Latest weekly issue + subscribe form
Newsletter archive	/newsletter-archive	All past issues
Showcase	/showcase	Ethical AI Showcase — concrete ways students use AI to support learning; submit your own
Professors	/professors	Faculty ideas for AI in the classroom and research; submit an idea
The Five Principles (Stewardship of AI)
Agency
Becoming
Fellowship
Discernment
Integrity
Each principle has its own page under /principles/<slug>.

AI Constitution Competition
Students write a short personal constitution — one article per principle — stating how they will and won't use AI. It doubles as a harness: pasted into an AI tool's custom instructions, it shapes how the tool responds.

Deliverables

Written constitution (PDF, Word, or text, ≤10 MB)
30–120 second video explaining what, why, and how (incl. how AI was used)
LinkedIn post sharing the constitution and how they use it, with a link to our website (required, not scored). The post link is optional on the form; students can add it later with their BYU email, and it's saved to their latest entry in the Sheet. The website link shown to students is SITE_URL in src/lib/site.js; update it once the final domain is set.
Rubric (100 pts)

Criterion	Points
Usable as a harness	10
Structure & format	10
Personal input	10
The five principles	40
Video: what, why, how	30
Eligibility: undergraduate students (Freshman–Senior), @byu.edu email.

Learn resources
Resource	Author	Summary
AI Intuition Lab	Aaron Miller	Interactive lab on how LLMs work across 12 topics (tokenization, embeddings, attention, prompting, agents, limitations)
Learning with AI: A Student's Complete Guide	Mark Keith	66-page guide to using AI to think better; AI Engagement Model + prompt library
News: The Inchworm Dispatch
Weekly Friday roundup of AI ethics news. Includes a featured article, a full searchable archive, past issues, and an email subscription.

Tech (for editors)
React + Vite, deployed to GitHub Pages on every push to main
Repo: finnish-smile/ai-ethics-initiative
Local preview: npm run dev → http://localhost:5173/ai-ethics-initiative/
Edit and push from the laptop: cd C:\Users\dawso\ai-ethics-initiative then claude remote-control

Git workflow (for Claude)
Commit and push all edits to the `dawsons-edits` branch, never directly to `main`.
Pushing to `main` deploys the live site, so changes only reach `main` through a reviewed merge or PR that Dawson approves.
Before starting work, make sure `dawsons-edits` is checked out (`git switch dawsons-edits`) and up to date with `main`.