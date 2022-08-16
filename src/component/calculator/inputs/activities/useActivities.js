import { useState, useEffect } from 'react';
import opentripmap from '../../../../api/opentripmap';
import _, { isEmpty } from 'lodash';
import { wikidataDetails } from '../../../../api/wikidata';
import { wikidataImages } from '../../../../api/wikidata';
import axios from 'axios';

export const useActivities = (defaultSearchTerm, selectedAccommodation) => {
    const [activities, setActivities] = useState(null);

    useEffect(() => {
        search(defaultSearchTerm, { id: 'interesting_places', name: 'Todos' });
    }, [defaultSearchTerm]);

    const getSearchEndpoint = (term, category) => {
        if (_.isEmpty(term)) {
            return ({
                endpoint: '/radius', 
                parameters: {
                    params: {
                        lat: selectedAccommodation.latitude,
                        lon: selectedAccommodation.longitude,
                        radius: '10000',
                        kinds: category.id,
                        rate: '3',
                        format: 'json',
                        apikey: '5ae2e3f221c38a28845f05b6f49a7b8966e8aa9ad3d18032148adf6f',
                        limit: '1000'
                    }
                }
            });
        } else {
            return ({
                endpoint: '/autosuggest', 
                parameters: {
                    params: {
                        name: term,
                        lat: selectedAccommodation.latitude,
                        lon: selectedAccommodation.longitude,
                        radius: '10000',
                        kinds: category.id,
                        rate: '3',
                        format: 'json',
                        apikey: '5ae2e3f221c38a28845f05b6f49a7b8966e8aa9ad3d18032148adf6f',
                        limit: '1000'
                    }
                }
            });
        }
    }

    const getDetailsFromWikidata = async (activity) => {
        const wikiDataId = activity.wikidata
        const response = await wikidataDetails.get(`${wikiDataId}.json`)

        const wikiDataDetailsObject = response.data.entities[wikiDataId]
        
        const imageName = wikiDataDetailsObject?.claims?.P18[0]?.mainsnak?.datavalue?.value
        if (isEmpty(imageName))
            return activity

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
        
        const image = imagePageResponse?.data?.query?.pages[0]?.thumbnail?.source
        const description = wikiDataDetailsObject?.descriptions?.en?.value
        const wikipediaEnglish = wikiDataDetailsObject?.sitelinks?.enwiki?.url
        const wikipediaSpanish = wikiDataDetailsObject?.sitelinks?.eswiki?.url

        return ({...activity,
            image: image,
            description: description,
            wikipediaEnglishLink: wikipediaEnglish,
            wikipediaSpanishLink: wikipediaSpanish
        });
    }

    const search = async (term, category) => {
        setActivities(null)
        const {endpoint, parameters} = getSearchEndpoint(term, category);
        
        const response = await opentripmap.get(endpoint, parameters);
    
        const bestRatedActivities = _(response.data)
            .filter((activity) => !_.isEmpty(activity.name))
            .uniqBy('name')
            .sortBy((activity) => activity.dist)
            .map((activity) => {
                return {
                    name: activity.name,
                    latitude: activity.point.lat,
                    longitude: activity.point.lon,
                    rate: activity.rate,
                    wikidata: activity.wikidata
                }
            })
            .take(10)
            .value();
    
        axios.all(bestRatedActivities.map((activity) => getDetailsFromWikidata(activity))).then(
            (data) => setActivities(data)
        );
    }

    return [activities, search];
};