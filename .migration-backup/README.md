# Karibu and Beyond Ltd website

A frontend-only React and Vite website for Karibu and Beyond Ltd. It is built as static files and can be hosted on Vercel without an application server, database, authentication service or admin dashboard.

## Run locally

```bash
pnpm install
pnpm --filter @workspace/karibu-beyond run dev
```

## Build and verify

```bash
pnpm --filter @workspace/karibu-beyond run typecheck
pnpm --filter @workspace/karibu-beyond run build
```

The production output is `artifacts/karibu-beyond/dist/public`. The build creates static route shells with page-specific metadata and a sitemap.

## Contact forms

Forms validate in the browser and prepare an email or WhatsApp message on the visitor's device. The site does not transmit or store enquiry data. The visitor must send the message from their chosen email or WhatsApp application. No newsletter signup is presented because there is no mailing-list service.

## Project boundaries

- No backend, database, authentication or admin interface is used by the website.
- Package and article pages show honest empty states until confirmed public content is available.
- Business claims, reviews, accreditations, prices and partnerships are not invented.
- See [DEPLOYMENT.md](DEPLOYMENT.md), [SECURITY.md](SECURITY.md), [DATABASE_SETUP.md](DATABASE_SETUP.md) and [TESTING.md](TESTING.md).
