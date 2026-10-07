// 両ページのヘッダー・ハンバーガーメニューで同じ操作を使用します。
export function initSiteNavigation() {
  const menuButton = document.getElementById("menuButton");
  const globalNav = document.getElementById("globalNav");
  const siteHeader = document.querySelector(".site-header");

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

}
