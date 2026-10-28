# Multivariable Calculus

A responsive multivariable-calculus study site built with Next.js, TypeScript, React, Tailwind CSS, and KaTeX.

## Included learning modules

The 19-module course is organized by Stewart Calculus Units 12–14.

### Unit 12 — Vectors and the Geometry of Space

1. Three-dimensional coordinate systems (12.1)
2. Vectors in space (12.2)
3. Dot product and projections (12.3)
4. The cross product (12.4)
5. Equations of lines and planes (12.5)
6. Cylinders and quadric surfaces (12.6)

### Unit 13 — Vector Functions

7. Vector-valued functions (13.1–13.2)
8. Arc length (13.3)
9. Curvature (13.3)
10. The TNB / Frenet frame (13.3)
11. Motion in space (13.4)

### Unit 14 — Functions of Several Variables

12. Multivariable functions (14.1–14.2)
13. Partial derivatives (14.3)
14. Tangent planes, normal lines, and linearization (14.4)
15. Clairaut's theorem (14.3)
16. The multivariable chain rule (14.5)
17. The gradient (14.6)
18. Directional derivatives (14.6)
19. Extrema and the Second Derivative Test (14.7)

Each module includes learning objectives, core formulas, concept explanations, step-by-step worked examples, regenerable practice problems, collapsible hints and solutions, local progress tracking, and related-topic navigation. Selected modules include opt-in Desmos embeds.

## Interaction and design

- Persistent collapsible course navigation
- `Cmd/Ctrl + K` or `/` topic search
- Responsive mobile drawer
- Step-by-step example reveals
- Collapsible hints and solutions
- A **New problem** control on every practice card
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
git commit -m "Build multivariable calculus study site"
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
lib/content.ts            # typed curriculum index and Units 13–14 content
lib/unit12-content.ts     # Unit 12 lessons, examples, and practice
lib/unit13-motion.ts      # Section 13.4 lesson, examples, and practice
```

## Content maintenance

Curriculum data lives in the typed files under `lib/`. Add or revise a module in the exported course arrays; lesson routes, chapter groupings, navigation, and search results are generated automatically.

## Privacy

Progress is stored only in the visitor's browser with `localStorage`. The Desmos iframe is not loaded until the visitor chooses **Load interactive Desmos graph**.
