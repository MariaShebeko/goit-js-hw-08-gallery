const galleryItems = [
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg",
    description: "Hokkaido Flower",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
    description: "Container Haulage Freight",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
    description: "Aerial Beach View",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",
    description: "Flower Blooms",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",
    description: "Alpine Mountains",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
    description: "Mountain Lake Sailing",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
    description: "Alpine Spring Meadows",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
    description: "Nature Landscape",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
    description: "Lighthouse Coast Sea",
  },
];

const refs = {
  galleryContainer: document.querySelector(".js-gallery"),
  lightboxEl: document.querySelector(".js-lightbox"),
  lightboxOverlayEl: document.querySelector(".lightbox__overlay"),
  lightBoxContent: document.querySelector(".lightbox__content"),
  lightboxImageEl: document.querySelector(".lightbox__image"),
  lightboxButtonEl: document.querySelector('[data-action="close-lightbox"]'),
};

const galleryMarkup = createGalleryMarkup(galleryItems);
refs.galleryContainer.insertAdjacentHTML("beforeend", galleryMarkup);

function createGalleryMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `<li class = "gallery__item">
    <a class="gallery__link"
    href="${original}">
    <img class="gallery__image"
    src = ${preview}
    data-source = ${original}
    alt = ${description}>
    </a>
    </li>`;
    })
    .join("");
}

refs.galleryContainer.addEventListener("click", onGalleryItemClick);

function onGalleryItemClick(evt) {
  evt.preventDefault();
  const isGalleryImage = evt.target.classList.contains("gallery__image");
  if (!isGalleryImage) {
    return;
  }
  onModalOpen();
  getImageAttribute(evt.target.dataset.source, evt.target.alt);
}

function onModalOpen() {
  window.addEventListener("keydown", keyPress);
  refs.lightboxEl.classList.add("is-open");
}

function getImageAttribute(src, alt) {
  refs.lightboxImageEl.src = src;
  refs.lightboxImageEl.alt = alt;
}

refs.lightboxButtonEl.addEventListener("click", onModalClose);

function onModalClose() {
  window.removeEventListener("keydown", keyPress);
  refs.lightboxEl.classList.remove("is-open");

  getImageAttribute("", "");
}

refs.lightboxOverlayEl.addEventListener("click", onBackdropClick);
function onBackdropClick(evt) {
  if (evt.target === evt.currentTarget) {
    onModalClose();
  }
}

function keyPress(evt) {
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

function onRightArrowClick() {
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

function onLeftArrowClick() {
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
