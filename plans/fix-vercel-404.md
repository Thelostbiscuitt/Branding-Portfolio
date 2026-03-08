# Fix: Vercel 404 Error on Project Pages

## Problem Summary

Project pages (e.g., `/projects/leadway-pensure`, `/projects/skaame-epk`) return 404 errors when deployed to Vercel. The issue occurs when navigating from the homepage.

## Root Cause

The dynamic route page at [`src/app/projects/[slug]/page.tsx`](../src/app/projects/[slug]/page.tsx) uses `generateStaticParams()` to pre-generate static pages, but is **missing the `dynamicParams` export**.

In Next.js 13+ with App Router, when using `generateStaticParams()`, you must explicitly export `dynamicParams = true` to ensure proper handling of dynamic routes on Vercel.

## Solution

Add the following export to [`src/app/projects/[slug]/page.tsx`](../src/app/projects/[slug]/page.tsx):

```typescript
export const dynamicParams = true;
```

### File Change

**File:** `src/app/projects/[slug]/page.tsx`

**Current code (lines 7-9):**
```typescript
export async function generateStaticParams() {
  return PROJECT_DETAILS.map((p) => ({ slug: p.slug }));
}
```

**Updated code:**
```typescript
export const dynamicParams = true;

export async function generateStaticParams() {
  return PROJECT_DETAILS.map((p) => ({ slug: p.slug }));
}
```

## Why This Works

1. **`generateStaticParams()`** - Defines which paths to pre-render at build time
2. **`dynamicParams = true`** - Tells Next.js to:
   - Serve pre-generated pages instantly (from build)
   - Generate non-pre-generated pages on-demand (fallback)
   - Properly handle dynamic routes in serverless environments like Vercel

## Verification Steps

After making the change:

1. Run `npm run build` locally to verify no build errors
2. Check that the build output shows the project pages being generated
3. Deploy to Vercel
4. Test navigation from homepage to project pages
5. Test direct URL access to project pages

## Expected Build Output

When running `npm run build`, you should see output similar to:

```
├ ● /projects/leadway-pensure
├ ● /projects/skaame-epk
├ ● /projects/layo-isaac-epk
├ ● /projects/blvckoreo-epk
├ ● /projects/1ethfp
```

## Additional Notes

- The slugs in [`src/lib/data.ts`](../src/lib/data.ts) (used in Projects component) match the slugs in [`src/lib/projects.ts`](../src/lib/projects.ts) (used in generateStaticParams)
- All 5 projects have matching slugs between the two files
- The `notFound()` function is correctly used when a project doesn't exist

## Implementation

Switch to **Code mode** to implement this fix by adding the `dynamicParams` export.
