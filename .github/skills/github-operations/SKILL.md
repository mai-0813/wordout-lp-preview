---
name: github-operations
description: "Use when: creating a pull request, checking GitHub status, preparing branch updates, summarizing changes for review, or managing repo documentation and release notes in this project."
---

# GitHub operations for this repository

Use this skill for repository maintenance and GitHub workflow tasks in the WordOut landing-page project.

## Scope

This repository is a small static site with a lightweight structure:

- [README.md](../../../README.md): project entry point and general usage
- [AGENTS.md](../../../AGENTS.md): repository conventions for AI agents
- [docs/HISTORY.md](../../../docs/HISTORY.md): update log and change history
- [index.html](../../../index.html): page structure
- [styles.css](../../../styles.css): styling
- [js](../../../js): feature-specific JavaScript modules

## Working rules

- Keep documentation and implementation aligned.
- Prefer small, reviewable changes over broad rewrites.
- Respect the repo conventions in [AGENTS.md](../../../AGENTS.md).
- Use [docs/HISTORY.md](../../../docs/HISTORY.md) to record behavioral or structural changes.
- Do not duplicate high-level guidance in both README and HISTORY; keep README concise and keep detailed change notes in the history file.

## Common tasks

### PR preparation

- Check whether the branch has a clear, focused purpose.
- Review the working diff before creating a pull request.
- Summarize what changed, why it changed, and what was validated.
- Keep the PR description short and practical.

### Documentation updates

- Update [README.md](../../../README.md) for reusable project guidance.
- Update [docs/HISTORY.md](../../../docs/HISTORY.md) for behavioral changes, refactors, and maintenance history.
- If a change affects UX, structure, or file organization, record the rationale in the history file.

### Repo hygiene

- Avoid unrelated cleanup in the same change.
- Preserve the static-site architecture and keep new files minimal.
- Maintain separation between page content, styling, scripts, and assets.

## Validation expectations

For JavaScript changes in this repo, prefer the project validation command from [AGENTS.md](../../../AGENTS.md):

```bash
node --check js/utils.js && node --check js/site.js && node --check js/hero-toggle.js && node --check js/feature-lightbox.js && node --check js/header.js && node --check js/format-slider.js
```

If the task is documentation-only, confirm references still point to valid files and keep links working.

## Output style

When preparing GitHub-facing updates:

- Write concise summaries in Japanese or English depending on the repo audience.
- Emphasize impact, rationale, and validation status.
- Keep the tone practical and implementation-oriented.

## Decision rule

Use this skill when the work is about repository maintenance, review flow, branch/PR lifecycle, or project documentation hygiene. Do not use it for content generation unrelated to the GitHub workflow of this repository.
