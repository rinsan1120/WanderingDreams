import { archives } from "./event-archives-data.js";
import { casts, staffs } from "./members-data.js";
import { readerArchives } from "./reader-archives-data.js";
import { nextEvent } from "./next-event-data.js";

const nextEventCard = document.getElementById("nextEventCard");
const GROUP_URL = "https://vrc.group/HYOHAK.5005";

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderNextEvent() {
  if (!nextEventCard) return;

  // mode が未定義・想定外の場合も、安全な調整中表示へ切り替えます。
  const isScheduled = nextEvent?.mode === "scheduled";
  const eventData = isScheduled
    ? (nextEvent.scheduled ?? {})
    : (nextEvent?.preparing ?? {});
  const groupButtonLabel = isScheduled
    ? "Groupに参加する"
    : "Groupに参加する";

  nextEventCard.classList.toggle("event-card--preparing", !isScheduled);

  if (isScheduled) {
    nextEventCard.innerHTML = `
      <div class="event-card__date" aria-label="開催日">
        <span class="event-card__year">${escapeHtml(eventData.year)}</span>
        <span class="event-card__day">${escapeHtml(eventData.day)}</span>
        <span class="event-card__weekday">${escapeHtml(eventData.weekday)}</span>
      </div>

      <div class="event-card__body">
        <p class="event-card__status">${escapeHtml(eventData.status)}</p>
        <h3>${escapeHtml(eventData.title)}</h3>

        <dl class="event-details">
          <div>
            <dt>開場</dt>
            <dd>${escapeHtml(eventData.openTime)}</dd>
          </div>
          <div>
            <dt>開演</dt>
            <dd>${escapeHtml(eventData.startTime)}</dd>
          </div>
          <div>
            <dt>出演予定</dt>
            <dd>${escapeHtml(eventData.performers)}</dd>
          </div>
          <div>
            <dt>参加方法</dt>
            <dd>${escapeHtml(eventData.participation)}<br>
              <span class="subtitle">${escapeHtml(eventData.participationNote)}</span></dd>
          </div>
        </dl>

        <p class="event-card__note">${escapeHtml(eventData.note)}</p>
        ${renderNextEventActions(groupButtonLabel)}
      </div>
    `;
    return;
  }

  nextEventCard.innerHTML = `
    <div class="event-card__date" aria-label="開催日">
      <span class="event-card__day">${escapeHtml(eventData.dateLabel)}</span>
      <span class="event-card__weekday">${escapeHtml(eventData.subLabel)}</span>
    </div>

    <div class="event-card__body">
      <p class="event-card__status">${escapeHtml(eventData.status)}</p>
      <h3>${escapeHtml(eventData.title)}</h3>
      <p class="event-card__message">${escapeHtml(eventData.message)}</p>
      <p class="event-card__note">${escapeHtml(eventData.note)}</p>
      ${renderNextEventActions(groupButtonLabel)}
    </div>
  `;
}

function renderNextEventActions(groupButtonLabel) {
  return `
    <div class="event-card__actions">
      <a
        class="button button--primary"
        href="${GROUP_URL}"
        target="_blank"
        rel="noopener noreferrer"
      >
        ${groupButtonLabel}
      </a>
      <button
        class="button button--ghost"
        id="openRulesButton"
        type="button"
      >
        参加ルール
      </button>
    </div>
  `;
}

renderNextEvent();

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

const readerArchiveModal = document.getElementById("readerArchiveModal");
const readerArchiveModalTitle = document.getElementById("readerArchiveModalTitle");
const closeReaderArchiveButton = document.getElementById("closeReaderArchiveButton");
const readerArchivePlayer = document.getElementById("readerArchivePlayer");
const readerArchiveDetail = document.getElementById("readerArchiveDetail");
const readerArchiveSelector = document.getElementById("readerArchiveSelector");
const readerArchiveList = document.getElementById("readerArchiveList");

