# Security notes

- The website is a static frontend and has no privileged secrets or server-side credentials.
- Do not place API keys, email-provider keys or database credentials in `VITE_*` variables or browser code.
- Contact forms prepare a message locally; they do not submit or store personal information on this website.
- The medical tourism form is for travel coordination only. It warns visitors not to include clinical information.
- No analytics or advertising scripts are enabled.
- Vercel serves the static files with basic security headers configured in `vercel.json`.

The legal pages are practical website notices, not legal advice. Have business-specific wording reviewed by qualified counsel before production.
