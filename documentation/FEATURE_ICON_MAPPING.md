# Feature-to-Icon Mapping & Implementation Report

This report maps every SpikedAI feature to its designated icon set and provides implementation snippets for various themes used across the platform. Use this as a direct copy-paste reference for the main product app.

---

## 1. Master Feature Mapping

| Feature ID | Feature Name | Primary Icon | Sub-Feature Icons | Brand Color |
| :--- | :--- | :--- | :--- | :--- |
| `ai-assistance` | AI Assistance | `Sparkles` | `Brain`, `MessageSquare`, `FileText` | Red-600 |
| `notetaker` | Smart Notetaker | `MessageSquare` | `FileText`, `Brain`, `Zap` | Blue-600 |
| `followup` | Follow-Up Planner | `Calendar` | `FileText`, `Brain`, `CheckCircle2` | Green-600 |
| `simulator` | Call Simulator | `Users` | `Users`, `Target`, `TrendingUp` | Purple-600 |
| `dev-tools` | Enterprise Ready | `GitBranch` | `GitBranch`, `Activity`, `Settings` | Orange-600 |
| `crm` | CRM Integration | `BarChart3` | `BarChart3`, `Zap`, `TrendingUp` | Blue-500 |
| `sentiment` | Sentiment Analysis | `Heart` | `Heart`, `TrendingUp`, `Activity` | Pink-500 |
| `custom-goals` | Custom Goals | `Target` | `Target`, `Settings`, `TrendingUp` | Gray-600 |

---

## 2. Universal Themes & Code Snippets

### Theme A: The High-Fidelity "Surface" Icon
Used for feature headers and "sticky" navigation elements. Focuses on depth and glow.

**Visual characteristics:** Glass container, semi-transparent border, subtle drop shadow.

```svelte
<!-- Implementation: src/lib/components/FeatureShowcaseHeader.svelte -->
<div class="relative group">
    <!-- Glow Effect -->
    <div class="absolute -inset-1 bg-gradient-to-r from-red-600/30 to-purple-600/30 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
    
    <!-- Icon Container -->
    <div class="relative w-14 h-14 bg-card/80 backdrop-blur-md rounded-xl border border-zinc-800 flex items-center justify-center">
        <IconComponent class="w-7 h-7 text-red-500" />
    </div>
</div>
```

### Theme B: The "Product Grid" Icon
Used in `FeaturesGrid`. Focuses on bold accessibility and category identification.

**Visual characteristics:** Solid gradient background, pure white icon, high contrast.

```svelte
<!-- Implementation: src/routes/features/+page.svelte -->
<div class="w-14 h-14 rounded-xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center shadow-lg">
    <IconComponent class="w-7 h-7 text-white" />
</div>
```

### Theme C: The "Internal Feature" List Icon
Used within detail pages to list sub-capabilities. Focuses on hierarchy and clarity.

**Visual characteristics:** Small, consistent stroke weight, often uses a secondary brand color.

```svelte
<!-- Implementation: src/routes/features/[slug]/+page.svelte -->
<div class="flex items-center gap-3 mb-2">
    <SubIcon class="w-5 h-5 text-red-500" />
    <span class="font-bold text-sm uppercase tracking-wide">{subFeatureTitle}</span>
</div>
<p class="text-zinc-400 text-sm">{description}</p>
```

---

## 3. Feature-Specific Implementations

### AI Assistance (The "Sparkle" Theme)
**Primary Context:** Intelligence and live generation.
```svelte
<script>
    import { Sparkles, Brain, MessageSquare } from "lucide-svelte";
</script>

<!-- Status Indicator -->
<div class="flex items-center gap-2 px-3 py-1 bg-red-950/40 border border-red-900/50 rounded-full">
    <div class="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
    <span class="text-xs font-medium text-red-400">AI LISTENING</span>
</div>

<!-- Copilot Header -->
<div class="flex items-center gap-2">
    <Brain class="w-4 h-4 text-red-500" />
    <h5 class="text-xs font-bold">AI Copilot</h5>
</div>
```

### Smart Notetaker (The "Timeline" Theme)
**Primary Context:** Capture and documentation.
```svelte
<script>
    import { MessageSquare, FileText, Zap } from "lucide-svelte";
</script>

<!-- Action Detection Alert -->
<div class="bg-blue-950/40 border border-blue-900/60 rounded-xl p-3">
    <Zap class="w-4 h-4 text-blue-500 mb-2" />
    <span class="text-[10px] font-bold text-blue-400">ACTION ITEM DETECTED</span>
</div>
```

### Sentiment Analysis (The "Heart" Theme)
**Primary Context:** Emotional intelligence and buying signals.
```svelte
<script>
    import { Heart, Activity, TrendingUp } from "lucide-svelte";
</script>

<!-- Buying Signal Card -->
<div class="p-4 bg-pink-900/10 border border-pink-900/20 rounded-xl">
    <Heart class="w-5 h-5 text-pink-500" />
    <span class="text-pink-400 font-bold">Buying Intent: High</span>
</div>
```

---

## 4. Summary for Developers

1. **Hierarchy:** Level 1 (Features Grid) = Solid Gradient. Level 2 (Feature Header) = Glass Glow. Level 3 (Feature Details) = Plain Color.
2. **Animation:** Use `animate-pulse` for any icon representing "Live" or "Real-time" activity.
3. **Consistency:** Always use `w-x h-x` Tailwind classes to ensure Lucide icons retain their stroke weight across different contexts.
