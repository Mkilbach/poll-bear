---
name: bump-version-backend
description: Updates version across backend files before committing. Trigger when the user wants to commit, push, or wrap up backend/server work. Even if they don't mention versioning — if they're about to commit, trigger this skill.
---

Before creating a commit, always check and update the version across backend files.

## Files to update

1. `server/package.json` — `"version"` field

2. `server/plugins/swagger.ts` — `version` inside the `openapi.info` object:
   ```ts
   info: {
     title: 'Poll Bear API',
     version: 'X.Y.Z'
   }
   ```

## Steps

1. Read the current version from `server/package.json`.

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
feat(1.1.0): add poll creation endpoint
fix(1.0.2): correct vote deduplication logic
```

## Example

Current: `"version": "1.0.0"` → after adding a new endpoint → `"version": "1.1.0"` updated in both `server/package.json` and `server/plugins/swagger.ts`.
