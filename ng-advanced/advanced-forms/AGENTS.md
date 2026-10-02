# AI agent notes — advanced-forms

Read [README.md](README.md) first for how and why this deck is structured —
it applies to you too. The notes below are additional working practices for AI assistants
specifically, not things a human trainer needs to be told.

## Verify before presenting as real
Code shown as actual Angular internals/core source must be checked against the
installed Angular version (e.g. `package.json`/`node_modules`, or the web) before going on
a slide — don't present guessed or reconstructed code as verbatim framework source.

## Don't fix speculatively
If something looks like default reveal.js/browser behavior, confirm it's actually
non-default before changing it. Only change what was asked for — don't bundle in
unrequested changes to nearby slides, even if they look like improvements.

## Plan before large restructuring
For multi-slide restructuring (reordering, splitting, merging sections), propose the plan
first and wait for explicit confirmation before editing.

## Don't overload a slide
If an explanation only makes sense as several sentences of connected reasoning (not
independent, parallel items), it doesn't belong as on-slide bullet points - put it in
`<aside class="notes">` instead, or split it onto its own slide. Keep the on-slide code/visual
plus at most a one-line `hint`; move "why does this work" mechanism walkthroughs to notes.

## Bullet points are for actual lists only
Don't reach for `<ul>`/`<li>` to break up prose that isn't a genuine list of parallel,
independent items (e.g. step-by-step reasoning where each point depends on the previous one).
Write that as flowing sentences instead - in notes if it's too long for the slide itself.

## Slide cross-references are real links
When slide text (not speaker notes) names another specific, non-adjacent slide (e.g. "see
the error-channel slide"), make it a clickable reveal.js internal link instead of leaving it
as prose:
- Give the target `<section>` a stable `id` (reuse an existing one if it already has one).
- Wrap the reference text in `<a class="slide-link" href="#/that-id">...</a>` — own.css styles
  `.slide-link` (orange, underlined, trailing ↗) specifically so it never reads as another
  `.highlight` span (which is blue in this deck).
- Don't link generic "the backup slide right below ↓" mentions — vertical arrow navigation
  already handles that; only link jumps to a different section/topic.
- Leave `<aside class="notes">`-only mentions as plain text; notes aren't shown/clickable
  during presentation.
