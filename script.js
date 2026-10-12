"use strict";

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
    mainNav.classList.toggle("is-open", !isOpen);
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
      mainNav.classList.remove("is-open");
    });
  });
}

document.querySelectorAll("[data-current-year]").forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});

const hero = document.querySelector(".hero-showcase");

if (hero) {
  const visual = hero.querySelector("[data-hero-visual]");
  const movingWords = ["making", "creating", "crafting"];
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let wordIndex = 0;
  let pointerFrame = 0;

  window.requestAnimationFrame(() => {
    hero.classList.add("is-ready");
  });

  if (!prefersReducedMotion.matches) {
    window.setInterval(() => {
      const word = hero.querySelector("[data-hero-word]");
      if (!word || document.hidden) return;
      word.classList.add("word-out");
      window.setTimeout(() => {
        wordIndex = (wordIndex + 1) % movingWords.length;
        word.textContent = movingWords[wordIndex];
        word.classList.remove("word-out");
      }, 240);
    }, 3600);

    if (visual && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      visual.classList.add("is-parallax");
      visual.addEventListener("pointermove", (event) => {
        if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
        pointerFrame = window.requestAnimationFrame(() => {
          const bounds = visual.getBoundingClientRect();
          const moveX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 14;
          const moveY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 14;
          visual.style.setProperty("--move-x", `${moveX.toFixed(1)}px`);
          visual.style.setProperty("--move-y", `${moveY.toFixed(1)}px`);
          pointerFrame = 0;
        });
      });
      visual.addEventListener("pointerleave", () => {
        if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
        visual.style.setProperty("--move-x", "0px");
        visual.style.setProperty("--move-y", "0px");
      });
    }
  }
}
