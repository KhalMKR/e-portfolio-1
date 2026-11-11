/* ============================================================================
   STU2103 E-PORTFOLIO — DATA FILE
   ----------------------------------------------------------------------------
   THIS IS THE ONLY FILE YOU NEED TO EDIT FOR DATA.
   Text content lives in the HTML pages; numbers, photos and scales live here.

   Everything below is taken from the group report "Report Postharvest":
     • Table 1  Scoring Scale References
     • Table 2  Daily Ripening Progression and Physical Characteristics
     • Graph 1  Firmness decrease vs Sweetness increase

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
     ---------------------------------------------------------------------- */
  fruit: {
    common:    "Banana",
    scientific: "Musa spp.",
    ripeningClass: "Climacteric",
    // The report does not state a controlled storage condition
    storage:   "Stored at room conditions",
    durationDays: 7,
    samples: 6          // six bananas from one stem, labelled individually
  },

  /* -------------------------------------------------------------------------
     B. GROUP MEMBERS
     Replace the placeholder names and matric numbers before submission.
     ---------------------------------------------------------------------- */
  group: [
    { name: "Member One",   matric: "00000", role: "Sample preparation & labelling" },
    { name: "Member Two",   matric: "00000", role: "Daily observation & photography" },
    { name: "Member Three", matric: "00000", role: "Scoring: colour, firmness, taste" },
    { name: "Member Four",  matric: "00000", role: "Data recording & graphing" },
    { name: "Member Five",  matric: "00000", role: "Report writing & e-portfolio" }
  ],

  /* -------------------------------------------------------------------------
     C. PEEL COLOUR SCALE (1–5)
     Matches Table 1 of the report. `hex` is the swatch colour used in the
     spectrum strip and in the table chips.
     ---------------------------------------------------------------------- */
  peelScale: [
    { index: 1, label: "All green",               stage: "Mature green",          hex: "#4E7A2E" },
    { index: 2, label: "Green, trace of yellow",   stage: "Green with yellow trace", hex: "#8A9A31" },
    { index: 3, label: "More yellow than green",   stage: "Turning",               hex: "#BDB03B" },
    { index: 4, label: "All yellow",               stage: "Edible ripe",           hex: "#EAC63F" },
    { index: 5, label: "Yellow, brown spots",      stage: "Overripe",              hex: "#C08A33" }
  ],

  /* -------------------------------------------------------------------------
     D. DAILY OBSERVATIONS
     One object per day — these are the scores in Table 2 of the report.

       day        observation day (1 = day the experiment was set up)
       stage      ripening stage label, as written in the report
       peelIndex  1–5, must match a peelScale entry
       firmness   1–5  (1 = very hard … 5 = mushy — a SOFTER fruit scores HIGHER)
       taste      1–5  (1 = astringent/starchy … 5 = very sweet) — null if not tasted
       desc       what was seen that day
     ---------------------------------------------------------------------- */
  observations: [
    { day: 1, stage: "Mature green",           peelIndex: 1, firmness: 1, taste: 1,    desc: "Entirely green and hard; astringent and starchy" },
    { day: 2, stage: "Green with yellow traces", peelIndex: 2, firmness: 2, taste: null, desc: "Slightly yellow at the edges but mostly green" },
    { day: 3, stage: "Turning stage",          peelIndex: 2, firmness: 2, taste: null, desc: "Colour held; fruit still firm and starchy" },
    { day: 4, stage: "Intermediate",           peelIndex: 3, firmness: 3, taste: 3,    desc: "More yellow than green; first sweetness detected" },
    { day: 5, stage: "Mostly yellow",          peelIndex: 4, firmness: 3, taste: null, desc: "Peel fully yellow; firmness unchanged from Day 4" },
    { day: 6, stage: "Edible ripe",            peelIndex: 4, firmness: 4, taste: null, desc: "Fully yellow and soft; characteristic banana aroma" },
    { day: 7, stage: "Overripe / spotted",     peelIndex: 5, firmness: 5, taste: 5,    desc: "Brown senescent spots; soft and mushy; very sweet" }
  ],

  /* -------------------------------------------------------------------------
     E. PHOTOS
     Drop your own images into  assets/img/  using the filenames below and they
     appear automatically. If a file is missing, a labelled placeholder is drawn
     instead, so the layout never breaks.

       src    path relative to the HTML page
       view   "external" (daily photos) | "setup" (preparation) | "internal"
       fig    figure number shown in the caption
     ---------------------------------------------------------------------- */
  photos: [
    { day: 0, date: "Set-up", stage: "Labelling",     view: "setup",    fig: "1", src: "assets/img/fig01-labelled-bananas.jpg", caption: "Six banana samples from one stem, each labelled individually for identification." },

    { day: 1, date: "Day 1", stage: "Mature green",            view: "external", fig: "2", src: "assets/img/day01-external.jpg", caption: "Day 1 — uniformly dark green, hard, no yellow visible. Colour 1, firmness 1, sweetness 1." },
    { day: 2, date: "Day 2", stage: "Green with yellow traces", view: "external", fig: "3", src: "assets/img/day02-external.jpg", caption: "Day 2 — a trace of yellow at the edges, the peel still mostly green. Colour 2, firmness 2." },
    { day: 3, date: "Day 3", stage: "Turning",                  view: "external", fig: "4", src: "assets/img/day03-external.jpg", caption: "Day 3 — colour unchanged from Day 2; the fruit is still firm. Colour 2, firmness 2." },
    { day: 4, date: "Day 4", stage: "Intermediate",             view: "external", fig: "5", src: "assets/img/day04-external.jpg", caption: "Day 4 — more yellow than green, edges still green. Colour 3, firmness 3, sweetness 3." },
    { day: 5, date: "Day 5", stage: "Mostly yellow",            view: "external", fig: "6", src: "assets/img/day05-external.jpg", caption: "Day 5 — the peel is fully yellow, though firmness has not yet changed. Colour 4, firmness 3." },
    { day: 6, date: "Day 6", stage: "Edible ripe",              view: "external", fig: "7", src: "assets/img/day06-external.jpg", caption: "Day 6 — fully yellow and soft, with the characteristic ripe aroma. Colour 4, firmness 4." },
    { day: 7, date: "Day 7", stage: "Overripe",                 view: "external", fig: "8", src: "assets/img/day07-external.jpg", caption: "Day 7 — brown senescent spotting; soft, mushy and very sweet. Colour 5, firmness 5, sweetness 5." }
  ],

  /* -------------------------------------------------------------------------
     F. REFERENCES
     Rubric: at least five credible sources, including two academic sources.
     `type` drives the small badge: "academic" | "book" | "data"
     Entry 1 is the source cited in the group report; the rest support the
     mechanisms described in section 5 and must be checked before submission.
     ---------------------------------------------------------------------- */
  references: [
    {
      type: "academic",
      authors: "Tipu, M. M. H., & Sherif, S. M.",
      year: "2024",
      title: "Ethylene and its crosstalk with hormonal pathways in fruit ripening: mechanisms, modulation, and commercial exploitation",
      source: "Frontiers in Plant Science, 15, 1475496",
      doi: "https://doi.org/10.3389/fpls.2024.1475496"
    },
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
      type: "book",
      authors: "Wills, R. B. H., & Golding, J. B.",
      year: "2016",
      title: "Postharvest: An introduction to the physiology and handling of fruit and vegetables",
      source: "6th ed. UNSW Press / CABI",
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