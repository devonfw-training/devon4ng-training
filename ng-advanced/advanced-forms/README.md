# Understanding this slide deck (advanced-forms)

A quick orientation to how this deck is put together and why, so that before you change
something you know what it's currently doing and what it's trying to achieve. None of this
is imposed on how you present or restructure things for your own session — it's here to save
you from re-deriving the reasoning behind choices that aren't self-explanatory from the markup.

## How the deck is organized
- The top-level horizontal path tells today's story: signal forms. Legacy approaches
  (model-driven, template-driven, CVA) sit in vertical "backup" stacks directly beneath the
  matching top-level slide, mirrored slide-by-slide where that made sense — so you can stay
  on the top row for a signals-only audience, or drop down slide-by-slide for a group still
  using CVA/model-driven forms.
- Where a backup stack has both, model-driven sits above template-driven in the stack.
- The deck is a single, self-contained `index.html` (plus `own.css`), with no build step.
  A markdown-extraction experiment was tried and reverted — it made the deck harder for a
  successor to navigate, so content lives directly in the HTML.
- The two example Angular projects (CVA vs. signal custom fields) are intentionally kept
  independent of each other, so you can present or modify one without worrying about the other.

## Slides vs. speaker notes
- Slides tend to carry only keywords/short phrases; the explanation lives in the speaker
  notes. If you find a slide feels crowded, that's usually a sign the prose belongs in the notes.
- Most speaker notes open with a one-to-two sentence statement of what the slide is meant to
  convey and why — handy context if you're not the one who originally wrote it.
- Notes are written to be readable at a glance while presenting, not as dense reference text.
- Notes support markdown; raw HTML in them needs to be escaped to render correctly.

## Visual design
- Colors are defined once as named tokens in `own.css` (with comments on when to use which),
  loosely aligned with the CapGemini palette, so changing a color scheme-wide means editing
  one place instead of hunting through slides.
- Tables and dense slides are given extra breathing room (column gaps, vertical margins)
  rather than shrinking other elements like images to make space.

## For AI assistants
See [AGENTS.md](AGENTS.md) for notes specific to AI-assisted editing of this deck.

