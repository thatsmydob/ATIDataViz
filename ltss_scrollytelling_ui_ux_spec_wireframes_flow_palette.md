# LTSS Scrollytelling — UI/UX Spec
*Wireframes (No. 1), UX Flow (No. 2), and Color & Type System (No. 3)*

> Goal: A clean, human-centered, interactive experience that feels professional and Pudding-like (sticky graphic + scrolling text), with exploration filters for **Age**, **Gender**, and **State**.

---

## 1) UI WIREFRAMES (LOW-FI)
**Layout pattern (desktop ≥1280px):** Sticky graphic at left (60%) and scroll text panel at right (40%). On mobile, switch to vertical stack with the graphic sticky at top and text blocks scrolling under.

### Global Header (persistent)
```
┌───────────────────────────────────────────────────────────────────────────┐
│ Care • Dignity • Independence    LTSS Explorer                            │
│ [About] [Methods] [Download]                    [High Contrast] [≡ Menu] │
└───────────────────────────────────────────────────────────────────────────┘
```
- Thin bar, subtle divider. High-contrast toggle and menu.

### Scene 0 — Title / Welcome
```
┌───────────────Sticky Visual (L)───────────────┬───────────────Text (R)───────────────┐
│ Silhouette collage fades to data particles    │ H1: Care, Dignity, and Independence  │
│ (soft gradient background)                    │ Subtitle: The human story behind     │
│                                               │ Medicaid LTSS                        │
│                                               │ [Begin Exploring ↓]                  │
└────────────────────────────────────────────────┴───────────────────────────────────────┘
```
- Simple CTA arrow; subtle motion on scroll.

### Scene 1 — Scale (5.6M)
```
┌───────────────Sticky Visual (L)───────────────┬───────────────Text (R)───────────────┐
│ Dot field counter (0→5,600,000)               │ H2: How many lives?                   │
│ Stadium-tiles fill in phases                  │ Body: 5.6M rely on LTSS…              │
│ Tooltip card (hover dot → micro-story)        │ Caption: Stadium analogy              │
└────────────────────────────────────────────────┴───────────────────────────────────────┘
```

### Scene 2 — 6% vs 37%
```
┌───────────────Sticky Visual (L)───────────────┬───────────────Text (R)───────────────┐
│ 100-person grid → morph to spending donut     │ H2: A small group, a huge impact      │
│ Toggle: [People view] [Spending view]         │ Explainer, plain language             │
│ ARIA live region announces morph state        │ Note: Why it matters                  │
└────────────────────────────────────────────────┴───────────────────────────────────────┘
```

### Scene 3 — Setting Mix (72/24/4)
```
┌───────────────Sticky Visual (L)───────────────┬───────────────Text (R)───────────────┐
│ Stacked bar with icons (house/facility/both)  │ H2: Home is care                      │
│ Animated fill-in labels                       │ Context + definition of HCBS          │
│ Legend chips                                  │ Small footnote for definitions        │
└────────────────────────────────────────────────┴───────────────────────────────────────┘
```

### Scene 4 — Age Composition (56% <65)
```
┌───────────────Sticky Visual (L)───────────────┬───────────────Text (R)───────────────┐
│ Two bars (Under 65 vs 65+) with silhouettes   │ H2: Not just older adults             │
│ Counters roll up                               │ Story: disability & chronic needs     │
│                                                │ Age slider preview appears here       │
└────────────────────────────────────────────────┴───────────────────────────────────────┘
```

### Scene 5 — Trend (HCBS rising)
```
┌───────────────Sticky Visual (L)───────────────┬───────────────Text (R)───────────────┐
│ Dual line chart (HCBS↑, Institutional↓)       │ H2: A system transforming             │
│ Playhead scrubs along years on scroll          │ Notes: workforce & choice             │
│ Icons glide from building→house subtly         │                                       │
└────────────────────────────────────────────────┴───────────────────────────────────────┘
```

### Scene 6 — Explorer Panel (Filters)
```
┌───────────────────────────────Full-Width Explorer (sticky header)──────────────────────────────┐
│ Filters: Age [pills+slider]  Gender [M/F/NB/All]  State [Dropdown + Map Click]  [Reset] [Share]│
├────────────────────────────────────────────────────────────────────────────────────────────────┤
│ A) Choropleth: HCBS share by state                                                              │
│ B) Small multiples: Top 6 states selected                                                       │
│ C) Distribution: LTSS users per 1,000 Medicaid enrollees                                        │
│ D) Detail card: Selected state (demographics, setting mix, benchmarks)                          │
└────────────────────────────────────────────────────────────────────────────────────────────────┘
```
- Mobile: Filters collapse into a tray; map full width; charts as a vertical stack.

### Footer
- Credits • Data sources • Methods • Download • Contact • Accessibility statement.

---

## 2) UX FLOW (SCROLL & INTERACTION)

### Scroll Architecture
- **Pattern:** Scrollama sticky container per scene; graphic is fixed while text steps advance.
- **States:** `enter`, `progress`, `exit` per scene to orchestrate animations.

