/**
 * Preloader utility for fonts, background images, photos, and scene code chunks.
 * Ensures that transitions between wedding card scenes are instant and never flash a blank screen.
 */

// All static images used across all scenes
export const ALL_SCENE_IMAGES = [
  // Scene 1: Welcome
  "/assets/welcome-background.webp",
  "/assets/welcome-man.webp",
  "/assets/welcome-women.webp",
  "/assets/couple-frame.webp",
  "/assets/couple.webp",
  "/assets/palace-night.webp",
  "/assets/reel-mehendi.webp",
  "/assets/reel-jewellery.webp",
  "/assets/reel-marigold.webp",
  "/assets/reel-palace.webp",

  // Scene 2: Couple
  "/assets/royal-scroll-table.webp",
  "/assets/couple-namaste.webp",

  // Scene 3: Story
  "/assets/rajasthan-vintage-map.webp",
  "/assets/prewedding-1.webp",
  "/assets/prewedding-2.webp",
  "/assets/prewedding-3.webp",

  // Scene 4: Gallery
  "/assets/gallery-background-wall.webp",
  "/assets/prewedding-4.webp",

  // Scene 5: Family
  "/assets/family-tree-bg.webp",
  "/assets/family-card-frame.webp",
  "/assets/groom-family.webp",
  "/assets/bride-family.webp",
  "/assets/family-father.webp",
  "/assets/family-mother.webp",
  "/assets/family-brother.webp",
  "/assets/family-bride.webp",
  "/assets/family-groom.webp",

  // Scene 6: Countdown
  "/assets/countdown-garden-background.webp",

  // Scene 7: Ceremonies
  "/assets/royal-palace-mandap.webp",

  // Scene 8: RSVP
  "/assets/haveli-wall-bg.webp",

  // Scene 9: Blessings
  "/assets/blessings-open-book-bg.webp",
  "/assets/mobile-blessings-bg.webp",

  // Scene 10: Thank You
  "/assets/thankyou-night-palace.webp",
] as const;

// High-priority assets needed immediately for initial cold start
export const CRITICAL_INITIAL_IMAGES = [
  "/assets/welcome-background.webp",
  "/assets/welcome-man.webp",
  "/assets/welcome-women.webp",
  "/assets/couple-frame.webp",
  "/assets/couple.webp",
  "/assets/royal-scroll-table.webp",
  "/assets/couple-namaste.webp",
] as const;

const imageCache = new Map<string, Promise<void>>();

/**
 * Preloads a single image and decodes it so it's ready for immediate GPU rendering.
 */
export function preloadImage(src: string): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();

  if (imageCache.has(src)) {
    return imageCache.get(src)!;
  }

  const promise = new Promise<void>((resolve) => {
    const img = new Image();
    img.src = src;

    const onFinish = () => {
      if ("decode" in img) {
        img.decode().then(resolve).catch(() => resolve());
      } else {
        resolve();
      }
    };

    if (img.complete) {
      onFinish();
    } else {
      img.onload = onFinish;
      img.onerror = () => resolve(); // Resolve on error so app flow is never blocked
    }
  });

  imageCache.set(src, promise);
  return promise;
}

/**
 * Preloads a batch of image URLs.
 */
export function preloadImages(urls: readonly string[] | string[]): Promise<void[]> {
  return Promise.all(urls.map((u) => preloadImage(u)));
}

/**
 * Preloads all custom web fonts and ensures document.fonts.ready has resolved.
 */
export async function preloadFonts(): Promise<void> {
  if (typeof window === "undefined" || !("fonts" in document)) return;

  try {
    const fontPromises = [
      document.fonts.load('500 1rem "DM Serif Display"'),
      document.fonts.load('600 1rem "Cinzel"'),
      document.fonts.load('500 1rem "Cormorant Garamond"'),
      document.fonts.load('400 1rem "Great Vibes"'),
      document.fonts.load('600 1rem "Rajdhani"'),
      document.fonts.load('500 1rem "Playfair Display"'),
      document.fonts.load('400 1rem "Manrope"'),
      document.fonts.load('normal 1rem "Family Prosperity"'),
    ];

    await Promise.allSettled(fontPromises);
    await document.fonts.ready;
  } catch {
    // Graceful fallback if font loading API has issues
  }
}

let hasStartedGlobalPreload = false;

/**
 * Preloads all critical resources first, then schedules background preloading for everything else.
 */
export async function preloadAllAssets(): Promise<void> {
  if (typeof window === "undefined" || hasStartedGlobalPreload) return;
  hasStartedGlobalPreload = true;

  // 1. Preload fonts and critical hero images first
  await Promise.all([
    preloadFonts(),
    preloadImages(CRITICAL_INITIAL_IMAGES),
  ]);

  // 2. Preload remaining images in idle or next tick
  const remainingImages = ALL_SCENE_IMAGES.filter(
    (img) => !CRITICAL_INITIAL_IMAGES.includes(img as any),
  );

  const startBackgroundQueue = () => {
    // Process in batches of 4 to avoid saturating network while user interacts
    let idx = 0;
    const batchSize = 4;

    const loadNextBatch = () => {
      if (idx >= remainingImages.length) return;
      const batch = remainingImages.slice(idx, idx + batchSize);
      idx += batchSize;
      preloadImages(batch).then(() => {
        if ("requestIdleCallback" in window) {
          (window as any).requestIdleCallback(loadNextBatch, { timeout: 1000 });
        } else {
          setTimeout(loadNextBatch, 80);
        }
      });
    };

    loadNextBatch();
  };

  if ("requestIdleCallback" in window) {
    (window as any).requestIdleCallback(startBackgroundQueue, { timeout: 800 });
  } else {
    setTimeout(startBackgroundQueue, 100);
  }
}
