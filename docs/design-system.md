# Design System

## Source references
The visual source of truth is the supplied Psychologists.Services Figma file and its UI-KIT, page, card, popup, and Favorites nodes. Keep the Figma URLs in `README.md`; do not copy design values into unrelated components.

## Colors and tokens
- Global tokens: `src/index.css`.
- Primary palette currently supports green, blue, and orange theme values through `AuthContext`.
- Surfaces, text, muted text, border, and focus states should use CSS variables rather than page-local hard-coded values.

## Typography and layout
- System/Inter-style sans-serif stack is defined in `src/index.css`.
- Responsive target is 320px–1440px; test mobile, tablet, and desktop breakpoints.
- Keep route content inside reusable page containers and preserve semantic headings, buttons, labels, and lists.

## Component conventions
- Reusable UI lives in `src/components/` and uses a colocated CSS Module.
- Route-specific layout lives in `src/pages/` with a colocated CSS Module.
- Use `Icon` and the shared sprite for icons; interactive icon-only buttons need accessible labels and visible focus states.

## Do / Don't
- Do preserve the Figma hierarchy while using the approved alternate palette.
- Do include loading, empty, validation, and error states in the same visual language.
- Don't add placeholder production content or copy styles into global CSS without a token-level reason.
- Don't hide essential actions behind hover-only interactions on touch devices.
