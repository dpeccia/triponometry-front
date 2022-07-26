import axios from 'axios';

export default axios.create({
    baseURL: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
    headers: {
        'X-RapidAPI-Key': 'e19668e7eamsh5171dfa8c336d1cp13875djsne0d6c33f498e',
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
    }
});