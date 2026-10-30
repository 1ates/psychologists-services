# Architecture

## Overview
The application is a client-rendered React/Vite single-page app. React Router selects the Home, Psychologists, and authenticated Favorites screens; shared auth and theme state is provided by `AuthContext`. Firebase Authentication handles sessions and Firestore currently stores psychologist records and user favorites.

## Folder responsibilities
| Path | Responsibility |
|---|---|
| `src/components/` | Reusable presentation and interaction components, including modals and cards. |
| `src/context/` | Cross-route authentication and theme state. |
| `src/pages/` | Route-level screens and screen-specific styles. |
| `src/firebase.js` | Firebase app, Auth, and Firestore client initialization. |
| `scripts/` | Local seed data and the one-off database seed command. |
| `.claude/skills/` | Stage-specific project rules and orchestration checklist. |
| `docs/` | Project context, decisions, progress, and launch-readiness records. |

## Data flow
```text
Firebase Auth -> AuthContext -> Header, cards, Favorites route
Firestore psychologists -> Psychologists page -> local sort/visible slice -> PsychologistCard
Firestore users/{uid}.favorites <-> PsychologistCard -> Favorites page
```

The technical specification requires a new Firestore request when loading more records; the current page fetches the full collection once and slices it locally. This is tracked as an implementation gap.

## Key files (source of truth)
- Database schema and access: `src/firebase.js`, `src/pages/Psychologists/Psychologists.jsx`, `src/components/PsychologistCard/PsychologistCard.jsx`
- Auth flow: `src/context/AuthContext.jsx`, `src/components/AuthModal/AuthModal.jsx`
- Route definitions: `src/App.jsx`
- Seed data: `scripts/psychologists.json`
- Config/env: `.env.example`, `vite.config.js`, `package.json`

## Conventions
- Route screens own orchestration; reusable interaction belongs in `src/components/`.
- Styles use colocated CSS Modules; global tokens live in `src/index.css`.
- Firebase errors are surfaced locally or logged; before launch, user-facing error states must be checked for sensitive details.
