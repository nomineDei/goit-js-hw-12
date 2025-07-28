import axios from 'axios';

const API_KEY = "51334256-c1710c37c982a8ca30afac428"; 

export default async function getImagesByQuery(query, options = {}) {
    const {
        page = 1,
        limit = 15
    } = options; 

        const { data } = await axios(`https://pixabay.com/api/`, {
            params:
            {
                key: API_KEY,
                q: query,
                image_type: "photo",
                orientation: "horizontal",
                safesearch: true,
                page: page,
                per_page: limit
            }
        });
    
    
        return data;
    }

   

