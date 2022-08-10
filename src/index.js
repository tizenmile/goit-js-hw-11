import Notiflix from 'notiflix';
import { fetchFromPixabay } from './js/fetch.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const loadBtn = document.querySelector('.load-more');
const getForm = document.querySelector('.header-form');
let gallery = '';
loadBtn.style.visibility = 'hidden';

function getDataFromPixabay(name, pagePagination) {
  return fetchFromPixabay(name, pagePagination).then(function (response) {
    if (response.status === 200) {
      if (response.data.hits.length === 0) {
        loadBtn.style.visibility = 'hidden';
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      response.data.hits.forEach(element => {
        renderImg(element);
      });
      return response.data.total;
    } else {
      console.log(response.status);
    }
  });
}

getForm.addEventListener('submit', pushData);
let pagePagination = 1;
function pushData(event) {
  event.preventDefault();
  pagePagination = 1;
  const dataForm = new FormData(getForm);
  const data = dataForm.get('searchQuery');
  document.querySelector('.gallery').innerHTML = '';
  getDataFromPixabay(data, pagePagination).then(totalFind => {
    if (totalFind !== 0) {
      loadBtn.style.visibility = 'visible';
      Notiflix.Notify.success(`Hooray! We found ${totalFind} images.`);
    } else {
      loadBtn.style.visibility = 'hidden';
    }
  });
}

loadBtn.addEventListener('click', loadMore);
function loadMore() {
  const dataForm = new FormData(getForm);
  const data = dataForm.get('searchQuery');
  pagePagination++;
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();
  getDataFromPixabay(data, pagePagination);
  setTimeout(() => {
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }, 250);
}

function renderImg({
  tags,
  likes,
  views,
  comments,
  downloads,
  webformatURL,
  largeImageURL,
}) {
  const inner = `<div class="photo-card">
  <a class="photo-url" href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
    <div class="info">
      <p class="info-item">
        <b>Likes: ${likes}</b>
      </p>
      <p class="info-item">
        <b>Views: ${views}</b>
      </p>
      <p class="info-item">
        <b>Comments: ${comments}</b>
      </p>
      <p class="info-item">
        <b>Downloads: ${downloads}</b>
      </p>
    </div>
  </div>`;

  document.querySelector('.gallery').innerHTML += inner;
  const modal = document.querySelector('.photo-card');
  modal.addEventListener('click', event => {
    event.preventDefault();
  });
  let gallery = new SimpleLightbox('.gallery a');
  gallery.refresh();
}
window.addEventListener('scroll', () => {
  if (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight * 0.9
  ) {
    loadMore();
  }
});