### Scene-by-Scene Flow
1. **Scene 0 → Scene 1**
   - *enter:* silhouettes → particles; text fades in.
   - *progress:* background gradient shifts slightly; CTA arrow moves.
   - *exit:* lock sticky region; handoff to Scene 1.

2. **Scene 1 (Scale)**
   - *enter:* counter animates; stadium tiles fill in 3 phases.
   - *progress:* tooltips activate on hover; reduced-motion users see instant fill.
   - *exit:* tiles dim; focus moves to grid of people.

3. **Scene 2 (6% vs 37%)**
   - *enter:* 100-person grid highlights 6.
   - *progress:* morph to donut (spending). ARIA live updates: "Switched to spending view".
   - *exit:* legend persists; labels freeze for screen capture.

4. **Scene 3 (Setting Mix)**
   - *enter:* stacked bar slides in; icon legend appears.
   - *progress:* percentages count up; tooltip explains HCBS vs institutional.
   - *exit:* freeze labels at final.

5. **Scene 4 (Age)**
   - *enter:* bars grow; 56% highlight animates first (surprising moment).
   - *progress:* preview age slider appears; user can scrub to see simulated reweights.
   - *exit:* keep slider state to carry into Explorer.

6. **Scene 5 (Trend)**
   - *enter:* draw-on path for each line; year markers appear progressively.
   - *progress:* playhead follows scrollY; tooltips show year values.
   - *exit:* final year pins; state persists into Explorer defaults.

7. **Scene 6 (Explorer)**
   - Filters surface; map zooms to selected state (if any);
   - **Interactions:**
     - Age pills/slider filter all charts.
     - Gender toggles re-aggregations.
     - State dropdown or map click sets focus; small multiples show peer comparisons.
     - Share button produces URL with query params (e.g., `?state=GA&age=18-44&gender=all`).
     - Reset clears filters.

### Interaction & Feedback
- Hover → tooltips with plain-language explanations.
- Click → locks a selection; ESC to unlock.
- Focus order and keyboard shortcuts for filters (Tab/Shift+Tab).
- **Performance:** precompute aggregates by (state × age × gender) for instant updates.

### Data Binding (at a glance)
- **Choropleth:** value = HCBS users / LTSS users.
- **Distribution:** value = LTSS users per 1,000 Medicaid enrollees.
- **Detail Card:** totals + breakdowns: HCBS vs institutional, age pyramid, gender split.

---

## 3) COLOR PALETTE & TYPOGRAPHY

### Palette (accessible, calm, healthcare-forward)
- **Ink (Primary Text):** #101828
- **Muted Ink:** #344054
- **Background:** #F7FAFC
- **Canvas (Charts):** #FFFFFF
- **Accent 1 (HCBS):** #2E7D32 (green 700)
- **Accent 2 (Institutional):** #1565C0 (blue 700)
- **Accent 3 (Both/Other):** #8E24AA (purple 700)
- **Highlight (Counts/Key numbers):** #D97706 (amber 600)
- **Focus Ring:** #7C3AED (violet 600)
- **Grid/Rules:** rgba(16,24,40,0.08)

**Contrast targets:**
- Text vs Background ≥ 7:1 for body, ≥ 4.5:1 for labels.
- Provide **High Contrast** mode: Dark text (#0B1020) on #FFFFFF; accents shift to darker tones.

### Semantic Mapping
- HCBS → Accent 1 (green)  
- Institutional → Accent 2 (blue)  
- Both → Accent 3 (purple)

### Typography
- **Headings:** *Inter* (or *Source Sans 3*) — 700 weight
- **Body:** *Inter* 400/500 weight, 1.6 line-height
- **Monospace (figures/labels):** *IBM Plex Mono* 500

**Type scale (desktop):**
- H1: 48–56 / 64
- H2: 32 / 40
- H3: 24 / 32
- Body L: 18 / 28
- Body: 16 / 26
- Caption: 14 / 22

**Type scale (mobile):**
- H1: 32 / 40
- H2: 24 / 32
- Body: 15 / 24

### Spacing & Components
- 8px baseline grid
- Card padding: 16–24px
- Chart gutters: 24–32px
- Tooltip: 280–360px max-width; 12px radius; shadow 8/16

### Iconography
- Simple line icons (heroicons/feather)
- House, facility, person, map-pin, sliders

---

## APPENDIX — DEV STARTER NOTES
- **Tech:** D3 + Scrollama; GSAP optional for micro-tweens; Svelte/React acceptable wrappers.
- **State:** URL params for shareability; lightweight store for filters & scene index.
- **Data:** Pre-aggregate by (state, age, gender); lazy-load county if needed later.
- **A11y:**
  - `prefers-reduced-motion` support
  - ARIA live regions for morphs
  - Keyboard operable filters
  - Alt text per chart + Data table view

---

**Ready to move into high-fi mocks or component specs.** Would you like me to convert these wireframes into Figma frames and a UI kit next?

