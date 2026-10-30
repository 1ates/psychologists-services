# Psychologists Services Web Application

A web application for finding and booking appointments with professional psychologists.

## Features
- **Home Page**: Overview of the platform with call-to-action links.
- **Psychologists Page**: Browse, filter, sort (alphabetically, by price, by rating), and load more psychologists.
- **Favorites Page**: Dedicated view for authenticated users to view their favorite psychologists.
- **Authentication**: Firebase Auth integration (Sign up, Log in, Log out).
- **Appointments**: Modal form to book a consultation session with a psychologist.
- **Responsive Design**: Fully responsive across mobile, tablet, and desktop screens (320px to 1440px).

## Technologies Used
- **React** (with Vite)
- **React Router** for routing
- **Firebase SDK** (Authentication & Firestore)
- **React Hook Form & Yup** for form validation
- **CSS Modules** for scoped styling

## Design & Specifications
- Based on Figma designs provided for Psychologists Services.
- Figma Link: [Psychologists Services Design](https://www.figma.com/design/ljc27Kxth8vDp3ZBvNTONB/Psychologists.Services?node-id=1-2&t=TyToYR9t03gdqJBL-4)

## Getting Started
1. Clone the repository.
2. Install dependencies: `npm install`
3. Configure environment variables in `.env`.
4. Run development server: `npm run dev`

## Deployment

This project supports Vercel and GitHub Pages. A production URL is intentionally not recorded until a deployment has been completed and verified.

### Vercel

1. Import the repository into Vercel.
2. Use `npm run build` as the build command.
3. Use `dist` as the output directory.
4. Add the `VITE_FIREBASE_*` variables from `.env.example` in the Vercel project environment settings.
5. Leave `VITE_BASE_PATH` unset for a root-domain deployment; `vite.config.js` then uses `/` and `vercel.json` provides the SPA fallback for nested routes.

### GitHub Pages

The [GitHub Pages workflow](.github/workflows/deploy-pages.yml) builds and deploys the `main` branch when it is pushed, and can also be started manually from the Actions tab.

1. In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**.
2. Add the `VITE_FIREBASE_*` values from `.env.example` as repository Actions secrets with the same names.
3. The workflow sets `VITE_BASE_PATH` to `/<repository-name>/` for the project-site path and creates `dist/404.html` from the SPA entry point for direct route fallback.
4. Verify the deployed home, psychologists, and favorites routes before recording a public URL.

No custom domain or production URL is configured in the repository yet.
