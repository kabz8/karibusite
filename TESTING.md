# Testing

Run:

```bash
pnpm --filter @workspace/karibu-beyond run typecheck
pnpm --filter @workspace/karibu-beyond run build
pnpm --filter @workspace/karibu-beyond test
```

The build smoke test checks that static route shells, page titles, descriptions and the sitemap are generated for the configured public routes.

Before production, also verify in a Vercel preview:

- Direct navigation to a nested URL and browser refresh.
- Desktop and mobile navigation, including Escape-to-close.
- Required-field validation and the prepared email/WhatsApp actions.
- Telephone, email and WhatsApp links on mobile.
- Package, experience and insight empty states.
- Keyboard focus, reduced-motion behavior, image loading and 404 navigation.

The send action itself cannot be tested by this site: visitors complete it in their own email or WhatsApp application.
