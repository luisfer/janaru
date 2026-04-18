# Voice & Copy Guide

A reference for how to write user-facing text — UI copy, landing pages, READMEs, error messages, marketing pages, app strings, anything humans read.

**Short name for this voice:** *plain, declarative, spec-sheet voice. No marketing register.*

**How to use:** Reference this file from `AGENTS.md`, `CLAUDE.md`, a Cursor rule, or a system prompt:

> All user-facing copy in this project follows `voice.md`. Read it before writing or editing any text the user will see (UI strings, landing page, README, error messages, emails, social posts).

---

## The one-line rule

**Describe the thing. Don't sell it. Don't perform feelings about it.**

If a sentence could appear unchanged on a LinkedIn post, a Series A landing page, or in ChatGPT's default output, rewrite it.

---

## What this voice IS

- **Factual.** Every sentence states something verifiable about what the product is, what it does, or how to use it.
- **Declarative.** Subject, verb, object. Short sentences. Periods, not exclamation marks.
- **Plainspoken.** Common words. No jargon, no buzzwords, no metaphors that try too hard.
- **Specific.** Names the actual feature, the actual benefit, the actual mechanism. Numbers when relevant.
- **Calm.** No urgency, no hype, no emotional priming. Trusts the reader to care on their own.
- **Confident in its restraint.** Doesn't apologize for being plain. Doesn't add a flourish "to make it pop".

Reference points: Muji product descriptions. Berkshire Hathaway's website. `craigslist.org`. Apple's developer documentation. A good `man` page. Dieter Rams' design captions. The `ffmpeg` README. A Japanese rice-cooker manual.

---

## What this voice is NOT

It is not:

- Marketing copy
- Hype
- "Personality"
- Storytelling for its own sake
- Cute
- Clever
- Reassuring (unless reassurance is literally the function of the sentence)
- Trying to make the reader feel something

If you find yourself writing a sentence whose primary job is to *make the reader feel a way*, delete it.

---

## Banned patterns (with examples)

These are the exact tropes that mark text as AI-generated marketing slop. **None of them ever appear in this voice.**

### 1. The "not just X, it's Y" construction

This is the single most overused rhetorical move in modern SaaS copy and AI output.

- ❌ "It's not just a timer. It's a commitment device."
- ❌ "More than a notes app — your second brain."
- ❌ "This isn't just email. This is communication, reimagined."
- ✅ "A timer that locks the screen until the session ends."
- ✅ "A notes app with backlinks and full-text search."
- ✅ "Email with keyboard shortcuts and server-side rules."

**Variants also banned:** "Not your average…", "More than just…", "Beyond the typical…", "Reimagined", "Reinvented", "Rethought from the ground up".

### 2. Hype verbs and growth-hacker vocabulary

- ❌ "Level up your workflow."
- ❌ "Supercharge your productivity."
- ❌ "Unlock the power of…"
- ❌ "Transform how you…"
- ❌ "Revolutionize your…"
- ❌ "10x your…"
- ❌ "Empower your team to…"
- ❌ "Crush your goals."
- ✅ "Adds keyboard shortcuts for the five most common actions."
- ✅ "Reduces export time from 4 minutes to 12 seconds."

**Banned verbs:** *unlock, supercharge, level up, transform, revolutionize, reimagine, reinvent, empower, crush, dominate, master, harness, leverage, elevate, accelerate, ignite, amplify.*

### 3. The staccato closer / rule-of-three sign-off

The fragment-period-fragment-period ending that pretends to be poetry.

- ❌ "InboxAdmin. Your inbox. Clean. Administered. For your peace of mind."
- ❌ "Notes. Done right."
- ❌ "Simple. Powerful. Yours."
- ❌ "Built for focus. Made for flow. Designed for you."
- ✅ "InboxAdmin sorts incoming mail by sender rules you define."

If you wrote a sentence consisting only of nouns or adjectives separated by periods, delete it.

### 4. Empty superlatives and vague benefits

- ❌ "World-class experience."
- ❌ "Best-in-class performance."
- ❌ "Seamless integration."
- ❌ "Powerful yet simple."
- ❌ "Beautifully designed."
- ❌ "Lightning-fast."
- ❌ "Buttery smooth."
- ✅ "Renders 10,000-row tables at 60fps on a 2019 MacBook Air."
- ✅ "Imports from Notion, Obsidian, and plain Markdown."

If a competitor could put the exact same sentence on their site without changing a word, it says nothing.

### 5. Emotional priming and pseudo-empathy

- ❌ "We know how hard it is to stay focused."
- ❌ "Tired of cluttered inboxes? We get it."
- ❌ "You deserve a tool that just works."
- ❌ "Your time matters."
- ❌ "Built with love."
- ❌ "Made with care in [city]."
- ✅ Just describe the product.

### 6. False intimacy and "we" voice

- ❌ "We built this because we believe…"
- ❌ "Our mission is to…"
- ❌ "We're on a journey to…"
- ❌ "Join us in reimagining…"
- ✅ Talk about the product, not the company's feelings about the product. If the company must appear, one factual line is enough: "Made by two people in Berlin."

### 7. AI-slop transitional phrases

These mark text as ChatGPT-default output instantly.

