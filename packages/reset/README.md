# @kevinmarrec/reset.css

My personal CSS reset. Minimal, no dependencies, no build step, Baseline widely available only.

It is tuned for one goal: **the same rendering on touch, whatever the OS and the browser.** Two
layers, and no third — every rule is either a fundamental (box model, margins), a fix for
something the platforms disagree on, or a user-agent inconsistency worth normalising. Nothing
is here for taste.

## Usage

```js
import '@kevinmarrec/reset.css'
```

Or from a stylesheet, before your own rules:

```css
@import '@kevinmarrec/reset.css';
```

## What it does

Every rule is wrapped in `:where()`, so the whole file has zero specificity: it can never
outrank your own CSS, and import order does not matter.

- **Flattens form controls.** iOS imposes its own font, padding and inset shadow on inputs
  where Android does not, so controls inherit the font and lose their native chrome via
  `appearance: none`. Checkboxes, radios, ranges, colors and file inputs are excluded — they
  have no rendering of their own once `appearance` is off, which is what resets built on
  `all: unset` get wrong.
- **Fixes date and time inputs**, which iOS Safari sizes differently when empty and refuses to
  align. Borrowed from Tailwind's preflight, the only reset that bothers with them.
- **Floors field text at 16px** with `max(16px, 1em)`. Below that, iOS Safari zooms the
  viewport on focus and never zooms back; Android does not. This is the one rule here that
  will override a design decision, and it is deliberate.
- **Makes a long press behave the same everywhere.** The engines disagree on whether a button
  is selectable — Gecko says no, Blink says yes, WebKit says it is text — so a long press
  selects a label on one platform and not the other. Buttons, labels and summaries opt out,
  along with iOS's callout menu. Links keep both, and text fields are re-armed rather than
  merely skipped: `user-select` inherits, and a label wrapping its input is an ancestor.
- **Removes the iOS-only artefacts**: the landscape font bump, the grey tap flash, the
  double-tap-zoom delay.
- **Zeroes user-agent margins**, unstyles lists, constrains media to its container.
- **Normalises the classic user-agent inconsistencies** — `sub` and `sup` wrecking the line
  box, monospace text shrinking, `summary` losing its marker, Firefox's red glow on invalid
  fields. None of it is platform-specific, so none of it is behind a media query: a `sub`
  breaks a phone layout exactly as it breaks a desktop one.
- **Honours `prefers-reduced-motion`.**

`cursor: pointer` is the only rule gated on the pointer, behind
`@media (hover: hover) and (pointer: fine)` — `hover` carries the signal, because `pointer:
fine` alone becomes true of an iPad the moment a trackpad is attached.

## What it does not do

- **No font.** `system-ui` resolves to SF on Apple and Roboto on Android, so setting a stack
  here would create the very divergence this file removes. Ship a webfont in the app, or
  accept the difference. `line-height` _is_ set, because `normal` resolves against the font.
- **No theming.** No colors, no `color-scheme`, no custom properties. That belongs to the app.
- **No utility-class plumbing.** Tailwind's preflight zeroes borders and padding on every
  element, makes headings inherit their font and strips link underlines — all of which assume
  you always add `border-2`, `text-2xl`, `underline`. None of it is here.
- **No layout opinions.** No `min-block-size` on `body`, no stacking context on a root node.

## Deliberately left to the app

Each of these is a real touch concern, and each removes a browser affordance users may
expect — so it is a per-project call, not a default:

```css
/* Kill pull-to-refresh on Android and rubber-banding on iOS. */
html {
  overscroll-behavior: none;
}

/* Notch and home-indicator padding. Needs `viewport-fit=cover` in the viewport meta. */
.bottom-bar {
  padding-block-end: env(safe-area-inset-bottom);
}
```

The viewport meta tag is not CSS and none of this works without it:

```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

Do not add `user-scalable=no` or `maximum-scale=1` to it — that breaks pinch zoom, which is an
accessibility failure, and the 16px floor above already removes the reason people reach for it.

## What no reset can fix

`<select>` dropdowns, date and time pickers, `<input type="file">`, scrollbars, text-selection
handles, spell-check underlines and iOS's magnifier loupe are drawn by the platform. If they
have to match, they have to be rebuilt.

Checkboxes and radios stay platform-coloured: they are excluded from `appearance: none` on
purpose, and `accent-color` — the lever for it — is not Baseline widely available yet.

## Not settled

`resize`, `accent-color`, `field-sizing` and `text-wrap` would each fix a real divergence and
are each rejected by `plugin/use-baseline` today. This file is worth revisiting as they land.
