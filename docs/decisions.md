# Decisions

Short records of why a choice was made. Newest first.

## 2026-10-27: Use Realtime Database for application data
- Decision: Migrate psychologist, user favorites, and appointment reads/writes from Firestore to Firebase Realtime Database.
- Why: This matches the technical specification and supports the selected user-owned paths and new-request pagination contract.
- Alternatives considered: Keep Firestore and document an exception.

## 2026-10-27: Persist appointment requests in Firebase
- Decision: Store authenticated appointment requests under `/appointments/{appointmentId}` with owner, psychologist snapshot, required form values, pending status, and server timestamp.
- Why: The user selected durable Firebase persistence rather than validation-only submission.
- Alternatives considered: External backend; client-only success message.

## 2026-10-27: Prepare Vercel and GitHub Pages
- Decision: Support both Vercel root deployment and a GitHub Pages project-site base path.
- Why: The user wants both hosting targets prepared, but has not supplied a production domain or verified URL.
- Alternatives considered: Choose a single host now; defer all hosting configuration.

## 2026-10-27: No public contact claims
- Decision: Do not add a phone number, address, map, opening hours, LocalBusiness claims, or invented social proof.
- Why: The user confirmed no public contact content is available; pre-launch content must remain truthful.
- Alternatives considered: Add placeholders; rejected because placeholders and fabricated facts must not ship.

## 2026-10-27: Preserve the existing React/Vite foundation
- Decision: Continue with React 18, Vite, React Router, Firebase, React Hook Form, and Yup.
- Why: These dependencies already satisfy the required client framework, routing, Firebase, and validation direction with minimal migration risk.
- Alternatives considered: Native JavaScript/Vite rewrite.

## 2026-10-27: Keep favorites user-scoped
- Decision: Store favorites under `users/{uid}/favorites/{psychologistId}` as a boolean map.
- Why: The requirement is account-specific and child-level writes are safer than an array read-modify-write.
- Alternatives considered: localStorage only; rejected as the authoritative store.

## Open decisions
- Provide the production domain/URLs before adding canonical, sitemap host, absolute OG URLs, and verified README deployment links.
- Confirm the applicable privacy law and approve jurisdiction-specific privacy/retention copy.
- Confirm the site language and appointment administration/retention workflow.
- Back up or explicitly reset any existing Firestore data before the Realtime Database cutover.
