const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = [...document.querySelectorAll(".site-nav a")];
const siteHeader = document.querySelector(".site-header");
const scrollProgressBar = document.querySelector("#scrollProgressBar");
const backToTop = document.querySelector("#backToTop");
const motionItems = [
  ...document.querySelectorAll(".feature-list article, .extras-grid figure")
];

motionItems.forEach((item) => {
  if (!item.hasAttribute("data-reveal")) item.setAttribute("data-reveal", "");
});

document.querySelectorAll("img").forEach((image) => {
  if (!image.closest(".hero-media")) {
    image.loading = image.loading || "lazy";
    image.decoding = "async";
  } else {
    image.loading = "eager";
    image.fetchPriority = "high";
  }
});

const revealItems = [...document.querySelectorAll("[data-reveal]")];
const sections = [...document.querySelectorAll("main section[id]")];
const galleryItems = [...document.querySelectorAll(".gallery-grid figure")];
const galleryFilterButtons = [...document.querySelectorAll("[data-gallery-filter]")];
const galleryResultCount = document.querySelector("#galleryResultCount");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox.querySelector("img");
const lightboxCaption = lightbox.querySelector("p");
const lightboxClose = lightbox.querySelector("button");
const blankImage = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
let lastFocusedGalleryItem = null;
let scrollFramePending = false;

function updatePageChrome() {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollProgress = scrollableHeight > 0
    ? Math.min(Math.max(window.scrollY / scrollableHeight, 0), 1)
    : 0;

  siteHeader?.classList.toggle("is-scrolled", window.scrollY > 24);
  if (scrollProgressBar) scrollProgressBar.style.transform = `scaleX(${scrollProgress})`;
  if (backToTop) backToTop.hidden = window.scrollY < 720;
  scrollFramePending = false;
}

window.addEventListener("scroll", () => {
  if (scrollFramePending) return;
  scrollFramePending = true;
  window.requestAnimationFrame(updatePageChrome);
}, { passive: true });

updatePageChrome();
window.requestAnimationFrame(() => document.body.classList.add("is-page-ready"));

backToTop?.addEventListener("click", () => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
});

function scrollToCurrentHash() {
  const targetId = window.location.hash.slice(1);
  if (!targetId) return;

  const target = document.getElementById(targetId);
  if (!target) return;

  target.scrollIntoView({ block: "start" });
}

window.addEventListener("load", () => {
  window.setTimeout(scrollToCurrentHash, 120);
});

navToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

function closeSiteNavigation(restoreFocus = false) {
  if (!siteNav.classList.contains("is-open")) return;
  siteNav.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
  if (restoreFocus) navToggle.focus();
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeSiteNavigation();
  });
});

document.addEventListener("click", (event) => {
  if (!siteHeader?.contains(event.target)) closeSiteNavigation();
});

const staggerGroups = [
  ".service-grid .service-card",
  ".extras-grid figure",
  ".gallery-grid figure",
  ".contact-grid .contact-card",
  ".feature-list article"
];

