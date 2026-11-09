/* ============================================================================
   STU2103 E-PORTFOLIO — DATA FILE
   ----------------------------------------------------------------------------
   THIS IS THE ONLY FILE YOU NEED TO EDIT FOR DATA.
   Text content lives in the HTML pages; numbers, photos and scales live here.

   The values below come from the group's "Master Daily Results Summary Table"
   and "Scoring Scale References Table" (STU2103 E-Portfolio Graph session).
   Only the observation dates are placeholders — replace them with your real ones.

   Sections:
     A. fruit        – the selected climacteric fruit
     B. group        – member names + matric numbers
     C. peelScale    – 1–5 peel colour scale (definitions + swatch colours)
     D. observations – one object per observation day
     E. photos       – gallery entries (drop your own images in /assets/img)
     F. references   – reference list
   ----------------------------------------------------------------------------
   TIP: keep the keys exactly as they are; only change the values.
   ============================================================================ */

window.PORTFOLIO = {

  /* -------------------------------------------------------------------------
     A. SELECTED FRUIT AND EXPERIMENT SET-UP
     Change these values if your group chooses banana → papaya / mango / tomato
     ---------------------------------------------------------------------- */
  fruit: {
    common:    "Cavendish banana",
    scientific: "Musa acuminata",
    group:     "AAA genome group",
    cultivar:  "‘Williams’ / ‘Grand Naine’ type",
    // Ripening class — the whole experiment depends on this being climacteric
    ripeningClass: "Climacteric",
    // EDIT: change this if you held the fruit somewhere specific (incubator, chiller, etc.)
    storage:   "Ambient room temperature",
    durationDays: 7,
    replicates: 5,      // five fingers, labelled a–e
    monitored: 2,       // a and b scored every day, never cut
    sampled: 3          // c, d and e cut on days 1, 4 and 7
  },

  /* -------------------------------------------------------------------------
     B. GROUP MEMBERS
     Replace the placeholder names and matric numbers before submission.
     ---------------------------------------------------------------------- */
  group: [
    { name: "Member One",   matric: "00000", role: "Fruit sourcing & handling" },
    { name: "Member Two",   matric: "00000", role: "Colour scoring & photography" },
    { name: "Member Three", matric: "00000", role: "Firmness & taste panel" },
    { name: "Member Four",  matric: "00000", role: "Data recording & analysis" },
    { name: "Member Five",  matric: "00000", role: "Writing & e-portfolio design" }
  ],

  /* -------------------------------------------------------------------------
     C. PEEL COLOUR SCALE (1–5)
     Matches the group's Scoring Scale Reference Table exactly. `hex` is the
     swatch colour used in the spectrum strip and in the table chips.
     ---------------------------------------------------------------------- */
  peelScale: [
    { index: 1, label: "All green",              stage: "Mature-green", hex: "#4E7A2E" },
    { index: 2, label: "Green, trace of yellow",  stage: "Turning",      hex: "#8A9A31" },
    { index: 3, label: "More yellow than green",  stage: "Ripening",     hex: "#BDB03B" },
    { index: 4, label: "All yellow",              stage: "Edible-ripe",  hex: "#EAC63F" },
    { index: 5, label: "Yellow, brown spots",     stage: "Overripe",     hex: "#C08A33" }
  ],

  /* -------------------------------------------------------------------------
     D. DAILY OBSERVATIONS
     One object per day — these are the group's recorded scores.

       day        observation day (1 = day the experiment was set up)
       date       EDIT: replace with your real observation dates
       stage      ripening stage label
       peelIndex  1–5, must match a peelScale entry
       external   short description of peel colour
       firmness   1–5  (1 = very hard … 5 = mushy — a SOFTER fruit scores HIGHER)
       taste      1–5  (1 = astringent/starchy … 5 = very sweet) — null if not tasted
       fruits     which fingers were observed that day
       internal   pulp note; only filled on the destructive-sampling days
       note       optional remark for the discussion
     ---------------------------------------------------------------------- */
  observations: [
    { day: 1, date: "2026-11-10", stage: "Mature-green", peelIndex: 1, external: "Entirely green, hard, no yellow present",   firmness: 1, taste: 1,    fruits: "a, b, c", internal: "Sample c — pulp hard, pale and starchy; astringent", note: "Baseline. Fingers a, b and c scored; c cut as the early sample." },
    { day: 2, date: "2026-11-11", stage: "Turning",      peelIndex: 2, external: "Slightly yellow at the edges, mostly green", firmness: 2, taste: null, fruits: "a, b",    internal: null, note: "First colour break." },
    { day: 3, date: "2026-11-12", stage: "Turning",      peelIndex: 2, external: "Slightly yellow at the edges, mostly green", firmness: 2, taste: null, fruits: "a, b",    internal: null, note: "No change from Day 2." },
    { day: 4, date: "2026-11-13", stage: "Ripening",     peelIndex: 3, external: "More yellow than green; edges still green",  firmness: 3, taste: 3,    fruits: "a, b, d", internal: "Sample d — pulp softening; starch taste reduced, slightly sweet", note: "Intermediate sample: finger d cut." },
    { day: 5, date: "2026-11-14", stage: "Edible-ripe",  peelIndex: 4, external: "Peel fully yellow; fruit ripe",              firmness: 3, taste: null, fruits: "a, b",    internal: null, note: "Best appearance and texture." },
    { day: 6, date: "2026-11-15", stage: "Edible-ripe",  peelIndex: 4, external: "Peel fully yellow",                         firmness: 4, taste: null, fruits: "a, b",    internal: null, note: "Softening clearly advanced." },
    { day: 7, date: "2026-11-16", stage: "Overripe",     peelIndex: 5, external: "Yellow with brown spots; overripe",          firmness: 5, taste: 5,    fruits: "a, b, e", internal: "Sample e — pulp very soft and mushy; very sweet", note: "Ripe sample: finger e cut. End of the edible window." }
  ],

  /* -------------------------------------------------------------------------
     E. PHOTOS
     Drop your own images into  assets/img/  using the filenames below and they
     appear automatically. If a file is missing, a labelled placeholder is drawn
     instead, so the layout never breaks.

       src    path relative to the HTML page
       view   "external" | "internal"  (drives the gallery filter)
       fig    figure number shown in the caption
     ---------------------------------------------------------------------- */
  photos: [
    { day: 1, date: "Day 1", stage: "Mature-green", view: "external", fig: "5",  src: "assets/img/day01-external.jpg", caption: "Fingers a and b on Day 1: entirely green and hard — score 1 on all three scales." },
    { day: 2, date: "Day 2", stage: "Turning",      view: "external", fig: "6",  src: "assets/img/day02-external.jpg", caption: "Day 2: slightly yellow at the edges, still mostly green (colour 2)." },
    { day: 4, date: "Day 4", stage: "Ripening",     view: "external", fig: "7",  src: "assets/img/day04-external.jpg", caption: "Day 4: more yellow than green, edges still green (colour 3)." },
    { day: 5, date: "Day 5", stage: "Edible-ripe",  view: "external", fig: "8",  src: "assets/img/day05-external.jpg", caption: "Day 5: peel fully yellow — the fruit is ripe (colour 4)." },
    { day: 7, date: "Day 7", stage: "Overripe",     view: "external", fig: "9",  src: "assets/img/day07-external.jpg", caption: "Day 7: yellow with brown spots; firmness and sweetness both at 5." },
    { day: 1, date: "Day 1", stage: "Mature-green", view: "internal", fig: "10", src: "assets/img/day01-internal.jpg", caption: "Early sample (finger c): hard, pale, starchy pulp; astringent taste, score 1." },
    { day: 4, date: "Day 4", stage: "Ripening",     view: "internal", fig: "11", src: "assets/img/day04-internal.jpg", caption: "Intermediate sample (finger d): pulp softening, starch taste reduced, score 3." },
    { day: 7, date: "Day 7", stage: "Overripe",     view: "internal", fig: "12", src: "assets/img/day07-internal.jpg", caption: "Ripe sample (finger e): very soft, mushy pulp, very sweet, score 5." }
  ],

  /* -------------------------------------------------------------------------
     F. REFERENCES
     Rubric: at least five credible sources, including two academic sources.
     `type` drives the small badge: "academic" | "book" | "data"
     ---------------------------------------------------------------------- */
  references: [
    {
      type: "academic",
      authors: "Bapat, V. A., Trivedi, P. K., Ghosh, A., Sane, V. A., Ganapathi, T. R., & Nath, P.",
      year: "2010",
      title: "Ripening of fleshy fruit: Molecular insight and the role of ethylene",
      source: "Biotechnology Advances, 28(1), 94–107",
      doi: "https://doi.org/10.1016/j.biotechadv.2009.10.002"
    },
    {
      type: "academic",
      authors: "Giovannoni, J. J.",
      year: "2004",
      title: "Genetic regulation of fruit development and ripening",
      source: "The Plant Cell, 16(suppl_1), S170–S180",
      doi: "https://doi.org/10.1105/tpc.019158"
    },
    {
      type: "academic",
      authors: "Saltveit, M. E.",
      year: "1999",
      title: "Effect of ethylene on quality of fresh fruits and vegetables",
      source: "Postharvest Biology and Technology, 15(3), 279–292",
      doi: "https://doi.org/10.1016/S0925-5214(98)00091-X"
    },
    {
      type: "academic",
      authors: "Seymour, G. B., Østergaard, L., Chapman, N. H., Knapp, S., & Martin, C.",
      year: "2013",
      title: "Fruit development and ripening",
      source: "Annual Review of Plant Biology, 64, 219–241",
      doi: "https://doi.org/10.1146/annurev-arplant-050312-120057"
    },
    {
      type: "book",
      authors: "Wills, R. B. H., & Golding, J. B.",
      year: "2016",
      title: "Postharvest: An introduction to the physiology and handling of fruit and vegetables",
      source: "6th ed. UNSW Press / CABI",
      doi: ""
    },
    {
      type: "book",
      authors: "Kader, A. A. (Ed.)",
      year: "2002",
      title: "Postharvest technology of horticultural crops",
      source: "3rd ed. University of California, Agriculture and Natural Resources",
      doi: ""
    },
    {
      type: "data",
      authors: "Food and Agriculture Organization of the United Nations",
      year: "2023",
      title: "FAOSTAT: Crops and livestock products",
      source: "FAOSTAT database",
      doi: "https://www.fao.org/faostat/"
    }
  ]
};
