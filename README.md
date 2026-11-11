# STU2103 E-Portfolio — editing guide

Static site, no build step. Open `index.html` in a browser (or use VS Code Live Server).

```
portfolio/
├── index.html            Overview / abstract / group
├── introduction.html     Fruit info, ethylene, maturity indices
├── methods.html          Objective, materials, procedure, scoring scales
├── results.html          Observations, charts, photo gallery, discussion
├── conclusion.html       Conclusion, references, acknowledgements
├── assets/
│   ├── css/style.css     All styling — colours are CSS variables at the top
│   ├── js/data.js        ← ALL DATA LIVES HERE (edit this)
│   ├── js/site.js        Renders tables, charts, gallery, references
│   └── img/              ← drop your photographs in here
└── README.md
```

## 1. What to edit, in order of likelihood

| I want to change… | Edit this |
|---|---|
| Daily scores, finger labels, pulp notes | `assets/js/data.js` → `observations` |
| Observation dates (currently placeholders) | `assets/js/data.js` → `observations` → `date` |
| Group names / matric numbers | `assets/js/data.js` → `group` |
| Photos + captions | `assets/js/data.js` → `photos` + the image files |
| References | `assets/js/data.js` → `references` |
| Storage condition shown on the overview | `assets/js/data.js` → `fruit.storage` |
| Colours, fonts | `assets/css/style.css` (section 1, `:root`) |
| Body text | the matching `.html` file |

The observation table, both charts, the colour strip, the gallery and the reference
list are **generated from `data.js`** — you never edit them twice.

## 2. The data currently in the site

Taken from the group report (Table 1, Table 2 and Graph 1):

| Day | Colour | Firmness | Sweetness | Stage |
|---|---|---|---|---|
| 1 | 1 | 1 | 1 | Mature green |
| 2 | 2 | 2 | – | Green with yellow traces |
| 3 | 2 | 2 | – | Turning stage |
| 4 | 3 | 3 | 3 | Intermediate |
| 5 | 4 | 3 | – | Mostly yellow |
| 6 | 4 | 4 | – | Edible ripe |
| 7 | 5 | 5 | 5 | Overripe / spotted |

All three parameters score 1–5, and **firmness is a softness rank** — 1 is the hardest fruit
and 5 is mushy, so a *rising* firmness score means the fruit is softening. Sweetness was only
scored on the days a sample was opened (1, 4 and 7), because tasting requires cutting the fruit.

## 3. Swapping the placeholders

### Photographs
The gallery expects these files in `assets/img/` (any size; cropped to 4:3):

```
fig01-labelled-bananas.jpg      (Figure 1 — methods page)

day01-external.jpg   day05-external.jpg
day02-external.jpg   day06-external.jpg
day03-external.jpg   day07-external.jpg
day04-external.jpg
```

Save your photos with those names and refresh — no code changes needed. A missing
file shows a dashed panel labelled with the day, stage and expected filename, so the
layout never breaks.

To add or remove a photo, edit the `photos` array:

```js
{ day: 6, date: "Day 6", stage: "Edible ripe", view: "external",
  fig: "7", src: "assets/img/day06-external.jpg", caption: "Your caption." }
```

`view` is `"external"` (daily photos), `"internal"` (cut fruit) or `"setup"` (preparation).
The filter buttons are built from whichever values appear in the array. `fig` is the
figure number printed in the caption — if you insert photos, renumber the rest and
the two chart figures (currently 9 and 10).

### Diagrams
Figures 2, 3 and 4 are file-based. Drop your own image at the path in the
`<img src="…">` and it appears; the `data-fallback="…"` attribute supplies the label
shown while the file is missing.

### Tables
Table 2 (daily observations) is generated — edit `observations` in `data.js`.
Table 1 (the scoring scale, in `results.html`) and the maturity-index table
(`introduction.html`, also numbered Table 1 there — renumber if you merge them) are written
directly as `<tr>` rows.

