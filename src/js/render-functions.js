import SimpleLightbox from "simplelightbox";

import "simplelightbox/dist/simple-lightbox.min.css";
import "../css/gallery.css"

export const loadMoreBtn = document.querySelector(".load-more-btn")
const gallery = document.querySelector(".gallery")
let lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: 'alt',
    captionsDelay: 250,
})

export function createGallery(images) {
    const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
     <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
            <img
             class="gallery-image"
             src="${webformatURL}"
             alt="${tags}"
             width="360"
            />
        </a>
        <div class="image-info">
            <p><b>Likes</b> ${likes}</p>
            <p><b>Views</b> ${views}</p>
            <p><b>Comments</b> ${comments}</p>
            <p><b>Downloads</b> ${downloads}</p>
        </div>
    </li>
    `).join("");

    gallery.insertAdjacentHTML("beforeend", markup);

    lightbox.refresh();
}


export function clearGallery() {
    gallery.innerHTML = '';

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
}

export function showLoader() {
  document.querySelector('.loader').classList.remove('is-hidden');
}

export function hideLoader() {
  document.querySelector('.loader').classList.add('is-hidden');
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.remove('is-hidden');
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.add('is-hidden');
}