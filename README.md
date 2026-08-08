# Royal Wedding Chronicle

Rajasthani Interactive Wedding Invitation

1. Project Vision

Build a premium, mobile-first interactive wedding invitation inspired by the visual richness of a royal Rajasthani wedding.

The experience should feel like entering a beautifully crafted wedding world rather than browsing a conventional website.

Core principle:

The scene itself is the UI.

Use animated environments, photographs, traditional motifs, lighting, depth, transitions, and touch interactions to create a memorable experience.

2. Overall Experience

The invitation contains 11 full-screen sections:

01. Opening Animation

02. Welcome

03. Couple

04. Gallery

05. Our Story

06. Family Tree

07. Countdown

08. Ceremonies & Venue

09. RSVP

10. Blessing Wall

11. Thank You

Navigation model

There is NO vertical scrolling between sections.

Users move through the experience using:

Next

Previous

Persistent chapter/navigation bar

Direct section selection

Only one section is active at a time.

Each section should feel like a separate cinematic scene, while transitions connect them into one continuous experience.

3. Mobile-First Requirement

The entire experience must be designed mobile-first.

Primary target:

360–430px viewport width

Desktop should be an enhanced version of the mobile composition, not the design foundation.

Requirements

Touch-first interactions

No hover-dependent functionality

No accidental horizontal/vertical scrolling

Comfortable touch targets

Responsive typography

Animations optimized for mobile

100svh scene layout

Respect prefers-reduced-motion

4. Visual Direction

The design should communicate:

Royal + Elegant + Cinematic + Traditional + Modern

Avoid making it look like:

A generic Indian wedding template

A colorful festival website

A traditional static invitation

A 3D game

A collection of cards

The Rajasthani influence should be present through visual language, not excessive decoration.

5. Rajasthani Design System

Color Palette

Primary:

Warm Ivory

Deep Maroon

Sandstone

Antique Gold

Secondary accents:

Muted Emerald

Royal Blue

Terracotta

Gold should be used as a premium accent, not everywhere.

Textures

Use subtle inspiration from:

Sandstone

Traditional textiles

Bandhani

Leheriya

Handcrafted paper

Jaali patterns

Brass

Mirror work

Architectural Inspiration

Use elements inspired by:

Jharokhas

Palace arches

Jaali windows

Royal doors

Courtyards

Ornamental frames

These should be incorporated into the UI subtly.

6. Typography

Use a consistent typography hierarchy across the entire invitation.

Display

Elegant luxury serif such as:

Cormorant Garamond

Bodoni Moda

Playfair Display

Supporting

Clean modern sans-serif:

Inter

Manrope

Accent

One elegant handwritten/signature font for occasional decorative phrases.

Typography should feel editorial and royal, not overly decorative.

7. Interactive Scene System

Every section should be treated as a scene, not a webpage.

Each scene has:

ENTER

 ↓

MAIN EXPERIENCE

 ↓

USER INTERACTION

 ↓

AMBIENT ANIMATION

 ↓

EXIT

 ↓

TRANSITION

 ↓

NEXT SCENE

Animations should have a clear purpose.

Examples:

Curtains physically open.

Portrait frames move into position.

Photographs respond to touch.

Golden thread draws the story.

Family connections form.

Clock mechanisms move.

Invitation opens.

Blessings become ornaments.

8. Animation Philosophy

The experience should contain rich animation, but not random animation.

Use:

Transformations

Parallax

Layered depth

Light movement

SVG drawing

Object reveals

Image transitions

Soft particles

Physical-feeling movement

Cinematic scene transitions

Avoid:

Excessive bouncing

Generic fade-ins everywhere

Constant particle effects

Heavy 3D

Long animations that block content

Animation priority

Meaningful interaction

      >

Scene transition

      >

Ambient movement

      >

Decorative animation

9. Navigation System

The navigation should remain minimal and elegant.

Top

Show couple identity + progress:

ROHAN × ANANYA       04 / 11

Bottom

Show contextual navigation:

← COUPLE                OUR STORY →

The section names should change according to the current scene.

Chapter Menu

Tapping the progress indicator opens a chapter navigation panel containing all 11 sections.

The user can jump directly to any section.

10. Scene Transitions

Transitions should connect scenes visually.

Possible transition language:

Golden light sweep

Jharokha reveal

Curtain transition

Ornamental line drawing

Photograph transformation

Golden thread transformation

Petal movement

Paper/envelope transformation

Light-to-star transformation

Do not use one generic slide transition for every section.

Where possible, an object from the current scene should become something in the next scene.

Example:

Family Tree connection

        ↓

Golden circle

        ↓

Countdown clock

This creates continuity.

11. Technical Direction

Recommended stack:

React

GSAP for major animation timelines

CSS for lightweight animations

SVG for ornaments, lines and diagrams

Optimized image/video assets

Avoid introducing heavy technologies unless there is a clear requirement.

Component architecture

Conceptually:

WeddingExperience

├── SceneManager

├── Navigation

