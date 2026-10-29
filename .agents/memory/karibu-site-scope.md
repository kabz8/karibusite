---
name: Karibu website scope
description: The user's standing scope for the Karibu and Beyond public website.
---

Keep the Karibu and Beyond website frontend-only and suitable for static Vercel hosting. Do not add an application backend, admin area, authentication or database unless the user changes this instruction. Contact actions may prepare email or WhatsApp messages locally, but must not claim to submit or store them.

**Why:** the user explicitly said they want only a working frontend to host on Vercel and asked that this scope be remembered.

**How to apply:** Keep page content static and confirmed, make contact behavior transparent, and ensure the Vercel build does not depend on the separate shared API service.