- ❌ "In today's fast-paced world…"
- ❌ "In an era of…"
- ❌ "Whether you're a beginner or a pro…"
- ❌ "From [X] to [Y], we've got you covered."
- ❌ "The possibilities are endless."
- ❌ "Let's dive in."
- ❌ "At the end of the day…"
- ❌ "It's a game-changer."
- ❌ "The future of [X] is here."

### 8. Decorative adjectives

Adjectives that add no information and only signal enthusiasm.

- ❌ *seamless, powerful, robust, intuitive, elegant, beautiful, stunning, gorgeous, delightful, magical, smart, clever, thoughtful, curated, crafted, handcrafted, bespoke, premium*
- ✅ Use adjectives only when they describe a measurable or visible property: *encrypted, offline-first, single-binary, 12-pixel, monospace, open-source.*

### 9. Em-dash flourishes and "moreover/furthermore" register

- ❌ "It's fast — really fast — and it just works."
- ❌ "Moreover, the platform empowers users to…"
- ❌ "Furthermore, our cutting-edge approach…"
- ✅ Two short sentences. No "moreover", no "furthermore", no "indeed", no "ultimately".

### 10. "Just" as a magic word

- ❌ "Just works."
- ❌ "Just leveled up."
- ❌ "Just point and click."
- ✅ Describe what it does instead.

---

## Concrete rewrites

### Landing page hero

❌ Slop version:
> **Inbox Zero, reimagined.**
> InboxAdmin isn't just an email client — it's your personal communication command center. Supercharge your productivity, unlock deep focus, and finally take back your inbox. Beautifully designed. Lightning-fast. Built with love.

✅ Plain version:
> **InboxAdmin**
> An email client that applies your sorting rules on the server before mail reaches your device. Works with IMAP. Mac and Linux. €25 one-time.

### Feature description

❌ Slop version:
> Our revolutionary AI-powered search empowers you to find anything, instantly. It's not just search — it's discovery, reimagined.

✅ Plain version:
> Full-text search across all notes, including attachments. Returns results in under 50ms for vaults up to 100,000 notes.

### Empty / zero state

❌ Slop version:
> Looks like your inbox is empty! 🎉 Time to relax and enjoy a well-deserved break. You've earned it!

✅ Plain version:
> No messages.

### Error message

❌ Slop version:
> Oops! Something went wrong on our end. Don't worry, our team has been notified and we're working hard to fix it. In the meantime, why not grab a coffee? ☕

✅ Plain version:
> Upload failed: file exceeds 25 MB limit. Try compressing the file or splitting it.

### Success message

❌ Slop version:
> 🎉 Awesome! You've successfully created your first project. You're well on your way to greatness!

✅ Plain version:
> Project created.

### About / footer

❌ Slop version:
> We're a passionate team on a mission to revolutionize how the world communicates. Join us on our journey!

✅ Plain version:
> Made by one person. Source on GitHub. Contact: hello@example.com.

---

## Tone calibration: how cold is too cold?

This voice is plain, not hostile. Three dials:

- **Warmth = 0–2 out of 10.** No exclamation marks. No emoji. But also no scolding, no condescension, no terseness for its own sake.
- **Confidence = 8 out of 10.** State things directly. Don't hedge with "we think" or "might" unless genuinely uncertain.
- **Density = high.** Every sentence carries information. No padding.

A reader should finish and think: *I know exactly what this is and whether I want it.* Not: *that was charming* or *that was harsh*.

---

## Allowed exceptions

- **Documentation can be friendlier in tutorials.** A "Getting started" guide can say "Next, we'll add a route." That's instructional, not promotional.
- **Error messages can suggest a fix.** "File too large. Try compressing it." The "try" is functional, not decorative.
- **A single human line in an About page is fine.** "Made by two people who got tired of the alternatives." One sentence. Not a manifesto.
- **Humor is allowed if it's dry and earned.** craigslist's "by the founder, by the founders, by us" footer works. A joke that costs the reader nothing to skip.

---

## The self-check

Before shipping any user-facing text, run it through these questions:

1. Could a competitor paste this on their site verbatim? → Rewrite with specifics.
2. Does any sentence exist purely to make the reader feel something? → Delete.
3. Are there exclamation marks, emoji, or em-dash flourishes? → Remove unless functionally required.
4. Is there a "not just X, it's Y" construction? → Rewrite as a direct claim.
5. Is there a staccato fragment-period closer? → Replace with one full sentence or delete.
6. Are there banned verbs (*unlock, supercharge, transform, empower, level up*)? → Replace with the literal action.
7. Are there decorative adjectives (*seamless, powerful, beautiful, intuitive*)? → Delete or replace with measurable properties.
8. Does it sound like ChatGPT's default voice? → Rewrite shorter and more specific.
9. If you read it aloud, does it sound like a person describing a tool to a friend? → Good. Like a pitch deck? → Bad.

---

## TL;DR for the AI reading this

- Write like a Muji label, an Apple developer doc, or a good `man` page.
- Subject. Verb. Object. Period.
- State facts about the product. Do not perform feelings about it.
- No hype verbs, no decorative adjectives, no staccato closers, no "not just X, it's Y", no emoji, no exclamation marks, no AI-slop transitions.
- When in doubt, write less.
