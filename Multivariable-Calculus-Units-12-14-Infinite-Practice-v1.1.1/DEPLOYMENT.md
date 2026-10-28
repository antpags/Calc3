# Vercel Deployment

This is the canonical, flat Units 12–14 project.

## Required project root

The directory submitted to Vercel must directly contain:

- `package.json`
- `app/`
- `components/`
- `lib/`
- `vercel.json`

There must not be another copy of the project nested inside this directory.

## GitHub deployment

1. Remove older extracted copies such as `Multivariable-Calculus-Units-12-14-NextJS/` or `multivariable-calculus/` from the repository.
2. Copy the contents of this package into the repository root.
3. Confirm that the repository contains exactly one `package.json` and one `lib/content-types.ts`.
4. In Vercel, leave **Root Directory** blank when `package.json` is at the repository root.
5. Redeploy with the build cache cleared if the prior deployment used a nested root.

The shared `Module` contract is defined only in `lib/content-types.ts`. Every module includes required `chapter` and `section` fields.