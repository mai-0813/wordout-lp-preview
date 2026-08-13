---
name: landing-page-content
description: "Use when: updating hero copy, CTA labels, section headings, product messaging, feature descriptions, or page content structure on the WordOut landing page."
---

# Landing page content maintenance

Use this skill when changing the marketing copy, page structure, section messaging, or CTA content for the WordOut landing page.

## Scope

This repository is a static landing page. Page content lives mainly in [index.html](../../../index.html), while styles and interactivity live in [styles.css](../../../styles.css) and the modules in [js](../../../js).

## Working rules

- Keep the tone consistent with the existing product positioning.
- Prefer small copy changes that fit the current visual hierarchy.
- Preserve accessibility attributes and semantic structure when editing headings, links, and buttons.
- Do not add marketing claims that are not supported by the current page structure or existing content.
- If a change affects layout, also review the CSS and related sections in the same pass.

## Typical tasks

- Update hero headline or subcopy
- Adjust CTA text, links, or labels
- Tune feature descriptions or benefit statements
- Reorder or rephrase sections while keeping the page flow coherent
- Improve clarity without introducing a new content style

## Validation

After changing copy or structure:

1. Check the page in a browser for spacing and readability.
2. Confirm all links still point to valid destinations.
3. Verify buttons and anchor text remain consistent with the surrounding content.
4. Keep documentation in sync if the change alters the product narrative.

## Documentation expectations

- Update [README.md](../../../README.md) only when the project usage or project guidance changes.
- Update [docs/HISTORY.md](../../../docs/HISTORY.md) for any substantive content, structure, or UX change.

## Decision rule

Use this skill for copy, copywriting, messaging, section content, CTA updates, and landing-page text refinement. Do not use it for styling-only or JavaScript-only changes.
