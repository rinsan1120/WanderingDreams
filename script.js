const archives = [
  {
    id: "event-03",
    date: "2026.06.20",
    title: "第3回　漂泊ノ夢",
    description: "静かな夜に三つの作品をお届けした朗読会です。動画IDと内容は仮のものです。",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    program: [
      "星の王子さま（後編）",
      "智恵子抄／織姫と彦星",
      "年とったカシワの木のさいごの夢"
    ]
  },
  {
    id: "event-02",
    date: "2026.05.23",
    title: "第2回　漂泊ノ夢",
    description: "声と物語に身をあずける、二度目の夜。YouTube動画IDを差し替えてお使いください。",
    youtubeId: "ScMzIvxBSi4",
    thumbnail: "https://img.youtube.com/vi/ScMzIvxBSi4/maxresdefault.jpg",
    program: [
      "朗読作品A",
      "朗読作品B",
      "朗読作品C"
    ]
  },
  {
    id: "event-01",
    date: "2026.04.18",
    title: "第1回　漂泊ノ夢",
    description: "漂泊ノ夢、最初の朗読会。海の静けさとともに始まった夜の記録です。",
    youtubeId: "aqz-KE-bpKQ",
    thumbnail: "https://img.youtube.com/vi/aqz-KE-bpKQ/maxresdefault.jpg",
    program: [
      "星の王子さま（前編）",
      "朗読作品B",
      "朗読作品C"
    ]
  }
];

const casts = [
  {
    name: "Aさん",
    favorite: "星の王子さま",
    comment: "柔らかな声で物語をお届けします。",
    image: "assets/cast-placeholder-a.jpg",
    links: [
      {
        label: "Xを見る",
        url: "https://x.com/usernameA"
      },
      {
        label: "VRChat",
        url: "https://vrchat.com/home/user/usr_xxxxx"
      },
      {
        label: "YouTube",
        url: "https://www.youtube.com/@usernameA"
      }
    ]
  },
  {
    name: "Bさん",
    favorite: "智恵子抄",
    comment: "詩の響きと感情の流れを大切に朗読します。",
    image: "assets/cast-placeholder-b.jpg",
    links: [
      {
        label: "Xを見る",
        url: "https://x.com/usernameB"
      },
      {
        label: "VRChat",
        url: "https://vrchat.com/home/user/usr_xxxxx"
      }
    ]
  },
  {
    name: "Cさん",
    favorite: "年とったカシワの木のさいごの夢",
    comment: "物語のあたたかさと切なさを、穏やかな声でお届けします。",
    image: "assets/cast-placeholder-c.jpg",
    links: [
      {
        label: "Xを見る",
        url: "https://x.com/usernameC"
      }
    ]
  },
  {
    name: "漂泊ノ海 駅長",
    favorite: "夜や海を感じられる物語",
    comment: "朗読会の企画と会場運営を担当しています。",
    image: "assets/cast-placeholder-d.jpg",
    links: [
      {
        label: "Xを見る",
        url: "https://x.com/hyohakupost"
      },
      {
        label: "VRChat",
        url: "https://vrchat.com/home/user/usr_xxxxx"
      }
    ]
  }
];



const archiveSelect = document.getElementById("archiveSelect");
const archiveList = document.getElementById("archiveList");
const archiveDate = document.getElementById("archiveDate");
const archiveTitle = document.getElementById("archiveTitle");
const archiveDescription = document.getElementById("archiveDescription");
const archiveThumbnail = document.getElementById("archiveThumbnail");
const archiveProgram = document.getElementById("archiveProgram");
const castGrid = document.getElementById("castGrid");

const videoModal = document.getElementById("videoModal");
const videoFrame = document.getElementById("videoFrame");
const openVideoButton = document.getElementById("openVideoButton");
const openVideoButtonBottom = document.getElementById("openVideoButtonBottom");
const closeVideoButton = document.getElementById("closeVideoButton");

const menuButton = document.getElementById("menuButton");
const globalNav = document.getElementById("globalNav");
const siteHeader = document.querySelector(".site-header");
const heroPhotoLayer = document.getElementById("heroPhotoLayer");

let activeArchive = archives[0];