├── ChapterMenu

├── TransitionEngine

│

├── Opening

├── Welcome

├── Couple

├── Gallery

├── Story

├── Family

├── Countdown

├── Ceremonies

├── RSVP

├── Blessings

└── ThankYou

Wedding content should be data-driven, separate from the visual components.

12. Performance

Performance is a major requirement because the experience is animation-heavy.

Required

WebP/AVIF images

Compressed WebM/MP4 videos

Lazy-load section assets

Preload current + next scene assets

Avoid rendering unnecessary off-screen content

Prefer GPU-friendly transform and opacity

Keep particle counts low

Avoid unnecessary WebGL/Three.js

Optimize fonts

Avoid large uncompressed background images

The invitation should feel smooth even on mid-range mobile devices.

13. Content Architecture

The template must support configurable wedding content.

The visual components should not hardcode couple-specific information.

Conceptually:

couple

welcome

gallery

story

family

countdown

ceremonies

rsvp

blessings

Current fixed requirements

Welcome

Guest Name

Welcome Quote

Welcome Message

RSVP

Accept Invitation

Do not invent additional fields unless explicitly required later.

14. Accessibility & UX

Despite the visual complexity, the invitation must remain easy to use.

Users should always understand:

Where am I?

What can I interact with?

How do I continue?

Important content must never depend entirely on an animation.

Provide reduced-motion behavior and accessible text/buttons.

15. Overall Creative Direction

The final experience should feel like:

A royal Rajasthani wedding brought to life through interactive scenes.

Not:

A normal website with Rajasthani decorations.

The user should move through a sequence of visually distinct, highly interactive scenes, with a consistent royal design system and meaningful transitions connecting everything together.

16. Section Planning

The 11 sections are intentionally not being fully designed in this overall PRD.

We will design them one by one in the next stage.

For each section, the detailed PRD will define:

Scene composition

Main visual concept

Objects/elements

Content placement

Rajasthani styling

Animation sequence

Interaction

Mobile behavior

Transition from previous section

Transition to next section

Performance considerations

This document establishes only the global foundation.

01 — OPENING ANIMATION

“Glimpse of Our Forever”

Purpose

Create the first wow moment of the invitation and immediately establish the royal Rajasthani aesthetic.

It should feel like the guest is entering the wedding, not opening a website.

Main Scene

The screen starts almost completely dark.

Two large royal Rajasthani curtains occupy the left and right sides.

Behind them, a warm golden glow is visible.

┌──────────┐      ┌──────────┐

│          │      │          │

│ CURTAIN  │  ✦   │ CURTAIN  │

│          │      │          │

│          │      │          │

└──────────┘      └──────────┘

Curtains should have:

Rich textile texture

Embroidery-inspired borders

Deep maroon tones

Subtle gold detailing

Realistic folds and shadows

Initial Interaction

Show a very subtle:

Tap to Enter

The instruction should feel like part of the scene, not a normal button.

On desktop, mouse click should perform the same action.

Opening Animation

When the user taps/clicks:

Curtains begin opening

        ↓

Golden light becomes stronger

        ↓

Subtle marigold petals appear

        ↓

Couple names reveal

        ↓

Decorative golden elements draw

        ↓

"Glimpse of Our Forever"

        ↓

Scene settles

The curtain movement should feel heavy and physical, not like two HTML panels simply sliding sideways.

Couple Reveal

After the curtains open, reveal:

ROHAN

×

ANANYA

Use the primary luxury serif typography.

The names should appear through a soft golden/ink-like reveal.

A thin ornamental line can draw underneath.

Title

Then reveal:

Glimpse of Our Forever

Optional small label:

A Rajasthani Wedding Celebration

Keep this subtle.

The title should be the final focus of the opening.

Ambient Animation

After the main animation finishes, keep the scene subtly alive:

A few marigold petals drifting down

Very subtle floating dust

Soft golden light movement

Slight fabric movement on the curtains

Extremely subtle film grain

Do not continuously generate large numbers of particles.

Interaction Rules

The opening should not require interaction to understand the invitation.

After the initial interaction:

Let the animation play automatically.

Provide a small Skip option.

Skip should immediately transition to Welcome.

Don't force the guest to wait several seconds.

Target duration:

~3–5 seconds

Mobile First

Primary design target:

360–430px

On mobile:

Curtains fill the viewport.

Keep the couple names inside the safe area.

Tap interaction must work reliably.

No scrolling.

Animation must remain smooth on mid-range devices.

Desktop can increase the curtain width, lighting and depth but should preserve the same composition.

Transition → Section 02

Do not hard-cut to Welcome.

The opening should visually transform into the next scene.

When the curtains finish opening:

Opening

   ↓

Golden light remains

   ↓

Curtains move toward edges

   ↓

Jharokha structure appears

   ↓

Background transforms

   ↓

WELCOME

The curtains can become subtle architectural framing around the Welcome scene.

This creates the feeling that:

The guest has physically entered the wedding world.

Important Implementation Notes

