import axios from 'axios';

export const wikidataDetails = axios.create({
    baseURL: 'https://www.wikidata.org/wiki/Special:EntityData',
});

export const wikidataImages = axios.create({
    baseURL: 'https://en.wikipedia.org/w/api.php',
});

