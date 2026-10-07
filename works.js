import { casts } from "./members-data.js";
import { getReaderArchiveItems } from "./reader-archives.js";
import { initSiteNavigation } from "./navigation.js";

initSiteNavigation();

const searchInput = document.getElementById("worksSearch");
const readerSelect = document.getElementById("worksReader");
const sortSelect = document.getElementById("worksSort");
const list = document.getElementById("worksList");
const count = document.getElementById("worksCount");
const empty = document.getElementById("worksEmpty");

// 検索だけで空白を除去し、表示する作品名・作者名・読み手名は変更しません。
function normalizeSearch(value) {
  return String(value ?? "").normalize("NFKC").toLocaleLowerCase("ja").replace(/\s+/gu, "");
}

const works = getReaderArchiveItems().filter((item) => item.readerId && item.youtubeId)
  .map((item) => ({
    ...item,
    searchFields: [item.title, item.author, item.readerName].map(normalizeSearch)
  }));

casts.forEach((cast) => {
  const option = document.createElement("option");
  option.value = cast.id;
  option.textContent = cast.name;
  readerSelect.append(option);
});

function textElement(tag, className, text) {
  const element = document.createElement(tag);
  element.className = className;
  element.textContent = text;
  return element;
}

function renderWorks() {
  const query = normalizeSearch(searchInput.value);
  const readerId = readerSelect.value;
  const visibleWorks = works.filter((item) =>
    (!readerId || item.readerId === readerId)
    && (!query || item.searchFields.some((field) => field.includes(query)))
  );
  visibleWorks.sort((a, b) => {
    if (sortSelect.value === "title") {
      return a.title.localeCompare(b.title, "ja") || b.event.date.localeCompare(a.event.date);
    }
    const dateOrder = a.event.date.localeCompare(b.event.date);
    return (sortSelect.value === "oldest" ? dateOrder : -dateOrder)
      || a.originalIndex - b.originalIndex;
  });

  const fragment = document.createDocumentFragment();
  visibleWorks.forEach((item) => {
    const row = document.createElement("article");
    row.className = "work-card";
    const work = document.createElement("div");
    work.append(
      textElement("h2", "work-card__title", item.title),
      textElement("p", "work-card__author", item.author)
    );
    const reader = textElement("p", "work-card__reader", `読み手：${item.readerName}`);
    const event = document.createElement("p");
    event.className = "work-card__event";
    const date = textElement("time", "", item.event.date);
    date.dateTime = item.event.date.replaceAll(".", "-");
    event.append(date, document.createTextNode(` / ${item.event.title}`));
    const link = textElement("a", "button button--ghost", "朗読を見る");
    // URLSearchParamsに任せてIDをエンコードし、既存モーダルへ遷移します。
    const params = new URLSearchParams({ reader: item.readerId, archive: item.id });
    link.href = `index.html?${params}#casts`;
    link.setAttribute("aria-label", `${item.title}（${item.readerName}、${item.event.date}）の朗読を見る`);
    row.append(work, reader, event, link);
    fragment.append(row);
  });
  list.replaceChildren(fragment);
  count.textContent = query || readerId
    ? `${visibleWorks.length}件見つかりました`
    : `登録作品 ${works.length}件`;
  empty.hidden = visibleWorks.length !== 0;
}

// 履歴エントリー内だけに保存。新規アクセス・再読み込みは初期状態に戻します。
function saveHistoryState() {
  history.replaceState({
    ...history.state,
    works: {
      search: searchInput.value,
      reader: readerSelect.value,
      sort: sortSelect.value,
      scrollY: window.scrollY
    }
  }, "");
}

function restoreHistoryState() {
  const saved = history.state?.works;
  if (!saved) return;
  searchInput.value = saved.search || "";
  readerSelect.value = casts.some((cast) => cast.id === saved.reader) ? saved.reader : "";
  sortSelect.value = ["newest", "oldest", "title"].includes(saved.sort) ? saved.sort : "newest";
  renderWorks();
  requestAnimationFrame(() => window.scrollTo({ top: saved.scrollY || 0, behavior: "instant" }));
}

document.getElementById("worksControls").addEventListener("submit", (event) => event.preventDefault());
// 外部画像・フォントの読み込み中に操作された場合、遅いpageshowで入力を消さないようにします。
let controlsChanged = false;
function updateWorks() {
  controlsChanged = true;
  renderWorks();
}
searchInput.addEventListener("input", updateWorks);
readerSelect.addEventListener("change", updateWorks);
sortSelect.addEventListener("change", updateWorks);
window.addEventListener("pagehide", saveHistoryState);
// 修飾キー付きクリックで別タブへ開く場合にも履歴を保持します。
list.addEventListener("click", saveHistoryState);
window.addEventListener("pageshow", (event) => {
  const navigation = performance.getEntriesByType("navigation")[0];
  if (event.persisted || navigation?.type === "back_forward") {
    restoreHistoryState();
  } else if (!controlsChanged) {
    searchInput.value = "";
    readerSelect.value = "";
    sortSelect.value = "newest";
    renderWorks();
  }
});
renderWorks();