### Charts
Charts read straight from `observations`. Y-axis range and the "edible-ripe" marker
are set per chart in the HTML via data attributes:

```html
<div data-render="chart"
     data-series="firmness,taste"
     data-labels="Firmness (1 = hard, 5 = mushy)|Sweetness (1 = astringent, 5 = very sweet)"
     data-y-min="0" data-y-max="5" data-y-ticks="5"
     data-mark-day="5" data-mark-label="edible-ripe"></div>
```

`data-series` accepts any numeric keys from `observations`. A `null` value is drawn as
a gap, not as zero — that is why Figure 14 joins only days 1, 4 and 7 for sweetness.

## 4. Before submitting

- [ ] Replace every `Member One … Member Five` entry with real names and matric numbers.
- [ ] Replace the placeholder observation dates with your real ones.
- [ ] Replace all photographs; check each caption matches the image.
- [ ] Add the photographs (Figure 1 and Figures 2–8 are placeholders).
- [ ] Verify the seven references are the ones you actually cited.
- [ ] Attach the UNIMAS assignment cover page (full name, matric, portfolio link).
- [ ] Publish (Netlify drop / GitHub Pages / Google Sites embed) and put the live URL
      on the cover page.

## 5. Publishing

- **Netlify Drop** — drag the whole `portfolio` folder onto app.netlify.com/drop. Free,
  gives a URL in seconds.
- **GitHub Pages** — push the folder to a repo, Settings → Pages → deploy from branch.
- **Offline submission** — zip the folder; it works when opened locally because there
  is no build step and no external dependency.

## 6. Animation

Sections fade and slide up as they scroll into view; the hero text rises on page load.
Siblings in a grid are staggered 70 ms apart.

| I want to… | Do this |
|---|---|
| Exclude one element | add `data-no-reveal` to it (or to any wrapper) |
| Change which elements animate | edit `REVEAL_SELECTOR` in `assets/js/site.js` |
| Turn all reveal animation off | delete the `initReveal()` call in `assets/js/site.js` |
| Change travel distance | `--reveal-y` in `style.css`, section 15 |
| Change speed | the `transition` durations in `style.css`, section 15 |

The animation degrades safely: if JavaScript is off the inline `<script>` in `<head>`
never adds the `js` class, so nothing is ever hidden, and the print stylesheet forces
everything visible.

**Motion preference.** The animation always runs. If the system asks for reduced motion
the slide is shortened (18 px → 6 px, 0.72 s → 0.35 s) rather than removed. This is
deliberate: on Windows, *Settings → Accessibility → Visual effects → Animation effects*
being switched **off** makes Chrome report `prefers-reduced-motion: reduce`, so a strictly
compliant site shows the visitor **no motion at all** — which looks like the animation is
broken. If you want strict behaviour, delete the two `@media (prefers-reduced-motion:
reduce)` blocks marked `STRICT` in `style.css`.

## 7. Notes

- No external libraries, no CDN, no network calls — the site works offline.
- Tested at 390 px, 768 px and 1440 px widths; the nav collapses to a menu below 760 px.
- Printing (Ctrl+P) produces a clean A4 layout with navigation removed and figures kept whole.

## 8. Change log

- **v5** — content rebuilt from the group report: 6 samples from one stem, report Table 1 /
  Table 2 / Graph 1, discussion sections 5.1–5.4 plus a limitations subsection, and a
  conclusion written to close the report (the report had none).
- **v4** — motion preference no longer disables the animation (it shortens it), and a
  scroll safety net reveals anything skipped by a fast flick or an anchor jump.
- **v3** — added scroll-reveal and page-entrance animations, with a no-JS fallback.
- **v2** — replaced the illustrative sample data with the group's real five-point
  scores (7 days, fingers a–e). Rebuilt Figure 14 from the Word chart
  "Firmness decrease vs sweetness increase"; the original plotted "–" as 0, which drew
  a false dip in sweetness, so missing days are now shown as gaps.
- **v1** — initial five-page build with placeholder data (10 days, 1–7 colour index).
