# Medicaid LTSS Scrollytelling Storyboard
*A visual narrative on the scale and transformation of long-term services and supports in the United States.*

---

## Scene 0 - Title and Context

### The Scale and Shift of Long-Term Services and Supports in Medicaid
Millions rely on these services every day to live safely and independently.

> Scroll to explore ↓

**Visual concept**
- Soft gradient background
- Title fades in
- Scroll cue pulse animation

---

## Scene 1 - Stadiums Worth of Support

### Key Insight  
**5.6 million** people used Medicaid LTSS in 2020 (KFF).

### Lay Context  
If each stadium held 80,000 people, we would fill every NFL stadium in America—and still need dozens more.

### Why It Matters  
A stadium-by-stadium reveal underscores how many lives depend on LTSS.

### Visual Guidance  
- Grid of 70 stadium slots (10 x 7)
- Phase 1: 30 stadium icons illuminate with warm gold glow
- Phase 2: 32 more icons light up
- Phase 3: Remaining 8 stay dim as placeholders
- Animated counter: `0 -> 5,600,000`
- Cinematic text overlays for the narrative lines

### Technical Notes  
- D3 SVG grid with inline stadium bowl path
- Staggered transitions using `.delay(i => i * 50)`
- Deep navy background `#0D1A2D` with gold highlight `#D4A857`
- `<title>` tag per icon for accessibility

---

## Scene 2 - Small Share, Big Spending Impact

### Key Insight  
- **6%** of Medicaid enrollees use LTSS  
- They account for **37%** of spending (KFF)

### Lay Context  
Out of 100 Medicaid enrollees, only 6 need LTSS, yet they drive spending equivalent to 37 people.

### Why It Matters  
Resource-intensive population with critical policy and budget implications.

### Visual Guidance  
- Step 1: 100-person icon grid, highlight 6
- Step 2: Morph to donut showing 6% vs 37%

### Technical Notes  
- Icon grid and donut transition
- D3 shape morph with easing
- Two data points, animated transition

---

## Scene 3 - Most People Receive Care at Home

### Key Insight (2020)  
| Category | Share |
| --- | --- |
| Home and Community-Based (HCBS) | **72%** |
| Institutional | **24%** |
| Both | **4%** |

### Lay Context  
Out of every 100 LTSS users: 72 live in the community, 24 in facilities, 4 use both.

### Why It Matters  
The United States has shifted toward aging in place and independence.

### Visual Guidance  
- Horizontal stacked bar with icons:
  - HCBS - 72%
  - Institutional - 24%
  - Both - 4%

### Technical Notes  
- D3 stacked bar
- Slide-in animation left and right
- Label fade-in on scroll

---

## Scene 4 - LTSS Is Not Only for Older Adults

### Key Insight  
**56%** of LTSS users are under age 65 (KFF)

### Lay Context  
More than half are younger adults with disabilities or complex needs.

### Why It Matters  
Challenges the myth that LTSS equals nursing homes for seniors.

### Visual Guidance  
- Dual silhouette chart
- 56% under 65 vs 44% age 65+
- Animated number roll-ups

### Technical Notes  
- Two-bar proportional visualization
- Fade and counter animations

---

## Scene 5 - Home-Based Care Is Accelerating

### Key Insight  
By 2021, approximately **86% of LTSS users** received HCBS (Mathematica)

### Lay Context  
Out of 100 LTSS users today, 86 receive support at home.

### Why It Matters  
Structural system shift showing policy success and new workforce needs.

### Visual Guidance  
- Line chart: HCBS rising, Institutional declining (2010-2021)
- Icons transition from building to houses

### Technical Notes  
- D3 line chart with area fill
- Draw-on-scroll animation
- Icon path motion

---

## Scene 6 - Human Message and Call to Explore

### Closing Statement  
Behind every data point is a person, a family, a life with dignity and independence.

### Visual Guidance  
- Soft vignette
- Text fade in
- Optional subtle photo silhouettes

### Scroll End CTA  
- Explore your state →
- Replay story
- Download data

---

## Developer Notes

| Item | Spec |
| --- | --- |
| Framework | D3.js + Scrollama + GSAP (optional) |
| Layout | Sticky graphic + scrolling text |
| Scenes | 6 total |
| Data | Static JSON |
| Charts | Stadium grid, donut, stacked bar, age split, line chart |
| Config | js/scenes/stadium_config.js controls stadium scene constants |
| Animations | Fade-in, scale, morph, draw paths, count up |

---

## Suggested File Structure

```
/project
  /css
    style.css
  /js
    main.js
    /scenes
      scene0.js
      scene_stadium.js
      scene2.js
      scene3.js
      scene4.js
      scene5.js
      scene6.js
  /data
    ltss_data.json
  index.html
```
