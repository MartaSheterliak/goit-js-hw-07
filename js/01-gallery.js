import { galleryItems } from './gallery-items.js';

const containerItems = document.querySelector('.gallery');
const itemsDivMarkup = createItemsMarkup(galleryItems);
containerItems.innerHTML = itemsDivMarkup;

containerItems.addEventListener('click', onGetBigImg);

function onGetBigImg(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  const onEscKeyPress = (event) => {
    if (event.code === 'Escape') {
      console.log('Нажали Esc - все закрываю');
      instance.close();
      return;
    }
  };
  const url = event.target.dataset.source;
  const instance = basicLightbox.create(`<img width="1400" height="900" src=${url}>`, {
    onShow: (instance) => {
      window.addEventListener('keydown', onEscKeyPress);
       console.log('вішаю слухача Esc');
    },
    onClose: (instance) => {
      window.removeEventListener('keydown', onEscKeyPress);
      console.log('знімаю слухача Еsс');
    },
  });
  instance.show();
}

function createItemsMarkup(items) {
  return items
    .map(
      (item) =>
        `<div class="gallery__item">
        <a class="gallery__link" href=${item.original} >
          <img class="gallery__image"
          src=${item.preview}
          data-source=${item.original}
          alt=${item.description}/>
        </a>
      </div>`
    )
    .join('');
}