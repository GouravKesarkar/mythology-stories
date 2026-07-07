/* ==========================================================================
   Itihasa — shared data & helpers
   ========================================================================== */

// Master catalogue of epics. `status: "available"` lights the diya icon.
const EPICS = {
  ramayana: {
    dev: "रामायण",
    en: "Ramayana",
    tagline: "Rama's journey of duty, exile and return.",
    status: "available",
  },
  mahabharata: {
    dev: "महाभारत",
    en: "Mahabharata",
    tagline: "The great war of the Kuru dynasty.",
    status: "soon",
  },
  bhagavadGita: {
    dev: "भगवद्गीता",
    en: "Bhagavad Gita",
    tagline: "Krishna's counsel to Arjuna at Kurukshetra.",
    status: "soon",
  },
  shivaPurana: {
    dev: "शिव पुराण",
    en: "Shiva Purana",
    tagline: "The legends and glory of Lord Shiva.",
    status: "soon",
  },
  vishnuPurana: {
    dev: "विष्णु पुराण",
    en: "Vishnu Purana",
    tagline: "Creation, dynasties and the ways of Vishnu.",
    status: "soon",
  },
  bhagavataPurana: {
    dev: "भागवत पुराण",
    en: "Bhagavata Purana",
    tagline: "The devotional life and lilas of Krishna.",
    status: "soon",
  },
  deviBhagavataPurana: {
    dev: "देवी भागवत पुराण",
    en: "Devi Bhagavata Purana",
    tagline: "The glory of the Divine Mother.",
    status: "soon",
  },
  markandeyaPurana: {
    dev: "मार्कण्डेय पुराण",
    en: "Markandeya Purana",
    tagline: "Sage Markandeya's timeless dialogues.",
    status: "soon",
  },
  skandaPurana: {
    dev: "स्कन्द पुराण",
    en: "Skanda Purana",
    tagline: "The largest Purana, centred on Kartikeya.",
    status: "soon",
  },
};

const LANGUAGES = {
  hindi: { label: "हिन्दी", sub: "Read in Hindi" },
  marathi: { label: "मराठी", sub: "Read in Marathi" },
  english: { label: "English", sub: "Read in English" },
};

/** Inline SVG for the diya (oil lamp) signature icon. */
function diyaIcon(lit) {
  const cls = lit ? "diya diya--lit" : "diya diya--unlit";
  return `
  <svg class="${cls}" viewBox="0 0 26 30" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <ellipse class="diya-glow" cx="13" cy="8" rx="9" ry="9" fill="var(--accent-soft)" opacity="0.35"/>
    <path class="diya-flame" d="M13 3c1.6 2 2.6 3.6 2.6 5.2 0 1.6-1.16 2.6-2.6 2.6s-2.6-1-2.6-2.6C10.4 6.6 11.4 5 13 3z"/>
    <path d="M2 20c0 4 4.5 7 11 7s11-3 11-7c0-1.4-1.4-2.4-3.2-2.9 1-.5 1.6-1.2 1.6-2.1 0-1.9-2.7-3.4-6.2-3.9v1.6c2.5.4 4.2 1.4 4.2 2.3 0 1.1-2.4 2-5.4 2.2v-1.9h-3.8v1.9C8.2 17 5.8 16.1 5.8 15c0-.9 1.7-1.9 4.2-2.3v-1.6C6.5 11.6 3.8 13.1 3.8 15c0 .9.6 1.6 1.6 2.1C3.6 17.6 2.2 18.6 2.2 20z" fill="var(--ink-soft)" opacity="0.85"/>
  </svg>`;
}

/** Builds the sticky header. `backHref`/`backLabel` are optional.
 *  Pass `withProgress: true` to include a progress-bar row fused to the
 *  bottom of the same sticky box (used by the reader page) — update it
 *  later via `setHeaderProgress(fraction)`. */
