
# Stadium Metaphor Scene — AI Agent Build Prompt + SVG Glyph Prompt

This file contains the full instructions for an AI coding agent to implement the **stadium metaphor scene** in your Medicaid LTSS scrollytelling experience, **plus the SVG asset generation prompt** for a visual AI model.

---

## ✅ AI Agent Prompt: Build the Stadium Scene (30 + 32 Stadium Icons)

**TASK:**  
Replace the current "5.6M people" scene with a **stadium metaphor** scene in D3.

**GOAL:**  
Visually show that LTSS users could fill **~70 NFL stadiums**, where:

- First **30** stadium icons appear (representing the ~number of NFL stadiums in the U.S.)
- Then **32 more** icons illuminate
- Then **~8 placeholders** remain dim to reinforce scale (still more needed)
- Final reveal: **\`5,600,000 people\`**

**TONE:** Cinematic, respectful, emotional — **not sports hype**.

---

### 🎯 Sequence Overview

| Phase | Visual |
|------|--------|
1 | Empty grid of 70 stadium slots (10×7) |
2 | 30 stadium icons fade in, staggered (representing NFL stadiums) |
3 | +32 stadium icons animate in |
4 | Remaining ~8 icons stay dim/outlined |
5 | Animated number counter: `0 → 5,600,000` |
6 | Emotional text overlay fades in |

---

### 📐 Visual Requirements

- Stadium icons = **simple SVG** (minimal line art bowl shape)
- Active stadiums = **warm gold glow**
- Inactive = low-contrast outline
- Emotional cinematic look, not sports branding
- Background: deep navy `#0D1A2D`
- Highlight color: soft gold `#D4A857`

---

### 🧠 Text / Caption Script

```
If each stadium held 80,000 people...
This would fill every NFL stadium in America.
And we'd still need dozens more.
5,600,000 people rely on long‑term care and support.
```

---

### 💻 Technical Instructions

- Create `/js/scenes/scene_stadium.js`
- Export function: `drawSceneStadium(svg, data)`
- Replace old scene call in `main.js` switch
- Create 70 grid positions, each with a stadium icon
- Use staggered transitions:

```js
.transition()
.delay(i => i * 50)
.duration(600)
```

- Phase triggers based on scroll

---

### ♿ Accessibility

- Each `<svg>` icon must include a `<title>` tag:
  `"Stadium representing ~80,000 people who rely on LTSS"`

---

### ✅ Deliverables From Agent

- `scene_stadium.js`
- Updated `main.js` switch case
- Embedded SVG stadium icon path or minimal inline `<svg>`
- New CSS for glow + dim icons
- Comments for timing customization
- Demo screenshot or animation preview

---

## ✅ Bonus: SVG Glyph Generation Prompt (For Visual AI)

Use this prompt in Claude/DALL·E/Midjourney to generate icons for the stadium scene.

```
Create cinematic SVG icons for a scrollytelling scene about long‑term care.

Theme: “~70 stadiums worth of lives supported”
Style: emotional, elegant, dignified (Pixar + ESPN energy)

Icons needed:
1. Stadium bowl icon (main)
2. Mini stadium icon (grid version)
3. Seat icon (simple rounded dot or soft seat outline)
4. Care overlay accent (minimal heart or hands)

Design rules:
- Output **raw <svg> markup only**
- 512×512 canvas for main icons
- 64×64 + 24×24 versions for mini icon
- Rounded stroke ends, gentle curves
- Colors:
  - Stroke: `#0D1A2D` (deep navy)
  - Accent: `#D4A857` (warm gold)
- No text, no logos
- Style: minimalist, human, cinematic, slightly hand‑drawn warmth
- Must scale cleanly (vector only)
- Use `<g>` groups and clean path data
- Add title tag describing icon
- No raster effects

Tone:
- Quiet courage, dignity, community, scale
```

---

### ✅ Usage

- Paste the **first prompt** into your coding agent (Cursor, Claude Artifacts, VS Code Copilot chat, etc.)
- Paste the **second prompt** into your visual AI to generate SVGs
- Save SVGs to `/assets/stadium/`

---

**You now have a complete cinematic stadium metaphor build kit.**

Next options to continue:
- Generate stadium SVG assets
- Write `scene_stadium.js`
- Add motion blur + glow effects
- Create emotional voiceover script
- Export storyboard frames to Figma
- Bundle into VS Code project ZIP