Use GSAP for the opening timeline.

Use CSS/SVG for fabric, ornaments and decorative elements where possible.

Do not use Three.js for this scene.

Keep the number of animated elements low.

Prefer transform and opacity.

Optimize all image/texture assets.

Support prefers-reduced-motion.

Core Requirement

The opening must feel like a royal Rajasthani stage/curtain opening into a wedding celebration — premium, cinematic, interactive and immediately attention-grabbing.

02 — WELCOME

“A Royal Welcome”

Purpose

Make the guest feel personally welcomed immediately after entering the wedding world.

Fixed content:

Guest Name

Welcome Quote

Welcome Message

Main Scene

Create a large Rajasthani Jharokha as the central visual element.

The jharokha should feel like an ornate palace window with:

Ivory/sandstone structure

Deep maroon accents

Antique-gold detailing

Subtle carved/jaali patterns

Soft warm lighting

Inside the jharokha, show the couple's main photograph.

Entry Animation

Continue directly from the opening.

Golden opening light

        ↓

Jharokha gradually appears

        ↓

Shutters/details reveal

        ↓

Couple image appears

        ↓

Guest name appears

        ↓

Quote appears

        ↓

Welcome message appears

The jharokha should feel like it is opening to reveal the couple, rather than simply fading onto the screen.

Content Layout

Mobile composition:

       ✦

   [ JHAROKHA ]

   [   PHOTO   ]

   Dear [Guest Name]

   “Welcome Quote”

   Welcome Message

          ↓

       CONTINUE

The photograph should occupy the largest visual area.

The guest name should be the strongest text element.

Typography

Use the global typography system:

Guest Name: elegant large serif

Quote: refined italic serif

Message: clean readable font

Use gold only for small highlights.

Ambient Animation

While the section is active:

Very subtle sunlight movement

Tiny dust particles inside the light

Gentle photograph parallax

Extremely subtle textile/curtain movement

Soft golden glow around the jharokha

The scene should feel alive but calm.

Guest Interaction

The guest can tap the jharokha/photo.

On tap:

Photo slightly moves forward.

Background subtly darkens.

Gold lighting increases briefly.

Return smoothly to the normal state.

This is optional enhancement; the guest should not need to interact with the photo.

Navigation

Top:

ROHAN × ANANYA          02 / 11

Bottom:

← OPENING                COUPLE →

Keep navigation minimal so it doesn't compete with the welcome message.

Transition → Section 03

The jharokha should transform into the Couple scene.

Jharokha

   ↓

Photo frame separates from architecture

   ↓

Frame moves toward one side

   ↓

Second portrait frame enters

   ↓

Two frames settle together

   ↓

COUPLE

The same photograph can become one of the couple portraits to maintain continuity.

Mobile First

Target 360–430px

Full 100svh

No page scrolling

Photo remains dominant

Text must remain readable without overlapping important image areas

Touch targets must be comfortable

Keep decorative elements lightweight

Important

This should feel like the guest has entered a royal palace and someone has opened a beautiful jharokha specifically to welcome them. Avoid turning it into a conventional hero section with a photo, heading and paragraph.

03 — COUPLE

“The Royal Pair”

Purpose

Introduce the bride and groom as the heart of the wedding story. It should feel like a royal portrait reveal, not a normal profile section.

Main Scene

Create two large ornate Rajasthani portrait frames.

On mobile, stack them with a slight overlap:

       ┌─────────────┐

       │             │

       │    ROHAN    │

       │   PORTRAIT  │

       │             │

       └──────┬──────┘

              ♥

       ┌──────┴──────┐

       │             │

       │   ANANYA    │

       │   PORTRAIT  │

       │             │

       └─────────────┘

The frames should look inspired by Rajasthani jharokha/carved palace architecture.

Visual Styling

Use:

Deep maroon background

Warm ivory portrait area

Antique-gold frame

Subtle carved patterns

Small jaali details

Soft warm spotlight

Light sandstone texture

Keep the decoration refined. The photographs remain the focus.

Entry Animation

The Welcome jharokha photograph becomes Rohan's portrait frame.

Then:

Existing photo/frame

       ↓

Moves toward left/top

       ↓

Second portrait enters from opposite side

       ↓

Both frames settle

       ↓

Golden connecting line appears

       ↓

♥ / & reveals

       ↓

ROHAN × ANANYA appears

The frames should have slight depth and physical movement rather than simply sliding in.

Names

After the portraits settle:

ROHAN

      ×

ANANYA

Use the same luxury serif typography from the previous sections.

Optional small handwritten accent:

Together, Always

Portrait Interaction

When the guest taps either portrait:

Portrait moves closer

        ↓

Background becomes slightly darker

        ↓

Portrait receives soft spotlight

        ↓

Name + optional short detail appears

Tap again to return.

This should feel like focusing a camera on the person rather than opening a generic modal.

Ambient Animation

Keep the scene subtly alive:

Very slow portrait parallax

Soft light movement

Slight frame shadow movement

