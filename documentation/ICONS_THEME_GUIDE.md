# Icons & Theming Guide: SpikedAI

This document provides a comprehensive guide on the styling, source, and usage of icons across the SpikedAI landing page and its integration patterns.

## 1. Icon Ecosystem Overview

- **Source Library:** `lucide-svelte`
- **Library Version:** `0.544.0` (as per `package.json`)
- **Primary Technology:** SVG-based components optimized for Svelte.

### Visual Aesthetic & Themes
The icons follow a **"Premium Tech" / "AI-driven"** aesthetic characterized by:
- **Sharp Line Art:** Clean, 2px stroke width (default Lucide style).
- **Vibrant Accent Colors:** Icons are color-coded based on the feature they represent.
- **Glassmorphism Wrapping:** Icons are frequently enclosed in semi-transparent, blurred containers ("glass") or gradient-rich backgrounds.
- **Dynamic Feedback:** Subtle animations (pulse, hover-lift, scale) are applied to icons to signify interactivity.

---

## 2. Common Component Implementation
The various components across the site implement icons using a standardized pattern to ensure consistency.

### A. Navigation & Structural Icons
Used in `Navigation.svelte`, `Footer.svelte`, and `FeatureNav.svelte`.
- **Implementation:** Direct import and instantiation.
- **Styling:** Typically small (`w-4 h-4` or `w-5 h-5`) with `text-muted-foreground` or `text-foreground`.
- **State Management:** Active links often toggle the icon's background or color (e.g., in `FeatureNav`, active icons get a `bg-red-600 text-white` treatment).

### B. Feature Grid Icons
Used in `FeatureCard.svelte` and `FeatureGridCard.svelte`.
- **Implementation:** Icons are passed as props or mapped from IDs.
- **Styling Pattern:**
  - **Outer Container:** A gradient background (e.g., `bg-gradient-to-br from-red-600 to-red-700`).
  - **Inner Icon:** Always `text-white`, usually sized `w-6 h-6` or `w-7 h-7`.
  - **Interaction:** On hover, the container often scales (`hover:scale-105`) or gains a shadow (`hover:shadow-lg`).

### C. System & Feedback Icons
Used for real-time status and analytics within the application logic.
- **Components:** `Zap` (coaching tips), `Activity` (action detection), `Brain` (AI status), `TrendingUp` (performance metrics).
- **Styling:** Often high-contrast colors (Yellow for tips, Green for success, Blue for info).
- **Context:** Usually placed inside specific alert banners or dashboard widgets.

### D. Functional & UI Indicators (Inline SVGs)
For very simple, repetitive elements like arrows or checkmarks, inline SVGs are used instead of Lucide to reduce overhead.
- **Usage:** "Learn More" arrows, checkmarks in feature lists, macOS-style window controls (traffic lights).

---

## 3. Usage & Implementation Code
Here are common code patterns used throughout the site for icon implementation.

### A. Static Import & Usage
The most common way icons are used in Svelte components.
```svelte
<script>
  import { Sparkles, ArrowRight } from "lucide-svelte";
</script>

<!-- Simple Icon -->
<Sparkles class="w-5 h-5 text-red-500" />

<!-- Icon with Interaction -->
<button class="group flex items-center gap-2">
  Get Started
  <ArrowRight class="w-4 h-4 transition-transform group-hover:translate-x-1" />
</button>
```

### B. Dynamic Component Mapping
Used in feature grids or showcases where icons are part of a data array.
```svelte
<script>
  import * as Icons from "lucide-svelte";
  
  const features = [
    { title: "AI Setup", icon: Icons.Sparkles },
    { title: "Dashboard", icon: Icons.BarChart3 }
  ];
</script>

{#each features as feature}
  {@const Icon = feature.icon}
  <div class="card">
    <Icon class="w-6 h-6" />
    <span>{feature.title}</span>
  </div>
{/each}
```

### C. Glassmorphism Feature Icon
The standard pattern for high-fidelity feature highlights.
```svelte
<div class="relative group">
  <!-- Outer Halo Effect -->
  <div class="absolute -inset-2 bg-red-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
  
  <!-- Glass Container -->
  <div class="w-12 h-12 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 flex items-center justify-center">
    <Sparkles class="w-6 h-6 text-red-500" />
  </div>
</div>
```

---

## 3. Features Page Implementation Guide
The Features section (`/features`) and its sub-pages utilize icons to create a high-fidelity "Product Showcase" feel.

### A. Feature-to-Icon Mapping
The product highlights are mapped to specific Lucide icons consistently across the `FeaturesShowcase.svelte` and individual feature pages:

| Feature | Icon Component | Core Color |
| :--- | :--- | :--- |
| **AI Assistance** | `Sparkles` | Red |
| **Notetaker** | `MessageSquare` | Blue |
| **Follow-Up** | `Calendar` | Green |
| **Simulator** | `Users` | Purple |
| **Enterprise Ready** | `GitBranch` | Orange |
| **CRM Integration** | `BarChart3` | Blue |
| **Sentiment Analysis**| `Heart` | Pink |
| **Custom Goals** | `Settings` | Gray |

### B. The "Mock UI" Theme
In the `FeaturesShowcase.svelte` and individual sub-pages (e.g., `ai-assistance/+page.svelte`), icons are used to simulate a live application interface:
1. **The Halo Effect:** Icons are often wrapped in a "halo" wrapper:
   ```html
   <div class="relative">
       <div class="absolute -inset-1 bg-gradient-to-r from-red-600/20 via-purple-600/20 to-blue-600/20 rounded-full blur-2xl opacity-60 animate-pulse"></div>
       <Icon class="relative w-10 h-10 ..." />
   </div>
   ```
2. **Contextual Indicators:**
   - `Brain` or `Sparkles`: Represent AI logic, often with a `text-red-500` or `text-zinc-400` color.
   - `FileText`: Used for source references (e.g., "Enterprise_Security_Guide.pdf").
   - `Activity` / `TrendingUp`: Used in dashboard-style metrics and alerts.

### C. Animation & Feedback
- **Pulse:** Used on "Live" or "AI Active" indicators (e.g., `Sparkles class="animate-pulse"`).
- **Slide & Fly:** Icons are often part of a transition (e.g., `in:fly={{ y: 20 }}`) when switching between feature previews.
- **Group Hover:** Icons inside links/cards often trigger movement (e.g., `group-hover:translate-x-2`) on a sibling arrow icon.

## 4. Summary Theme Guide for Product Integration

To integrate these icons into the main product app, follow these tokens:

- **Icon Set:** Lucide.
- **Stroke Width:** 2px.
- **Base Size:** 16px (`w-4 h-4`) for secondary UI, 20px (`w-5 h-5`) for primary actions, 24-28px (`w-6-7`) for feature headers.
- **Glass Container:** `bg-white/5 backdrop-blur-md border border-white/10`.
- **Active State:** Solid gradient background (`from-accent-color to-accent-dark`).
- **Inactive State:** `text-muted-foreground` (roughly `zinc-400`).
- **Focus Color:** SpikedAI Red (`red-600` / `#DC2626`).
