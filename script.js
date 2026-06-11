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

let activeArchive = archives[0];

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

renderArchiveControls();
renderArchive(archives[0].id);
renderCasts();