staggerGroups.forEach((selector) => {
  document.querySelectorAll(selector).forEach((item, index) => {
    item.style.setProperty("--reveal-delay", `${Math.min(index % 12, 11) * 55}ms`);
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

revealItems.forEach((item) => revealObserver.observe(item));

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${entry.target.id}`;
      link.classList.toggle("is-active", isActive);
      if (isActive) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  });
}, { rootMargin: "-42% 0px -50% 0px" });

sections.forEach((section) => sectionObserver.observe(section));

const showcaseVideos = [...document.querySelectorAll(".fiesta-gallery-video")];

if (showcaseVideos.length) {
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const videoVisibility = new Map(showcaseVideos.map((video) => [video, 0]));

  function syncShowcasePlayback() {
    if (reducedMotionQuery.matches) {
      showcaseVideos.forEach((video) => video.pause());
      return;
    }

    const activeVideo = showcaseVideos
      .filter((video) => (videoVisibility.get(video) || 0) >= 0.34)
      .sort((a, b) => (videoVisibility.get(b) || 0) - (videoVisibility.get(a) || 0))[0];

    showcaseVideos.forEach((video) => {
      if (video !== activeVideo) {
        video.pause();
        return;
      }

      video.play().catch(() => {
        // Native controls remain available when autoplay is blocked.
      });
    });
  }

  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      videoVisibility.set(entry.target, entry.isIntersecting ? entry.intersectionRatio : 0);
    });
    syncShowcasePlayback();
  }, { threshold: [0, 0.34, 0.65, 1] });

  if (reducedMotionQuery.matches) {
    showcaseVideos.forEach((video) => video.pause());
  }

  showcaseVideos.forEach((video) => {
    video.addEventListener("play", () => {
      showcaseVideos.forEach((otherVideo) => {
        if (otherVideo !== video) otherVideo.pause();
      });
    });
    videoObserver.observe(video);
  });

  reducedMotionQuery.addEventListener?.("change", syncShowcasePlayback);
}

// Client Package Customizer
// Edit item labels in the HTML add-on list. Edit preview shapes here if you want different visual objects later.
const customizer = document.querySelector(".customizer-section");

if (customizer) {
  const builder = customizer.querySelector(".package-builder");
  const eventType = customizer.querySelector("#eventType");
  const themeStyle = customizer.querySelector("#themeStyle");
  const basePackage = customizer.querySelector("#basePackage");
  const customColors = customizer.querySelector("#customColors");
  const packageNotes = customizer.querySelector("#packageNotes");
  const catalogueIncludes = customizer.querySelector("#catalogueIncludes");
  const paletteInputs = [...customizer.querySelectorAll("input[name='palette']")];
  const addonOptions = [...customizer.querySelectorAll(".addon-option")];
  const selectedItemCount = customizer.querySelector("#selectedItemCount");
  const itemSearch = customizer.querySelector("#itemSearch");
  const selectedOnly = customizer.querySelector("#selectedOnly");
  const clearItemSelections = customizer.querySelector("#clearItemSelections");
  const selectedChips = customizer.querySelector("#selectedChips");
  const categoryTabs = [...customizer.querySelectorAll("[data-category-tab]")];
  const categoryPanels = [...customizer.querySelectorAll("[data-category-panel]")];
  const progressSteps = [...customizer.querySelectorAll("[data-progress-step]")];
  const setupStage = customizer.querySelector("#setupStage");
  const stagePhoto = customizer.querySelector("#stagePhoto");
  const stagePhotoCaption = customizer.querySelector("#stagePhotoCaption");
  const stagePhotoEmpty = customizer.querySelector("#stagePhotoEmpty");
  const stagePhotoEmptyText = customizer.querySelector("#stagePhotoEmptyText");
  const photoMatchPanel = customizer.querySelector("#photoMatchPanel");
  const photoMatchBadge = customizer.querySelector("#photoMatchBadge");
  const photoMatchTitle = customizer.querySelector("#photoMatchTitle");
  const photoMatchReason = customizer.querySelector("#photoMatchReason");
  const previewObjects = customizer.querySelector("#previewObjects");
  const stageEmpty = customizer.querySelector("#stageEmpty");
  const packageSummary = customizer.querySelector("#packageSummary");
  const summaryPanel = customizer.querySelector(".summary-panel");
  const buildPackagePreview = customizer.querySelector("#buildPackagePreview");
  const reviewPackage = customizer.querySelector("#reviewPackage");
  const sendPackageRequest = customizer.querySelector("#sendPackageRequest");
  const resetPackage = customizer.querySelector("#resetPackage");
  const requestMessageWrap = customizer.querySelector("#requestMessageWrap");
  const requestMessage = customizer.querySelector("#requestMessage");
  const copyPackageRequest = customizer.querySelector("#copyPackageRequest");
  const previewObjectCount = customizer.querySelector("#previewObjectCount");
  const previewModeLabel = customizer.querySelector("#previewModeLabel");
  const previewViewButtons = [...customizer.querySelectorAll("[data-preview-view]")];
  const customizerStatus = customizer.querySelector("#customizerStatus");
  const draftStatus = customizer.querySelector("#draftStatus");
  const sceneDensity = customizer.querySelector("#sceneDensity");
  const previewSelectionSummary = customizer.querySelector("#previewSelectionSummary");
  const mobileSelectedCount = customizer.querySelector("#mobileSelectedCount");
  const mobileReviewPackage = customizer.querySelector("#mobileReviewPackage");
  const resetConfirmDialog = customizer.querySelector("#resetConfirmDialog");
  const confirmReset = customizer.querySelector("#confirmReset");
  let previousItems = new Set();
  let showSelectedOnly = false;
  let reviewMode = false;
  let suppressDraftSave = true;
  let draftSaveTimer = 0;
  const draftStorageKey = "fiesta-party-hire-package-draft-v1";

  const previewPalette = [
    "var(--purple)",
    "var(--pink)",
    "var(--gold)",
    "var(--red)",
    "var(--blue)",
    "var(--green)",
    "var(--yellow)"
  ];

  const previewColorValues = {
    Pink: "#ff5aa8",
    Gold: "#f4a31c",
    White: "#f8f4ec",
    Blue: "#08a8f4",
    Red: "#e81916",
    Purple: "#53137c",
    Green: "#5ac20c",
    Neutral: "#d8c6ad"
  };

  const backdropPackageIncludes = [
    { name: "Arch Backdrop", quantity: 1 },
    { name: "Artificial Grass Backdrop", quantity: 1 },
    { name: "Neon Light", quantity: 1 },
    { name: "Balloon Styling", quantity: 1 }
  ];

  const previewMap = {
    "Arch Backdrop": { className: "obj-arch", variant: "arch-backdrop", depth: 3 },
    "Artificial Grass Backdrop": { className: "obj-backdrop", variant: "grass-backdrop", depth: 2 },
    "Neon Light": { className: "obj-neon", variant: "neon", text: "Neon Light", depth: 7 },
    "Balloon Styling": { className: "obj-balloons", visual: "balloons", baseChildren: 8, perQuantity: 4, maxChildren: 24, depth: 6 },
    "Background Lights": { className: "obj-lighting", visual: "lighting", variant: "background-lights", baseChildren: 6, perQuantity: 2, maxChildren: 14, depth: 9 },
    "Artificial Flowers": { className: "obj-flowers", visual: "flowers", quantityChildren: true, maxChildren: 12, depth: 8 },
    "Extra Grass Decorations": { className: "obj-greenery", visual: "greenery", quantityChildren: true, maxChildren: 12, depth: 7 },
    "Additional Balloon Styling": { className: "obj-balloons", visual: "balloons", baseChildren: 8, perQuantity: 4, maxChildren: 24, depth: 6 },
    "Personalised Fabric Napkins": { className: "obj-napkins", visual: "napkins", baseChildren: 3, depth: 10 },
    "Festoon / String Lights": { className: "obj-lighting", visual: "lighting", variant: "festoon", baseChildren: 6, perQuantity: 2, maxChildren: 14, depth: 9 },
    "Round Frame Arch": { className: "obj-arch", depth: 3 },
    "Colourful Chair Ribbons": { className: "obj-chair", visual: "chairs", variant: "ribbons", quantityChildren: true, maxChildren: 18, depth: 10 },
    "Candle Holders": { className: "obj-candles", visual: "candles", baseChildren: 3, depth: 10 },
    "Candle Lights": { className: "obj-candles", visual: "candles", variant: "lit", baseChildren: 3, depth: 10 },
    "Champagne Glasses": { className: "obj-glassware", visual: "glassware", variant: "champagne", quantityChildren: true, maxChildren: 30, depth: 11 },
    "Water Glasses": { className: "obj-glassware", visual: "glassware", variant: "water", quantityChildren: true, maxChildren: 30, depth: 11 },
    "Greenery Decorations": { className: "obj-greenery", visual: "greenery", quantityChildren: true, maxChildren: 12, depth: 8 },
    "Flower Arrangements": { className: "obj-flowers", visual: "flowers", quantityChildren: true, maxChildren: 12, depth: 8 },
    "Cake Stand": { className: "obj-cake", depth: 10 },
    "Outdoor Table Setup": { className: "obj-table", visual: "tables", variant: "outdoor", quantityChildren: true, maxChildren: 10, depth: 8 },
    "Formal Table Setup": { className: "obj-table", visual: "tables", variant: "formal", quantityChildren: true, maxChildren: 10, depth: 8 },
    "Round Table Setup": { className: "obj-table", visual: "tables", variant: "round", quantityChildren: true, maxChildren: 10, depth: 8 },
    "Chair Bow Table Setup": { className: "obj-chair", visual: "chairs", variant: "bows", quantityChildren: true, maxChildren: 18, depth: 10 },
    "Marquee Table Setup": { className: "obj-marquee", variant: "marquee-table", depth: 1 },
    "Cocktail Table": { className: "obj-table", visual: "tables", variant: "cocktail", quantityChildren: true, maxChildren: 8, depth: 8 },
    "Chafing Dishes": { className: "obj-chafing", visual: "chafing", baseChildren: 2, depth: 10 },
    "Lit Marquee Setup": { className: "obj-marquee", variant: "lit-marquee", depth: 1 },
    "Folding Table": { className: "obj-table", visual: "tables", variant: "folding", quantityChildren: true, maxChildren: 10, depth: 8 },
    "Long Folding Table": { className: "obj-table", visual: "tables", variant: "long", quantityChildren: true, maxChildren: 10, depth: 8 },
    "White Plastic Chair": { className: "obj-chair", visual: "chairs", variant: "white", quantityChildren: true, maxChildren: 30, depth: 10 },
    "Plates and Cutlery": { className: "obj-place-settings", visual: "place-settings", baseChildren: 3, depth: 11 },
    "LOVE Sign": { className: "obj-neon", variant: "love", text: "LOVE", depth: 7 },
    "Wedding Arbour": { className: "obj-arch", variant: "wedding-arbour", depth: 3 },
    "Kids Colourful Chairs": { className: "obj-chair", visual: "chairs", variant: "kids", quantityChildren: true, maxChildren: 18, depth: 10 },
    "Bubble Machine": { className: "obj-bubble", depth: 12 },
    "Portable Speaker & Microphone": { className: "obj-speaker", depth: 12 },
    "Speaker & Microphones": { className: "obj-speaker", depth: 12 },
    "Party Light": { className: "obj-party-light", depth: 12 }
  };

  function previewFamily(config) {
    if (!config) return "item";
    return (config.visual || config.className || "item")
      .replace(/^obj-/, "")
      .replace(/[^a-z0-9-]/gi, "-")
      .toLowerCase();
  }

  function enhanceAddonOptions() {
    addonOptions.forEach((option) => {
      const checkbox = option.querySelector("input[type='checkbox']");
      const config = checkbox ? previewMap[checkbox.value] : null;
      option.dataset.preview = previewFamily(config);
    });
  }

  function getPreviewPaletteValues() {
    const selected = paletteInputs
      .filter((input) => input.checked)
      .map((input) => previewColorValues[input.value])
      .filter(Boolean);

    return selected.length ? selected : previewPalette;
  }

  function syncPhotoMatchVisibility() {
    const viewMode = setupStage?.dataset.viewMode || "hybrid";
    const hasNoMatch = setupStage?.dataset.photoMatchConfidence === "none";

    if (photoMatchPanel) photoMatchPanel.hidden = viewMode === "concept";
    if (stagePhotoEmpty) stagePhotoEmpty.hidden = !(viewMode === "photo" && hasNoMatch);
  }

  function setPreviewView(view) {
    const labels = {
      concept: "3D concept, not exact scale",
      hybrid: "Hybrid concept, not exact scale"
    };
    const selectedView = labels[view] ? view : "hybrid";

    setupStage.dataset.viewMode = selectedView;
    previewViewButtons.forEach((button) => {
      const active = button.dataset.previewView === selectedView;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    if (previewModeLabel) previewModeLabel.textContent = labels[selectedView];
    syncPhotoMatchVisibility();
  }

  // Only visually reviewed catalogue assets are eligible for the Hybrid reference layer.
  // Generated Mermaid, Princess, Boho, and generic custom-theme concepts are intentionally excluded.
  const galleryPreviewReferences = [
    {
      src: "assets/gallery/Birthday%20theme1.png",
      label: "White and Gold Birthday Backdrop",
      kind: "setup",
      events: ["Birthday"],
      themes: ["Birthday Theme", "Elegant", "Pastel"],
      colors: ["Pink", "Gold", "White"],
      shownItems: ["Arch Backdrop", "Neon Light", "Balloon Styling", "Additional Balloon Styling"]
    },
    {
      src: "assets/gallery/Birthday%20theme2.png",
      label: "Black and Gold Birthday Display",
      kind: "setup",
      events: ["Birthday"],
      themes: ["Birthday Theme", "Gatsby", "Luxury", "Elegant"],
      colors: ["Gold"],
      shownItems: ["Arch Backdrop", "Neon Light", "Balloon Styling", "Additional Balloon Styling"]
    },
    {
      src: "assets/gallery/Birthday%20theme3.png",
      label: "Pink Balloon Birthday Backdrop",
      kind: "setup",
      events: ["Birthday"],
      themes: ["Birthday Theme", "Pastel", "Kids Party"],
      colors: ["Pink", "White"],
      shownItems: ["Arch Backdrop", "Neon Light", "Balloon Styling", "Additional Balloon Styling"]
    },
    {
      src: "assets/gallery/Baby%20Shower%20Set%20up.png",
      label: "Baby Shower Table Setup",
      kind: "setup",
      events: ["Baby Shower"],
      themes: ["Baby Shower Theme", "Pastel", "Elegant"],
      colors: ["Pink", "Gold", "White", "Green"],
      shownItems: ["Formal Table Setup", "Colourful Chair Ribbons", "Candle Holders", "Candle Lights", "Champagne Glasses", "Water Glasses", "Flower Arrangements", "Plates and Cutlery"]
    },
    {
      src: "assets/gallery/Baby%20Shower%20theme1.png",
      label: "Sage and Gold Baby Shower Display",
      kind: "setup",
      events: ["Baby Shower"],
      themes: ["Baby Shower Theme", "Elegant", "Pastel", "Luxury"],
      colors: ["Gold", "White", "Green"],
      shownItems: ["Background Lights", "Arch Backdrop", "Neon Light", "Balloon Styling", "Additional Balloon Styling", "Flower Arrangements", "Cake Stand"]
    },
    {
      src: "assets/gallery/Baby%20Shower%20theme%202.png",
      label: "Baby Shower Backdrop Display",
      kind: "setup",
      events: ["Baby Shower"],
      themes: ["Baby Shower Theme", "Pastel", "Fun & Colorful"],
      colors: ["Pink", "Purple", "Green", "Gold", "White"],
      shownItems: ["Arch Backdrop", "Round Frame Arch", "Balloon Styling", "Additional Balloon Styling", "Artificial Flowers", "Greenery Decorations", "Flower Arrangements", "Cake Stand"]
    },
    {
      src: "assets/gallery/Bridal%20Shower%20Set%20up.png",
      label: "Bridal Shower Table Setup",
      kind: "setup",
      events: ["Wedding", "Engagement"],
      themes: ["Elegant", "Pastel", "Luxury"],
      colors: ["Pink", "Gold", "White"],
      shownItems: ["Formal Table Setup", "Colourful Chair Ribbons", "Candle Holders", "Candle Lights", "Champagne Glasses", "Water Glasses", "Flower Arrangements", "Plates and Cutlery"]
    },
    {
      src: "assets/addons/wedding-arbour.png",
      label: "Wedding Arbour",
      kind: "product",
      exactItems: ["Wedding Arbour"],
      events: ["Wedding", "Engagement"],
      themes: ["Elegant", "Pastel"],
      colors: ["Pink", "White", "Neutral"],
      shownItems: ["Round Frame Arch", "Flower Arrangements"]
    },
    {
      src: "assets/addons/love-sign.png",
      label: "LOVE Sign",
      kind: "product",
      exactItems: ["LOVE Sign"],
      events: ["Wedding", "Engagement"],
      themes: ["Elegant", "Luxury"],
      colors: ["White"],
      shownItems: ["Neon Light"]
    },
    {
      src: "assets/addons/marquee-table-chair-setup.png",
      label: "Marquee Table and Chair Setup",
      kind: "product",
      exactItems: ["Marquee Table Setup"],
      events: ["Wedding", "Corporate", "Custom Event"],
      themes: ["Elegant", "Custom Theme"],
      colors: ["White", "Neutral"],
      shownItems: ["Folding Table", "Long Folding Table", "White Plastic Chair", "Outdoor Table Setup"]
    },
    {
      src: "assets/addons/lit-marquee.png",
      label: "Lit Marquee Setup",
      kind: "product",
      exactItems: ["Lit Marquee Setup"],
      events: ["Wedding", "Corporate", "Custom Event"],
      themes: ["Elegant", "Luxury"],
      colors: ["White", "Neutral"],
      shownItems: ["Background Lights", "Festoon / String Lights"]
    },
    {
      src: "assets/addons/formal-table-setting.png",
      label: "Formal Round Table Setting",
      kind: "product",
      exactItems: ["Formal Table Setup", "Round Table Setup", "Chair Bow Table Setup"],
      events: ["Wedding", "Engagement", "Corporate", "Custom Event"],
      themes: ["Elegant", "Luxury", "Pastel"],
      colors: ["Pink", "White"],
      shownItems: ["Colourful Chair Ribbons", "Champagne Glasses", "Water Glasses", "Flower Arrangements", "Plates and Cutlery"]
    },
    {
      src: "assets/addons/party-light.png",
      label: "Party Light",
      kind: "product",
      exactItems: ["Party Light"],
      events: ["Birthday", "Corporate", "Graduation", "Custom Event"],
      themes: ["Fun & Colorful", "Kids Party"],
      colors: ["Blue", "Purple"]
    },
    {
      src: "assets/addons/bubble-machine.png",
      label: "Bubble Machine",
      kind: "product",
      exactItems: ["Bubble Machine"],
      events: ["Birthday", "Custom Event"],
      themes: ["Kids Party", "Fun & Colorful"]
    },
    {
      src: "assets/addons/portable-speaker-microphone.png",
      label: "Portable Speaker and Microphone",
      kind: "product",
      exactItems: ["Portable Speaker & Microphone"],
      events: ["Corporate", "Graduation", "Custom Event"]
    },
    {
      src: "assets/addons/speaker-microphones.png",
      label: "Speaker and Microphones",
      kind: "product",
      exactItems: ["Speaker & Microphones"],
      events: ["Corporate", "Graduation", "Custom Event"]
    },
    {
      src: "assets/addons/cocktail-table.png",
      label: "Cocktail Table",
      kind: "product",
      exactItems: ["Cocktail Table"],
      events: ["Corporate", "Engagement", "Custom Event"]
    },
    {
      src: "assets/addons/chafing-dishes.png",
      label: "Chafing Dishes",
      kind: "product",
      exactItems: ["Chafing Dishes"],
      events: ["Corporate", "Wedding", "Custom Event"]
    },
    {
      src: "assets/addons/folding-table.png",
      label: "Folding Table",
      kind: "product",
      exactItems: ["Folding Table"]
    },
    {
      src: "assets/addons/folding-table-long.png",
      label: "Long Folding Table",
      kind: "product",
      exactItems: ["Long Folding Table"]
    },
    {
      src: "assets/addons/white-plastic-chair.png",
      label: "White Plastic Chair",
      kind: "product",
      exactItems: ["White Plastic Chair"],
      colors: ["White"]
    },
    {
      src: "assets/addons/plates-cutlery.png",
      label: "Plates and Cutlery",
      kind: "product",
      exactItems: ["Plates and Cutlery"],
      colors: ["White"]
    },
    {
      src: "assets/addons/kids-colourful-chairs.png",
      label: "Kids Colourful Chairs",
      kind: "product",
      exactItems: ["Kids Colourful Chairs"],
      events: ["Birthday"],
      themes: ["Kids Party", "Fun & Colorful"],
      colors: ["Blue", "Red", "Green"]
    },
    {
      src: "assets/gallery/Gatsby%20themed%20Party.png",
      label: "Gatsby Themed Party Backdrop",
      kind: "setup",
      events: ["Birthday", "Corporate"],
      themes: ["Gatsby", "Luxury", "Elegant"],
      colors: ["Gold"],
      shownItems: ["Arch Backdrop", "Balloon Styling", "Additional Balloon Styling"]
    },
    {
      src: "assets/gallery/Valentine%20Theme%201.png",
      label: "Valentine Balloon Backdrop",
      kind: "setup",
      events: ["Engagement", "Custom Event"],
      themes: ["Valentine", "Pastel", "Fun & Colorful"],
      colors: ["Pink", "Purple", "Gold"],
      shownItems: ["Arch Backdrop", "Balloon Styling", "Additional Balloon Styling", "Artificial Flowers", "Flower Arrangements", "Cake Stand"]
    },
    {
      src: "assets/gallery/Christmas%20Theme1.png",
      label: "Christmas Seasonal Setup",
      kind: "setup",
      events: ["Christmas / Seasonal", "Custom Event"],
      themes: ["Christmas"],
      colors: ["Red", "Green", "Gold", "White"],
      shownItems: ["Arch Backdrop", "Balloon Styling", "Additional Balloon Styling", "Cake Stand"]
    },
    {
      src: "assets/gallery/738395988_1773032303689777_2856028005893033296_n.jpg",
      label: "Pink Balloon Floral Backdrop",
      kind: "setup",
      events: ["Birthday", "Baby Shower", "Engagement"],
      themes: ["Pastel", "Elegant"],
      colors: ["Pink", "Gold", "White", "Neutral"],
      shownItems: ["Arch Backdrop", "Round Frame Arch", "Balloon Styling", "Additional Balloon Styling", "Artificial Flowers", "Flower Arrangements"]
    },
    {
      src: "assets/gallery/733443011_1399880695536006_6680311752568557163_n.jpg",
      label: "Red Carpet Balloon Setup",
      kind: "setup",
      events: ["Corporate", "Graduation", "Custom Event"],
      themes: ["Luxury", "Fun & Colorful", "Custom Theme"],
      colors: ["Red", "Gold", "White"],
      shownItems: ["Arch Backdrop", "Balloon Styling", "Additional Balloon Styling", "Outdoor Table Setup", "Colourful Chair Ribbons"]
    }
  ];

  function getSelectedColors() {
    const colors = paletteInputs.filter((input) => input.checked).map((input) => input.value);
    const custom = customColors.value.trim();
    if (custom) colors.push(`Custom: ${custom}`);
    return colors.length ? colors : ["Confirm colors"];
  }

  function getSelectedItems() {
    const includedItems = basePackage.value === "Backdrop Styling Package"
      ? backdropPackageIncludes.map((item) => ({ ...item, selected: true, included: true }))
      : [];

    const selectedAddons = addonOptions
      .map((option) => {
        const checkbox = option.querySelector("input[type='checkbox']");
        const quantity = option.querySelector("input[type='number']");
        return {
          name: checkbox.value,
          selected: checkbox.checked,
          quantity: Math.max(1, Number(quantity.value) || 1),
          included: false
        };
      })
      .filter((item) => item.selected);

    return [...includedItems, ...selectedAddons];
  }

  function updateAddonQuantityState() {
    addonOptions.forEach((option) => {
      const checkbox = option.querySelector("input[type='checkbox']");
      const quantity = option.querySelector("input[type='number']");
      if (!checkbox || !quantity) return;
      quantity.disabled = !checkbox.checked;
      option.classList.toggle("is-selected", checkbox.checked);
    });
  }

  function setActiveCategory(category) {
    categoryTabs.forEach((tab) => {
      const active = tab.dataset.categoryTab === category;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
    });

    categoryPanels.forEach((panel) => {
      panel.hidden = panel.dataset.categoryPanel !== category;
    });
  }

  function renderSelectedChips(items) {
    if (!selectedChips) return;
    const selectedAddons = items.filter((item) => !item.included);
    selectedChips.replaceChildren();

    if (!selectedAddons.length) {
      const empty = document.createElement("span");
      empty.className = "selected-chips-empty";
      empty.textContent = "No optional items selected yet";
      selectedChips.appendChild(empty);
      return;
    }

    selectedAddons.forEach((item) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "selected-chip";
      chip.dataset.removeItem = item.name;
      chip.setAttribute("aria-label", `Remove ${item.name}`);

      const label = document.createElement("span");
      label.textContent = item.name;

      const quantity = document.createElement("b");
      quantity.textContent = `x${item.quantity}`;

      const remove = document.createElement("i");
      remove.setAttribute("aria-hidden", "true");
      remove.textContent = "×";

      chip.append(label, quantity, remove);
      selectedChips.appendChild(chip);
    });
  }

  function updateItemBrowser(items) {
    const term = (itemSearch?.value || "").trim().toLowerCase();
    const selectedAddons = items.filter((item) => !item.included);

    categoryPanels.forEach((panel) => {
      const options = [...panel.querySelectorAll(".addon-option")];
      let visibleCount = 0;
      let selectedCount = 0;

      options.forEach((option) => {
        const checkbox = option.querySelector("input[type='checkbox']");
        const matchesSearch = !term || checkbox.value.toLowerCase().includes(term);
        const matchesSelection = !showSelectedOnly || checkbox.checked;
        const visible = matchesSearch && matchesSelection;
        option.hidden = !visible;
        if (visible) visibleCount += 1;
        if (checkbox.checked) selectedCount += 1;
      });

      const counter = customizer.querySelector(`#${panel.dataset.categoryPanel}Count`);
      if (counter) counter.textContent = `${selectedCount} / ${options.length}`;

      const empty = panel.querySelector(".item-empty");
      if (empty) empty.hidden = visibleCount > 0;
    });

    if (selectedOnly) {
      selectedOnly.classList.toggle("is-active", showSelectedOnly);
      selectedOnly.setAttribute("aria-pressed", String(showSelectedOnly));
    }

    renderSelectedChips(selectedAddons);
  }

  function updateProgress() {
    progressSteps.forEach((step) => {
      const name = step.dataset.progressStep;
      const complete = name === "details"
        || (name === "items" && reviewMode)
        || (name === "review" && !requestMessageWrap.hidden);
      const active = (name === "items" && !reviewMode)
        || (name === "review" && reviewMode && requestMessageWrap.hidden);

      step.classList.toggle("is-complete", complete);
      step.classList.toggle("is-active", active);
    });
  }

  function setCustomizerStatus(message, tone = "") {
    if (!customizerStatus) return;
    customizerStatus.textContent = message;
    customizerStatus.dataset.tone = tone;
  }

  function setDraftStatus(message, tone = "") {
    if (!draftStatus) return;
    draftStatus.textContent = message;
    draftStatus.dataset.tone = tone;
  }

  function getDraftState() {
    const activeCategory = categoryTabs.find((tab) => tab.classList.contains("is-active"))?.dataset.categoryTab || "addons";
    const selectedItems = addonOptions
      .map((option) => {
        const checkbox = option.querySelector("input[type='checkbox']");
        const quantity = option.querySelector("input[type='number']");
        return checkbox.checked
          ? { name: checkbox.value, quantity: Math.max(1, Number(quantity.value) || 1) }
          : null;
      })
      .filter(Boolean);

    return {
      version: 1,
      eventType: eventType.value,
      themeStyle: themeStyle.value,
      basePackage: basePackage.value,
      customColors: customColors.value,
      notes: packageNotes.value,
      palette: paletteInputs.filter((input) => input.checked).map((input) => input.value),
      items: selectedItems,
      activeCategory,
      previewView: setupStage.dataset.viewMode || "hybrid"
    };
  }

  function saveDraft() {
    if (suppressDraftSave) return;
    try {
      localStorage.setItem(draftStorageKey, JSON.stringify(getDraftState()));
      setDraftStatus("Draft saved on this device", "saved");
    } catch {
      setDraftStatus("Draft saving unavailable", "warning");
    }
  }

  function queueDraftSave() {
    if (suppressDraftSave) return;
    window.clearTimeout(draftSaveTimer);
    setDraftStatus("Saving draft...", "saving");
    draftSaveTimer = window.setTimeout(saveDraft, 320);
  }

  function clearSavedDraft() {
    window.clearTimeout(draftSaveTimer);
    try {
      localStorage.removeItem(draftStorageKey);
      setDraftStatus("Saved draft cleared", "saved");
    } catch {
      setDraftStatus("Draft saving unavailable", "warning");
    }
  }

  function setSelectValue(select, value) {
    if (!value) return;
    const valid = [...select.options].some((option) => option.value === value);
    if (valid) select.value = value;
  }

  function restoreDraft() {
    try {
      const saved = localStorage.getItem(draftStorageKey);
      if (!saved) return false;

      const draft = JSON.parse(saved);
      if (!draft || draft.version !== 1) return false;

      setSelectValue(eventType, draft.eventType);
      setSelectValue(themeStyle, draft.themeStyle);
      setSelectValue(basePackage, draft.basePackage);
      customColors.value = typeof draft.customColors === "string" ? draft.customColors : "";
      packageNotes.value = typeof draft.notes === "string" ? draft.notes : "";

      const savedPalette = Array.isArray(draft.palette) ? draft.palette : [];
      paletteInputs.forEach((input) => {
        input.checked = savedPalette.includes(input.value);
      });

      const itemQuantities = new Map(
        Array.isArray(draft.items)
          ? draft.items.map((item) => [item.name, Math.max(1, Number(item.quantity) || 1)])
          : []
      );

      addonOptions.forEach((option) => {
        const checkbox = option.querySelector("input[type='checkbox']");
        const quantity = option.querySelector("input[type='number']");
        checkbox.checked = itemQuantities.has(checkbox.value);
        quantity.value = itemQuantities.get(checkbox.value) || 1;
      });

      setActiveCategory(draft.activeCategory === "hire" ? "hire" : "addons");
      setPreviewView(draft.previewView || "hybrid");
      setDraftStatus("Saved draft restored", "saved");
      return true;
    } catch {
      clearSavedDraft();
      return false;
    }
  }

  function hasMeaningfulChanges() {
    const selectedPalette = paletteInputs.filter((input) => input.checked).map((input) => input.value).sort().join("|");
    const defaultPalette = ["Gold", "White"].sort().join("|");
    return eventType.selectedIndex !== 0
      || themeStyle.selectedIndex !== 0
      || basePackage.selectedIndex !== 0
      || customColors.value.trim() !== ""
      || packageNotes.value.trim() !== ""
      || selectedPalette !== defaultPalette
      || addonOptions.some((option) => option.querySelector("input[type='checkbox']").checked)
      || setupStage.dataset.viewMode !== "hybrid"
      || !requestMessageWrap.hidden;
  }

  function resetCustomizerState() {
    suppressDraftSave = true;
    builder.reset();
    requestMessage.value = "";
    requestMessageWrap.hidden = true;
    previousItems = new Set();
    showSelectedOnly = false;
    reviewMode = false;
    setActiveCategory("addons");
    setPreviewView("hybrid");
    setCustomizerStatus("Package builder reset.", "success");
    updateCustomizer();
    clearSavedDraft();
    suppressDraftSave = false;
  }

  function normalizePhotoMatchValue(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  function scorePhotoReference(reference, items) {
    const eventValue = normalizePhotoMatchValue(eventType.value);
    const themeValue = normalizePhotoMatchValue(themeStyle.value);
    const selectedColors = paletteInputs
      .filter((input) => input.checked)
      .map((input) => normalizePhotoMatchValue(input.value));
    const selectedItems = items.map((item) => normalizePhotoMatchValue(item.name));
    const normalizedEvents = (reference.events || []).map(normalizePhotoMatchValue);
    const normalizedThemes = (reference.themes || []).map(normalizePhotoMatchValue);
    const normalizedColors = (reference.colors || []).map(normalizePhotoMatchValue);
    const normalizedExactItems = (reference.exactItems || []).map(normalizePhotoMatchValue);
    const normalizedShownItems = (reference.shownItems || []).map(normalizePhotoMatchValue);
    const exactMatches = (reference.exactItems || []).filter((item, index) => selectedItems.includes(normalizedExactItems[index]));
    const shownMatches = (reference.shownItems || []).filter((item, index) => selectedItems.includes(normalizedShownItems[index]));
    const eventMatch = normalizedEvents.includes(eventValue);
    const themeMatch = normalizedThemes.includes(themeValue);
    const colorMatches = normalizedColors.filter((color) => selectedColors.includes(color));

    let score = exactMatches.length * 240;
    score += eventMatch ? 70 : 0;
    score += themeMatch ? 45 : 0;
    score += eventMatch && themeMatch ? 30 : 0;
    score += Math.min(shownMatches.length * 8, 32);
    score += Math.min(colorMatches.length * 3, 12);

    if (reference.kind === "product" && exactMatches.length === 0) score -= 120;

    return {
      ...reference,
      score,
      exactMatches,
      shownMatches,
      eventMatch,
      themeMatch,
      colorMatches
    };
  }

  function noVerifiedPhotoMatch(reason) {
    return {
      confidence: "none",
      badge: "No verified match",
      title: "No verified photo match",
      reason
    };
  }

  function chooseGalleryReference(items) {
    const candidates = galleryPreviewReferences
      .map((reference, index) => ({ ...scorePhotoReference(reference, items), index }))
      .sort((a, b) => b.score - a.score || a.index - b.index);
    const exactCandidate = candidates.find((candidate) => candidate.exactMatches.length > 0);
    const themeValue = normalizePhotoMatchValue(themeStyle.value);
    const conceptOnlyThemes = {
      mermaid: "The Mermaid asset is a generated concept, not a verified setup photo.",
      princess: "The Princess asset is a generated concept, not a verified setup photo.",
      boho: "The available Boho setup assets are generated concepts, not verified setup photos."
    };

    if (exactCandidate) {
      return {
        ...exactCandidate,
        confidence: "high",
        badge: "Exact product match",
        title: exactCandidate.label,
        reason: `Direct catalogue product reference for ${exactCandidate.exactMatches.join(", ")}. Other selected items, quantities, scale, and availability are not confirmed by this photo.`
      };
    }

    if (conceptOnlyThemes[themeValue]) {
      return noVerifiedPhotoMatch(`${conceptOnlyThemes[themeValue]} Choose Hybrid or 3D Layout for a concept preview.`);
    }

    const candidate = candidates[0];
    if (!candidate || candidate.score < 45) {
      return noVerifiedPhotoMatch("No visually reviewed catalogue photo clearly matches the current event, theme, or selected product.");
    }

    const matchedContext = [];
    if (candidate.eventMatch) matchedContext.push(eventType.value);
    if (candidate.themeMatch) matchedContext.push(themeStyle.value);
    const visibleDetails = candidate.shownMatches.slice(0, 3);
    const contextText = matchedContext.length
      ? `Matches ${matchedContext.join(" and ")}.`
      : "This is the closest visually related catalogue setup.";
    const detailText = visibleDetails.length
      ? ` Visible selected details: ${visibleDetails.join(", ")}.`
      : " Selected add-ons may not appear in the photo.";

    if (candidate.eventMatch && candidate.themeMatch) {
      return {
        ...candidate,
        confidence: "high",
        badge: "Strong setup match",
        title: candidate.label,
        reason: `${contextText}${detailText} It is a reference photo, not a confirmed package photo.`
      };
    }

    if (candidate.eventMatch || candidate.themeMatch || candidate.score >= 70) {
      return {
        ...candidate,
        confidence: "medium",
        badge: "Related setup",
        title: candidate.label,
        reason: `${contextText}${detailText} The event or theme is not an exact complete match.`
      };
    }

    return {
      ...candidate,
      confidence: "low",
      badge: "Inspiration only",
      title: candidate.label,
      reason: `${contextText}${detailText} This does not confirm the selected event, theme, or complete package.`
    };
  }

  function updateGalleryPreview(items) {
    if (!stagePhoto || !stagePhotoCaption || !setupStage) return;

    const match = chooseGalleryReference(items);
    const hasMatch = Boolean(match.src);

    setupStage.dataset.photoMatchConfidence = match.confidence;
    setupStage.dataset.galleryReference = hasMatch ? match.label : "No verified match";
    stagePhoto.dataset.hasMatch = String(hasMatch);

    if (photoMatchPanel) photoMatchPanel.dataset.confidence = match.confidence;
    if (photoMatchBadge) photoMatchBadge.textContent = match.badge;
    if (photoMatchTitle) photoMatchTitle.textContent = match.title;
    if (photoMatchReason) photoMatchReason.textContent = match.reason;

    if (!hasMatch) {
      stagePhoto.classList.remove("is-loaded");
      stagePhoto.src = blankImage;
      stagePhoto.alt = "";
      stagePhotoCaption.textContent = "No verified photo reference for this selection";
      if (stagePhotoEmptyText) stagePhotoEmptyText.textContent = match.reason;
      syncPhotoMatchVisibility();
      return;
    }

    const shouldSwap = stagePhoto.getAttribute("src") !== match.src;
    if (shouldSwap) {
      stagePhoto.classList.remove("is-loaded");
      stagePhoto.src = match.src;
    }

    const referenceType = match.kind === "product" ? "product" : "setup";
    stagePhoto.alt = `${match.label}, reviewed catalogue ${referenceType} reference`;
    stagePhotoCaption.textContent = `Catalogue ${referenceType} reference: ${match.label}`;
    syncPhotoMatchVisibility();
  }

  function visualChildCount(item, config) {
    const representativeCounts = {
      balloons: 8,
      lighting: 6,
      flowers: 4,
      decor: 4,
      greenery: 4,
      napkins: 3,
      candles: 3,
      chafing: 2,
      "place-settings": 3,
      pampas: 4,
      plinths: 3,
      tables: 1,
      chairs: 1,
      glassware: 3
    };

    if (config.visual && representativeCounts[config.visual]) {
      return representativeCounts[config.visual];
    }

    if (config.quantityChildren) {
      return 1;
    }

    if (config.baseChildren) {
      return config.baseChildren;
    }

    return config.children || 0;
  }

  function setPercent(child, property, value) {
    child.style.setProperty(property, `${Number(value).toFixed(2)}%`);
  }

  function placeInGrid(child, childIndex, count, columns, xStart, xEnd, yStart, yGap) {
    const columnCount = Math.min(columns, count);
    const row = Math.floor(childIndex / columnCount);
    const column = childIndex % columnCount;
    const x = columnCount === 1 ? (xStart + xEnd) / 2 : xStart + column * ((xEnd - xStart) / (columnCount - 1));
    const y = yStart + row * yGap;

    setPercent(child, "--x", x);
    setPercent(child, "--y", y);
  }

  function placePreviewChild(child, config, childIndex, count) {
    const progress = count === 1 ? 0.5 : childIndex / (count - 1);
    const activePreviewPalette = getPreviewPaletteValues();
    child.style.setProperty("--item-index", childIndex);
    child.style.setProperty("--item-count", count);
    child.style.setProperty("--pop-delay", `${childIndex * 55}ms`);

    switch (config.visual) {
      case "balloons": {
        const wave = Math.sin(progress * Math.PI);
        setPercent(child, "--x", 3 + progress * 94);
        setPercent(child, "--top", 63 - wave * 58 + (childIndex % 2) * 4);
        child.style.setProperty("--size", `${22 + (childIndex % 4) * 4}px`);
        child.style.setProperty("--balloon-color", activePreviewPalette[childIndex % activePreviewPalette.length]);
        break;
      }
      case "flowers":
      case "decor":
      case "greenery": {
        const side = childIndex % 2 === 0 ? 0 : 1;
        const pair = Math.floor(childIndex / 2);
        setPercent(child, "--x", side === 0 ? 5 + pair * 7 : 90 - pair * 7);
        setPercent(child, "--y", pair % 2 === 0 ? 2 : 18);
        child.style.setProperty("--size", `${24 + (childIndex % 3) * 4}px`);
        child.style.setProperty("--decor-color", activePreviewPalette[(childIndex + 2) % activePreviewPalette.length]);
        break;
      }
      case "napkins":
      case "candles":
      case "chafing":
      case "place-settings": {
        placeInGrid(child, childIndex, count, 4, 24, 76, 0, 18);
        child.style.setProperty("--size", `${20 + (childIndex % 2) * 4}px`);
        break;
      }
      case "pampas": {
        const side = childIndex % 2 === 0 ? 0 : 1;
        const pair = Math.floor(childIndex / 2);
        setPercent(child, "--x", side === 0 ? 7 + pair * 5 : 88 - pair * 5);
        child.style.setProperty("--height", `${62 + (childIndex % 4) * 9}px`);
        child.style.setProperty("--rotate", `${side === 0 ? -16 + pair * 4 : 16 - pair * 4}deg`);
        break;
      }
      case "plinths": {
        placeInGrid(child, childIndex, count, 4, 14, 86, 0, 22);
        child.style.setProperty("--width", `${32 + (childIndex % 3) * 7}px`);
        child.style.setProperty("--height", `${48 + (childIndex % 4) * 13}px`);
        break;
      }
      case "tables": {
        placeInGrid(child, childIndex, count, 4, 12, 88, 0, 36);
        child.style.setProperty("--width", `${Math.max(42, 70 - Math.min(count, 8) * 3)}px`);
        child.style.setProperty("--height", `${Math.max(24, 38 - Math.min(count, 8))}px`);
        break;
      }
      case "chairs": {
        placeInGrid(child, childIndex, count, 10, 6, 94, 0, 29);
        child.style.setProperty("--size", `${count > 22 ? 16 : count > 12 ? 20 : 24}px`);
        break;
      }
      case "glassware": {
        placeInGrid(child, childIndex, count, 10, 22, 78, 0, 18);
        child.style.setProperty("--height", `${16 + (childIndex % 2) * 4}px`);
        break;
      }
      case "lighting": {
        const arc = Math.sin(progress * Math.PI);
        setPercent(child, "--x", progress * 96);
        setPercent(child, "--top", 60 - arc * 52);
        break;
      }
      default:
        break;
    }
  }

  function applyFamilyLayout(object, config, slotIndex, slotCount) {
    const family = previewFamily(config);
    object.dataset.family = family;
    object.dataset.familySlot = String(slotIndex + 1);

    if (slotCount <= 1) return;

    const column = slotIndex % 2;
    const row = Math.floor(slotIndex / 2);

    switch (family) {
      case "tables":
        object.style.left = `${7 + column * 46}%`;
        object.style.bottom = `${12 + row * 10}%`;
        object.style.width = "40%";
        object.style.height = "18%";
        break;
      case "chairs":
        object.style.left = `${5 + column * 47}%`;
        object.style.bottom = `${5 + row * 9}%`;
        object.style.width = "43%";
        object.style.height = "18%";
        break;
      case "glassware":
        object.style.left = `${18 + column * 32}%`;
        object.style.bottom = `${25 + row * 7}%`;
        object.style.width = "32%";
        object.style.height = "10%";
        break;
      case "balloons":
        object.style.left = `${9 + column * 38}%`;
        object.style.bottom = `${55 - row * 8}%`;
        object.style.width = "48%";
        object.style.height = "27%";
        break;
      case "lighting":
        object.style.left = `${10 + column * 6}%`;
        object.style.top = `${6 + slotIndex * 3}%`;
        object.style.width = `${80 - column * 12}%`;
        break;
      case "flowers":
      case "decor":
      case "greenery":
        object.style.left = `${8 + column * 48}%`;
        object.style.bottom = `${20 + row * 8}%`;
        object.style.width = "38%";
        object.style.height = "20%";
        break;
      case "napkins":
      case "candles":
      case "chafing":
      case "place-settings":
        object.style.left = `${20 + column * 34}%`;
        object.style.bottom = `${27 + row * 7}%`;
        object.style.width = "30%";
        object.style.height = "11%";
        break;
      case "neon":
        object.style.left = `${18 + column * 34}%`;
        object.style.bottom = `${57 - row * 8}%`;
        object.style.width = "30%";
        break;
      case "arch":
      case "backdrop": {
        const inset = Math.min(slotIndex, 3) * 4;
        object.style.left = `${24 + inset}%`;
        object.style.bottom = `${30 + slotIndex * 1.5}%`;
        object.style.width = `${52 - inset * 2}%`;
        object.style.height = `${50 - Math.min(slotIndex, 3) * 4}%`;
        break;
      }
      case "marquee":
        object.style.left = `${8 + slotIndex * 3}%`;
        object.style.bottom = `${20 + slotIndex * 2}%`;
        object.style.width = `${84 - slotIndex * 6}%`;
        object.style.height = `${61 - slotIndex * 4}%`;
        break;
      case "speaker":
        object.style.right = `${8 + slotIndex * 18}%`;
        object.style.bottom = `${9 + row * 8}%`;
        break;
      default:
        break;
    }
  }

  function createPreviewObject(item, index, isNew, slotIndex = 0, slotCount = 1) {
    const config = previewMap[item.name];
    if (!config) return null;

    const object = document.createElement("div");
    object.className = `scene-object ${config.className}${isNew ? " is-new" : ""}`;
    object.dataset.item = item.name;
    object.dataset.quantity = item.quantity;
    if (config.variant) object.dataset.variant = config.variant;
    object.style.setProperty("--build-delay", `${Math.min(index, 10) * 80}ms`);
    object.style.zIndex = config.depth || 5;
    object.setAttribute("aria-label", `${item.name} preview object, quantity ${item.quantity}`);
    object.title = `${item.name} x ${item.quantity}`;

    if (config.text) {
      object.textContent = config.text;
    }

    const childCount = visualChildCount(item, config);
    if (childCount) {
      for (let childIndex = 0; childIndex < childCount; childIndex += 1) {
        const child = document.createElement("i");
        placePreviewChild(child, config, childIndex, childCount);
        object.appendChild(child);
      }
    }

    if (item.quantity > 1) {
      const quantityBadge = document.createElement("span");
      quantityBadge.className = "scene-qty";
      quantityBadge.textContent = `x${item.quantity}`;
      object.appendChild(quantityBadge);
    }

    applyFamilyLayout(object, config, slotIndex, slotCount);

    return object;
  }

  function renderPreview(items) {
    previewObjects.replaceChildren();
    stageEmpty.classList.toggle("is-hidden", items.length > 0);

    const renderableItems = items.filter((item) => previewMap[item.name]);
    const currentItems = new Set(renderableItems.map((item) => item.name));
    const familyTotals = new Map();
    const familyIndexes = new Map();

    renderableItems.forEach((item) => {
      const family = previewFamily(previewMap[item.name]);
      familyTotals.set(family, (familyTotals.get(family) || 0) + 1);
    });

    const density = renderableItems.length > 10
      ? "high"
      : renderableItems.length > 6
        ? "medium"
        : "comfortable";
    setupStage.dataset.density = density;

    if (previewObjectCount) {
      previewObjectCount.textContent = `${renderableItems.length} ${renderableItems.length === 1 ? "visual" : "visuals"} shown`;
    }

    if (sceneDensity) {
      const densityNames = {
        comfortable: "Comfortable scene",
        medium: "Compact scene",
        high: "Condensed scene"
      };
      sceneDensity.textContent = `${densityNames[density]} - all ${renderableItems.length} visuals shown`;
      sceneDensity.dataset.density = density;
    }

    if (previewSelectionSummary) {
      const names = renderableItems.map((item) => item.name);
      const visibleNames = names.slice(0, 4).join(" / ");
      const remaining = names.length - 4;
      previewSelectionSummary.textContent = names.length
        ? `${visibleNames}${remaining > 0 ? ` / +${remaining} more listed in the summary` : ""}`
        : "Choose catalogue items to begin the concept preview";
    }

    renderableItems.forEach((item, index) => {
      const family = previewFamily(previewMap[item.name]);
      const familyIndex = familyIndexes.get(family) || 0;
      familyIndexes.set(family, familyIndex + 1);
      const object = createPreviewObject(
        item,
        index,
        !previousItems.has(item.name),
        familyIndex,
        familyTotals.get(family)
      );
      if (object) previewObjects.appendChild(object);
    });

    previousItems = currentItems;
  }

  function summaryRow(label, value) {
    const row = document.createElement("div");
    row.className = "summary-row";

    const title = document.createElement("b");
    title.textContent = label;

    const detail = document.createElement("span");
    detail.textContent = value;

    row.append(title, detail);
    return row;
  }

  function summaryTagsRow(label, values, emptyText) {
    const row = document.createElement("div");
    row.className = "summary-row summary-tags-row";

    const title = document.createElement("b");
    title.textContent = label;

    const tags = document.createElement("div");
    tags.className = "summary-tags";

    if (!values.length) {
      const empty = document.createElement("span");
      empty.className = "summary-tag is-empty";
      empty.textContent = emptyText;
      tags.appendChild(empty);
    } else {
      values.forEach((value) => {
        const tag = document.createElement("span");
        tag.className = "summary-tag";
        tag.textContent = value;
        tags.appendChild(tag);
      });
    }

    row.append(title, tags);
    return row;
  }

  function renderSummary(items) {
    const includedItems = items.filter((item) => item.included);
    const selectedAddons = items.filter((item) => !item.included);
    const selectedCount = selectedAddons.length;

    if (selectedItemCount) {
      selectedItemCount.textContent = `${selectedCount} ${selectedCount === 1 ? "item" : "items"} selected`;
    }

    if (mobileSelectedCount) {
      mobileSelectedCount.textContent = `${selectedCount} optional ${selectedCount === 1 ? "item" : "items"} selected`;
    }

    packageSummary.replaceChildren(
      summaryRow("Event type", eventType.value),
      summaryRow("Catalogue theme", themeStyle.value),
      summaryTagsRow("Colors", getSelectedColors(), "Confirm colors"),
      summaryRow("Catalogue section", basePackage.value),
      summaryTagsRow("Package includes", includedItems.map((item) => `${item.name} x${item.quantity}`), "No set package inclusions"),
      summaryTagsRow("Selected add-ons", selectedAddons.map((item) => `${item.name} x${item.quantity}`), "No add-ons selected yet"),
      summaryRow("Notes", packageNotes.value.trim() || "No notes added yet")
    );
  }

  function buildRequestMessage(items) {
    const includedItems = items.filter((item) => item.included);
    const selectedAddons = items.filter((item) => !item.included);
    const includeLines = includedItems.length
      ? includedItems.map((item) => `- ${item.name}: ${item.quantity}`).join("\n")
      : "- No set package inclusions";
    const itemLines = selectedAddons.length
      ? selectedAddons.map((item) => `- ${item.name}: ${item.quantity}`).join("\n")
      : "- No add-ons selected yet";

    return [
      "Hello Fiesta Party Hire Yeppoon,",
      "",
      "I would like to request a package quote.",
      "",
      `Event type: ${eventType.value}`,
      `Catalogue theme/style: ${themeStyle.value}`,
      `Color palette: ${getSelectedColors().join(", ")}`,
      `Catalogue section: ${basePackage.value}`,
      "",
      "Package includes:",
      includeLines,
      "",
      "Selected add-ons / hire items:",
      itemLines,
      "",
      `Notes: ${packageNotes.value.trim() || "No extra notes added yet."}`,
      "",
      "Please confirm availability, quantities, setup details, and price on request."
    ].join("\n");
  }

  if (stagePhoto) {
    if (stagePhoto.complete && stagePhoto.dataset.hasMatch !== "false") {
      stagePhoto.classList.add("is-loaded");
    }
    stagePhoto.addEventListener("load", () => {
      stagePhoto.classList.toggle("is-loaded", stagePhoto.dataset.hasMatch !== "false");
    });
  }

  function updateCustomizer() {
    const items = getSelectedItems();
    updateAddonQuantityState();
    if (catalogueIncludes) {
      catalogueIncludes.hidden = basePackage.value !== "Backdrop Styling Package";
    }
    updateGalleryPreview(items);
    renderPreview(items);
    renderSummary(items);
    updateItemBrowser(items);
    updateProgress();

    if (!requestMessageWrap.hidden) {
      requestMessage.value = buildRequestMessage(items);
    }

    queueDraftSave();
  }

  builder.addEventListener("input", (event) => {
    if (event.target === itemSearch) {
      updateItemBrowser(getSelectedItems());
      return;
    }
    if (event.target.matches("select, input[type='checkbox']")) return;
    if (requestMessageWrap.hidden) reviewMode = false;
    setCustomizerStatus("");
    updateCustomizer();
  });

  builder.addEventListener("change", (event) => {
    if (event.target === itemSearch) return;
    if (event.target.matches("input[type='text'], input[type='number'], textarea")) return;
    if (requestMessageWrap.hidden) reviewMode = false;
    setCustomizerStatus("");
    updateCustomizer();
  });

  categoryTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      setActiveCategory(tab.dataset.categoryTab);
      tab.focus();
      queueDraftSave();
    });

    tab.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const currentIndex = categoryTabs.indexOf(tab);
      const nextIndex = event.key === "Home"
        ? 0
        : event.key === "End"
          ? categoryTabs.length - 1
          : event.key === "ArrowRight"
            ? (currentIndex + 1) % categoryTabs.length
            : (currentIndex - 1 + categoryTabs.length) % categoryTabs.length;
      const nextTab = categoryTabs[nextIndex];
      setActiveCategory(nextTab.dataset.categoryTab);
      nextTab.focus();
      queueDraftSave();
    });
  });

  previewViewButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setPreviewView(button.dataset.previewView);
      setCustomizerStatus(`${button.textContent.trim()} preview selected.`, "success");
      queueDraftSave();
    });

    button.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const currentIndex = previewViewButtons.indexOf(button);
      const nextIndex = event.key === "Home"
        ? 0
        : event.key === "End"
          ? previewViewButtons.length - 1
          : event.key === "ArrowRight"
            ? (currentIndex + 1) % previewViewButtons.length
            : (currentIndex - 1 + previewViewButtons.length) % previewViewButtons.length;
      const nextButton = previewViewButtons[nextIndex];
      setPreviewView(nextButton.dataset.previewView);
      nextButton.focus();
      queueDraftSave();
    });
  });

  selectedOnly?.addEventListener("click", () => {
    showSelectedOnly = !showSelectedOnly;
    updateItemBrowser(getSelectedItems());
  });

  clearItemSelections?.addEventListener("click", () => {
    addonOptions.forEach((option) => {
      const checkbox = option.querySelector("input[type='checkbox']");
      const quantity = option.querySelector("input[type='number']");
      checkbox.checked = false;
      quantity.value = 1;
    });
    showSelectedOnly = false;
    reviewMode = false;
    setCustomizerStatus("Optional selections cleared.", "success");
    updateCustomizer();
  });

  selectedChips?.addEventListener("click", (event) => {
    const chip = event.target.closest("[data-remove-item]");
    if (!chip) return;

    const option = addonOptions.find((candidate) => {
      const checkbox = candidate.querySelector("input[type='checkbox']");
      return checkbox.value === chip.dataset.removeItem;
    });

    if (option) {
      option.querySelector("input[type='checkbox']").checked = false;
      option.querySelector("input[type='number']").value = 1;
      setCustomizerStatus(`${chip.dataset.removeItem} removed.`, "success");
      updateCustomizer();
    }
  });

  function openPackageReview() {
    reviewMode = true;
    updateProgress();
    setCustomizerStatus("Your live summary is ready to review.", "success");
    summaryPanel.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start"
    });
  }

  reviewPackage?.addEventListener("click", openPackageReview);
  mobileReviewPackage?.addEventListener("click", openPackageReview);

  sendPackageRequest.addEventListener("click", () => {
    const items = getSelectedItems();
    requestMessage.value = buildRequestMessage(items);
    requestMessageWrap.hidden = false;
    reviewMode = true;
    updateProgress();
    setCustomizerStatus("Package request message prepared.", "success");
    requestMessage.focus();
    requestMessage.select();
  });

  resetPackage.addEventListener("click", () => {
    if (hasMeaningfulChanges() && resetConfirmDialog?.showModal) {
      resetConfirmDialog.showModal();
      return;
    }
    resetCustomizerState();
  });

  confirmReset?.addEventListener("click", resetCustomizerState);

  resetConfirmDialog?.addEventListener("click", (event) => {
    if (event.target === resetConfirmDialog) resetConfirmDialog.close("cancel");
  });

  buildPackagePreview.addEventListener("click", () => {
    previousItems = new Set();
    setupStage.classList.remove("is-building");
    void setupStage.offsetWidth;
    setupStage.classList.add("is-building");
    renderPreview(getSelectedItems());
    setCustomizerStatus("Live preview rebuilt from your current selections.", "success");
  });

  copyPackageRequest.addEventListener("click", async () => {
    requestMessage.select();
    try {
      await navigator.clipboard.writeText(requestMessage.value);
      copyPackageRequest.textContent = "Copied";
      setCustomizerStatus("Package request copied.", "success");
      setTimeout(() => {
        copyPackageRequest.textContent = "Copy Message";
      }, 1400);
    } catch {
      document.execCommand("copy");
      setCustomizerStatus("Package request copied.", "success");
    }
  });

  enhanceAddonOptions();
  const draftRestored = restoreDraft();
  if (!draftRestored) {
    setActiveCategory("addons");
    setPreviewView("hybrid");
  }
  updateCustomizer();
  suppressDraftSave = false;
}

