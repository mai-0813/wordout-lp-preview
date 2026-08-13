---
name: static-site-maintenance
description: "Use when: maintaining a static landing page, adjusting HTML/CSS structure, reviewing responsive behavior, or keeping the site asset organization clean and consistent."
---

# Static site maintenance

Use this skill when maintaining the WordOut landing page as a small static website.

## Scope

This project is intentionally simple and dependency-free:

- [index.html](../../../index.html): page structure and content
- [styles.css](../../../styles.css): visual styling and layout rules
- [js](../../../js): behavior split by responsibility
- [img](../../../img): image assets
- [README.md](../../../README.md): general overview
- [docs/HISTORY.md](../../../docs/HISTORY.md): project change log

## Working rules

- Keep the project lightweight and easy to read.
- Preserve semantic HTML and accessibility attributes.
- Keep styling and structure separated.
- Prefer extending existing patterns over inventing new ones.
- Avoid unnecessary frameworks, build tooling, or abstraction layers for this static site.

## Typical tasks

- Refactor HTML structure without changing user-visible behavior
- Update layout and spacing in [styles.css](../../../styles.css)
- Review responsive behavior and visual consistency
- Organize images or shared asset references
- Clean up duplicated selectors or redundant markup patterns
- Improve maintainability in a small, safe patch

## Validation

When changing HTML, CSS, or JS behavior, validate with the project checks from [AGENTS.md](../../../AGENTS.md):

```bash
node --check js/utils.js && node --check js/site.js && node --check js/hero-toggle.js && node --check js/feature-lightbox.js && node --check js/header.js && node --check js/format-slider.js
```

Also review the page in a browser to confirm visual behavior remains correct.

## Documentation expectations

- Update [README.md](../../../README.md) for reusable project guidance.
- Update [docs/HISTORY.md](../../../docs/HISTORY.md) for behavior changes, refactors, or structural maintenance.

## Decision rule

Use this skill for static-site upgrades, HTML refactors, CSS cleanup, layout adjustments, and general maintainability improvements. Do not use it for application backend changes or framework-based project work.
