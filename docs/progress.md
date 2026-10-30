# Progress

_Last updated: 2026-10-30_

## Current focus
- Pre-launch audit complete: 0 errors, 6 warnings (all are SPA limitations or need user-provided domain/images). Ready to commit, push, create PR, and deploy.

## Done (recent)
- Migrated data access and seeding from Firestore to Firebase Realtime Database with stable slug IDs and materialized sort ranks.
- Configured Realtime Database rules in `database.rules.json` for public psychologist reads and user-owned profiles, favorites, and appointments.
- Updated authentication modal, registration profile creation, and `AuthContext` to support RTDB user records and favorites.
- Re-architected psychologist card favorites and Favorites page to read and write atomically under `/users/{uid}/favorites/{psychologistId}`.
- Refactored `Psychologists` pagination and sorting around server-side range queries (`orderByChild` + `limitToFirst`/`limitToLast`), ensuring every `Load more` click or filter change issues a fresh Firebase request.
- Implemented durable appointment persistence under `/appointments/{appointmentId}` with strict validation, loading/error feedback, and a success redirect to `/thank-you`.
- Built a shared accessible modal wrapper (`Modal.jsx`) with focus trapping, Escape handling, backdrop dismissal, scroll locking, and screen-reader labeling.
- Added comprehensive route-aware metadata handling (`PageMeta.jsx`), a 404 Not Found route, a Thank You route, and a `ProtectedRoute` for authenticated views.
- Aligned UI styling, accessible icons, button focus rings, reduced-motion support, and responsive card/modal layout with the Figma references.
- Configured Vite base paths, Vercel SPA rewrite rules, and a GitHub Pages GitHub Actions deployment workflow.
- Added unit tests for psychologist query and pagination helpers using Vitest, with clean test execution, linter checks, and production builds.
- Added KVKK/GDPR-compliant Privacy Policy page (`src/pages/PrivacyPolicy/`) in English, linked from Header nav and routed at `/privacy-policy` with `noindex` metadata.
- Fixed AuthModal.jsx: added `reset()` call after successful registration/login submission so the form clears before closing (`src/components/AuthModal/AuthModal.jsx:39,62`).
- Fixed hero image overflow: `purpleSquare`, `yellowSquare`, `experienceBadge` use negative positioning at 426px+ and `left: 0` / `right: 0` at ≤425px (moved from 768px breakpoint to 425px breakpoint); `homeContainer::after` hidden on mobile.
- Reworked hamburger menu (<1024px): when logged in, `.headerRight` wrapper groups hamburger + userMenu with `gap: 25px` and `margin-left: auto` (pinned to right edge); hamburger sits 25px left of user menu. When not logged in, standalone hamburger also pinned to container right edge via `.hamburgerRight { margin-left: auto }`. `.authBlock` hidden on mobile, login/register render inside `.mobileAuth` within nav overlay. Desktop uses `order` (Nav: 1, headerRight: 2, authBlock: 3) with `space-between` for Logo | Nav | userMenu/AuthBlock layout.
- Fixed active dot on mobile nav: `.navLinkActive::after` hidden at ≤1024px so the theme-colored indicator no longer appears in the wrong place on the slide-in overlay.
- Fixed hamburger menu close behavior: added `navRef` so clicking outside the nav overlay closes the menu; `handleEsc` now calls `setIsMenuOpen(false)` so Esc closes the menu; mobile login/registration buttons call `setIsMenuOpen(false)` so they close the menu before opening AuthModal.
- Fixed hero breakpoint gap: changed `@media (min-width: 1101px) and (max-width: 1280px)` to `@media (min-width: 1024px) and (max-width: 1280px)` in Home.module.css so tablet intermediate styles apply from 1024px, eliminating the 1100px break where text and hero image were getting too close.
- Skills check: only `pre-launch` and `project-init` installed locally; no `frontend-design` skill present (not required for current CSS work).
- Pre-launch audit: added `public/robots.txt` (allows public pages, references sitemap), `public/sitemap.xml` (lists all routes), and `dist/404.html` (SPA fallback for GitHub Pages client-side routing, created by CI via `cp dist/index.html dist/404.html`). check_seo.py: 0 errors, 6 warnings.
- Pre-launch warnings are SPA limitations or need user content: canonical link (needs domain), og:image (needs image + domain), h1 (client-rendered SPA), thank-you/privacy static HTML (client-side routes), LocalBusiness JSON-LD (needs domain + business info). None can be fabricated per pre-launch rules.

## Next up
1. Commit all changes (~30 modified + new files), push to origin/main, create PR, review and approve.
2. Deploy to GitHub Pages (workflow triggers on push to main) and Vercel (connect repo via Vercel dashboard).
3. Add live URLs to project files and repo's About section once deployments are verified.
4. Seed Firebase Realtime Database with psychologist data (requires `FIREBASE_DATABASE_TOKEN` in `.env`, then `npm run seed`).
5. Provide a verified production domain and URL to update canonical tags, sitemap host, and README deployment links.
6. Legal review of the privacy/KVKK/GDPR copy before production go-live.
7. Run final user acceptance smoke tests against the live Firebase project after seeding.

## Known issues / blockers
- RTDB was disabled by the database owner; user re-enabled it via Firebase console but it is now empty (`null`). Seed data (`scripts/psychologists.json`) exists but `npm run seed` requires `FIREBASE_DATABASE_TOKEN` which is not yet in `.env`.
- Production domain, legal privacy review, and final hosting URL confirmation remain user actions.

<!-- Keep only recent work here. Summarize or delete old "Done" items periodically. -->
