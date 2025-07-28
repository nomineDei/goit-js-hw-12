import getImagesByQuery from "./js/pixabay-api";
import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton, disableLoadMoreButton, enableLoadMoreButton, onLoadMoreClick } from "./js/render-functions";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector(".form");
const IMAGES_PER_PAGE = 15;
let page = 1;
let totalPages = 0;
let searchQuery = "";

form.addEventListener("submit", handleSubmit);
onLoadMoreClick(handleLoadMore);

async function handleSubmit(event) {
    event.preventDefault();
    clearGallery();
    hideLoadMoreButton();
   
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
        return;
    }
    showLoader();
    try {
        const result = await getImagesByQuery(trimmedQuery, { page, limit: IMAGES_PER_PAGE })
        
            
        if (result.hits.length === 0) {
           iziToast.error({
            message: "No images found!",
            position: 'topRight',
            timeout: 3000,
           });
            hideLoader();
            return;
            
        }
        

        totalPages = Math.ceil(result.totalHits / IMAGES_PER_PAGE);
        createGallery(result.hits);
        if (page < totalPages) {
            showLoadMoreButton();
        } else {
            hideLoadMoreButton();
            iziToast.info({
                message: "That's all we found for your search.",
                position: 'topRight',
                timeout: 3000,
            });

        }
        query.value = '';
    } catch {
        iziToast.error({
            message: "Sorry, there are no images matching your search query. Please try again!",
            position: 'topRight',
            timeout: 3000,
        });
        hideLoadMoreButton();
    } finally {
         hideLoader();

    }
    
   
}


async function handleLoadMore() {
    page++;
    disableLoadMoreButton();
    showLoader();


    try { 
        const data = await getImagesByQuery(searchQuery, { page, limit: IMAGES_PER_PAGE });
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
        enableLoadMoreButton();
        hideLoader();
    }
     
}