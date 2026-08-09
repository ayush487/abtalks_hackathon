## Context
I'm redesigning **ABTalks**, a 60-day coding challenge platform for Indian college students. Students pick a track, build something daily, and maintain a public streak by submitting a GitHub commit + a LinkedIn post each day. The product works functionally but has **never been designed** — my job is to design and build it, not just make it functional.

**Critical user context that should drive every design decision:**
- Primary device: **mobile phone**, viewport **390px**
- Primary usage time: **late at night, after college** — meaning low energy, low patience, thumb-only reach, and a strong need for the product to feel fast, calm, and low-friction rather than demanding
- Primary audience: students who may be encountering ABTalks for the very first time (landing page) and returning students who are mid-streak and need quick daily reassurance (dashboard, day page)
- Emotional stakes: a broken streak feels like failure; the design should motivate consistency without inducing guilt or anxiety

## Tech Requirements
- Plain **HTML, CSS, JavaScript** — no frameworks, no build step
- Mobile-first CSS (design and build for 390px first, then layer in desktop enhancements with media queries — do not design desktop-first and shrink down)
- Use a single mocked `data.json` (or inline JS object) for all student/challenge data — no backend, no auth, no database
- Client-side routing/pages should map exactly to these three routes:
  - `/`
  - `/dashboard`
  - `/day/12`
- Code should be clean and componentized where reasonable (shared header/nav, shared card components) even without a framework

## Design Principles to Apply
1. **Trust fast, explain faster** — a first-time visitor on the landing page should understand what ABTalks is, why it matters for their career/recruiter visibility, and what committing to 60 days actually looks like, within a few seconds of scrolling.
2. **Reduce nighttime friction** — big tap targets, minimal typing, clear single primary action per screen, generous spacing, no dense walls of text.
3. **Motivate without guilting** — streak and progress UI should celebrate consistency, but must **not** make a broken streak feel like the app is scolding the student.
4. **Design for real states, not just the happy path** (see edge cases below).

## Screens to Build

### 1. Landing Page (`/`)
Audience: someone who has never heard of ABTalks.
Must include:
- A clear, immediate explanation of what ABTalks is and who it's for
- Why this matters (recruiter visibility, daily discipline, portfolio of public work)
- What the 60-day commitment actually looks like (pick a track → build daily → prove it via GitHub + LinkedIn)
- Social proof / credibility signals (e.g., number of students, tracks available, example streak or success snippet — mocked data is fine)
- One unmistakable primary CTA to start/join

### 2. Student Dashboard (`/dashboard`)
Home screen after "login." Must include:
- Current streak (with visual weight — this is the emotional centerpiece)
- Today's task, front and center, one tap away from starting
- Progress through the 60-day challenge (e.g., Day X of 60, visual progress bar/ring)
- Overall completion / stats (submissions made, completion %)
- Student standing or achievements (badges, rank, milestones — mocked)

### 3. Challenge Day (`/day/12`)
The full single-day experience. Must include:
- The day's task description, written clearly enough a tired student can understand it without re-reading
- What needs to be built / done today (scoped, concrete)
- A submission flow for proof of work:
  - GitHub repo/commit link input
  - LinkedIn post link input
  - Clear success state once both are submitted

## Edge Cases to Handle Explicitly
Design and build real UI states for:
- **First day, no streak yet** — dashboard should feel like a warm start, not an empty/broken screen
- **A missed day** — show this in a way that's honest but not punishing
- **Empty profile** — a student with no submissions yet should still see a coherent, encouraging dashboard, not blank space or broken layout

## One Thoughtful Idea to Include: Streak Freeze
Introduce a **"Streak Freeze"** mechanic: each student gets a limited number of freezes (e.g., 2 per 60-day challenge, mocked in the data). If a day is missed, instead of the streak breaking and resetting to zero, a freeze auto-applies (or the student can choose to apply it) and the streak is preserved with a visible "protected" indicator. This directly turns the "missed day" edge case into a moment of relief instead of failure — which matters a lot for a nighttime, low-energy user base trying to stay motivated over 60 days. Show remaining freezes clearly on the dashboard.

## Deliverable Expectations
- Fully working static site with the three routes above, mobile-first at 390px, with sensible desktop behavior
- Mocked JSON data realistic enough that the UI doesn't feel like a placeholder (real-sounding task titles, student name, streak numbers, etc.)
- All three edge-case states must be reachable/demonstrable in the mocked data, not just theoretically supported


the responsiveness of the page doesnt work well 
fix the large svg and make the page much responsiveness to mobile devices (390px width)

the route mapper should be "/dashboard" instead of "/#/dashboard"

## Checkbox Selection fix
What to build today
fix checkbox that it should select one checkbox at a time.

## Added Toggle button for light and dark mode
Add a switch button in the bottom right corner to change the theme from the dark and light mode currently there is only dark mode is in the website.