import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.opentripmap.com/0.1/en/places',
});