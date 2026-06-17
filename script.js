import { archives } from "./archives-data.js";
import { casts, staffs } from "./members-data.js";

const archiveList = document.getElementById("archiveList");
const archiveDate = document.getElementById("archiveDate");
const archiveTitle = document.getElementById("archiveTitle");
const archiveThumbnail = document.getElementById("archiveThumbnail");
const archiveProgram = document.getElementById("archiveProgram");
const castGrid = document.getElementById("castGrid");
const staffGrid = document.getElementById("staffGrid");

const videoModal = document.getElementById("videoModal");
const videoFrame = document.getElementById("videoFrame");
const openVideoButton = document.getElementById("openVideoButton");
const closeVideoButton = document.getElementById("closeVideoButton");

const openRulesButton = document.getElementById("openRulesButton");
const closeRulesButton = document.getElementById("closeRulesButton");
const rulesModal = document.getElementById("rulesModal");
const rulesModalContent = document.getElementById("rulesModalContent");

const menuButton = document.getElementById("menuButton");
const globalNav = document.getElementById("globalNav");
const siteHeader = document.querySelector(".site-header");

const PARTICIPATION_RULES_URL = "content/participation-rules.html";

let activeArchive = archives[0];
let participationRulesLoaded = false;

function renderArchiveControls() {
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
  archiveDate.textContent = archive.date;
  archiveTitle.textContent = archive.title;
  archiveThumbnail.src = archive.thumbnail;
  archiveThumbnail.alt = `${archive.title}の動画サムネイル`;

  const programTitle = document.createElement("h4");
  programTitle.textContent = "PROGRAM";

  const programList = document.createElement("ul");
  archive.program.forEach((item) => {
    const programItem = document.createElement("li");
    programItem.className = "program-item";

    const reader = document.createElement("span");
    reader.className = "program-item__reader";
    reader.textContent = `朗読：${item.reader}`;

    const work = document.createElement("span");
    work.className = "program-item__work";
    work.textContent = `『${item.title}』　${item.author} 著`;

    programItem.append(reader, work);
    programList.append(programItem);
  });

  const videoStaffRows = [
    ["動画撮影", archive.videoStaff?.camera],
    ["動画編集", archive.videoStaff?.editor]
  ].filter(([, staffName]) => staffName);

  archiveProgram.replaceChildren(programTitle, programList);

  // 開催回ごとの動画担当者はarchives-data.jsだけで管理します。
  if (videoStaffRows.length > 0) {
    const videoStaff = document.createElement("div");
    videoStaff.className = "archive-video-staff";

    const definitionList = document.createElement("dl");

    videoStaffRows.forEach(([label, staffName]) => {
      const row = document.createElement("div");
      const term = document.createElement("dt");
      const description = document.createElement("dd");

      term.textContent = label;
      description.textContent = staffName;

      row.append(term, description);
      definitionList.append(row);
    });

    videoStaff.append(definitionList);
    archiveProgram.append(videoStaff);
  }

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
        <p>${cast.comment}</p>
        <div class="cast-card__links">
          ${cast.links.map(link => `<a class="social-link" href="${link.url}" target="_blank" rel="noopener noreferrer">${link.label}</a>`).join("")}
        </div>
      </div>
    </article>
  `).join("");
}

function renderStaffs() {
  staffGrid.innerHTML = staffs.map(staff => `
    <article class="staff-card">
      <div class="staff-card__image">
        <img src="${staff.image}" alt="${staff.name}のプロフィール画像" loading="lazy">
      </div>
      <div class="staff-card__body">
        <h3>${staff.name}</h3>
        <p><strong>担当:</strong> ${staff.favorite}</p>
        <p>${staff.comment}</p>
        <div class="staff-card__links">
          ${staff.links.map(link => `<a class="social-link" href="${link.url}" target="_blank" rel="noopener noreferrer">${link.label}</a>`).join("")}
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

async function openRulesModal() {
  rulesModal.showModal();

  requestAnimationFrame(() => {
    rulesModal.classList.add("is-visible");
  });

  if (participationRulesLoaded) {
    return;
  }

  rulesModalContent.innerHTML =
    '<p class="rules-modal__loading">参加ルールを読み込んでいます。</p>';

  try {
    const response = await fetch(PARTICIPATION_RULES_URL, {
      cache: "no-cache"
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const html = await response.text();
    rulesModalContent.innerHTML = html;
    participationRulesLoaded = true;
  } catch (error) {
    console.error("参加ルールの読み込みに失敗しました。", error);

    rulesModalContent.innerHTML = `
      <p class="rules-modal__error">
        参加ルールを読み込めませんでした。時間をおいて再度お試しください。
      </p>
    `;
  }
}

function closeRulesModal() {
  rulesModal.classList.remove("is-visible");
  rulesModal.close();
}



archiveList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-archive-id]");
  if (!button) return;
  renderArchive(button.dataset.archiveId);
});

openVideoButton.addEventListener("click", openVideo);
closeVideoButton.addEventListener("click", closeVideo);

videoModal.addEventListener("click", (event) => {
  if (event.target === videoModal) {
    closeVideo();
  }
});

videoModal.addEventListener("cancel", () => {
  videoFrame.src = "";
});

if (openRulesButton && closeRulesButton && rulesModal && rulesModalContent) {
  openRulesButton.addEventListener("click", openRulesModal);
  closeRulesButton.addEventListener("click", closeRulesModal);

  rulesModal.addEventListener("click", (event) => {
    if (event.target === rulesModal) {
      closeRulesModal();
    }
  });

  rulesModal.addEventListener("cancel", () => {
    rulesModal.classList.remove("is-visible");
  });
}

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

renderArchiveControls();
renderArchive(archives[0].id);
renderCasts();
renderStaffs();