const menuButton = document.getElementById("menuButton");
const globalNav = document.getElementById("globalNav");
const siteHeader = document.querySelector(".site-header");

const PARTICIPATION_RULES_URL = "content/participation-rules.html";

let activeArchive = archives[0];
let participationRulesLoaded = false;
let activeReaderArchives = [];
let activeReaderArchive = null;
let readerArchiveReturnFocus = null;

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
    ["動画撮影：", archive.videoStaff?.camera],
    ["動画編集：", archive.videoStaff?.editor]
  ].filter(([, staffName]) => staffName);

  archiveProgram.replaceChildren(programTitle, programList);

  // 開催回ごとの動画担当者はevent-archives-data.jsだけで管理します。
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

function getArchiveEvent(eventId) {
  return archives.find((archive) => archive.id === eventId);
}

function getEventDateValue(event) {
  if (!event?.date) return Number.NEGATIVE_INFINITY;

  const [year, month, day] = event.date.split(".").map(Number);
  if (!year || !month || !day) return Number.NEGATIVE_INFINITY;

  const date = new Date(year, month - 1, day);
  const time = date.getTime();

  return Number.isNaN(time) ? Number.NEGATIVE_INFINITY : time;
}

function getReaderArchiveItems(readerId) {
  if (!readerId) return [];

  return readerArchives
    .map((item, index) => ({
      ...item,
      event: getArchiveEvent(item.eventId),
      originalIndex: index
    }))
    .filter((item) => item.readerId === readerId)
    .sort((a, b) => {
      const dateDifference = getEventDateValue(b.event) - getEventDateValue(a.event);
      return dateDifference || a.originalIndex - b.originalIndex;
    });
}

function getReaderArchiveThumbnail(item) {
  if (item.thumbnail) return item.thumbnail;
  if (item.youtubeId) {
    return `https://img.youtube.com/vi/${item.youtubeId}/maxresdefault.jpg`;
  }

  return "";
}

function getReaderArchiveFallbackThumbnail(item) {
  if (!item.youtubeId || item.thumbnail) return "";
  return `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`;
}

function appendReaderArchiveThumbnail(container, item, altText) {
  const thumbnail = getReaderArchiveThumbnail(item);
  if (!thumbnail) return false;

  const image = document.createElement("img");
  image.src = thumbnail;
  image.alt = altText;

  const fallbackThumbnail = getReaderArchiveFallbackThumbnail(item);
  image.addEventListener("error", () => {
    if (fallbackThumbnail && image.src !== fallbackThumbnail) {
      image.src = fallbackThumbnail;
      return;
    }

    image.remove();
  });

  container.append(image);
  return true;
}

