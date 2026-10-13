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

const hero = document.querySelector(".hero-banner");

if (hero) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  window.requestAnimationFrame(() => {
    hero.classList.add("is-ready");
  });

  const decoration = hero.querySelector(".hero-banner-decoration");
  if (!prefersReducedMotion.matches && decoration && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    let pointerFrame = 0;
    hero.addEventListener("pointermove", (event) => {
      if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
      pointerFrame = window.requestAnimationFrame(() => {
        const bounds = hero.getBoundingClientRect();
        const shiftX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 13;
        const shiftY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 13;
        decoration.style.setProperty("--hero-shift-x", `${shiftX.toFixed(1)}px`);
        decoration.style.setProperty("--hero-shift-y", `${shiftY.toFixed(1)}px`);
        pointerFrame = 0;
      });
    });
    hero.addEventListener("pointerleave", () => {
      if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
      decoration.style.setProperty("--hero-shift-x", "0px");
      decoration.style.setProperty("--hero-shift-y", "0px");
    });
  }
}
