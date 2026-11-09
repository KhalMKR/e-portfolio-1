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

Taken from the group's "Master Daily Results Summary Table" and "Scoring Scale
References Table":

| Day | Colour | Firmness | Sweetness | Fingers |
|---|---|---|---|---|
| 1 | 1 | 1 | 1 | a, b, c |
| 2 | 2 | 2 | – | a, b |
| 3 | 2 | 2 | – | a, b |
| 4 | 3 | 3 | 3 | a, b, d |
| 5 | 4 | 3 | – | a, b |
| 6 | 4 | 4 | – | a, b |
| 7 | 5 | 5 | 5 | a, b, e |

Note on the scales: **all three score 1–5, and firmness is a softness rank** — 1 is
the hardest fruit and 5 is mushy, so a *rising* firmness score means the fruit is
softening. Sweetness is only scored on the days a finger was cut (1, 4, 7), because
tasting requires cutting the fruit.

## 3. Swapping the placeholders

### Photographs
The gallery expects these files in `assets/img/` (any size; cropped to 4:3):

```
day01-external.jpg   day01-internal.jpg   fig01-fruit.jpg
day02-external.jpg   day04-internal.jpg   fig02-climacteric-curve.png
day04-external.jpg   day07-internal.jpg   fig03-setup.jpg
day05-external.jpg                        fig04-sampling.png
day07-external.jpg
```

Save your photos with those names and refresh — no code changes needed. A missing
file shows a dashed panel labelled with the day, stage and expected filename, so the
layout never breaks.

To add or remove a photo, edit the `photos` array:

```js
{ day: 6, date: "Day 6", stage: "Edible-ripe", view: "external",
  fig: "13", src: "assets/img/day06-external.jpg", caption: "Your caption." }
```

`view` must be `"external"` or `"internal"` (drives the filter buttons). `fig` is the
figure number printed in the caption — if you insert photos, renumber the rest and
the two chart figures (currently 13 and 14).

### Diagrams
Figures 2, 3 and 4 are file-based. Drop your own image at the path in the
`<img src="…">` and it appears; the `data-fallback="…"` attribute supplies the label
shown while the file is missing.

### Tables
Table 4 (daily observations) is generated — edit `observations` in `data.js`.
Tables 1, 2, 3 and 5 are written directly in `introduction.html`, `methods.html` and
`results.html`; search for `Table 2` etc. and edit the `<tr>` rows.

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
- [ ] Refine the internal pulp descriptions in Table 5 and in `data.js` → `internal`.
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

## 6. Notes

- No external libraries, no CDN, no network calls — the site works offline.
- Tested at 390 px, 768 px and 1440 px widths; the nav collapses to a menu below 760 px.
- Printing (Ctrl+P) produces a clean A4 layout with navigation removed and figures kept whole.

## 7. Change log

- **v2** — replaced the illustrative sample data with the group's real five-point
  scores (7 days, fingers a–e). Rebuilt Figure 14 from the Word chart
  "Firmness decrease vs sweetness increase"; the original plotted "–" as 0, which drew
  a false dip in sweetness, so missing days are now shown as gaps.
- **v1** — initial five-page build with placeholder data (10 days, 1–7 colour index).