Minimal floating dust

Gentle gold highlight on the frame

No continuous heavy animation.

Navigation

← WELCOME                 GALLERY →

Top progress:

03 / 11

The navigation remains minimal.

Transition → Gallery

This transition should establish the next visual concept.

Two portrait frames

        ↓

Frames detach from wall

        ↓

Move backward

        ↓

Become photographs inside a gallery wall

        ↓

Additional photographs appear

        ↓

Gallery scene forms

The couple portraits should become the first two memories in the Gallery, maintaining visual continuity.

Mobile First

Primary target: 360–430px

Full 100svh

Portraits must remain large

Slight overlap is allowed

No scrolling

Touch interaction only

Optimized images

Use GPU-friendly transforms

Important

The guest should feel like they are being introduced to the two main characters of a royal wedding story. The section should be intimate, premium and cinematic—not two profile cards placed side by side.

04 — GALLERY

“The Royal Memory Gallery”

Purpose

Present the couple's pre-wedding photographs and memories as an immersive visual gallery rather than a standard grid.

Main Scene

Create a royal Rajasthani gallery wall with multiple physical-looking portrait frames.

       ┌───────┐

       │ PHOTO │

       └───────┘

 ┌─────────────┐

 │             │

 │   ACTIVE    │

 │    PHOTO    │

 │             │

 └─────────────┘

       ┌───────┐

       │ PHOTO │

       └───────┘

The active photograph should be larger and visually closer to the guest.

Environment

Create a subtle royal interior using:

Warm sandstone/ivory wall

Deep maroon accents

Antique-gold frame details

Jharokha/jaali-inspired patterns

Soft wall shadows

Warm spotlighting

The environment should feel like a private palace photo gallery.

Entry Animation

Continue from the Couple section.

Couple portrait frames

        ↓

Move backward into the wall

        ↓

Additional frames appear

        ↓

Gallery wall forms

        ↓

Lights turn on sequentially

        ↓

Active photograph receives spotlight

The transition should make it feel like the couple's portraits were always part of this gallery.

Active Photo

The selected photo should:

Move slightly forward

Become larger

Receive a soft spotlight

Become sharper/brighter

Cast a subtle shadow

Other photographs should remain slightly darker and smaller.

Mobile Interaction

The gallery must be touch-first.

User can:

Swipe left/right to change photo

Tap a photo to focus it

Tap the active photo to expand it

When swiping, the frames should move with a slight physical depth/parallax effect, rather than simply changing images.

Fullscreen Photo

When the active photo is tapped:

Gallery frame

     ↓

Frame moves toward screen

     ↓

Photo expands

     ↓

Full-screen cinematic view

Optional information:

PRE-WEDDING

A beautiful memory

Only display captions/dates when actual data exists.

Ambient Animation

While idle:

Frames gently sway by a few degrees

Soft light moves across the wall

Very subtle dust particles

Shadows shift slightly

Active frame has a slow breathing scale

Keep all movement extremely subtle.

Navigation

← COUPLE              OUR STORY →

Top:

04 / 11

The navigation should remain visible but secondary to the photographs.

Transition → Our Story

The selected photograph becomes the starting point of the next section.

Active Photograph

        ↓

Frame slowly disappears

        ↓

Photo remains

        ↓

Golden thread appears from photograph

        ↓

Thread starts moving

        ↓

OUR STORY

The photograph effectively becomes the first memory in their story.

Mobile & Performance

Target 360–430px

No page scrolling

Only nearby photographs should be loaded initially

Lazy-load remaining gallery images

Use WebP/AVIF

Use transform/opacity for movement

Avoid rendering large numbers of full-resolution images simultaneously

Keep frame animations lightweight

Important

The Gallery should feel like the guest has entered a private royal portrait gallery and is physically exploring the couple's memories—not browsing a conventional photo grid.

05 — OUR STORY

“A Story Written in Gold”

Purpose

Present the couple's journey as an interactive visual story, not a traditional timeline.

The guest should feel like they are following the thread of the couple's relationship.

Main Scene

Use a golden thread as the primary visual element.

The thread travels through the scene and connects important moments:

        ✦ Proposal

       /

      /

  First Date

     /

    /

First Meeting

Each point contains a photograph, date and short story.

Visual Environment

Create a warm handcrafted background using:

Ivory/paper texture

Deep maroon accents

Antique-gold thread

Subtle Rajasthani border patterns

Small traditional motifs

Soft vignette

The thread should be the main visual focus.

Entry Animation

The active photograph from the Gallery becomes the first memory.

Gallery photograph

       ↓

Photo settles

       ↓

Golden thread emerges

       ↓

Thread starts drawing itself

       ↓

First milestone appears

       ↓

Date + title reveal

The thread should look like it is actually being drawn across the scene.

Story Milestones

Each milestone can contain:

Date

Short title

Photograph

Short description

Example:

2019

THE FIRST MEETING

[PHOTO]

"And that's where

our story began."

Keep descriptions short so the scene remains visually focused.

