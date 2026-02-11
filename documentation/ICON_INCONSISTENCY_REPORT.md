# Icon Inconsistency Report: SpikedAI Landing Page

This document highlights visual and technical inconsistencies in how icons are implemented across the current website. Fixing these will ensure a "Premium" and unified experience when integrating into the main product app.

## 1. Categorical Visual Inconsistencies

### A. Background Container Styles
- **Issue:** There are at least three different ways "Feature Icons" are wrapped.
  - **Type 1 (Full Gradient):** `bg-gradient-to-br from-red-600 to-red-700` (Used in `FeaturesGrid`).
  - **Type 2 (Subtle Tint):** `bg-red-500/10` with `text-red-600` (Used in `Careers` benefits).
  - **Type 3 (Glassmorphism):** `bg-card backdrop-blur-sm border-red-900/50` (Used in `FeaturesShowcase` headers).
- **Fix:** Consolidate into a single "Icon Container" design system token. Use Glassmorphism for "Surface" UI and Full Gradient for "Call to Action" or "Main Category" cards.

### B. Stroke Weight & Scaling
- **Issue:** Icons are scaling inconsistently between mobile and desktop.
  - In `FeaturesShowcase`, some icons scale with the text, while in `Navigation`, they stay fixed at `w-4 h-4`.
  - Checkmarks in lists vary between `w-3` and `w-5` without a clear hierarchy.
- **Fix:** Establish a 3-tier size system: `sm` (16px), `md` (24px), `lg` (32px+).

---

## 2. Page-Specific Issues

### 1. `/features` vs `/features/[slug]`
- **Inconsistency:** The `/features` grid uses colored gradients as backgrounds for pure white icons. However, the child pages (like `ai-assistance`) use colored icons (`text-red-500`) inside dark zinc containers.
- **Impact:** The transition from the "all features" list to a "specific feature" page feels like entering a different app.

### 2. Careers Page (`/careers`)
- **Inconsistency:** Uses the "red tint" style (`bg-red-50`) which is much "lighter" and more traditional SaaS than the "dark/neon" tech aesthetic used on the Home and Feature pages.
- **Impact:** The careers page looks like a generic template compared to the "Selling like a CEO" landing page.

### 3. Home Page (`/`) vs Features Showcase
- **Inconsistency:** In the main hero/quote sections, icons like `Sparkles` are sometimes in high-contrast red boxes, and other times floating with glow effects.

---

## 3. Technical Implementation Debt

### A. Import Strategy Inconsistency
- **Pattern 1:** `import { IconName } from "lucide-svelte"` (Found in most +page.svelte files).
- **Pattern 2:** `import * as Icons from "lucide-svelte"` (Used in some dynamic components).
- **Pattern 3:** Inline SVGs for the same icons (e.g., Arrows) used in some buttons but Lucide used in others.
- **Fix:** Standardize on static imports for performance (Tree Shaking) and avoid inline SVGs for any icon that exists in Lucide.

### B. Prop Naming
- **Inconsistency:** Some components take `icon` (the component itself), while others might be hardcoded to a specific icon based on an `id` string match.
- **Fix:** All reusable cards (FeatureCard, BenefitCard) should accept an `icon` prop as a Svelte component.

---

## Fix Checklist for Product Integration

1. [ ] **Normalize Feature Containers:** Pick either "Solid Gradient" or "Glass Glow" for feature headers. Do not mix.
2. [ ] **Color Palette Sync:** Ensure "Red" is always `red-600` for primary and `red-500` for secondary. Some files are using `red-700` as the primary.
3. [ ] **Careers Page Re-theme:** Update `/careers` to use the dark/neon aesthetic of the home page.
4. [ ] **Arrow Standardization:** Replace all inline `<svg>` arrows with the Lucide `ArrowRight` or `MoveRight` for consistent line weight.
