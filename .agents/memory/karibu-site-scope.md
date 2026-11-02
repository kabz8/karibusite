---
name: Karibu website scope
description: The user's standing scope for the Karibu and Beyond public website.
---

Keep the Karibu and Beyond website frontend-only and suitable for static Vercel hosting. Do not add an application backend, admin area, authentication or database unless the user changes this instruction. Contact actions may prepare email or WhatsApp messages locally, but must not claim to submit or store them. Public pages should have complete, meaningful content based on confirmed information; do not publish shallow placeholders. If a page cannot be populated with confirmed material, remove it from navigation and redirect its old URL to a useful page.

**Why:** the user explicitly asked for a frontend-only Vercel site and said they do not want shallow content pages.

**How to apply:** Keep page content static and confirmed, make contact behavior transparent, remove or redirect pages without enough confirmed material, and ensure the Vercel build does not depend on the separate shared API service.