Interaction

The guest can:

Tap a milestone

Swipe left/right

Use previous/next controls

When selecting a milestone:

Thread moves toward milestone

        ↓

Photo becomes prominent

        ↓

Background softens

        ↓

Story information appears

The selected point should glow with a subtle gold highlight.

Animation

The thread should remain slightly alive:

Gentle glowing movement

Small golden highlight travelling along it

Milestone ornaments subtly moving

When moving between milestones, the thread should physically extend/retract rather than simply switching content.

Rajasthani Detail

Milestones can use tiny decorative elements inspired by:

Traditional miniature painting

Gold ornaments

Floral motifs

Palace borders

Hand-painted details

Keep them small and elegant.

Navigation

← GALLERY              FAMILY TREE →

Top:

05 / 11

Transition → Family Tree

The final story milestone reaches the couple.

The golden thread then splits into two branches:

        Couple

          │

     ─────┴─────

     │         │

  Family     Family

The branches continue expanding until they form the foundation of the Family Tree scene.

This creates a meaningful transition:

Their story → Their families.

Mobile First

Target 360–430px

One major story milestone visible at a time

No page scrolling

Swipe/tap interaction

Keep text short

Use SVG for the golden thread

Animate SVG paths efficiently

Lazy-load story photographs

Important

The Golden Thread is the hero of this section. The guest should feel like they are physically following the thread through the couple's most important memories, rather than reading a conventional timeline.

06 — FAMILY TREE

“Two Families, One Beginning”

Purpose

Present both families coming together around the couple in a royal, living family composition, instead of a conventional tree/chart.

Main Scene

The couple remains at the visual center.

Family members are arranged around them inside an elegant Rajasthani courtyard-inspired composition.

      FAMILY          FAMILY

         \              /

          \            /

           ROHAN × ANANYA

          /            \

         /              \

      FAMILY          FAMILY

Use portrait frames inspired by jharokhas and miniature royal portraits.

Visual Environment

Use:

Warm ivory/sandstone background

Deep maroon accents

Antique-gold connection lines

Subtle palace arches

Jaali-inspired patterns

Soft warm lighting

Small ornamental details

The couple should always remain the central visual focus.

Entry Animation

The Golden Thread from Section 5 becomes the transition.

Golden thread reaches couple

        ↓

Splits into two branches

        ↓

Branches extend left/right

        ↓

Parents' frames appear

        ↓

Names reveal

        ↓

Additional family members appear

Connection lines should be drawn progressively, preferably using SVG path animation.

Family Member Presentation

Each family member gets a small portrait frame.

When revealed:

Connection line draws

       ↓

Frame appears

       ↓

Portrait reveals

       ↓

Name appears

       ↓

Relationship appears

Example:

[ PHOTO ]

RAJESH

Father

Keep the information concise.

Interaction

Tap a family member:

Portrait gently enlarges.

Spotlight focuses on that member.

Name and relationship become more prominent.

Surrounding family becomes slightly softer.

Tap again to return.

On mobile, the interaction should never require precise tapping on tiny portraits.

Mobile Composition

Do not attempt to squeeze a complete desktop family tree onto a mobile screen.

Use a layered branching composition:

       Parent      Parent

            \      /

             COUPLE

            /      \

       Parent      Parent

Additional relatives can appear as smaller secondary elements.

If there are many family members, allow the guest to navigate between family groups rather than displaying everything simultaneously.

Ambient Animation

Keep the scene subtly alive:

Gold connection lines gently glow.

Portrait frames have tiny parallax.

Soft light moves across the background.

Small ornamental elements move slightly.

Avoid floating particles everywhere.

Navigation

← OUR STORY             COUNTDOWN →

Top:

06 / 11

Transition → Countdown

This should be a strong visual transformation.

The gold family connections gradually retract toward the couple.

Family branches

      ↓

Connections retract

      ↓

All lines converge at couple

      ↓

Central gold circle forms

      ↓

Circle starts rotating

      ↓

Becomes the Countdown timepiece

The transition should communicate:

Two families → One couple → One wedding day approaching.

Mobile & Performance

Target 360–430px

No page scrolling

Use SVG for connection lines

Lazy-load family portraits

Render detailed member information only when required

Use transform, opacity, and SVG path animation

Avoid heavy 3D

Important

Do not make this look like an organizational chart. It should feel like a living royal family portrait, with the couple at the center and the families visually connected around them.

07 — COUNTDOWN

“The Moment Draws Near”

Purpose

Turn the wedding countdown into a beautiful interactive royal timepiece, rather than a normal digital countdown.

Main Scene

Create a large antique Rajasthani clock as the central visual.

The clock can be inspired by:

Palace clockwork

Brass craftsmanship

Traditional ornamental patterns

Carved royal details

          ✦

      ┌─────────┐

      │    ◯    │

      │  CLOCK  │

      └─────────┘

       120 DAYS

      08 HOURS

      42 MINUTES

      17 SECONDS

The clock should feel like a royal heirloom.

