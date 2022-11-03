import { useState, useEffect } from 'react';
import opentripmap from '../../../../api/opentripmap';
import _, {isEmpty, lowerCase} from 'lodash';

export const useActivities = (defaultSearchTerm, selectedAccommodation) => {
    const [activities, setActivities] = useState(null);

    useEffect(() => {
        search(defaultSearchTerm, { id: 'interesting_places', name: 'Todos' }, { id: '1000', name: 'Menos de 1 km' });
    }, [defaultSearchTerm]);

    const getSearchEndpoint = (term, category, distance) => {
        if (_.isEmpty(term)) {
            return ({
                endpoint: '/radius', 
                parameters: {
                    params: {
                        lat: selectedAccommodation.latitude,
                        lon: selectedAccommodation.longitude,
                        radius: `${distance.id}`,
                        kinds: category.id,
                        rate: '1',
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
                        radius: `${distance.id}`,
                        kinds: category.id,
                        rate: '1',
                        format: 'json',
                        apikey: '5ae2e3f221c38a28845f05b6f49a7b8966e8aa9ad3d18032148adf6f',
                        limit: '1000'
                    }
                }
            });
        }
    }

    const search = async (term, category, distance) => {
        setActivities(null)
        const {endpoint, parameters} = getSearchEndpoint(term, category, distance);
        
        const response = await opentripmap.get(endpoint, parameters);

        const bestRatedActivities = _(response.data)
            .filter((activity) => !_.isEmpty(activity.name))
            .uniqBy((activity) => !isEmpty(activity.wikidata) ? activity.wikidata : {} && lowerCase(activity.name))
            .sortBy((activity) => 7 - activity.rate)
            .map((activity) => {
                return {
                    id: activity.xid,
                    name: activity.name,
                    latitude: activity.point.lat,
                    longitude: activity.point.lon,
                    rate: activity.rate,
                    wikidata: activity.wikidata
                }
            })
            .take(35)
            .value();
        
        setActivities(bestRatedActivities)
    }

    return [activities, search];
};