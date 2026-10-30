# Psychologists Services

A React/Vite application for discovering psychologists, managing authenticated favorites, and requesting appointments. The implementation follows the supplied Figma references and technical specification; launch readiness is tracked in `docs/progress.md`.

## Stack
- Frontend: React 18 + Vite
- Backend: Firebase client SDK
- Database: Firestore today; the specification requests Realtime Database (see `docs/decisions.md`)
- Auth: Firebase Authentication with email/password
- Styling: CSS Modules plus `src/index.css`
- Tooling: npm, no test script configured, ESLint

## Commands
- Dev: `npm run dev`
- Build: `npm run build`
- Test: not configured
- Lint: `npm run lint`
- Seed: `npm run seed`

## Structure
- `src/components/` — reusable UI, cards, modals, header, and icons.
- `src/context/` — shared authentication and theme state.
- `src/pages/` — Home, Psychologists, and Favorites route screens.
- `src/firebase.js` — Firebase client initialization.
- `scripts/` — seed data and Firestore seeding script.
- `.claude/skills/` — project workflow skills and stage checklist.
- `docs/` — architecture, decisions, progress, and audit notes.

## Rules
- Read the relevant `.claude/skills/*.md` file before changing that area.
- Keep Firebase configuration in environment variables and never commit `.env`.
- Reuse existing components and CSS-module conventions; keep pages responsive from 320px to 1440px.
- Do not duplicate facts that code already states; reference file paths instead.

## Never
- Never commit secrets or `.env` files.
- Never claim a deployment, database mode, or persisted appointment workflow until it is verified.
- Never ship console errors, placeholder content, or an unverified production URL.

## Read before working on...
- Anything structural: `docs/architecture.md`
- Choosing between approaches: `docs/decisions.md`
- Deciding what to do next: `docs/progress.md`
- UI/styling work: `docs/design-system.md`
- Auth, permissions, input handling: `docs/security.md`
- Firebase data work: `docs/database.md`

## Keeping docs current (mandatory)
- When a task is finished, update `docs/progress.md` (move items, note what changed, set next step).
- If architecture, a rule, or a technical choice changed, update the matching doc in the same task.
- If the user corrects the same mistake twice, add a rule to this file.
- Keep this file under ~120 lines; move detail into `docs/`.
