---
name: "🛡️ Feature – Robust Error Handling"
about: Improve resilience to storage and load errors.
title: "[Feature] Robust Error Handling"
labels: feature, sprint-4, error-handling
assignees: kenlacroix
---

**User Story**  
As a user, I want graceful fallback if localStorage is full or prompts fail to load.

**Acceptance Criteria**  
- [ ] Catch and handle `localStorage` quota errors.  
- [ ] Show user-friendly error message in modal.  
- [ ] Retry logic for prompt load failures.

**Notes**  
- Centralize error handling in `MuseRoot`.
