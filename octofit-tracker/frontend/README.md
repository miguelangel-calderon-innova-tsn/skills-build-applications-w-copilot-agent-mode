# OctoFit Tracker frontend

The presentation tier runs on Vite at `http://localhost:5173` and uses React 19, React Router, and Bootstrap.

## Backend URL

Create `octofit-tracker/frontend/.env.local` and define the Codespaces name:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

The app builds API requests as `https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/` when the variable is defined. When it is unset, requests safely fall back to `http://localhost:8000/api/[component]/`.

`.env.example` contains a starter value. Restart Vite after changing environment variables because Vite exposes them at build time.

## Scripts

```bash
npm run dev --prefix octofit-tracker/frontend
npm run build --prefix octofit-tracker/frontend
```
