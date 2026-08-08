# Rajasthani Wedding Invitation — Foundation & Scene Framework

Stage 1 builds the world the 11 scenes will live in: the royal design system, the scene engine, navigation, chapter menu, and the transition system. All 11 scenes get created as real routed scenes with correct composition scaffolding, ambient shell, and placeholder content — the detailed per-scene experiences come in later stages, one section at a time.

## What gets built

**Design system (Rajasthani royal)**
- Palette as semantic tokens: warm ivory, deep maroon, sandstone, antique gold, plus muted emerald, royal blue, terracotta accents. Gold reserved for accents only.
- Typography: Cormorant Garamond (display serif), Manrope (supporting sans), one signature script for occasional accents. Loaded via `<link>` in the root route.
- Texture and ornament layer: sandstone grain, handmade-paper tint, jaali pattern, film grain — all as CSS/SVG, no heavy images.
- Reusable ornaments as SVG components: jharokha arch, jaali panel, corner flourish, divider rule, gold thread stroke.

**Scene engine**
- Single full-screen route (`/`) — no vertical scrolling, one scene active at a time, `100svh` layout with safe-area padding.
- Scene manager holds current index, direction (forward/back), and transition phase (`exit → transition → enter`), and only mounts current + neighbouring scenes.
- Motion: GSAP for scene timelines, CSS for ambient movement. Every timeline respects `prefers-reduced-motion` by collapsing to instant reveals with content fully visible.

**Navigation**
- Top bar: `ROHAN × ANANYA` with `04 / 11` progress; tapping progress opens the chapter menu.
- Bottom bar: contextual `← PREVIOUS NAME` / `NEXT NAME →` labels driven by scene data.
- Chapter menu: full-screen jaali-framed panel listing all 11 chapters with direct jump. Swipe left/right also moves between scenes.
- Touch-first: no hover-dependent behaviour, large targets, no accidental scroll.

**Transition system**
- A transition engine that maps each scene pair to a named transition rather than one generic slide: golden light sweep, jharokha reveal, curtain, ornamental line draw, thread transform, envelope fold, light-to-star.
- Stage 1 ships each named transition in a working baseline form (light/ornament/curtain layers), with hooks so later stages can hand off a specific object from one scene into the next.

**Scenes (scaffolded)**
All 11 scenes exist with their scene identity, correct royal framing, ambient layer, placeholder headline/content, and wired transitions: Opening, Welcome, Couple, Gallery, Our Story, Family Tree, Countdown, Ceremonies & Venue, RSVP, Blessing Wall, Thank You.

**Content data**
- Single config module holding couple, welcome (guest name, quote, message), gallery, story, family, countdown date, ceremonies, RSVP, blessings, thank-you message. No couple details hardcoded inside visual components.
- RSVP acceptance and blessings stay local/static — no backend in this stage.

**Placeholder art**
Generated Rajasthani-style illustrated stand-ins (couple portrait, a few gallery frames, palace night backdrop) saved into the project, easy to swap for real photos later.

**Performance**
Only current + adjacent scenes rendered, per-scene lazy asset loading with next-scene preload, transform/opacity-only animation, low particle counts, no WebGL.

## Technical notes
- Adds `gsap`. Everything else uses existing React 19 / TanStack Start / Tailwind v4 setup.
- Tokens live in `src/styles.css` under `@theme inline`; no hardcoded colour utilities in components.
- Structure: `src/wedding/data/`, `src/wedding/engine/` (SceneManager, TransitionEngine, useScene), `src/wedding/ui/` (Navigation, ChapterMenu, ornaments, ambient layers), `src/wedding/scenes/01-opening` … `11-thankyou`.
- Home route `/` renders the experience; deep-linkable chapter via a search param so a scene can be shared.
- Route `head()` gets wedding-specific title, description, and og/twitter metadata.

## Next stages
Section-by-section builds, starting with 01 Opening (curtains, tap-to-enter, name reveal) then 02 Welcome, each following its detailed PRD.
