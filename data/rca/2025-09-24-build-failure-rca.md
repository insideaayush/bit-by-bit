# Root Cause Analysis: Build Failure on 2025-09-24

## 1. Summary

The build process for the `bit-by-bit` project was failing due to two separate issues. The project uses Next.js version 15.5.3, and the codebase contained some incompatibilities with this version. The first issue was a type error in the dynamic blog post pages related to the handling of `params` in `async` components. The second issue was a configuration error for the `sitemap.xml` route when using static export (`output: 'export'`).

## 2. Root Causes

### Issue 1: Type Error in `[id]/page.tsx`

*   **Root Cause:** In Next.js 15 and later, the `params` object passed to `async` page components and `generateMetadata` functions is a `Promise`. The code in `src/app/blogs/[id]/page.tsx` was attempting to destructure the `id` from `params` directly, without `await`ing the promise to resolve. This caused a type mismatch and a build failure.

*   **File:** `src/app/blogs/[id]/page.tsx`

*   **Incorrect Code:**
    ```typescript
    export default async function Post({ params }: PageProps) {
      const { id } = params; // Incorrect: params is a Promise
      // ...
    }
    ```

### Issue 2: Static Export Error for `sitemap.xml`

*   **Root Cause:** The project is configured for static site generation (`output: 'export'` in `next.config.ts`). When using this feature, Next.js requires all **Route Handlers** to explicitly declare their dynamic behavior. The `src/app/sitemap.ts` file, which generates the `sitemap.xml`, is a Route Handler. It was missing the `export const dynamic = 'force-static';` declaration, causing Next.js to throw an error because it couldn't determine if the route was static or dynamic.

*   **File:** `src/app/sitemap.ts`

## 3. Resolution

Both issues were resolved with the following changes:

### Fix for Issue 1:

*   The `params` object in both the `generateMetadata` function and the `Post` component in `src/app/blogs/[id]/page.tsx` was `await`ed before destructuring the `id`.

*   **Corrected Code:**
    ```typescript
    export default async function Post({ params }: PageProps) {
      const { id } = await params; // Correct: await the Promise
      // ...
    }
    ```

### Fix for Issue 2:

*   Added `export const dynamic = 'force-static';` to the top of `src/app/sitemap.ts` to explicitly mark the Route Handler as static, allowing Next.js to generate the `sitemap.xml` file at build time.

## 4. Lessons Learned

1.  **Next.js Versioning:** It's crucial to be aware of the specific version of Next.js being used in a project and to write code that is compatible with that version's features and breaking changes.
2.  **Static Exports and Route Handlers:** When using `output: 'export'`, all Route Handlers (e.g., for sitemaps, RSS feeds, API routes) must have their dynamic behavior explicitly defined.
