# OFFFREQ release checks

This branch contains the full standalone OFFFREQ Next.js application.

## Run locally

```sh
npm install
npm run test
npm run lint
npm run build
npm run dev
```

- Node.js 20.9+ is required.
- No API keys, Spotify account, database, or secrets are required.
- The player generates 24-second musical previews in the browser.
- Saved tracks persist locally in the visitor's browser.
- Deploy with Vercel's Next.js preset using this branch.
- The application is a portfolio demo, not a licensed music streaming service.
- A production build is only verified when CI succeeds.

## Branch isolation

This `offfreq-listening-room` branch intentionally contains the app at repository root. The account profile's `main` branch has not been modified. To publish as a dedicated project, create a standalone `offfreq-listening-room` GitHub repository and push this branch's code there.