Background

Use a deep maroon/ivory environment with:

Antique-gold textures

Subtle sandstone

Fine ornamental patterns

Soft warm spotlight

Keep the background darker than the clock so the timepiece becomes the visual focus.

Entry Animation

The Family Tree connection lines converge into a gold circle.

Family branches

      ↓

Lines retract

      ↓

Central gold circle

      ↓

Circle expands

      ↓

Clock structure forms

      ↓

Clock hands appear

      ↓

Countdown numbers reveal

This should feel like the clock is being constructed from the family's golden connections.

Countdown Display

Use large elegant numbers:

      120

     DAYS

       08

     HOURS

       42

    MINUTES

       17

    SECONDS

On mobile, arrange them as 2 × 2 rather than one long row.

The actual wedding date appears below:

[Wedding Date]

Clock Animation

The clock should continuously feel alive:

Second hand moves smoothly.

Minute/hour hands move naturally.

Small internal gears rotate slowly.

Tiny gold highlights move around the edge.

Occasional subtle mechanical movement.

Don't animate the entire clock every second.

Use a real-time countdown for the numbers while keeping the visual mechanism lightweight.

Interactive Detail

Allow the guest to tap the clock.

On tap:

Clock slightly enlarges

       ↓

Gears accelerate briefly

       ↓

Golden ring illuminates

       ↓

Clock returns to normal

This is an optional visual interaction; the countdown itself remains visible without it.

Wedding Day State

When the timer reaches zero:

THE WAIT IS OVER

TODAY

WE CELEBRATE

LOVE

The clock stops.

A restrained golden glow spreads through the scene with a few falling petals.

Ambient Animation

While waiting:

Very subtle clock movement

Soft gold light sweep

Tiny dust particles

Slow background illumination

Minimal ornamental movement

The scene should feel quietly alive, not busy.

Navigation

← FAMILY TREE          CEREMONIES →

Top:

07 / 11

Transition → Ceremonies

At the end of the section transition:

Clock hand moves to wedding time

        ↓

Clock ring glows

        ↓

Ring expands

        ↓

Transforms into ceremony frame

        ↓

Wedding courtyard appears

The visual meaning is:

Time has brought us to the wedding celebrations.

Mobile & Performance

360–430px first

No scrolling

Large readable numbers

Use SVG/CSS for the clock

Efficient countdown calculation

Avoid heavy physics or 3D

Animate only required elements

Keep the clock smooth on mid-range devices

Important

The countdown should feel like a precious royal timepiece counting down to one important moment—not a digital timer placed inside a decorative box.

08 — CEREMONIES & VENUE

“The Royal Celebration”

Purpose

Present the wedding ceremonies, venue, date/time and dress code through an interactive Rajasthani wedding courtyard, instead of ordinary information cards.

Main Scene

Create a layered royal wedding courtyard as the main environment.

Include subtle elements such as:

Palace arches

Jharokhas

Mandap

Marigold decorations

Diyas

Hanging lanterns

Traditional textiles

Floral arrangements

The environment should feel like a beautifully illustrated Rajasthani wedding venue.

Ceremony Navigation

Place ceremonies as elegant interactive elements within the courtyard.

        HALDI

   MEHENDI      SANGEET

          ✦

        MANDAP

       WEDDING

      RECEPTION

The exact ceremonies should come from the invitation data.

Entry Animation

The Countdown clock transforms into the central courtyard element.

Clock ring expands

      ↓

Royal arch appears

      ↓

Courtyard builds itself

      ↓

Diyas illuminate

      ↓

Flowers/details appear

      ↓

Ceremony options reveal

The scene should feel like the wedding venue coming alive.

Ceremony Interaction

When the guest taps a ceremony:

Selected ceremony highlights

        ↓

Courtyard lighting changes

        ↓

Ceremony decoration appears

        ↓

Information panel/card opens

For example:

Haldi

Warm yellow lighting

Marigold accents

Yellow decorative elements

Mehendi

Green accents

Mehendi-inspired patterns

Wedding

Mandap illuminates

Diyas become brighter

Gold lighting

Reception

Evening lighting

Lanterns

More elegant/darker atmosphere

The changes should be subtle, not completely replace the scene.

Information Card

When selected, show the available information:

HALDI

[Date]

[Time]

[Venue]

Dress Code

[Details]

[Get Directions]

Only show fields that exist.

The information should be immediately readable.

Do not make users perform multiple interactions just to find the date/time.

Venue Interaction

If venue information includes an image, allow the venue image/illustration to expand slightly.

A Get Directions action can be provided if required.

Keep external navigation secondary to the invitation experience.

Ambient Animation

The courtyard should feel alive:

Diyas flicker subtly

Curtains/textiles move gently

Hanging lanterns sway slightly

Flowers have tiny movement

Warm light shifts across the architecture

Avoid excessive particles.

Navigation

← COUNTDOWN                 RSVP →

Top:

08 / 11

Transition → RSVP

The selected ceremony information transforms into a traditional invitation.

