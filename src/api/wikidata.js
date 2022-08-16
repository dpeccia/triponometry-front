import axios from 'axios';

export const wikidataDetails = axios.create({
    baseURL: 'https://www.wikidata.org/wiki/Special:EntityData',
});

export const wikidataImages = axios.create({
    baseURL: 'https://en.wikipedia.org/w/api.php',
});

export const getWikidataImage = async (wikiDataId) => {
    try {
        const response = await wikidataDetails.get(`${wikiDataId}.json`)

        const wikiDataDetailsObject = response.data.entities[wikiDataId]
        
        const imageName = wikiDataDetailsObject?.claims?.P18[0]?.mainsnak?.datavalue?.value
    
        const imagePageResponse = await wikidataImages.get('', {
            params: {
                action: "query",
                format: "json",
                formatversion: "2",
                prop: "pageimages|pageterms",
                piprop: "thumbnail",
                pithumbsize: "400",
                titles: `File:${imageName}`,
                origin: "*"
            }
        })
        
        return imagePageResponse?.data?.query?.pages[0]?.thumbnail?.source
    } catch {
        return '../logo-triponometry.png'
    }
}

