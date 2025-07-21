import axios from 'axios';

const API_KEY = "51334256-c1710c37c982a8ca30afac428";

export default function getImagesByQuery(query) {

   return axios(`https://pixabay.com/api/`, {
        params:
        { key: API_KEY,
         q: query,
         image_type: "photo",
         orientation: "horizontal",
         safesearch: true }
    })
        .then(res => {
            return res.data.hits;
        })
        .catch(error => {
            return [];
    })

}