Ceremony information

        ↓

Card folds inward

        ↓

Transforms into royal envelope

        ↓

Wax seal appears

        ↓

Envelope moves to center

        ↓

RSVP

This should feel like the ceremony details have turned into a personal invitation to attend.

Mobile & Performance

360–430px first

Full 100svh

No page scrolling

One primary ceremony visible at a time

Touch-friendly ceremony controls

Use optimized illustrations/assets

Prefer SVG/CSS for decorative elements

Keep ambient animations lightweight

Important

This section should feel like the guest has entered the actual Rajasthani wedding venue. The ceremonies should be part of the environment, not separate generic cards placed on top of a background.

09 — RSVP

“Will You Join Us?”

Purpose

Make accepting the invitation feel like a special ceremonial moment, not a normal button interaction.

Fixed content:

Only Accept Invitation.

Main Scene

Place a beautiful royal Rajasthani invitation envelope in the center.

Use:

Warm ivory paper

Deep maroon detailing

Antique-gold borders

Traditional ornamental pattern

Wax seal

Subtle handcrafted paper texture

The envelope should have depth and feel like a physical object.

Entry Animation

The Ceremony scene transforms into the invitation.

Ceremony card

      ↓

Folds into envelope

      ↓

Envelope moves to center

      ↓

Golden light appears

      ↓

Wax seal becomes visible

      ↓

ACCEPT INVITATION appears

The invitation should gently float with subtle movement.

Main Interaction

When the guest taps:

ACCEPT INVITATION

perform a cinematic sequence:

Button press

      ↓

Envelope reacts

      ↓

Wax seal glows

      ↓

Seal cracks/opens

      ↓

Envelope opens

      ↓

Warm golden light emerges

      ↓

Marigold petals appear

      ↓

Invitation unfolds

      ↓

“INVITATION ACCEPTED”

The animation should feel ceremonial and emotional, not like a generic success animation.

Celebration Effect

Use a controlled combination of:

Marigold petals

Tiny golden particles

Soft light burst

Ornamental gold lines

Subtle glow

Avoid large confetti explosions.

The effect should feel like a royal wedding celebration.

Confirmation

After the animation:

INVITATION ACCEPTED

We can't wait to celebrate

with you.

Keep this visible long enough to understand, then allow the guest to continue.

Interaction Rules

Before acceptance:

Only the Accept Invitation action should be prominent.

After acceptance:

Disable/reduce the button so it cannot trigger the animation repeatedly.

Show the confirmation state.

Allow navigation to continue normally.

Ambient Animation

While idle:

Envelope gently floats.

Wax seal has a very subtle highlight.

Gold texture softly shifts.

One or two particles occasionally move through the light.

Keep the scene calm before interaction.

Navigation

Before acceptance:

← CEREMONIES

After acceptance:

← CEREMONIES             BLESSINGS →

Top:

09 / 11

The chapter navigation remains available.

Transition → Blessing Wall

The acceptance animation should directly create the next scene.

Golden particles/petals

        ↓

Float upward

        ↓

Spread across the screen

        ↓

Become glowing ornaments

        ↓

Ornaments attach to branches

        ↓

WISH TREE / BLESSING WALL

The guest should feel that their acceptance has created something in the next scene.

Mobile & Performance

360–430px first

Full 100svh

Large touch-friendly button

No scrolling

Use SVG/CSS/GSAP for seal and ornament animation

Keep particles limited

Avoid physics-heavy effects

Use transform and opacity

Animation target: approximately 2–4 seconds

Important

RSVP is the emotional interaction point of the invitation. Keep the action extremely simple, but make the response visually memorable. One button → one beautiful ceremonial animation → one clear confirmation.

10 — BLESSING WALL

“The Wish Tree”

Purpose

Turn guest blessings into a living visual element of the wedding experience instead of showing them as ordinary comments/cards.

Main Scene

Create a beautiful Rajasthani-inspired Wish Tree in the center.

The tree should initially have only a few ornaments.

             🌿

        ✦         ✦

      /             \

     ✦      ♥        ✦

      \             /

        ✦         ✦

Use:

Elegant branches

Antique-gold ornaments

Maroon/ivory blessing tags

Subtle mirror-work details

Warm golden lighting

The tree should feel handcrafted and royal.

Entry Animation

Continue directly from RSVP.

Golden particles from RSVP

        ↓

Move upward

        ↓

Become glowing ornaments

        ↓

Travel toward tree

        ↓

Attach to branches

        ↓

Tree illuminates

This makes the guest's acceptance feel connected to the Blessing Wall.

Blessing Animation

Each blessing is represented by a small hanging tag/ornament.

When a blessing appears:

Golden glow

     ↓

Ornament travels toward branch

     ↓

Attaches to branch

     ↓

Swings naturally

     ↓

Settles

Do not make all blessings appear simultaneously.

Use staggered reveals.

Interaction

Tap an ornament/tag.

Ornament swings forward

        ↓

Background softly darkens

        ↓

