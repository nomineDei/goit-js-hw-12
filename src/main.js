import getImagesByQuery from "./js/pixabay-api";
import { createGallery, clearGallery, showLoader, hideLoader } from "./js/render-functions";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector(".form");

form.addEventListener("submit", handleSubmit)

function handleSubmit(event) {
    clearGallery();
    event.preventDefault();

    
    showLoader();

    const query = event.currentTarget.elements.searchText;
    const trimmeredQuery = query.value.trim();

    if (!trimmeredQuery) {
        iziToast.info({
            title: "Please!",
            message: "Enter request!",
            position: "topRight",
            timeout: 3000,
        });
        query.value = '';
        hideLoader();
        return;
    }

    getImagesByQuery(trimmeredQuery)
        .then(result => {
            if (result.length === 0) {
                throw new Error('No result');
            }
            createGallery(result);
            
        })
        .catch(error => {
            iziToast.error({
                message: "Sorry, there are no images matching your search query. Please try again!",
                position: 'topRight',
                timeout: 3000,
            });
        })
        .finally(() => {
            hideLoader();
            query.value = '';
    })
    
}
