---
name: "📊 Feature – Opt-in Usage Analytics"
about: Provide privacy-first opt-in analytics.
title: "[Feature] Opt-in Usage Analytics"
labels: feature, sprint-4, analytics
assignees: kenlacroix
---

**User Story**  
As a product owner, I want a privacy-first opt-in analytics toggle (local device only).

**Acceptance Criteria**  
- [ ] Toggle to enable/disable analytics.  
- [ ] Store opt-in flag in localStorage (key: `muse-analytics`).  
- [ ] Track basic events (prompt viewed, favorited) only when enabled.

**Notes**  
- No external tracking; write to local log.
