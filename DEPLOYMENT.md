# Vercel deployment

This project deploys as a static frontend. It does not need a server runtime, database, authentication provider, API key or other environment variable.

## Import the repository

1. Push the project to the Git provider you use.
2. In Vercel, import that repository.
3. Keep the project root set to the repository root so Vercel can read `pnpm-workspace.yaml`.
4. Use Node.js 20.19 or later (Node 22 is suitable).
5. Keep the Vercel project root at the repository root. The checked-in `vercel.json` configures the install command, build command, output directory, clean URLs, SPA fallback and basic security headers.

The equivalent build settings are:

- Install command: `pnpm install --frozen-lockfile --prod=false`
- Build command: `pnpm --filter @workspace/karibu-beyond run build`
- Output directory: `dist` (repository root; mirrored from the app build)
- Environment variables: none

## Preview and production

1. Deploy a Vercel preview first.
2. Check the homepage, service pages, mobile navigation, enquiry form, email links and WhatsApp links.
3. Confirm package and article pages show unpublished/empty states rather than unverified information.
4. Only after the preview is approved, promote it to production.
5. Add the custom domain in Vercel and use the exact DNS values Vercel displays for that domain. DNS values depend on the Vercel project and domain configuration, so they are not hard-coded here.
6. Verify HTTPS, canonical links, `robots.txt` and `/sitemap.xml` after the domain is connected.

## What contact actions do

The website prepares an email draft or WhatsApp message in the visitor's browser. It does not submit enquiries to a server or confirm that a message was sent. Visitors complete the send action in their email or WhatsApp application. A newsletter list is not active on this static site.

Do not replace the existing public website until the Vercel preview, contact links and production domain have been checked.
