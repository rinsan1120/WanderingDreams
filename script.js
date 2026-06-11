const archives = [
  {
    id: "event-02",
    date: "2026.05.16",
    title: "第二夜",
    youtubeId: "Mbz9-PqdlbE",
    thumbnail: "https://img.youtube.com/vi/Mbz9-PqdlbE/maxresdefault.jpg",
    program: [
      "双子の星（二）　宮沢賢治著　/　唯ノイフ",
      "星の王子様（前編）　サン=テグジュペリ著　/　白羽まちる",
      "星の音が聞こえる夜に　あねり著　/　139(イサク)",
      "花をつくる妖精のおはなし　むち著　/　139(イサク)",
    ]
  },
  {
    id: "event-01",
    date: "2026.04.11",
    title: "第一夜",
    youtubeId: "Mbz9-PqdlbE",
    thumbnail: "https://img.youtube.com/vi/Mbz9-PqdlbE/maxresdefault.jpg",
    program: [
      "わるい王様（伝説）　アンデルセン著 / 花咲くバッカス",
      "双子の星　宮沢賢治著 / 唯ノイフ",
      "花と人間の話　小川未明著 / ʚみけɞ",
    ]
  }
];

const casts = [
  {
    name: "花咲くバッカス",
    comment: "＊＊＊＊＊＊＊＊＊＊＊＊",
    image: "assets/members/bakkasu.png",
    links: [
      {
        label: "VRChat",
        url: "https://vrchat.com/home/user/usr_22d5c01d-3007-4822-bed4-6b7d841dbbf7"
      },
      {
        label: "X",
        url: "https://x.com/hanasakubakkas"
      }
    ]
  },
  {
    name: "唯ノイフ",
    comment: "＊＊＊＊＊＊＊＊＊＊＊＊",
    image: "assets/members/if.png",
    links: [
      {
        label: "VRChat",
        url: "https://vrchat.com/home/user/usr_c0330280-ae70-49c5-a8f2-1101e66d6cad"
      },
      {
        label: "X",
        url: "https://x.com/Umaretai12"
      },
      {
        label: "YouTube",
        url: "https://www.youtube.com/@%E5%94%AF%E4%B9%83%E3%82%A4%E3%83%95"
      }
    ]
  },
  {
    name: "ʚみけɞ",
    comment: "＊＊＊＊＊＊＊＊＊＊＊＊",
    image: "assets/members/mike.png",
    links: [
      {
        label: "VRChat",
        url: "https://vrchat.com/home/user/usr_d0048c8a-391a-4ab8-a4bc-aa39a496e8d1"
      },
      {
        label: "X",
        url: "https://x.com/mikemike_vrc"
      }
    ]
  },
  {
    name: "白羽まちる",
    comment: "＊＊＊＊＊＊＊＊＊＊＊＊",
    image: "assets/members/machiru.png",
    links: [
      {
        label: "VRChat",
        url: "https://vrchat.com/home/user/usr_43f462ca-0592-4848-9de5-f24d84056a3f"
      },
      {
        label: "X",
        url: "https://x.com/machiru_vrc"
      }
    ]
  },
    {
    name: "139（イサク）",
    comment: "＊＊＊＊＊＊＊＊＊＊＊＊",
    image: "assets/members/139.png",
    links: [
      {
        label: "VRChat",
        url: "https://vrchat.com/home/user/usr_e2b8cd6f-d1c9-4b89-a788-01d8ec424e9b"
      },
      {
        label: "X",
        url: "https://x.com/139Magna"
      }
    ]
  }
];

const staffs = [
  {
    name: "龍飛",
    favorite: "動画撮影",
    comment: "カメラマンを務める小さきいのち。好きなものは桃、森博嗣作品",
    image: "assets/members/ryuhi.png",
    links: [
      {
        label: "VRChat",
        url: "https://vrchat.com/home/user/usr_867c325a-cb05-49cc-b983-7cf02188a9d0"
      },
      {
        label: "X",
        url: "https://x.com/doragon1739"
      }
    ]
  },
  {
    name: "りん（rinsan1120)",
    favorite: "企画・運営",
    comment: "本イベントの企画・運営をしています。関わる誰もが居心地がいいと思ってもらえるイベントにしていきたいです。",
    image: "assets/members/rin.png",
    links: [
      {
        label: "VRChat",
        url: "https://vrchat.com/home/user/usr_73654b2d-85b3-47e3-8a87-c8596b7c03c5"
      },
      {
        label: "X",
        url: "https://x.com/rinsan11201"
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
const staffGrid = document.getElementById("staffGrid");

const videoModal = document.getElementById("videoModal");
const videoFrame = document.getElementById("videoFrame");
const openVideoButton = document.getElementById("openVideoButton");
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