function openLightbox(item) {
  const image = item.querySelector("img");
  const caption = item.querySelector("figcaption")?.textContent.trim() || image.alt;

  lastFocusedGalleryItem = item;
  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;
  lightboxCaption.textContent = caption;
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");
  lightboxClose.focus();
}

const galleryCategoryRules = {
  themes: /\b(birthday|baby shower|gatsby|christmas|valentine|carnival|butterfly|tropical|masquerade|train|kids|milestone|tuxedo|seasonal)\b/i,
  backdrops: /\b(backdrop|balloon|arch|column|display|entrance)\b/i,
  tables: /\b(table|chair|seating|centrepiece|buffet|banquet|dining|picnic)\b/i,
  marquees: /\bmarquee\b/i,
  ceremonies: /\b(wedding|bridal|ceremony|arbour|aisle)\b/i
};

function getGalleryCategories(item) {
  const image = item.querySelector("img");
  const caption = item.querySelector("figcaption")?.textContent || "";
  const searchableText = `${caption} ${image?.alt || ""}`;

  return Object.entries(galleryCategoryRules)
    .filter(([, pattern]) => pattern.test(searchableText))
    .map(([category]) => category);
}

function applyGalleryFilter(filter) {
  let visibleCount = 0;

  galleryItems.forEach((item) => {
    const categories = item.dataset.galleryCategories?.split(" ") || [];
    const isVisible = filter === "all" || categories.includes(filter);
    item.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });

  galleryFilterButtons.forEach((button) => {
    const isActive = button.dataset.galleryFilter === filter;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  if (galleryResultCount) {
    galleryResultCount.textContent = `${visibleCount} ${visibleCount === 1 ? "photo" : "photos"}`;
  }
}

galleryItems.forEach((item) => {
  const image = item.querySelector("img");
  const caption = item.querySelector("figcaption")?.textContent.trim() || image.alt;
  item.dataset.galleryCategories = getGalleryCategories(item).join(" ");

  item.tabIndex = 0;
  item.setAttribute("role", "button");
  item.setAttribute("aria-label", `Open gallery photo: ${caption}`);
  item.addEventListener("click", () => openLightbox(item));
  item.addEventListener("keydown", (event) => {
    if (!['Enter', ' '].includes(event.key)) return;
    event.preventDefault();
    openLightbox(item);
  });
});

galleryFilterButtons.forEach((button, buttonIndex) => {
  button.addEventListener("click", () => applyGalleryFilter(button.dataset.galleryFilter));
  button.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const nextIndex = event.key === "Home"
      ? 0
      : event.key === "End"
        ? galleryFilterButtons.length - 1
        : event.key === "ArrowRight"
          ? (buttonIndex + 1) % galleryFilterButtons.length
          : (buttonIndex - 1 + galleryFilterButtons.length) % galleryFilterButtons.length;
    galleryFilterButtons[nextIndex].focus();
    galleryFilterButtons[nextIndex].click();
  });
});

applyGalleryFilter("all");

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-open");
  lightboxImage.src = blankImage;
  lastFocusedGalleryItem?.focus();
}

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && siteNav.classList.contains("is-open")) {
    closeSiteNavigation(true);
  }

  if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
    closeLightbox();
  }

  if (event.key === "Tab" && lightbox.classList.contains("is-open")) {
    event.preventDefault();
    lightboxClose.focus();
  }
});