function renderHeader({ backHref, backLabel, withProgress } = {}) {
  const back = backHref
    ? `<a class="header-back" href="${backHref}">‹ <span class="label">${backLabel || "Back"}</span></a>`
    : "";
  const progress = withProgress
    ? `<div class="progress-track"><div class="progress-fill" id="headerProgressFill"></div></div>`
    : "";
  return `
  <header class="site-header">
    <div class="site-header__inner">
      <a class="brand" href="${rootPath()}index.html">
        <svg class="brand__mark" viewBox="0 0 26 30" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M13 3c1.6 2 2.6 3.6 2.6 5.2 0 1.6-1.16 2.6-2.6 2.6s-2.6-1-2.6-2.6C10.4 6.6 11.4 5 13 3z" fill="var(--accent-soft)"/>
          <path d="M2 20c0 4 4.5 7 11 7s11-3 11-7c0-1.4-1.4-2.4-3.2-2.9 1-.5 1.6-1.2 1.6-2.1 0-1.9-2.7-3.4-6.2-3.9v1.6c2.5.4 4.2 1.4 4.2 2.3 0 1.1-2.4 2-5.4 2.2v-1.9h-3.8v1.9C8.2 17 5.8 16.1 5.8 15c0-.9 1.7-1.9 4.2-2.3v-1.6C6.5 11.6 3.8 13.1 3.8 15c0 .9.6 1.6 1.6 2.1C3.6 17.6 2.2 18.6 2.2 20z" fill="#fff8ec"/>
        </svg>
        <span class="brand__text">
          <span class="brand__title">Itihasa</span>
          <span class="brand__subtitle">Indian Epics Retold</span>
        </span>
      </a>
      ${back}
    </div>
    ${progress}
  </header>`;
}

/** Updates the progress bar fused into the header (see `withProgress` above). */
function setHeaderProgress(fraction) {
  const fill = document.getElementById("headerProgressFill");
  if (fill) fill.style.width = `${Math.max(0, Math.min(1, fraction)) * 100}%`;
}


function renderBreadcrumb(items) {
  const parts = items.map((item, i) => {
    const isLast = i === items.length - 1;
    if (isLast || !item.href) {
      return `<span class="breadcrumb__current">${item.label}</span>`;
    }
    return `<a href="${item.href}">${item.label}</a>`;
  });
  return `<nav class="breadcrumb" aria-label="Breadcrumb">${parts.join(
    '<span class="breadcrumb__sep">/</span>'
  )}</nav>`;
}

function renderFooter() {
  return `
  <footer class="site-footer">
    <div class="site-footer__inner">
      <a href="https://wa.me/?text=%F0%9F%93%9A%20Check%20out%20this%20Indian%20Epics%20Retold%20App!%20Install%20on%20mobile%20here%3A%20https%3A%2F%2Findian-epics.pages.dev%2F"
         class="share-btn" target="_blank" rel="noopener">
        Share via WhatsApp
      </a>
      <p>© 2025–2026 Itihasa · Indian Epics Retold · Developed by MK &amp; GK</p>
    </div>
  </footer>`;
}

/** Relative path back to the site root, based on current location depth. */
function rootPath() {
  return "./";
}

/** Very small formatter for the story text: markdown-style **bold** → <strong>,
 *  keeps any inline HTML (<u>, <p>, <br>) already present in the source data,
 *  and wraps loose text in paragraphs so semantics stay clean. */
function formatStoryText(raw) {
  let html = raw.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  if (!/^\s*<p>/i.test(html)) {
    html = `<p>${html}</p>`;
  }
  return html;
}

/** Registers the PWA install prompt as a small dismissible toast. */
function initInstallPrompt() {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    const toast = document.createElement("div");
    toast.className = "install-toast";
    toast.innerHTML = `
      <span>Install Itihasa for offline reading</span>
      <button type="button" data-action="install">Install</button>
      <button type="button" class="install-toast__dismiss" aria-label="Dismiss">&times;</button>
    `;
    document.body.appendChild(toast);

    toast.querySelector('[data-action="install"]').addEventListener("click", () => {
      e.prompt();
      e.userChoice.finally(() => toast.remove());
    });
    toast.querySelector(".install-toast__dismiss").addEventListener("click", () => {
      toast.remove();
    });
  });
}
