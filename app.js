const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const refs = {
  galleryContainer: document.querySelector('.js-gallery'),
  lightboxEl: document.querySelector('.js-lightbox'),
  lightboxOverlayEl: document.querySelector('.lightbox__overlay'),
  lightBoxContent: document.querySelector('.lightbox__content'),
  lightboxImageEl: document.querySelector('.lightbox__image'),
  lightboxButtonEl: document.querySelector('[data-action="close-lightbox"]'), 
}

// 1. Создание и рендер разметки по массиву данных galleryItems из app.js и предоставленному шаблону.
const galleryMarkup = createGalleryMarkup(galleryItems);
refs.galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

function createGalleryMarkup(items) {
  return items.map(({ preview, original, description }) => {
    return `<li class = "gallery__item">
    <a class="gallery__link"
    href="${original}">
    <img class="gallery__image"
    src = ${preview}
    data-source = ${original}
    alt = ${description}>
    </a>
    </li>`;
  }).join('');
};

// 2. Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
refs.galleryContainer.addEventListener('click', onGalleryItemClick);

function onGalleryItemClick(evt) {
  evt.preventDefault();
  const isGalleryImage = evt.target.classList.contains('gallery__image');
  if (!isGalleryImage) {
    return
  }

  onModalOpen();
  getImageAttribute(evt.target.dataset.source, evt.target.alt);
}

// 3. Открытие модального окна по клику на элементе галереи.
function onModalOpen() {
  window.addEventListener('keydown', onEscPress);
  refs.lightboxEl.classList.add('is-open');
}

// 4. Подмена значения атрибута src элемента img.lightbox__image
function getImageAttribute(src, alt) {
  refs.lightboxImageEl.src = src;
  refs.lightboxImageEl.alt = alt;
}

// 5. Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"]
refs.lightboxButtonEl.addEventListener('click', onModalClose);

function onModalClose() {
  window.removeEventListener('keydown', onEscPress);
  refs.lightboxEl.classList.remove('is-open');

// 6. Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для 
// того, чтобы при следующем открытии модального окна, пока грузится изображение, мы 
// не видели предыдущее.
  getImageAttribute('', '');
}

// 7. Закрытие модального окна по клику на div.lightbox__overlay.
refs.lightboxOverlayEl.addEventListener('click', onBackdropClick);
function onBackdropClick(evt) {
  if (evt.target === evt.currentTarget) {
      onModalClose();
  }
}
// 8. Закрытие модального окна по нажатию клавиши ESC.
function onEscPress(evt) {
  if (evt.code === 'Escape') {
    onModalClose();
  } 
}

// 9. Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".

refs.lightBoxContent.insertAdjacentHTML('beforeend', `<button class="gallery__button-left"><</button>`);
refs.lightBoxContent.insertAdjacentHTML('beforeend', `<button class="gallery__button-right">></button>`);

const btnLeft = document.querySelector('.gallery__button-left');
const btnRight = document.querySelector('.gallery__button-right');
const galleryImage = document.querySelector('.gallery__image');

btnLeft.addEventListener('click', onLeftBtnClick);
btnRight.addEventListener('click', onRightBtnClick);

const arrayOfImages = document.getElementsByClassName('gallery__image')
console.log(arrayOfImages);

let slideIndex = 0;

function onRightBtnClick() {
  slideIndex += 1;
  if (slideIndex >= arrayOfImages.length) {
    slideIndex = 0
  }
  showImage();
}

function onLeftBtnClick() {
  slideIndex -= 1;
  if (slideIndex < 0) {
    slideIndex = arrayOfImages.length - 1;
  }
  showImage();
}

function showImage() {
  refs.lightboxImageEl.src = arrayOfImages[slideIndex].dataset.source;
  refs.lightboxImageEl.alt = arrayOfImages[slideIndex].alt;
}