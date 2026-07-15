Markdown

# Project Memory: Coldies Website (Payload CMS v3)

## Build & Run Commands
- Dev Server: `npm run dev` or `yarn dev`
- Build Project: `npm run build` or `yarn build`

## Tech Stack & Architecture
- Core: Next.js (App Router), React, Payload CMS v3.x
- Upload Strategy: Dedicated 'Media' collection saving to local `/media` directory. Video files must be restricted by mimeType.

## Rules for Claude
- NEVER write shorthand placeholder comments like `// rest of code here`—always generate full files when editing config files.
- Before running any complex codebase-wide refactors, use **Plan Mode** to show me your proposed file changes first.
- Prioritize clean, readable functions with explicit error handling.