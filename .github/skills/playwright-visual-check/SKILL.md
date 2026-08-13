---
name: playwright-visual-check
description: "Use when verifying static landing page updates with Playwright, especially for responsive layout, visibility, and interaction checks."
---

# Playwright visual check

Use this skill when changing the WordOut landing page and you need to confirm that the page still behaves correctly on desktop and mobile.

## Scope

- [index.html](../../../index.html): page structure and content
- [styles.css](../../../styles.css): responsive styling and visual rules
- [js](../../../js): interactive behavior
- [tests](../../../tests): Playwright checks for the page

## What to verify

- The hero area renders without clipping
- Key CTAs remain visible and clickable
- Mobile layout does not introduce horizontal overflow
- The hero lightbox opens and closes correctly
- Section headings remain visible at common viewport sizes

## Validation

Run the browser tests from the project root:

```bash
npm run test:e2e
```

## Decision rule

Use Playwright for the final check whenever a CSS or layout update could affect the page on different devices.
