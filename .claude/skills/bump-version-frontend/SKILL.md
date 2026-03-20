---
name: bump-version-frontend
description: Updates version across frontend files before committing. Trigger when the user wants to commit, push, or wrap up frontend work. Even if they don't mention versioning — if they're about to commit, trigger this skill.
---

Before creating a commit, always check and update the version across frontend files.

## Files to update

1. `client/index.html` — meta tag:
   ```html
   <meta name="version" content="X.Y.Z" />
   ```

2. `client/package.json` — `"version"` field

## Steps

1. Read the current version from `client/index.html`:
   ```html
   <meta name="version" content="X.Y.Z" />
   ```
   If the meta tag does not exist yet, add it inside `<head>` and treat the current version as `0.0.0`.

2. Determine the appropriate increment based on the nature of the changes and apply it immediately without prompting:
   - **Patch** (X.Y.**Z**) — bug fixes, small tweaks
   - **Minor** (X.**Y**.0) — new features, backward compatible
   - **Major** (**X**.0.0) — breaking changes, major releases

3. Apply the new version to **both files** listed above.

4. Stage both files as part of the commit.

## Version format

Use semantic versioning: `MAJOR.MINOR.PATCH` (e.g. `1.0.0`, `1.1.0`, `2.0.0`).

## Commit message format

Always include the new version in the commit scope:
```
feat(1.1.0): add poll results chart
fix(1.0.2): correct button alignment
```

## Example

Current: `content="1.0.0"` → after adding a feature → `content="1.1.0"` updated in both `client/index.html` and `client/package.json`.
