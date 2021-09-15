import refs from "./refs";
import { keyPress } from "./keyPress";

export function onModalOpen() {
  window.addEventListener("keydown", keyPress);
  refs.lightboxEl.classList.add("is-open");
}

export function onModalClose() {
  window.removeEventListener("keydown", keyPress);
  refs.lightboxEl.classList.remove("is-open");

  getImageAttribute("", "");
}

export function onBackdropClick(evt) {
  if (evt.target === evt.currentTarget) {
    onModalClose();
  }
}