function setupHeroPhotos() {
  const photoPaths = [
    "assets/photo1.jpg",
    "assets/photo2.jpg",
    "assets/photo3.jpg",
    "assets/photo4.jpg",
    "assets/photo5.jpg"
  ];

  if (!heroPhotoLayer || photoPaths.length === 0) return;

  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const mobileQuery = window.matchMedia("(max-width: 620px)");
  const photoSlots = [];
  let resizeTimer = 0;

  const randomBetween = (min, max) => {
    const lower = Math.min(min, max);
    const upper = Math.max(min, max);
    return Math.random() * (upper - lower) + lower;
  };

  function clearPhotoSlots() {
    photoSlots.forEach((slot) => window.clearTimeout(slot.timer));
    photoSlots.length = 0;
    heroPhotoLayer.replaceChildren();
  }

  function getPhotoPosition(width, height, isMobile) {
    const side = Math.random() < 0.5 ? "left" : "right";

    if (isMobile) {
      const topZones = [
        { min: 6, max: 18 },
        { min: 72, max: 86 }
      ];
      const zone = topZones[Math.floor(Math.random() * topZones.length)];

      return {
        left: side === "left"
          ? randomBetween(-width * 0.18, Math.max(8, window.innerWidth * 0.18 - width))
          : randomBetween(window.innerWidth * 0.82, window.innerWidth - width * 0.82),
        top: randomBetween(window.innerHeight * zone.min / 100, window.innerHeight * zone.max / 100 - height)
      };
    }

    return {
      left: side === "left"
        ? randomBetween(-width * 0.12, Math.max(16, window.innerWidth * 0.30 - width))
        : randomBetween(window.innerWidth * 0.70, window.innerWidth - width * 0.88),
      top: randomBetween(
        Math.max(86, window.innerHeight * 0.08),
        Math.max(96, window.innerHeight * 0.88 - height)
      )
    };
  }

  function hidePhoto(slot) {
    slot.element.style.opacity = "0";
    slot.element.style.transitionDuration = `${slot.fadeOut}s, ${slot.moveDuration}s`;
    slot.timer = window.setTimeout(
      () => showPhoto(slot),
      slot.fadeOut * 1000 + randomBetween(1000, 8000)
    );
  }

  function showPhoto(slot) {
    const isMobile = mobileQuery.matches;
    const width = randomBetween(isMobile ? 110 : 180, isMobile ? 190 : 320);
    const ratio = Number(slot.element.dataset.ratio) || 1.5;
    const height = width / ratio;
    const position = getPhotoPosition(width, height, isMobile);
    const moveX = randomBetween(-18, 18);
    const moveY = randomBetween(-14, 14);
    const startRotation = randomBetween(-4, 4);
    const endRotation = startRotation + randomBetween(-1.4, 1.4);
    const startScale = randomBetween(0.94, 0.98);
    const endScale = randomBetween(1.02, 1.08);
    const fadeIn = randomBetween(1.5, 3);
    const visibleTime = randomBetween(5000, 10000);

    slot.fadeOut = randomBetween(1.5, 3);
    slot.moveDuration = (fadeIn * 1000 + visibleTime + slot.fadeOut * 1000) / 1000;

    slot.element.src = photoPaths[slot.photoIndex];
    slot.photoIndex = (slot.photoIndex + 1 + Math.floor(Math.random() * (photoPaths.length - 1))) % photoPaths.length;
    slot.element.style.left = `${position.left}px`;
    slot.element.style.top = `${position.top}px`;
    slot.element.style.setProperty("--photo-width", `${width}px`);
    slot.element.style.setProperty("--photo-start-x", "0px");
    slot.element.style.setProperty("--photo-start-y", "0px");
    slot.element.style.setProperty("--photo-start-rotation", `${startRotation}deg`);
    slot.element.style.setProperty("--photo-start-scale", startScale);
    slot.element.style.setProperty("--photo-fade-duration", `${fadeIn}s`);
    slot.element.style.setProperty("--photo-move-duration", `${slot.moveDuration}s`);
    slot.element.style.transitionDuration = `${fadeIn}s, ${slot.moveDuration}s`;
    slot.element.style.opacity = "0";
    slot.element.style.transform =
      `translate3d(0, 0, 0) rotate(${startRotation}deg) scale(${startScale})`;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        slot.element.style.opacity = `${randomBetween(0.55, 0.85)}`;
        slot.element.style.transform =
          `translate3d(${moveX}px, ${moveY}px, 0) rotate(${endRotation}deg) scale(${endScale})`;
      });
    });

    slot.timer = window.setTimeout(() => hidePhoto(slot), fadeIn * 1000 + visibleTime);
  }

  function buildStaticPhotos() {
    const isMobile = mobileQuery.matches;
    const staticPhotos = isMobile
      ? [
          { path: photoPaths[0], width: 138, left: "calc(100% - 116px)", top: "9%", rotation: 2 }
        ]
      : [
          { path: photoPaths[0], width: 240, left: "3%", top: "16%", rotation: -2 },
          { path: photoPaths[1], width: 260, left: "calc(100% - 290px)", top: "58%", rotation: 2 }
        ];

    staticPhotos.forEach((photo) => {
      const element = document.createElement("img");
      element.className = "hero-photo hero-photo--static";
      element.src = photo.path;
      element.alt = "";
      element.style.left = photo.left;
      element.style.top = photo.top;
      element.style.setProperty("--photo-width", `${photo.width}px`);
      element.style.opacity = "0.68";
      element.style.transform = `rotate(${photo.rotation}deg)`;
      element.style.transition = "none";
      heroPhotoLayer.appendChild(element);
    });
  }

  function buildPhotoSlots() {
    clearPhotoSlots();
    if (motionQuery.matches) {
      buildStaticPhotos();
      return;
    }

    const slotCount = mobileQuery.matches ? 2 : 4;

    for (let index = 0; index < slotCount; index += 1) {
      const element = document.createElement("img");
      const slot = {
        element,
        fadeOut: 2,
        moveDuration: 10,
        photoIndex: index % photoPaths.length,
        timer: 0
      };

      element.className = "hero-photo";
      element.alt = "";
      element.addEventListener("load", () => {
        if (element.naturalWidth && element.naturalHeight) {
          element.dataset.ratio = String(element.naturalWidth / element.naturalHeight);
          element.style.setProperty("--photo-ratio", `${element.naturalWidth} / ${element.naturalHeight}`);
        }
      });
      heroPhotoLayer.appendChild(element);
      photoSlots.push(slot);
      slot.timer = window.setTimeout(() => showPhoto(slot), randomBetween(300, 5500));
    }
  }

  buildPhotoSlots();

  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(buildPhotoSlots, 250);
  });
  motionQuery.addEventListener("change", buildPhotoSlots);
  window.addEventListener("pagehide", clearPhotoSlots, { once: true });
}

