/* ============================================================================
   STU2103 E-PORTFOLIO — SITE SCRIPT
   ----------------------------------------------------------------------------
   This file renders the repeating parts of the site from assets/js/data.js:
     • the peel-colour spectrum strip
     • the observations table
     • the photo gallery (+ its filter buttons)
     • the charts (hand-drawn SVG, no external libraries)
     • the reference list
     • the group member table
   It also handles the mobile menu and the active nav link.

   You normally DO NOT need to edit this file. To change content, edit data.js.
   Look for the COMMENTED section headers if you do want to adjust behaviour.
   ============================================================================ */

(function () {
  "use strict";

  var DATA = window.PORTFOLIO || {};

  /* ---------------------------------------------------------------- utils */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  /** Read a dotted path such as "fruit.common" out of DATA. */
  function get(path) {
    return path.split(".").reduce(function (o, k) {
      return (o == null) ? undefined : o[k];
    }, DATA);
  }

  /** Format an ISO date "2026-11-10" as "10 Nov". */
  function fmtDate(iso) {
    if (!iso) return "";
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var parts = iso.split("-");
    if (parts.length < 3) return iso;
    return Number(parts[2]) + " " + months[Number(parts[1]) - 1];
  }

  /** Escape user-editable text before inserting it into HTML. */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /** Return the peelScale entry for an index (falls back to the last one). */
  function peel(index) {
    var list = DATA.peelScale || [];
    for (var i = 0; i < list.length; i++) if (list[i].index === index) return list[i];
    return list[list.length - 1] || { hex: "#ccc", label: "–" };
  }

  /* ==========================================================================
     1. TEXT BINDING
     Any element with data-fill="fruit.common" gets that value as its text.
     ====================================================================== */
  function bindText() {
    $$("[data-fill]").forEach(function (el) {
      var v = get(el.getAttribute("data-fill"));
      if (v !== undefined && v !== null) el.textContent = v;
    });
  }

  /* ==========================================================================
     2. NAV — active link + mobile toggle
     Each page sets <body data-page="results">; the matching nav link is marked.
     ====================================================================== */
  function initNav() {
    var page = document.body.getAttribute("data-page");
    if (page) {
      $$(".nav__links a").forEach(function (a) {
        if (a.getAttribute("data-page") === page) a.setAttribute("aria-current", "page");
      });
    }

    var toggle = $(".nav__toggle");
    var links = $(".nav__links");
    if (toggle && links) {
      toggle.addEventListener("click", function () {
        var open = links.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
      // Close the menu after tapping a link (mobile)
      links.addEventListener("click", function (e) {
        if (e.target.closest("a")) {
          links.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    }
  }

  /* ==========================================================================
     3. PEEL-COLOUR SPECTRUM
     Mount: <div data-render="spectrum"></div>
     ====================================================================== */
  function renderSpectrum() {
    $$('[data-render="spectrum"]').forEach(function (mount) {
      mount.classList.add("spectrum");   // the mount itself is the grid container
      mount.style.setProperty("--cols", (DATA.peelScale || []).length);
      mount.innerHTML = (DATA.peelScale || []).map(function (p) {
        return '<div class="spectrum__cell" title="' + esc(p.index + " — " + p.label) + '">' +
                 '<div class="spectrum__swatch" style="--c:' + p.hex + '"></div>' +
                 '<div class="spectrum__meta"><b>' + p.index + '</b>' +
                   '<span>' + esc(p.label) + '</span></div>' +
               '</div>';
      }).join("");
    });
  }

  /* ==========================================================================
     4. OBSERVATIONS TABLE
     Mount: <div data-render="table"></div>
     ====================================================================== */
  function dots(score, max) {
    var out = '<span class="dots">';
    for (var i = 1; i <= (max || 5); i++) {
      out += '<i class="' + (score >= i ? "on" : "") + '"></i>';
    }
    return out + "</span>";
  }

  function renderTable() {
    $$('[data-render="table"]').forEach(function (mount) {
      var rows = (DATA.observations || []).map(function (o) {
        var p = peel(o.peelIndex);
        return "<tr>" +
          '<td class="num">' + o.day + "</td>" +
          '<td class="nowrap">' + esc(fmtDate(o.date)) + "</td>" +
          "<td>" + esc(o.stage) + "</td>" +
          '<td><span class="chip" style="background:' + p.hex + '"></span>' + esc(o.external) + "</td>" +
          '<td class="num">' + o.peelIndex + "</td>" +
          '<td class="num">' + Number(o.firmness).toFixed(0) + " " + dots(o.firmness) + "</td>" +
          '<td class="num">' + (o.taste == null ? "–" : Number(o.taste).toFixed(0) + " " + dots(o.taste)) + "</td>" +
          '<td class="nowrap">' + esc(o.fruits || "–") + "</td>" +
          "<td>" + esc(o.internal || "–") + "</td>" +
          "</tr>";
      }).join("");

      mount.innerHTML =
        '<div class="table-wrap">' +
          "<table class=\"data\">" +
            "<caption>Table 4 · Daily ripening observations, day 1–" + (DATA.observations || []).length +
              " (fingers a and b; " + String(get("fruit.storage") || "").toLowerCase() + ")</caption>" +
            "<thead><tr>" +
              "<th>Day</th><th>Date</th><th>Stage</th><th>Peel colour (external)</th>" +
              "<th>Colour<br>(1–5)</th><th>Firmness<br>(1–5)</th><th>Sweetness<br>(1–5)</th>" +
              "<th>Fingers<br>scored</th><th>Internal sample</th>" +
            "</tr></thead>" +
            "<tbody>" + rows + "</tbody>" +
          "</table>" +
        "</div>" +
        '<p class="small" style="margin-top:12px">' +
          "Fingers a and b were scored every day and never cut. Sweetness required cutting the fruit, " +
          "so it was assessed only on days 1, 4 and 7, when fingers c, d and e were used for the early, " +
          "intermediate and ripe internal samples. “–” = not assessed that day." +
        "</p>";
    });
  }

  /* ==========================================================================
     5. PHOTO GALLERY
     Mount: <div data-render="gallery"></div>  (+ optional <div data-render="filters">)
     If an image file is missing, a labelled placeholder is drawn in its place.
     ====================================================================== */
  var PLACEHOLDER_ICON =
    '<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'stroke-width="1.3" aria-hidden="true">' +
    '<rect x="3" y="4" width="18" height="16" rx="2"/>' +
    '<circle cx="8.5" cy="9.5" r="1.6"/>' +
    '<path d="M21 16l-5-5-4.5 4.5L9 13l-6 6"/></svg>';

  function makeFigure(photo) {
    var fig = document.createElement("figure");
    fig.className = "figure";
    fig.setAttribute("data-view", photo.view);
    fig.innerHTML =
      '<div class="figure__frame">' +
        '<span class="figure__tag">Day <b>' + photo.day + "</b> · " + esc(photo.date) + " · " + esc(photo.stage) + "</span>" +
        '<img alt="' + esc(photo.view + " view of the fruit, day " + photo.day + ", " + photo.stage) + '" ' +
             'src="' + esc(photo.src) + '">' +
      "</div>" +
      "<figcaption><b>Figure " + esc(photo.fig) + "</b>" + esc(photo.caption) + "</figcaption>";

    // Fallback: if the file is not there yet, show a clearly-labelled placeholder.
    var img = $("img", fig);
    var swapped = false;
    function swapPlaceholder() {
      if (swapped) return;
      swapped = true;
      var frame = $(".figure__frame", fig);
      img.remove();
      var ph = document.createElement("div");
      ph.className = "placeholder";
      ph.innerHTML = PLACEHOLDER_ICON +
        "<strong>Photo placeholder</strong>" +
        "<span>Day " + photo.day + " · " + esc(photo.stage) + "</span>" +
        "<span>Replace with:</span><code>" + esc(photo.src.split("/").pop()) + "</code>";
      frame.appendChild(ph);
    }
    img.addEventListener("error", swapPlaceholder);
    // A cached/fast 404 can fire before the listener attaches — check the state too.
    if (img.complete && img.naturalWidth === 0) swapPlaceholder();

    return fig;
  }

  function renderGallery() {
    var gallery = $('[data-render="gallery"]');
    if (!gallery) return;
    var photos = DATA.photos || [];

    gallery.innerHTML = "";
    photos.forEach(function (p) { gallery.appendChild(makeFigure(p)); });

    var filterBar = $('[data-render="filters"]');
    if (!filterBar) return;

    var groups = [
      { key: "all", label: "All (" + photos.length + ")" },
      { key: "external", label: "External view" },
      { key: "internal", label: "Internal view" }
    ];
    filterBar.innerHTML = groups.map(function (g, i) {
      return '<button class="filter" type="button" data-filter="' + g.key + '" aria-pressed="' +
             (i === 0 ? "true" : "false") + '">' + g.label + "</button>";
    }).join("");

    filterBar.addEventListener("click", function (e) {
      var btn = e.target.closest(".filter");
      if (!btn) return;
      var key = btn.getAttribute("data-filter");
      $$(".filter", filterBar).forEach(function (b) {
        b.setAttribute("aria-pressed", b === btn ? "true" : "false");
      });
      $$(".figure", gallery).forEach(function (f) {
        f.style.display = (key === "all" || f.getAttribute("data-view") === key) ? "" : "none";
      });
    });
  }

  /* ==========================================================================
     5b. STATIC FIGURES
     For diagrams placed directly in the HTML, e.g.
       <img src="assets/img/ethylene-pathway.png" alt="…" data-fallback="Ethylene pathway">
     If the file is missing, a labelled placeholder is drawn instead.
     ====================================================================== */
  function initStaticFigures() {
    $$('img[data-fallback]').forEach(function (img) {
      var swapped = false;
      function swap() {
        if (swapped) return;
        swapped = true;
        var frame = img.parentNode;
        var ph = document.createElement("div");
        ph.className = "placeholder";
        ph.innerHTML = PLACEHOLDER_ICON +
          "<strong>" + esc(img.getAttribute("data-fallback")) + "</strong>" +
          "<span>" + esc(img.getAttribute("alt") || "") + "</span>" +
          "<code>" + esc(String(img.getAttribute("src")).split("/").pop()) + "</code>";
        frame.appendChild(ph);
        img.remove();
      }
      img.addEventListener("error", swap);
      if (img.complete && img.naturalWidth === 0) swap();
    });
  }

  /* ==========================================================================
     6. CHARTS — plain SVG, generated from DATA.observations
     Mounts carry their own config in data attributes:
       <div data-render="chart" data-series="peelIndex" data-y-max="7" …>
     ====================================================================== */
  function renderLineChart(mount, opts) {
    /* Chart is drawn at the mount's real pixel width (1 SVG unit = 1 px), so the
       text stays legible on phones instead of being scaled down to nothing. */
    var W = Math.max(300, Math.round(mount.clientWidth || 720));
    var mobile = W < 520;
    var H = mobile ? 290 : 330;
    var pad = { t: 18, r: mobile ? 14 : 22, b: 44, l: mobile ? 34 : 52 };
    var innerW = W - pad.l - pad.r;
    var innerH = H - pad.t - pad.b;

    var rows = opts.rows;
    var n = rows.length;
    var x = function (i) { return pad.l + (n === 1 ? innerW / 2 : (i / (n - 1)) * innerW); };
    var y = function (v) {
      var t = (v - opts.yMin) / (opts.yMax - opts.yMin);
      return pad.t + innerH - t * innerH;
    };

    var svg = ['<svg class="chart" viewBox="0 0 ' + W + " " + H + '" role="img" ' +
               "aria-label=\"" + esc(opts.title) + "\">"];

    // Horizontal gridlines + y-axis labels
    var step = (opts.yMax - opts.yMin) / opts.yTicks;
    for (var t = 0; t <= opts.yTicks; t++) {
      var val = opts.yMin + step * t;
      var yy = y(val);
      svg.push('<line class="grid-line" x1="' + pad.l + '" x2="' + (W - pad.r) +
               '" y1="' + yy + '" y2="' + yy + '"/>');
      svg.push('<text x="' + (pad.l - 8) + '" y="' + (yy + 4) + '" text-anchor="end">' +
               (Number.isInteger(val) ? val : val.toFixed(1)) + "</text>");
    }

    // Optional vertical marker for the first edible-ripe day
    if (opts.markDay) {
      var mi = rows.findIndex(function (r) { return r.day === opts.markDay; });
      if (mi > -1) {
        svg.push('<line x1="' + x(mi) + '" x2="' + x(mi) + '" y1="' + pad.t +
                 '" y2="' + (pad.t + innerH) + '" stroke="#B3471E" stroke-width="1" ' +
                 'stroke-dasharray="4 4" opacity=".55"/>');
        svg.push('<text class="annotation" x="' + (x(mi) + 6) + '" y="' + (pad.t + 12) +
                 '" text-anchor="' + (mobile ? "end" : "start") + '">' +
                 esc(opts.markLabel || "edible-ripe") + "</text>");
      }
    }

    // Axis lines
    svg.push('<line class="axis-line" x1="' + pad.l + '" x2="' + (W - pad.r) + '" y1="' +
             (pad.t + innerH) + '" y2="' + (pad.t + innerH) + '"/>');

    // X labels — every other day when space is tight
    var everyOther = mobile && n > 7;
    rows.forEach(function (r, i) {
      if (everyOther && i % 2 === 1 && i !== n - 1) return;
      svg.push('<text x="' + x(i) + '" y="' + (pad.t + innerH + 22) + '" text-anchor="middle">' +
               r.day + "</text>");
    });
    svg.push('<text class="axis-title" x="' + (pad.l + innerW / 2) + '" y="' + (H - 6) +
             '" text-anchor="middle">days after harvest</text>');

    // Series — a null means "not assessed that day"; the line connects the points
    // that WERE scored (so a series sampled on 3 of 7 days still draws a line).
    opts.series.forEach(function (s) {
      var pts = [];
      rows.forEach(function (r, i) {
        var v = r[s.key];
        if (v == null) return;                 // skip un-assessed days entirely
        pts.push({ x: x(i), y: y(v), v: v, day: r.day });
      });

      if (pts.length > 1) {
        // A series sampled on only some days is drawn dashed, to signal that the
        // line is an interpolation between the days actually scored.
        var dash = pts.length < rows.length ? ' stroke-dasharray="6 5"' : "";
        svg.push('<path class="series-line" stroke="' + s.color + '"' + dash + ' d="' +
                 pts.map(function (p, j) { return (j ? "L" : "M") + p.x + " " + p.y; }).join(" ") + '"/>');
      }
      pts.forEach(function (p) {
        svg.push('<circle class="series-dot" cx="' + p.x + '" cy="' + p.y + '" r="3.6" fill="' +
                 s.color + '"><title>Day ' + p.day + " — " + s.label + ": " + p.v + "</title></circle>");
      });
    });

    svg.push("</svg>");
    mount.innerHTML = svg.join("");
  }

  function renderCharts() {
    $$('[data-render="chart"]').forEach(function (mount) {
      var rows = DATA.observations || [];
      var keys = (mount.getAttribute("data-series") || "").split(",").filter(Boolean);
      var palette = ["#B3471E", "#2F4A34", "#C8A44A"];
      var labels = (mount.getAttribute("data-labels") || "").split("|");

      renderLineChart(mount, {
        rows: rows,
        title: mount.getAttribute("data-title") || "Chart",
        series: keys.map(function (k, i) {
          return { key: k, label: labels[i] || k, color: palette[i % palette.length] };
        }),
        yMin: Number(mount.getAttribute("data-y-min") || 0),
        yMax: Number(mount.getAttribute("data-y-max") || 5),
        yTicks: Number(mount.getAttribute("data-y-ticks") || 5),
        markDay: mount.getAttribute("data-mark-day") ? Number(mount.getAttribute("data-mark-day")) : null,
        markLabel: mount.getAttribute("data-mark-label") || "edible-ripe"
      });

      // Build the legend from the same config
      var legend = mount.parentNode.querySelector(".legend");
      if (legend) {
        legend.innerHTML = keys.map(function (k, i) {
          return '<span><i style="background:' + palette[i % palette.length] + '"></i>' +
                 esc(labels[i] || k) + "</span>";
        }).join("");
      }
    });
  }

  /* ==========================================================================
     7. REFERENCES
     Mount: <ul data-render="refs"></ul>
     ====================================================================== */
  function renderRefs() {
    $$('[data-render="refs"]').forEach(function (mount) {
      mount.innerHTML = (DATA.references || []).map(function (r) {
        var badge = "";
        if (r.type === "academic") badge = '<span class="badge">Academic</span>';
        if (r.type === "book") badge = '<span class="badge badge--book">Book</span>';
        if (r.type === "data") badge = '<span class="badge badge--data">Dataset</span>';

        var link = r.doi
          ? '<a href="' + esc(r.doi) + '" target="_blank" rel="noopener">' + esc(r.doi) + "</a>"
          : "";

        return "<li>" +
          esc(r.authors) + " (" + esc(r.year) + "). " +
          '<span class="ref-title">' + esc(r.title) + ".</span> " +
          '<span class="ref-meta">' + esc(r.source) + ".</span> " +
          badge + (link ? " " + link : "") +
          "</li>";
      }).join("");
    });
  }

  /* ==========================================================================
     8. GROUP TABLE
     Mount: <div data-render="group"></div>
     ====================================================================== */
  function renderGroup() {
    $$('[data-render="group"]').forEach(function (mount) {
      mount.innerHTML =
        '<div class="table-wrap"><table class="data" style="min-width:520px">' +
          "<caption>Group members and contribution</caption>" +
          "<thead><tr><th>#</th><th>Name</th><th>Matric no.</th><th>Role in the experiment</th></tr></thead>" +
          "<tbody>" +
          (DATA.group || []).map(function (m, i) {
            return "<tr>" +
              '<td class="num">' + (i + 1) + "</td>" +
              "<td>" + esc(m.name) + "</td>" +
              '<td class="num">' + esc(m.matric) + "</td>" +
              "<td>" + esc(m.role) + "</td>" +
            "</tr>";
          }).join("") +
          "</tbody></table></div>";
    });
  }

  /* ==========================================================================
     9. SCROLL REVEAL
     Elements matching REVEAL_SELECTOR fade and slide in once, as they scroll
     into view. Siblings inside the same container are staggered automatically.

     • Exclude one element:   add  data-no-reveal  to it (or to a wrapper)
     • Change what animates:  edit REVEAL_SELECTOR below
     • Turn it off entirely:  remove the initReveal() call in init()
     ====================================================================== */
  var REVEAL_SELECTOR = [
    ".section-head",
    ".card",
    ".stat",
    "figure.figure",
    ".chart-card",
    ".table-wrap",
    ".callout",
    ".steps > li",
    ".scale > li",
    ".refs > li",
    ".next"
  ].join(",");

  function initReveal() {
    if (!("IntersectionObserver" in window)) return;
    // NOTE: no early return for prefers-reduced-motion — the CSS shortens the
    // animation instead of removing it (see style.css section 15).

    var els = $$(REVEAL_SELECTOR).filter(function (el) {
      // The hero and page headers animate on load via CSS, not on scroll.
      return !el.closest("[data-no-reveal]") &&
             !el.closest(".hero") &&
             !el.closest(".page-head") &&
             !el.closest(".nav");
    });

    // Group by parent so siblings can be staggered in sequence.
    var groups = [];
    els.forEach(function (el) {
      el.classList.add("reveal");
      var g = null;
      for (var i = 0; i < groups.length; i++) if (groups[i].parent === el.parentNode) { g = groups[i]; break; }
      if (!g) { g = { parent: el.parentNode, list: [] }; groups.push(g); }
      g.list.push(el);
    });

    groups.forEach(function (g) {
      g.list.forEach(function (el, i) {
        // 90 ms between siblings, capped so long lists do not crawl.
        el.style.setProperty("--reveal-delay", Math.min(i * 90, 450) + "ms");
      });
    });

    var pending = els.slice();

    function mark(el) {
      el.classList.add("is-in");
      var i = pending.indexOf(el);
      if (i > -1) pending.splice(i, 1);
      io.unobserve(el);              // animate once, never again
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) mark(entry.target);
      });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.05 });

    els.forEach(function (el) { io.observe(el); });

    /* Safety net: a fast flick or an in-page anchor jump can carry an element
       past the viewport between observer frames, leaving it invisible above
       you. Anything that has reached the viewport is revealed on scroll too. */
    var ticking = false;
    function sweep() {
      ticking = false;
      var vh = window.innerHeight;
      for (var i = pending.length - 1; i >= 0; i--) {
        if (pending[i].getBoundingClientRect().top < vh * 0.94) mark(pending[i]);
      }
    }
    function onScroll() {
      if (ticking || !pending.length) return;
      ticking = true;
      requestAnimationFrame(sweep);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    sweep();
  }

  /* ==========================================================================
     10. SEQUENTIAL PAGE LINK (bottom of each page)
     ====================================================================== */
  var PAGE_ORDER = [
    { key: "home",         file: "index.html",        title: "Overview" },
    { key: "introduction", file: "introduction.html", title: "Introduction" },
    { key: "methods",      file: "methods.html",      title: "Objective, materials & methods" },
    { key: "results",      file: "results.html",      title: "Results & discussion" },
    { key: "conclusion",   file: "conclusion.html",   title: "Conclusion & references" }
  ];

  function initNext() {
    var page = document.body.getAttribute("data-page");
    var idx = PAGE_ORDER.findIndex(function (p) { return p.key === page; });
    var next = PAGE_ORDER[idx + 1];
    var slot = $("[data-render='next']");
    if (slot && next) {
      slot.innerHTML =
        '<a class="next" href="' + next.file + '">' +
          '<span><span class="next__label">Next section</span>' +
          '<span class="next__title">' + next.title + "</span></span>" +
          '<span class="next__arrow" aria-hidden="true">→</span>' +
        "</a>";
    }
  }

  /* ==========================================================================
     BOOT
     ====================================================================== */
  function init() {
    bindText();
    initNav();
    renderSpectrum();
    renderTable();
    renderGallery();
    initStaticFigures();
    renderCharts();
    renderRefs();
    renderGroup();
    initNext();
    initReveal();

    // Charts are drawn in real pixels, so redraw them when the window is resized
    var resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(renderCharts, 150);
    });
    // Stamp the current year in the footer
    var yr = $("[data-year]");
    if (yr) yr.textContent = new Date().getFullYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
