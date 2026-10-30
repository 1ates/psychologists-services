/* eslint-env node */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const explicitBase = process.env.VITE_BASE_PATH?.trim();
const repositoryName = process.env.GITHUB_REPOSITORY?.split('/').pop();
const base =
  explicitBase ||
  (process.env.GITHUB_ACTIONS === 'true' && repositoryName
    ? `/${repositoryName}/`
    : '/');

export default defineConfig({
  plugins: [react()],
  base,
});