function renderArchiveControls() {
  archiveSelect.innerHTML = archives
    .map((archive) => `<option value="${archive.id}">${archive.date}　${archive.title}</option>`)
    .join("");

  archiveList.innerHTML = archives
    .map(
      (archive, index) => `
        <button
          type="button"
          data-archive-id="${archive.id}"
          class="${index === 0 ? "is-active" : ""}"
          aria-pressed="${index === 0 ? "true" : "false"}"
        >
          <span class="archive-list__date">${archive.date}</span>
          <span class="archive-list__title">${archive.title}</span>
        </button>
      `
    )
    .join("");
}

function renderArchive(archiveId) {
  const archive = archives.find((item) => item.id === archiveId);
  if (!archive) return;

  activeArchive = archive;
  archiveSelect.value = archive.id;
  archiveDate.textContent = archive.date;
  archiveTitle.textContent = archive.title;
  archiveDescription.textContent = archive.description;
  archiveThumbnail.src = archive.thumbnail;
  archiveThumbnail.alt = `${archive.title}の動画サムネイル`;

  archiveProgram.innerHTML = `
    <h4>PROGRAM</h4>
    <ul>
      ${archive.program.map((item) => `<li>${item}</li>`).join("")}
    </ul>
  `;

  archiveList.querySelectorAll("button").forEach((button) => {
    const isActive = button.dataset.archiveId === archive.id;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function renderCasts() {
  castGrid.innerHTML = casts.map(cast => `
    <article class="cast-card">
      <div class="cast-card__image">
        <img src="${cast.image}" alt="${cast.name}のプロフィール画像" loading="lazy">
      </div>
      <div class="cast-card__body">
        <h3>${cast.name}</h3>
        <p><strong>好きな作品:</strong> ${cast.favorite}</p>
        <p>${cast.comment}</p>
        <div class="cast-card__links">
          ${cast.links.map(link => `<a class="social-link" href="${link.url}" target="_blank" rel="noopener noreferrer">${link.label}</a>`).join("")}
        </div>
      </div>
    </article>
  `).join("");
}

function openVideo() {
  videoFrame.src = `https://www.youtube-nocookie.com/embed/${activeArchive.youtubeId}?autoplay=1`;
  videoModal.showModal();
}

function closeVideo() {
  videoFrame.src = "";
  videoModal.close();
}

archiveSelect.addEventListener("change", (event) => {
  renderArchive(event.target.value);
});

archiveList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-archive-id]");
  if (!button) return;
  renderArchive(button.dataset.archiveId);
});

openVideoButton.addEventListener("click", openVideo);
openVideoButtonBottom.addEventListener("click", openVideo);
closeVideoButton.addEventListener("click", closeVideo);

videoModal.addEventListener("click", (event) => {
  if (event.target === videoModal) {
    closeVideo();
  }
});

videoModal.addEventListener("cancel", () => {
  videoFrame.src = "";
});

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "メニューを開く" : "メニューを閉じる");
  globalNav.classList.toggle("is-open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

globalNav.addEventListener("click", (event) => {
  if (!event.target.matches("a")) return;
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "メニューを開く");
  globalNav.classList.remove("is-open");
  document.body.classList.remove("menu-open");
});

window.addEventListener("scroll", () => {
  siteHeader.classList.toggle("is-scrolled", window.scrollY > 30);
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

const navLinks = [...document.querySelectorAll(".global-nav a")];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const navObserver = new IntersectionObserver(
  (entries) => {
    const visibleEntry = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visibleEntry) return;

    navLinks.forEach((link) => {
      link.classList.toggle(
        "is-active",
        link.getAttribute("href") === `#${visibleEntry.target.id}`
      );
    });
  },
  {
    rootMargin: "-25% 0px -60% 0px",
    threshold: [0.05, 0.2, 0.5]
  }
);

sections.forEach((section) => navObserver.observe(section));

setupHeroPhotos();
renderArchiveControls();
renderArchive(archives[0].id);
renderCasts();
