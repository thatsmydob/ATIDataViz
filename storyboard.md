# Medicaid LTSS Scrollytelling Storyboard  
*A visual narrative on the scale & transformation of long-term services & supports in the U.S.*

---

## 🎬 Scene 0 — Title / Context

### **The Scale & Shift of Long-Term Services & Supports in Medicaid**
Millions rely on these services every day to live safely and independently.

> **Scroll to explore ↓**

**Visual concept**
- Soft gradient background
- Title fades in
- Scroll cue pulse animation

---

## 🔹 Scene 1 — LTSS Reaches Millions of Americans

### Key Insight  
**5.6 million** people used Medicaid LTSS in 2020 *(KFF)*.

### Lay Context  
That’s like filling **8 Washington, D.C.s** with people who rely on daily support.

### Why It Matters  
LTSS supports millions — not a small special-use program.

### Visual Guidance  
- Animated count up: `0 → 5,600,000`
- Icon grid (1 icon = 10,000 people)
- U.S. map fade → zoom to number

### Technical Notes  
- D3 icon grid + text overlay
- Scroll-triggered fade & scale
- Static numeric data load

---

## 🔹 Scene 2 — Small Share, Big Spending Impact

### Key Insight  
- **6%** of Medicaid enrollees use LTSS  
- But account for **37%** of spending *(KFF)*

### Lay Context  
Out of **100 Medicaid enrollees**, only **6** need LTSS —  
yet they drive spending equivalent to **37 people**.

### Why It Matters  
Resource-intensive population → critical policy & budget implications.

### Visual Guidance  
- Step 1: 100-person icon grid → highlight 6
- Step 2: Morph to donut showing 6% vs 37%

### Technical Notes  
- Icon grid → donut transition
- D3 shape morph + easing
- Two data points, animated transition

---

## 🔹 Scene 3 — Most People Receive Care at Home

### Key Insight *(2020)*  
| Category | Share |
|---|---|
| Home & Community-Based (HCBS) | **72%** |
| Institutional | **24%** |
| Both | **4%** |

### Lay Context  
Out of every 100 LTSS users:  
**72** live in the community, **24** in facilities, **4** use both.

### Why It Matters  
The U.S. has shifted toward *aging in place & independence*.

### Visual Guidance  
- Horizontal stacked bar w/ icons:
  - 🏠 HCBS — 72%
  - 🏥 Institutional — 24%
  - ♻️ Both — 4%

### Technical Notes  
- D3 stacked bar
- Slide-in animation left → right
- Label fade-in on scroll

---

## 🔹 Scene 4 — LTSS Is Not Only for Older Adults

### Key Insight  
**56%** of LTSS users are under age 65 *(KFF)*

### Lay Context  
More than half are younger adults with disabilities or complex needs.

### Why It Matters  
Shatters the myth that LTSS = “nursing homes for seniors.”

### Visual Guidance  
- Dual silhouette chart
- **56% Under 65** vs **44% Age 65+**
- Animated number roll-ups

### Technical Notes  
- Two-bar proportional visualization
- Fade + counter animations

---

## 🔹 Scene 5 — Home-Based Care Is Accelerating

### Key Insight  
By 2021, **~86% of LTSS users** received HCBS *(Mathematica)*

### Lay Context  
Out of 100 LTSS users today, **86** receive support at home.

### Why It Matters  
Structural system shift → policy success & new workforce needs.

### Visual Guidance  
- Line chart: HCBS ↑, Institutional ↓ (2010-2021)
- Icons transition from building → houses

### Technical Notes  
- D3 line chart + area fill
- Draw-on-scroll animation
- Icon path motion

---

## ✅ Scene 6 — Human Message & Call to Explore

### Closing Statement  
Behind every datapoint is a person — a family — a life with dignity and independence.

### Visual Guidance  
- Soft vignette
- Text fade in
- Optional subtle photo silhouettes

### Scroll End CTA  
- “Explore your state →”
- “Replay story”
- “Download data”

---

## 🧠 Developer Notes

| Item | Spec |
|---|---|
Framework | **D3.js + Scrollama + GSAP (optional)** |
Layout | Sticky graphic + scrolling text |
Scenes | **6 total** |
Data | Static JSON |
Charts | Icon grid, donut, stacked bar, age split, line chart |
Animations | Fade-in, scale, morph, draw paths, count up |

---

## 🧩 Suggested File Structure

```
/project
  /css
    styles.css
  /js
    main.js
    /scenes
      scene0.js
      scene1.js
      scene2.js
      scene3.js
      scene4.js
      scene5.js
      scene6.js
  /data
    ltss_data.json
  index.html
```
