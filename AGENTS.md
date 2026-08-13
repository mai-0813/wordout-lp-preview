# AGENTS.md

## Project overview

This repository is a static landing page for WordOut. It is built with plain HTML, CSS, and JavaScript only. There is no build step, package manager, or framework.

The project is intentionally small and presentation-focused, so keep changes simple, readable, and easy to review.

## Key files

- [index.html](index.html): page structure and content
- [styles.css](styles.css): visual styling and responsive layout
- [js/utils.js](js/utils.js): shared helper functions
- [js/site.js](js/site.js): common page interactions
- [js/hero-toggle.js](js/hero-toggle.js): hero comparison toggle
- [js/feature-lightbox.js](js/feature-lightbox.js): lightbox/modal behavior
- [js/header.js](js/header.js): sticky header behavior
- [js/format-slider.js](js/format-slider.js): slider/carousel logic
- [img/](img/): asset files used by the landing page
- [README.md](README.md): user-facing overview
- [docs/HISTORY.md](docs/HISTORY.md): change log and project history

## Working conventions

- Prefer small, responsible modules over large monolithic scripts.
- Keep HTML, CSS, and JavaScript separated.
- Do not reintroduce inline CSS or inline JavaScript unless a very specific, justified case exists.
- Preserve semantic HTML and accessibility attributes when editing content or interactive elements.
- Prefer existing naming patterns and class names over creating a new ad hoc convention.
- For new behavior, keep logic close to the related feature file instead of scattering it across the project.

## Local preview

Open [index.html](index.html) directly in a browser, or run a local static server:

```bash
cd /Users/meitec-yagisawa/github/wordout-lp-preview
python3 -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## Validation

When changing JavaScript, validate syntax with:

```bash
node --check js/utils.js && node --check js/site.js && node --check js/hero-toggle.js && node --check js/feature-lightbox.js && node --check js/header.js && node --check js/format-slider.js
```

There are no automated unit tests in this repository at the moment. Browser review is the primary validation method.

## Documentation rules

- Update [README.md](README.md) for reusable project guidance.
- Update [docs/HISTORY.md](docs/HISTORY.md) for behavioral or structural changes, especially refactors and maintenance work.
- Keep documentation concise and practical; do not duplicate detailed implementation notes that already live in source files.

## Change guidance

- Prefer clarity and maintainability over cleverness.
- If the repo already has a structure for a concern, extend that structure instead of introducing a new pattern.
- Keep refactors safe and minimal: avoid broad rewrites unless required by the task.
- When improving maintainability, add the rationale to [docs/HISTORY.md](docs/HISTORY.md) rather than burying it in comments.
