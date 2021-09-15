import galleryItems from "./data/gallery-items";
import refs from "./refs";

export function onRightArrowClick() {
  const indexOfCurrentImage = galleryItems.findIndex(
    (image) => image.original === refs.lightboxImageEl.src
  );
  if (indexOfCurrentImage !== galleryItems.length - 1) {
    refs.lightboxImageEl.src = galleryItems[indexOfCurrentImage + 1].original;
    refs.lightboxImageEl.alt =
      galleryItems[indexOfCurrentImage + 1].description;
  } else {
    refs.lightboxImageEl.src = galleryItems[0].original;
    refs.lightboxImageEl.alt = galleryItems[0].description;
  }
}

export function onLeftArrowClick() {
  const indexOfCurrentImage = galleryItems.findIndex(
    (image) => image.original === refs.lightboxImageEl.src
  );
  if (indexOfCurrentImage !== 0) {
    refs.lightboxImageEl.src = galleryItems[indexOfCurrentImage - 1].original;
    refs.lightboxImageEl.alt =
      galleryItems[indexOfCurrentImage - 1].description;
  } else {
    refs.lightboxImageEl.src = galleryItems[galleryItems.length - 1].original;
    refs.lightboxImageEl.alt =
      galleryItems[galleryItems.length - 1].description;
  }
}
