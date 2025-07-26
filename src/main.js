import getImagesByQuery from "./js/pixabay-api";
import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton, loadMoreBtn } from "./js/render-functions";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector(".form");
let page = 1;
let limit = 15;
let totalPages = 0;
let searchQuery = "";

form.addEventListener("submit", handleSubmit);
loadMoreBtn.addEventListener("click", handleLoadMore);

async function handleSubmit(event) {
    clearGallery();
    event.preventDefault();
    page = 1;


    const query = event.currentTarget.elements.searchText;
    const trimmedQuery = query.value.trim();
    searchQuery = trimmedQuery;

    if (!trimmedQuery) {
        iziToast.info({
            title: "Please!",
            message: "Enter request!",
            position: "topRight",
            timeout: 3000,
        });
        query.value = '';
        hideLoader();
        hideLoadMoreButton();
        return;
    }

    await getImagesByQuery(trimmedQuery, page, limit)
        .then(result => {
            
            if (result.hits.length === 0) {
                throw new Error('No result');
            }
            createGallery(result.hits);

            totalPages = Math.ceil(result.totalHits / limit);
            if (page < totalPages) {
                showLoadMoreButton();
            }
        })
        .catch(error => {
            iziToast.error({
                message: "Sorry, there are no images matching your search query. Please try again!",
                position: 'topRight',
                timeout: 3000,
            });
            hideLoadMoreButton();
        })
        .finally(() => {
            query.value = '';
    })
    
}


async function handleLoadMore() {
    page++;
    loadMoreBtn.disabled = true;
    showLoader();


    try { 
        const data = await getImagesByQuery(searchQuery, page, limit);
        createGallery(data.hits);
        
        setTimeout(() => {
            const firstCard = document.querySelector('.gallery-item');
            if (firstCard) {
                const cardHeight = firstCard.getBoundingClientRect().height;
                window.scrollBy({
                    top: cardHeight * 2,
                    behavior: 'smooth'
                });
            }
        }, 100);    

        if (page >= totalPages) {
            hideLoadMoreButton();
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                position: 'topRight',
                timeout: 3000,
            });

        }

    } catch {
         iziToast.error({
                message: "Sorry, there are no images matching your search query. Please try again!",
                position: 'topRight',
                timeout: 3000,
            });

    } finally {
        loadMoreBtn.disabled = false;
        hideLoader();

    }
}