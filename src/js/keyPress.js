import { onRightArrowClick, onLeftArrowClick } from "./flipping";
import { onModalClose } from "./modal-window";

export function keyPress(evt) {
  if (evt.code === "Escape") {
    onModalClose();
  }
  if (evt.code === "ArrowRight") {
    onRightArrowClick();
  }
  if (evt.code === "ArrowLeft") {
    onLeftArrowClick();
  }
}
