---
name: "🕘 Feature – Prompt History"
about: Show the last 10 prompts the user has seen.
title: "[Feature] Prompt History"
labels: feature, sprint-4, history
assignees: kenlacroix
---

**User Story**  
As a user, I want to view my last 10 prompts so that I can reflect on recent entries.

**Acceptance Criteria**  
- [ ] Record prompts in a `useHistory` hook.  
- [ ] “History” tab lists last 10 prompts (most recent first).  
- [ ] History items link back to the prompt view.  
- [ ] History stored in localStorage; auto-expire entries older than 30 days.

**Mockup/Design**  
_Include screenshot or link to mockup here._

**Notes**  
- Storage key: `muse-history`.