Blessing parchment appears

        ↓

Message + guest name

Example:

“Wishing you both

a lifetime of happiness.”

— Priya

Tap outside or the ornament again to return to the tree.

Visual Depth

Create 3 layers:

Background

Soft palace/wall texture

Warm light

Middle

Main tree branches

Foreground

Active blessing ornaments

This gives the tree a feeling of physical depth without requiring heavy 3D.

Ambient Animation

Keep the tree alive:

Branches move very slightly.

Hanging ornaments gently sway.

Tiny golden highlights travel through branches.

Warm light flickers softly.

Occasional petal passes through the scene.

Animations must remain subtle.

Blessing Data

Blessings should be data-driven.

Each blessing can contain:

message

guestName

If there are many blessings, don't render every detailed card at once.

Only show the selected blessing's detailed content.

Navigation

← RSVP                   THANK YOU →

Top:

10 / 11

Chapter navigation remains available.

Transition → Thank You

The final blessing should create the final scene.

Tree filled with ornaments

        ↓

Ornaments begin glowing

        ↓

Glow leaves ornaments

        ↓

Golden lights float upward

        ↓

Tree fades

        ↓

Lights become stars

        ↓

Night sky appears

        ↓

THANK YOU

The same golden lights should visually become the stars of the final scene.

Mobile First

360–430px

Tree should occupy most of the screen.

Keep ornaments large enough to tap comfortably.

Avoid tiny family-tree-style interactions.

No page scrolling.

Use SVG/CSS for branches where possible.

Only animate necessary ornaments.

Keep particle count low.

Important

The Blessing Wall should feel like the guests are physically adding their blessings to the couple's wedding world. The tree should gradually become richer as blessings appear, making this section visually meaningful rather than simply displaying a list of messages.

11 — THANK YOU

“The Story Continues”

Purpose

Create the final emotional scene of the invitation. It should feel like the closing moment of a royal Rajasthani wedding experience, not a simple thank-you screen.

Main Scene

Transform the Blessing Tree scene into a royal Rajasthani night.

Use:

Deep midnight blue / maroon sky

Palace/jharokha silhouette

Warm golden lanterns

Stars

Moon

Subtle sandstone architecture

Couple photograph or elegant silhouette

The scene should feel peaceful and premium.

Entry Animation

Continue directly from the Blessing Wall.

Blessing ornaments glow

        ↓

Golden lights leave the tree

        ↓

Lights float upward

        ↓

Become stars

        ↓

Background transitions into night

        ↓

Palace silhouette appears

        ↓

Lanterns illuminate

        ↓

Couple appears

        ↓

THANK YOU reveals

The transition should feel like the end of a story, not another section appearing.

Main Content

Keep the final message minimal.

        ✦

      THANK YOU

 Thank you for being part

       of our story.

      With Love,

   ROHAN × ANANYA

The actual message should be configurable.

Couple Visual

Use either:

A beautiful final couple photograph, or

A subtle couple silhouette against the palace/night background.

The couple should appear gradually rather than simply fading in.

A very slow cinematic zoom/parallax can keep the scene alive.

Rajasthani Details

Use subtle:

Palace silhouette

Jharokha shapes

Brass/golden lanterns

Traditional ornamental borders

Maroon/gold accents

Fine stars inspired by miniature artwork

Do not overcrowd the final scene.

The night atmosphere should dominate.

Ambient Animation

After the scene finishes entering:

Stars gently twinkle.

Lantern flames flicker.

Very subtle night breeze.

Couple image has slow parallax.

A few golden particles occasionally drift upward.

Everything should move slowly.

This scene should feel calm after the more interactive previous sections.

Final Message Reveal

Use a layered reveal:

Background

      ↓

Palace

      ↓

Lanterns

      ↓

Couple

      ↓

THANK YOU

      ↓

Message

      ↓

ROHAN × ANANYA

The couple names should be the final textual focus.

Navigation

Keep navigation available, but make it less visually dominant.

← BLESSINGS

                 11 / 11

The chapter menu should still allow the guest to revisit any section.

Do not add a large "Finish" button.

Final State

The scene remains active indefinitely.

The guest can:

Revisit previous sections.

Open the chapter navigation.

View the invitation again.

Do not automatically redirect or reload the page.

Mobile First

360–430px

Full 100svh

Couple remains clearly visible

Text stays inside safe areas

No scrolling

Lightweight star/lantern animations

Optimized final image/video

Performance

Prefer:

CSS/SVG stars

CSS/SVG lanterns

GSAP for major entrance timeline

transform/opacity

Optimized couple image

Avoid:

Heavy particle systems

WebGL

Large animated backgrounds

Multiple simultaneous videos

Important

The final scene should feel like the wedding world has gone quiet after the celebration.

The guest has:

entered → explored → discovered → accepted → blessed → reached the final night.

The last impression should be:

A beautiful royal Rajasthani wedding story that they were invited to be part of.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/d9b56132-5d37-471b-aab4-611fc19afd2a).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
