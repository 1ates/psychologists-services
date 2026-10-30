# Security

## Auth flow
- Firebase email/password registration and login are implemented in `src/components/AuthModal/AuthModal.jsx`.
- `src/context/AuthContext.jsx` subscribes to `onAuthStateChanged` and exposes the current user and logout action.
- Firebase initialization and public client config are in `src/firebase.js`; environment values are documented in `.env.example`.

## Authorization
- `ProtectedRoute` guards `/favorites`; card favorites and appointments also check the authenticated user at the action boundary.
- `database.rules.json` denies root access, allows public reads only for psychologists, and restricts user/favorite/appointment data to the owning UID.
- Deploy and test the rules in the real Firebase project; checked-in rules alone do not secure an undeployed database.

## Input validation
- Auth and appointment forms use React Hook Form with Yup schemas.
- Appointment writes include an authenticated `userId`, stable psychologist ID, required contact/date/time/comment fields, fixed schema version, pending status, and server timestamp.
- User-facing Firebase errors are mapped to safe messages instead of rendering raw exception text.

## Secrets
- `.env` and `.env.*` are ignored by Git; only `.env.example` may be committed.
- `VITE_*` values are client-visible Firebase configuration, not private server secrets.
- The seed-only `FIREBASE_DATABASE_TOKEN` is never read by the browser bundle and must not be committed or placed in a `VITE_*` variable.

## Checklist before shipping
- Verify Firebase Auth providers and Realtime Database rules deny cross-user reads/writes and unauthenticated private access.
- Confirm seed credentials are scoped to the development/seed workflow and are not deployed as frontend environment variables.
- Confirm modal focus management, labels, scroll lock, and keyboard close behavior.
- Run dependency audit and lint; verify no console errors in the built app.
- Confirm appointment retention, privacy notice, and consent requirements under the applicable law.
