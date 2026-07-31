# Deploy Checklist — Baig Tours Pakistan

Production layout: **API on Render**, **Next.js frontend on Vercel**, Sanity is cloud-hosted.
The CMS is edited at `https://<frontend-domain>.vercel.app/studio` and is protected by a password (`STUDIO_PASSWORD`).

---

## 1. Backend → Render

- **Create** a new Web Service, connect your GitHub repo.
- **Root directory:** `backend`
- **Build command:** `npm install --include=dev && npm run build`
- **Start command:** `npm start`
- **Instance type:** Free / any. Render injects `PORT` automatically (backend binds `BACKEND_PORT ?? PORT ?? 4000`).

### Environment variables (Render)

| Variable | Required | Value |
|---|---|---|
| `MONGODB_URI` | yes | Your MongoDB Atlas connection string (app exits if missing) |
| `JWT_SECRET` | yes | Long random string (app exits if missing) |
| `CORS_ORIGIN` | yes | `https://<frontend-domain>.vercel.app` (comma-separated list allowed) |
| `NODE_ENV` | no | `production` |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | yes | `83xxlo2o` |
| `SANITY_API_TOKEN` | no | Sanity API token (used to read content when Sanity is configured) |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS` | no | Nodemailer credentials (optional; emails disabled without them) |
| `EMAIL_FROM`, `COMPANY_EMAIL`, `COMPANY_NAME` | no | Defaults exist |

> Do **not** set `BACKEND_PORT` on Render — let Render's `PORT` take over.

---

## 2. Frontend → Vercel

- **Import** the same repo, framework **Next.js** (auto-detected).
- **Root directory:** `baig-tours`
- Build settings: leave defaults (`next build`).

### Environment variables (Vercel)

`NEXT_PUBLIC_*` vars are **inlined at build time** — set them before the first build and redeploy if changed.

| Variable | Required | Value |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | yes | `83xxlo2o` |
| `NEXT_PUBLIC_SANITY_DATASET` | yes | `production` |
| `NEXT_PUBLIC_API_URL` | no | `https://<backend>.onrender.com` (falls back to same-origin + rewrites) |
| `BACKEND_URL` | yes | `https://<backend>.onrender.com` (used for `/api/*` and `/health` rewrites) |
| `SANITY_API_TOKEN` | no | Sanity API token |
| `SANITY_WEBHOOK_SECRET` | no | Random string; signs the revalidation webhook |
| `STUDIO_PASSWORD` | yes | Strong password for the `/studio` CMS login |
| `STUDIO_AUTH_SECRET` | no | Separate secret signing the session cookie (defaults to `STUDIO_PASSWORD`) |

---

## 3. Sanity (sanity.io/manage → project `83xxlo2o` → API)

1. **CORS origins** — add:
   - `https://<frontend-domain>.vercel.app`
   - `http://localhost:3000` (local dev)
   - (leave credentials checkbox enabled)
2. **Webhook** — add:
   - URL: `https://<frontend-domain>.vercel.app/api/revalidate`
   - Secret: the same `SANITY_WEBHOOK_SECRET`
   - Dataset: `production` — triggers for create/update/delete → auto-revalidates the site on CMS edits.

---

## 4. Verify after deploy

- `https://<backend>.onrender.com/health` → `{"status":"ok",...,"database":{"connected":true}}`
- `https://<frontend-domain>.vercel.app/` loads (gallery/tours images OK).
- `https://<frontend-domain>.vercel.app/health` proxies to the backend (200).
- `https://<frontend-domain>.vercel.app/studio` without login → redirected to `/studio-login`.
- Log in with `STUDIO_PASSWORD` → Sanity Studio loads; a "lock" button appears (bottom-right) to log out.
- Edit any document in Studio → site reflects the change after webhook revalidation.

---

## Local development

```bash
npm run install:all   # installs backend + frontend deps
npm run dev           # backend :4000, frontend :3000 (with hot reload)
npm run build         # production build of both
npm start             # runs both from the built output (backend :4000, frontend :3000)
```

Local env files (gitignored): `backend/.env` and `baig-tours/.env.local` — copy from `.env.example`. For local Studio access use `http://localhost:3000/studio`.
