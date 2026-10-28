# The Golden Gradient

An original, responsive multivariable-calculus learning studio built with Next.js, TypeScript, React, Tailwind CSS, and KaTeX.

## Included learning modules

1. Vector-valued functions
2. Arc length
3. Curvature
4. The TNB / Frenet frame
5. Multivariable functions
6. Partial derivatives
7. Tangent planes, normal lines, and linearization (Section 14.4)
8. Clairaut's theorem
9. The multivariable chain rule
10. The gradient
11. Directional derivatives
12. Extrema and the Second Derivative Test (Section 14.7)

Each module includes learning objectives, core formulas, concept explanations, step-by-step worked examples, collapsible practice hints and solutions, local progress tracking, and related-topic navigation. Selected modules include opt-in Desmos embeds.

## Interaction and design

- Persistent collapsible course navigation
- `Cmd/Ctrl + K` or `/` topic search
- Responsive mobile drawer
- Step-by-step example reveals
- Collapsible hints and solutions
- Browser-local module and problem progress
- Keyboard-visible focus states and reduced-motion support
- Black-and-gold collegiate visual system with serif headings
- KaTeX output with accessible MathML

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality checks

```bash
npm run typecheck
npm run build
```

## Deploy to Vercel

### From GitHub

1. Create a new GitHub repository.
2. Push this project to the repository.
3. In Vercel, select **Add New → Project** and import the repository.
4. Keep the detected framework as **Next.js**.
5. Deploy. No environment variables are required.

### With the Vercel CLI

```bash
npm i -g vercel
vercel
```

## Push to GitHub

```bash
git init
git add .
git commit -m "Build The Golden Gradient learning studio"
git branch -M main
git remote add origin https://github.com/YOUR-ACCOUNT/YOUR-REPOSITORY.git
git push -u origin main
```

## Project structure

```text
app/
  learn/[slug]/page.tsx   # statically generated lesson route
  globals.css             # visual system and global utilities
  layout.tsx              # shell, metadata, analytics
components/               # interactive UI and lesson components
lib/content.ts            # typed curriculum content and search index
```

## Content maintenance

All curriculum data lives in `lib/content.ts`. Add or revise a module in the `modules` array; lesson routes and search results are generated from that source automatically.

## Privacy

Progress is stored only in the visitor's browser with `localStorage`. The Desmos iframe is not loaded until the visitor chooses **Load interactive Desmos graph**.
