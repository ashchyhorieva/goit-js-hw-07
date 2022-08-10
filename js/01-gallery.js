/*Створи галерею з можливістю кліку по її елементах 
і перегляду повнорозмірного зображення у модальному вікні. 
Подивися демо відео роботи галереї.

Виконуй це завдання у файлах 01-gallery.html і 01-gallery.js. 
Розбий його на декілька підзавдань:

Створення і рендер розмітки на підставі масиву даних galleryItems 
і наданого шаблону елемента галереї.

Реалізація делегування на div.gallery і отримання url великого зображення.

Підключення скрипту і стилів бібліотеки модального вікна basicLightbox. 
Використовуй CDN сервіс jsdelivr і додай у проект посилання на мініфіковані 
(.min) файли бібліотеки.

Відкриття модального вікна по кліку на елементі галереї. 
Для цього ознайомся з документацією і прикладами.

Заміна значення атрибута src елемента <img> в модальному вікні перед відкриттям. 
Використовуй готову розмітку модального вікна із зображенням 
з прикладів бібліотеки basicLightbox.

Розмітка елемента галереї:
Посилання на оригінальне зображення повинно зберігатися в data-атрибуті source 
на елементі <img>, і вказуватися в href посилання. 
Не додавай інші HTML теги або CSS класи, крім тих, що містяться в цьому шаблоні.

<div class="gallery__item">
  <a class="gallery__link" href="large-image.jpg">
    <img
      class="gallery__image"
      src="small-image.jpg"
      data-source="large-image.jpg"
      alt="Image description"
    />
  </a>
</div>

Зверни увагу на те, що зображення обгорнуте посиланням, отже по кліку 
за замовчуванням користувач буде перенаправлений на іншу сторінку. 
Заборони цю поведінку за замовчуванням.

Закриття з клавіатури:
Додай закриття модального вікна після натискання клавіші Escape. 
Зроби так, щоб прослуховування клавіатури було тільки доти, 
доки відкрите модальне вікно. Бібліотекаи basicLightbox містить метод 
для програмного закриття модального вікна.
*/

import { galleryItems } from './gallery-items.js';
// Change code below this line

//import * as basicLightbox from 'basiclightbox';

console.log(galleryItems);



const galleryContainer = document.querySelector('.gallery');
console.log(galleryContainer);

const galleryCardMarkup = createImageCardsMarkup(galleryItems);
console.log(galleryCardMarkup);

//const bigImage = document.querySelector('img[data-source]');
//console.log(bigImage);

galleryContainer.insertAdjacentHTML('beforeend', galleryCardMarkup);
galleryContainer.addEventListener('click', onGalleryContainerClick);

function createImageCardsMarkup(galleryItems) {
  return galleryItems.map(({ preview, original, description }) => {
    return `
  <div class="gallery__item">
  <a class="gallery__link" href='${original}'>
    <img
      class="gallery__image"
      src='${preview}'
      data-source='${original}'
      alt='${description}'
    />
  </a>
</div>
  `;
  })
    .join('');
};

function onGalleryContainerClick(event) {

  event.preventDefault();
  
  //console.log(arguments);

  const isImageEl = event.target.classList.contains('gallery__image');

  if (!isImageEl) {
    return;
  }

  const imageEl = event.target;
  //console.log(imageEl);
  console.log(imageEl.dataset.source);
  const bigImage = imageEl.dataset.source;

  //const parentImageCard = imageEl.closest('.gallery__item');
  //console.log(parentImageCard);

  openModal(bigImage);

};

function openModal(bigImageUrl) {

  function closeModalOnEsc(e) {
    if (e.key === "Escape") instance.close();
  };

  const instance = basicLightbox.create(`
      <img src='${bigImageUrl}'/>
  `, {
    onShow: () => document.body.addEventListener('keyup', closeModalOnEsc),
    onClose: () => document.body.removeEventListener('keyup', closeModalOnEsc)
  });

  const bigImageEl = instance.element();

  bigImageEl.addEventListener('click', (event) => {
    instance.close();
  });

  instance.show();
};

