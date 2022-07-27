import axios from 'axios';

export default axios.create({
    baseURL: 'http://api.opentripmap.com/0.1/ru/places/radius',
});