function renderCasts() {
  if (!castGrid) return;

  const castCards = casts.map((cast) => {
    const castCard = document.createElement("article");
    castCard.className = "cast-card";

    const readerArchiveItems = getReaderArchiveItems(cast.id);
    const hasReaderArchives = readerArchiveItems.length > 0;
    const imageWrapper = document.createElement(hasReaderArchives ? "button" : "div");
    imageWrapper.className = hasReaderArchives
      ? "cast-card__image cast-card__archive-trigger"
      : "cast-card__image";

    if (hasReaderArchives) {
      imageWrapper.type = "button";
      imageWrapper.dataset.readerId = cast.id;
      imageWrapper.setAttribute("aria-label", `${cast.name}の朗読アーカイブを見る`);
    }

    const image = document.createElement("img");
    image.src = cast.image;
    image.alt = `${cast.name}のプロフィール画像`;
    image.loading = "lazy";
    imageWrapper.append(image);

    if (hasReaderArchives) {
      const overlay = document.createElement("span");
      overlay.className = "cast-card__archive-overlay";
      overlay.setAttribute("aria-hidden", "true");

      const icon = document.createElement("span");
      icon.className = "cast-card__archive-icon";
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = "▶";

      imageWrapper.append(overlay, icon);
    }

    const body = document.createElement("div");
    body.className = "cast-card__body";

    const name = document.createElement("h3");
    name.textContent = cast.name;

    const comment = document.createElement("p");
    comment.textContent = cast.comment;

    const links = document.createElement("div");
    links.className = "cast-card__links";

    cast.links.forEach((link) => {
      const anchor = document.createElement("a");
      anchor.className = "social-link";
      anchor.href = link.url;
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
      anchor.textContent = link.label;
      links.append(anchor);
    });

    body.append(name, comment, links);
    castCard.append(imageWrapper, body);

    return castCard;
  });

  castGrid.replaceChildren(...castCards);
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

function stopReaderArchivePlayback() {
  const frame = readerArchivePlayer?.querySelector("iframe");
  if (frame) {
    frame.src = "";
  }
}

function renderReaderArchivePlayer(item) {
  if (!readerArchivePlayer || !item) return;

  readerArchivePlayer.replaceChildren();

  if (!item.youtubeId) {
    const placeholder = document.createElement("div");
    placeholder.className = "reader-archive-player__placeholder";

    const message = document.createElement("p");
    message.textContent = "動画準備中";

    placeholder.append(message);
    readerArchivePlayer.append(placeholder);
    return;
  }

  const thumbnailButton = document.createElement("button");
  thumbnailButton.className = "reader-archive-player__thumbnail";
  thumbnailButton.type = "button";
  thumbnailButton.setAttribute("aria-label", `${item.title}を再生`);

  const hasThumbnail = appendReaderArchiveThumbnail(
    thumbnailButton,
    item,
    `${item.title}の動画サムネイル`
  );

  if (!hasThumbnail) {
    const placeholder = document.createElement("span");
    placeholder.className = "reader-archive-player__thumbnail-placeholder";
    placeholder.textContent = "動画サムネイル";
    thumbnailButton.append(placeholder);
  }

  const overlay = document.createElement("span");
  overlay.className = "reader-archive-player__overlay";
  overlay.setAttribute("aria-hidden", "true");

  const playIcon = document.createElement("span");
  playIcon.className = "reader-archive-player__play";
  playIcon.setAttribute("aria-hidden", "true");
  playIcon.textContent = "▶";

  thumbnailButton.append(overlay, playIcon);
  thumbnailButton.addEventListener("click", () => {
    playReaderArchiveVideo(item);
  });

  readerArchivePlayer.append(thumbnailButton);
}

function playReaderArchiveVideo(item) {
  if (!readerArchivePlayer || !item?.youtubeId) return;

  const iframe = document.createElement("iframe");
  iframe.src = `https://www.youtube-nocookie.com/embed/${item.youtubeId}?autoplay=1`;
  iframe.title = `${item.title} 個別朗読アーカイブ`;
  iframe.allow =
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  iframe.allowFullscreen = true;

  readerArchivePlayer.replaceChildren(iframe);
}

function renderReaderArchiveDetail(item) {
  if (!readerArchiveDetail || !item) return;

  const title = document.createElement("h3");
  title.textContent = `『${item.title}』`;

  const author = document.createElement("p");
  author.textContent = `${item.author} 著`;

  readerArchiveDetail.replaceChildren(title, author);

  if (item.event) {
    const eventTitle = document.createElement("p");
    eventTitle.textContent = `漂泊ノ夢 ${item.event.title}`;

    const eventDate = document.createElement("p");
    eventDate.textContent = item.event.date;

    readerArchiveDetail.append(eventTitle, eventDate);
  }
}

function renderReaderArchiveSelector() {
  if (!readerArchiveSelector || !readerArchiveList) return;

  readerArchiveList.replaceChildren();

  if (activeReaderArchives.length < 2) {
    readerArchiveSelector.hidden = true;
    return;
  }

  readerArchiveSelector.hidden = false;

  activeReaderArchives.forEach((item) => {
    const archiveButton = document.createElement("button");
    archiveButton.className = "reader-archive-card";
    archiveButton.type = "button";
    archiveButton.dataset.readerArchiveId = item.id;

    const isActive = activeReaderArchive?.id === item.id;
    archiveButton.classList.toggle("is-active", isActive);
    archiveButton.setAttribute("aria-pressed", String(isActive));

    const thumbnail = document.createElement("span");
    thumbnail.className = "reader-archive-card__thumbnail";

    const hasThumbnail = appendReaderArchiveThumbnail(
      thumbnail,
      item,
      `${item.title}の動画サムネイル`
    );

    if (!hasThumbnail) {
      const thumbnailPlaceholder = document.createElement("span");
      thumbnailPlaceholder.className = "reader-archive-card__placeholder";
      thumbnailPlaceholder.textContent = "動画準備中";
      thumbnail.append(thumbnailPlaceholder);
    }

    const title = document.createElement("span");
    title.className = "reader-archive-card__title";
    title.textContent = item.title;

    const author = document.createElement("span");
    author.className = "reader-archive-card__author";
    author.textContent = `${item.author} 著`;

    archiveButton.append(thumbnail, title, author);

    if (item.event?.title) {
      const eventTitle = document.createElement("span");
      eventTitle.className = "reader-archive-card__event";
      eventTitle.textContent = `${item.event.title}より`;
      archiveButton.append(eventTitle);
    }

    readerArchiveList.append(archiveButton);
  });
}

function renderSelectedReaderArchive(readerArchiveId) {
  const item = activeReaderArchives.find((archive) => archive.id === readerArchiveId);
  if (!item) return;

  activeReaderArchive = item;
  stopReaderArchivePlayback();
  renderReaderArchivePlayer(item);
  renderReaderArchiveDetail(item);
  renderReaderArchiveSelector();
}

function openReaderArchiveModal(readerId, trigger) {
  const cast = casts.find((item) => item.id === readerId);
  const archivesForReader = getReaderArchiveItems(readerId);
  if (!readerArchiveModal || !cast || archivesForReader.length === 0) return;

  readerArchiveReturnFocus = trigger;
  activeReaderArchives = archivesForReader;
  activeReaderArchive = archivesForReader[0];

  if (readerArchiveModalTitle) {
    readerArchiveModalTitle.textContent = cast.name;
  }

  renderReaderArchivePlayer(activeReaderArchive);
  renderReaderArchiveDetail(activeReaderArchive);
  renderReaderArchiveSelector();

  readerArchiveModal.showModal();
  closeReaderArchiveButton?.focus();
}

function closeReaderArchiveModal() {
  if (!readerArchiveModal?.open) return;

  stopReaderArchivePlayback();
  readerArchiveModal.close();
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

castGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".cast-card__archive-trigger");
  if (!button) return;

  openReaderArchiveModal(button.dataset.readerId, button);
});

if (readerArchiveList) {
  readerArchiveList.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-reader-archive-id]");
    if (!button) return;

    renderSelectedReaderArchive(button.dataset.readerArchiveId);
  });
}

if (closeReaderArchiveButton) {
  closeReaderArchiveButton.addEventListener("click", closeReaderArchiveModal);
}

if (readerArchiveModal) {
  readerArchiveModal.addEventListener("click", (event) => {
    if (event.target === readerArchiveModal) {
      closeReaderArchiveModal();
    }
  });

  readerArchiveModal.addEventListener("cancel", () => {
    stopReaderArchivePlayback();
  });

  readerArchiveModal.addEventListener("close", () => {
    stopReaderArchivePlayback();
    activeReaderArchives = [];
    activeReaderArchive = null;

    if (readerArchiveReturnFocus) {
      readerArchiveReturnFocus.focus();
      readerArchiveReturnFocus = null;
    }
  });
}

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
