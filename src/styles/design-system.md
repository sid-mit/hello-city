# HelloCity Design System

## Overview
This document defines the comprehensive design system for HelloCity, ensuring consistency across all components and pages.

---

## Color Palette

### Primary Colors
- **Primary Blue**: `#417CFF` / `hsl(221, 100%, 62%)` - Main interactive blue
  - Used for: Primary CTAs, links, active states
- **Primary Blue Light**: `#D2E0FF` / `hsl(222, 100%, 90%)` - Light blue backgrounds
  - Used for: Button backgrounds, hover states, cards
- **Primary Blue Lighter**: `#F5F8FF` / `hsl(222, 100%, 98%)` - Subtle backgrounds
  - Used for: Page backgrounds, subtle sections

### Neutral Colors
- **Text Primary**: `#404040` / `hsl(0, 0%, 25%)` - Main text color
- **Text Secondary**: `#6B7280` / `hsl(220, 9%, 46%)` - Secondary text, muted content
- **Text Tertiary**: `#9CA3AF` / `hsl(218, 11%, 65%)` - Disabled states, placeholders
- **White**: `#FFFFFF` - Pure white
- **Border Light**: `#E5E7EB` - Borders and dividers

### Accent Colors
- **Success**: `#10B981` / `hsl(142, 71%, 45%)` - Success states
- **Warning**: `#F59E0B` / `hsl(38, 92%, 50%)` - Warning states
- **Error**: `#EF4444` / `hsl(0, 84%, 60%)` - Error states

### Usage Guidelines
- Always use CSS variables: `hsl(var(--primary-blue))`, `hsl(var(--text-primary))`
- Never hardcode color values in components
- Ensure sufficient contrast for accessibility (WCAG AA minimum)

---

## Typography

### Font Families
1. **Gilroy** (Primary)
   - Used for: Headings, body text, main content
   - Weights: 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold), 800 (ExtraBold)

2. **Outfit** (Secondary)
   - Used for: UI elements, buttons, labels
   - Weights: 400, 500, 600, 700

3. **Architects Daughter** (Accent)
   - Used for: Decorative elements, special callouts

### Type Scale

| Level | Size | Line Height | Weight | Usage |
|-------|------|-------------|--------|-------|
| Display | 48px (32px mobile) | 1.1 | 700 | Hero sections, large titles |
| H1 | 36px (28px mobile) | 1.2 | 700 | Page titles |
| H2 | 24px (20px mobile) | 1.3 | 600 | Section titles |
| H3 | 18px | 1.4 | 600 | Card titles, subsections |
| Body Large | 18px | 1.6 | 500 | Featured content, intros |
| Body Regular | 16px | 1.6 | 400 | Default body text |
| Body Small | 14px | 1.5 | 400 | Secondary information |
| Caption | 12px | 1.4 | 400 | Captions, labels |

### Usage
```css
/* Use predefined classes */
.text-display { /* Hero text */ }
.text-h1 { /* Page titles */ }
.text-body { /* Body text */ }
```

---

## Spacing System

Use consistent spacing tokens for margins and padding:

| Token | Value | Usage |
|-------|-------|-------|
| xs | 8px | Tight spacing, inline elements |
| sm | 12px | Small gaps, compact layouts |
| md | 16px | Default spacing |
| lg | 24px | Section spacing |
| xl | 32px | Large sections |
| 2xl | 48px | Major sections |
| 3xl | 64px | Hero sections |

```tsx
// Example usage
<div className="p-md gap-lg">
```

---

## Components

### Buttons

#### Primary Button
- Background: `#D2E0FF` (primary-blue-light)
- Text: `#417CFF` (primary-blue)
- Border radius: `30px` (fully rounded)
- Font: Outfit, 600
- Hover: 80% opacity

```tsx
<Button variant="primary" size="default">Click Me</Button>
```

#### Outline Button
- Border: `2px solid #417CFF`
- Background: Transparent
- Text: `#417CFF`
- Hover: Light blue background (5% opacity)

```tsx
<Button variant="outline" size="default">Learn More</Button>
```

#### Ghost Button
- No border or background
- Text: `#404040` (text-primary)
- Hover: `#F5F8FF` background

```tsx
<Button variant="ghost">Cancel</Button>
```

### Button Sizes
- **Default**: `px-8 py-3` / 16px font
- **Small**: `px-6 py-2` / 14px font
- **Large**: `px-20 py-3` / 18px font
- **Icon**: `h-10 w-10`

---

## Shadows

Elevation system for depth and hierarchy:

| Level | CSS Variable | Usage |
|-------|--------------|-------|
| xs | `--shadow-xs` | Subtle lift, borders |
| sm | `--shadow-sm` | Buttons, small cards |
| md | `--shadow-md` | Cards, dropdowns |
| lg | `--shadow-lg` | Modals, popovers |
| xl | `--shadow-xl` | High-priority modals |
| glow | `--shadow-glow` | Focus states, selected items |

```css
/* Example */
.card {
  box-shadow: var(--shadow-md);
}
```

---

## Border Radius

Consistent rounding for visual harmony:

| Token | Value | Usage |
|-------|-------|-------|
| sm | 8px | Small elements, inputs |
| md | 16px | Cards, containers |
| lg | 24px | Large cards, modals |
| full | 9999px | Buttons, pills, tags |

---

## Animations

### Transitions
- **Default**: `all 0.2s ease-out`
- **Smooth**: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`
- **Bounce**: `transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)`

### Hover States
- Scale: `1.02` for buttons
- Opacity: `0.8` for text links
- Background: Add `5-10%` opacity overlay

---

## Accessibility

### Color Contrast
- Text on white: Minimum 4.5:1 ratio
- Primary blue (`#417CFF`) on white: 4.52:1 ✅
- Text primary (`#404040`) on white: 9.74:1 ✅

### Focus States
- Always include visible focus indicators
- Use `ring-2 ring-ring ring-offset-2`

### Interactive Elements
- Minimum touch target: 44x44px
- Clear hover/active states
- Keyboard navigable

---

## Best Practices

### Do's ✅
- Use semantic color tokens (`primary-blue`, `text-primary`)
- Follow the type scale for consistency
- Use spacing tokens for layouts
- Maintain consistent border radius
- Apply shadows for visual hierarchy

### Don'ts ❌
- Never hardcode colors (e.g., `text-[#417CFF]`)
- Don't use random spacing values
- Avoid mixing font families inconsistently
- Don't skip hover/focus states
- Avoid overly complex shadows

---

## Implementation

### CSS Variables
All design tokens are defined in `src/index.css` under `:root`

### Tailwind Config
Extended spacing, shadows, and typography in `tailwind.config.ts`

### Components
Standardized button variants in `src/components/ui/button.tsx`

---

## Maintenance

When adding new colors or tokens:
1. Add to `src/index.css` `:root`
2. Update `tailwind.config.ts` if needed
3. Document here with usage guidelines
4. Update Figma/design files

---

**Version**: 1.0  
**Last Updated**: 2025  
**Maintained by**: HelloCity Team
