const archives = [
  {
    id: "event-02",
    date: "2026.05.16",
    title: "第2回　漂泊ノ夢",
    youtubeId: "Mbz9-PqdlbE",
    thumbnail: "https://img.youtube.com/vi/Mbz9-PqdlbE/maxresdefault.jpg",
    program: [
      "読み手：唯ノイフ　「双子の星（二）」著者：宮沢賢治",
      "読み手：白羽まちる　「星の王子様（前編）」著者：サン=テグジュペリ",
      "読み手：139　「星の音が聞こえる夜に」著者：あねり,「花をつくる妖精のおはなし」著者：むち"
    ]
  },
  {
    id: "event-01",
    date: "2026.04.11",
    title: "第1回　漂泊ノ夢",
    youtubeId: "Mbz9-PqdlbE",
    thumbnail: "https://img.youtube.com/vi/Mbz9-PqdlbE/maxresdefault.jpg",
    program: [
      "読み手：花咲くバッカス　「わるい王様（伝説）」著者：アンデルセン",
      "読み手：唯ノイフ　「双子の星」著者：宮沢賢治",
      "読み手：ʚみけɞ　「花と人間の話」著者：小川未明"
    ]
  }
];

const casts = [
  {
    name: "花咲くバッカス",
    favorite: "＊＊＊＊＊＊＊＊",
    comment: "＊＊＊＊＊＊＊＊＊＊＊＊",
    image: "assets/cast-placeholder-a.jpg",
    links: [
      {
        label: "VRChat",
        url: "https://vrchat.com/home/user/usr_xxxxx"
      },
      {
        label: "X",
        url: "https://x.com/usernameA"
      },
      {
        label: "YouTube",
        url: "https://www.youtube.com/@usernameA"
      }
    ]
  },
  {
    name: "唯ノイフ",
    favorite: "＊＊＊＊＊＊＊＊",
    comment: "＊＊＊＊＊＊＊＊＊＊＊＊",
    image: "assets/cast-placeholder-a.jpg",
    links: [
      {
        label: "VRChat",
        url: "https://vrchat.com/home/user/usr_xxxxx"
      },
      {
        label: "X",
        url: "https://x.com/usernameA"
      },
      {
        label: "YouTube",
        url: "https://www.youtube.com/@usernameA"
      }
    ]
  },
  {
    name: "ʚみけɞ",
    favorite: "＊＊＊＊＊＊＊＊",
    comment: "＊＊＊＊＊＊＊＊＊＊＊＊",
    image: "assets/cast-placeholder-a.jpg",
    links: [
      {
        label: "VRChat",
        url: "https://vrchat.com/home/user/usr_xxxxx"
      },
      {
        label: "X",
        url: "https://x.com/usernameA"
      },
      {
        label: "YouTube",
        url: "https://www.youtube.com/@usernameA"
      }
    ]
  },
  {
    name: "白羽まちる",
    favorite: "＊＊＊＊＊＊＊＊",
    comment: "＊＊＊＊＊＊＊＊＊＊＊＊",
    image: "assets/cast-placeholder-a.jpg",
    links: [
      {
        label: "VRChat",
        url: "https://vrchat.com/home/user/usr_xxxxx"
      },
      {
        label: "X",
        url: "https://x.com/usernameA"
      },
      {
        label: "YouTube",
        url: "https://www.youtube.com/@usernameA"
      }
    ]
  },
    {
    name: "139",
    favorite: "＊＊＊＊＊＊＊＊",
    comment: "＊＊＊＊＊＊＊＊＊＊＊＊",
    image: "assets/cast-placeholder-a.jpg",
    links: [
      {
        label: "VRChat",
        url: "https://vrchat.com/home/user/usr_xxxxx"
      },
      {
        label: "X",
        url: "https://x.com/usernameA"
      },
      {
        label: "YouTube",
        url: "https://www.youtube.com/@usernameA"
      }
    ]
  }
];

const archiveList = document.getElementById("archiveList");
const archiveDate = document.getElementById("archiveDate");
const archiveTitle = document.getElementById("archiveTitle");
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

let activeArchive = archives[0];

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

renderArchiveControls();
renderArchive(archives[0].id);
renderCasts();
