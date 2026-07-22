# Make the MCQ page reachable

Right now `/learn` exists but nothing on the dashboard links to it, so it can only be opened by typing the URL manually.

## Changes

1. **Dashboard "Continue Learning" buttons → `/learn`**
   - In `src/routes/index.tsx`, turn the featured `ContinueLearningCard` button and the hero "Resume learning" button into `<Link to="/learn">` elements (styled identically).

2. **Sidebar becomes real navigation (both pages)**
   - Convert the sidebar buttons in `src/routes/index.tsx` from `<button>` to `<Link>`, matching the pattern already used in `src/routes/learn.tsx`.
   - Map: Dashboard → `/`, Subjects → `/learn` (placeholder until a real Subjects page exists). Achievements / Leaderboard / Profile stay as non-navigating buttons for now since those routes don't exist yet.
   - Active state driven by `activeProps` so it updates automatically per route.

3. **Small UX polish**
   - Add a "Back to Dashboard" affordance on `/learn` by making the breadcrumb "Dashboard" crumb a real `<Link>` (it already is — just verifying).
   - Ensure the Daily Mission / Random Challenge buttons on the dashboard also link to `/learn` so multiple entry points work.

## Out of scope

- No visual redesign. Same tokens, spacing, shadows, radii.
- No new routes for Achievements / Leaderboard / Profile / Subjects index — those remain placeholders per the locked spec (UI only, current sprint).

## How you'll find it after this

- Click **Continue Learning** on the featured card, **Resume learning** in the hero, **Continue Mission**, or **Subjects** in the sidebar → lands on the MCQ page.
