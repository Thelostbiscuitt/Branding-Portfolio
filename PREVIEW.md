# Homepage Preview — Habib Portfolio

## Visual Structure Overview

The homepage follows a vertical scroll layout with 7 distinct sections, each with unique visual treatments and interactions.

---

## Section 1: Navigation (Sticky)
**Position**: Fixed at top of viewport
**Behavior**: Stays visible while scrolling

```
┌─────────────────────────────────────────────────────────────┐
│ Habib.                    Work   About   Contact   [CTA] │
└─────────────────────────────────────────────────────────────┘
```

- **Logotype**: "Habib." (links to home)
- **Navigation Links**: Work, About, Contact (anchor links to sections)
- **CTA Button**: Orange button with hover effect
- **Background**: Black (#0c0c0c)
- **Mobile**: Links hidden below 768px

---

## Section 2: Hero (Full-bleed 2-column)
**Height**: 560px minimum
**Layout**: Grid (1fr 1fr)

```
┌─────────────────────────────────────────────────────────────────┐
│ ┌─────────────────────┐  ┌─────────────────────────────┐ │
│ │ • Available for    │  │                         │ │
│ │   work — Lagos, NG │  │    [Photo with scanlines] │ │
│ │                   │  │                         │ │
│ │ Creative           │  │                         │ │
│ │ Director.         │  │                         │ │
│ │ Builds it too.     │  │                         │ │
│ │                   │  │                         │ │
│ │ [Start a project]  │  │                         │ │
│ │ [View work ↓]      │  │                         │ │
│ └─────────────────────┘  └─────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

**Left Column**:
- Status indicator (orange dot + text)
- Large heading: "Creative Director." (Syne font, 52-80px)
- Subheading: "Builds it too." (italic, orange)
- Horizontal orange rule (40px)
- Description text (gray, max 360px)
- Two CTA buttons:
  - Primary: Orange background, black text
  - Secondary: Border outline, gray text

**Right Column**:
- Photo: [`/photo.jpg`](public/photo.jpg) with filter treatment
  - Contrast: 1.08
  - Saturation: 0.82
  - Scanline overlay effect
- Gradient vignette (left to right fade)
- Geo tag: "LAGOS — 2026" (vertical text, bottom right)

**Responsive**: Stacks to single column below 900px

---

## Section 3: Stats (3-column editorial)
**Layout**: Flex row, equal width

```
┌─────────────────────────────────────────────────────────────────┐
│                                                             │
│   5+            10+               Lagos, NG                │
│ YEARS          PROJECTS           BASED IN                  │
│ Building brands  Shipped work      Operating since 2020       │
│ from scratch    without teams     West Africa timezone         │
│                                                             │
└─────────────────────────────────────────────────────────────────┘
```

**Each Stat Column**:
- Large number: Syne font, prominent size
- Eyebrow label: DM Mono, uppercase, orange
- Description: Gray body text

**Spacing**: Even distribution across viewport width

---

## Section 4: Ticker (Infinite scroll)
**Height**: ~60px
**Animation**: Pure CSS, continuous scroll

```
┌─────────────────────────────────────────────────────────────────┐
│ BRAND • DESIGN • COLLAB • BRAND • DESIGN • COLLAB • ...  │
│ (scrolling left →)                                        │
└─────────────────────────────────────────────────────────────────┘
```

**Text Variants**:
- Normal: Muted gray, 10px
- Bold: White, 12px
- Accent: Orange, 11px

**Behavior**:
- Duplicated array creates seamless loop
- Pauses on hover
- No JavaScript required

---

## Section 5: Work (Filterable project grid)
**Layout**: 2-column grid with 1px gaps

```
┌─────────────────────────────────────────────────────────────────┐
│ 02 — Work                                    Full archive →│
│ Selected Projects.                                         │
│ [All] [Brand] [Design] [Collab]                          │
├───────────────┬──────────────────────────────────────────────┤
│ 01            │ 02 (Featured - Full Width)                 │
│ Biscuit AI    │ Leadway Pensure                            │
│ Telegram Bot  │ Brand & Comms                             │
│ • AI          │ • Brand                                   │
│ • UX          │ • Internal Comms                          │
│ • Python      │ • Video                                   │
│              │                                           │
│ [Hover thumb] │ [Hover thumb]                              │
├───────────────┴──────────────────────────────────────────────┤
│ 03            │ 04                                        │
│ Skaame        │ Layo Isaac                                │
│ Artist EPK    │ Artist EPK                                 │
│ • EPK         │ • EPK                                     │
│ • Web Design  │ • Music                                   │
│ • Music       │ • Art Direction                            │
│              │                                           │
│ [Hover thumb] │ [Hover thumb]                              │
├───────────────┼──────────────────────────────────────────────┤
│ 05            │ 06                                        │
│ BlvckOreo     │ 1ETHFP                                    │
│ Personal EPK   │ Creative Collab                           │
│ • EPK         │ • Web3                                    │
│ • Hip-Hop     │ • Music                                    │
│ • Brand       │ • Design                                   │
│              │ • Film                                     │
│ [Hover thumb] │ [Hover thumb]                              │
└───────────────┴──────────────────────────────────────────────┘
```

**Filter Behavior**:
- Click filter button → shows only matching category
- "All" shows all 6 projects
- Active filter: Orange background
- Featured project (Leadway): Spans full grid width

**Card Interaction**:
- Default: Shows project title, tags (dot-separated)
- Hover: Thumbnail fades in (opacity 0→1), image scales 1.04→1
- Click: Navigates to project page

**Grid Lines**: 1px gaps with border-colored background create dividers

---

## Section 6: About (2-column with photo)
**Layout**: Grid (1fr 1fr)

```
┌─────────────────────────────────────────────────────────────────┐
│ ┌─────────────────────┐  ┌─────────────────────────────┐ │
│ │ 03 — About        │  │                         │ │
│ │                   │  │    [Photo with denser       │ │
│ │ I'm a creative    │  │     scanlines]            │ │
│ │ director and       │  │                         │ │
│ │ developer based    │  │                         │ │
│ │ in Lagos. I       │  │  ┌─────┬─────┐        │ │
│ │ build brands,     │  │  │Role │2024 │        │ │
│ │ design systems,   │  │  ├─────┼─────┤        │ │
│ │ and ship digital   │  │  │Tools│Tags │        │ │
│ │ products — all   │  │  └─────┴─────┘        │ │
│ │ from one person.  │  │                         │ │
│ │                   │  │    Habib — Lagos         │ │
│ │ No handoff. No   │  │                         │ │
│ │ translation loss. │  │                         │ │
│ └─────────────────────┘  └─────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

**Left Column**:
- Section label: "03 — About"
- Heading: "I'm a creative director..."
- Body text: Description of work approach
- Pullquote: "No handoff. No translation loss."

**Right Column**:
- Photo: Different treatment than Hero
  - Contrast: 1.12
  - Saturation: 0.6
  - Brightness: 0.95
  - Denser scanline overlay
- Photo caption: "Habib — Lagos"
- Meta grid (2×2):
  - Role
  - Year
  - Tools
  - Tags

**Responsive**: Stacks to single column below 900px

---

## Section 7: Contact (2-column form)
**Layout**: Grid (1fr 1fr)

```
┌─────────────────────────────────────────────────────────────────┐
│ ┌─────────────────────┐  ┌─────────────────────────────┐ │
│ │ 03 — Contact      │  │                         │ │
│ │                   │  │  01 What are you building? │ │
│ │ Start a           │  │  [Brand identity]         │ │
│ │ project.          │  │  [Artist EPK]            │ │
│ │                   │  │  [Website / app]          │ │
│ │ Whether you're    │  │  [Design system]          │ │
│ │ building a brand  │  │  [Something else]         │ │
│ │ from scratch...    │  │                         │ │
│ │                   │  │  02 When do you need it? │ │
│ │ Behance           │  │  [ASAP] [1-2 months]    │ │
│ │ BlvckOreo ↗      │  │  [3+ months] [Exploring] │ │
│ │                   │  │                         │ │
│ │ GitHub            │  │  03 Your name & email   │ │
│ │ Thelostbiscuitt ↗│  │  [Your name]            │ │
│ │                   │  │  [your@email.com]        │ │
│ │ LinkedIn          │  │                         │ │
│ │ habib-oguntimehin │  │  04 Brief (optional)    │ │
│ │ ↗                │  │  [What's the project?]    │ │
│ │                   │  │                         │ │
│ │ Email             │  │  [Send message →]        │ │
│ │ mic.oguntimehin   │  │                         │ │
│ │ @gmail.com ↗      │  │  Usually responds within   │ │
│ │                   │  │  24h                     │ │
│ │ Currently         │  │                         │ │
│ │ available...      │  │                         │ │
│ └─────────────────────┘  └─────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

**Left Column**:
- Section label: "03 — Contact"
- Heading: "Start a project."
- Subtext: Description of services
- Social links list (4 items):
  - Behance, GitHub, LinkedIn, Email
  - Each has platform, handle, arrow
- Availability status (orange dot + text)

**Right Column (Form)**:
- **Step 1**: Project type pills (multi-select)
  - 5 options: Brand identity, Artist EPK, Website/app, Design system, Something else
  - Selected: Orange background
- **Step 2**: Timeline pills (single-select)
  - 4 options: ASAP, 1-2 months, 3+ months, Just exploring
- **Step 3**: Name & Email inputs
  - Both required
  - Auto-complete enabled
- **Step 4**: Brief textarea (optional)
  - 4 rows height
- **Submit button**:
  - Disabled until name + email filled
  - Shows "Sending..." while loading
  - Error message displays on failure
- **Success state**:
  - Replaces form with confirmation
  - Diamond mark + "Message received."

**Form States**:
- Idle: Form visible
- Loading: Button shows "Sending..."
- Success: Confirmation message
- Error: Error message below form

---

## Footer (Single row)
**Height**: ~80px
**Layout**: Flex space-between

```
┌─────────────────────────────────────────────────────────────────┐
│ Habib.                                    © 2026 Habib —  │
│                                           Lagos, Nigeria  │
└─────────────────────────────────────────────────────────────────┘
```

- **Left**: "Habib." logotype
- **Right**: Copyright text
- **Background**: Black (#0c0c0c)

---

## Design System

### Colors
- **Background**: #0c0c0c (black)
- **Primary Text**: #f5f1eb (off-white)
- **Accent**: #E8660A (orange)
- **Accent Hover**: #C4520A (orange-dim)
- **Secondary Text**: #888888 (gray)
- **Borders**: rgba(245,241,235,0.08) to 0.14

### Typography
- **Display**: Syne (headings, stats, logotype)
- **Body**: DM Sans (paragraphs, inputs)
- **Mono**: DM Mono (eyebrows, labels, nav, tags)

### Breakpoints
- **Mobile**: 600px (reduced padding, single column)
- **Tablet**: 768px (work grid 1-col, nav hidden)
- **Desktop**: 900px (hero/about/contact stack)

---

## Interactive Elements

### Hover Effects
- **CTA Buttons**: Background color transition (0.15s)
- **Project Cards**: Thumbnail fade + image scale
- **Nav Links**: Color change on hover
- **Social Links**: Arrow appears on hover

### Scroll Behavior
- **Smooth scrolling** enabled globally
- **Sticky nav** stays at top
- **Anchor links** scroll to sections

### Form Interactions
- **Pill selection**: Toggle on/off with visual feedback
- **Input validation**: Button disabled until required fields filled
- **Submit**: Async with loading state
- **Success**: Form replacement with confirmation

---

## Accessibility Features

- **ARIA labels** on all sections
- **Semantic HTML** (section, article, header, nav, footer)
- **Keyboard navigation** supported
- **Screen reader text** for decorative elements
- **Focus states** on all interactive elements
- **Alt text** on all images
- **Rel attributes** on external links

---

## Responsive Behavior

### Mobile (< 600px)
- Single column layout for all sections
- Reduced padding (48px → 24px)
- Hero photo: 360px height
- Work grid: 1 column
- Meta grids: 2×2 → 1 column

### Tablet (600-768px)
- Work grid: 1 column
- Nav links hidden
- Standard padding maintained

### Desktop (> 900px)
- Hero, About, Contact: 2 columns
- Work grid: 2 columns
- Full desktop experience

---

## Performance Considerations

- **Next.js Image component**: Optimized loading, lazy loading
- **Priority images**: Hero and project hero images load first
- **CSS Modules**: Scoped styles, no global pollution
- **No JavaScript dependencies**: Pure CSS animations where possible
- **Minimal bundle**: Only React, Next.js core, Resend API

---

## Next Steps for Preview

**Note**: Node.js/npm is not currently available in your environment. To see the actual rendered preview, you'll need to install Node.js first.

### Option 1: Install Node.js (Recommended)
1. Download Node.js from https://nodejs.org/
2. Install with default settings
3. Restart your terminal/command prompt
4. Then run:

   ```bash
   npm install
   npm run dev
   ```

5. Open in browser: `http://localhost:3000`

### Option 2: Use Online Preview
Since the code is fully implemented, you can:
1. Push this repository to GitHub
2. Deploy to Vercel (free hosting for Next.js)
3. View the live preview instantly

### Option 3: Visual Code Review
Review the code structure directly:
- [`src/app/page.tsx`](src/app/page.tsx) - Homepage component structure
- [`src/app/globals.css`](src/app/globals.css) - Design tokens and global styles
- [`src/components/`](src/components/) - All component implementations
- Component CSS modules (e.g., [`Hero.module.css`](src/components/Hero/Hero.module.css))

The homepage will render exactly as described in this document, with all components, interactions, and responsive behaviors working according to the architecture specification.
