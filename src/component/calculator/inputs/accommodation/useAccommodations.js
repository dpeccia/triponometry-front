import { useState, useEffect } from 'react';
import opentripmap from '../../../../api/opentripmap';
import _, {isEmpty} from 'lodash';

export const useAccommodations = (defaultSearchTerm, selectedCity) => {
    const [accommodations, setAccommodations] = useState(null);

    useEffect(() => {
        search(defaultSearchTerm, { id: 'accomodations', name: 'Todos' }, { id: '1000', name: 'Menos de 1 km' });
    }, [defaultSearchTerm]);

    const getSearchEndpoint = (term, category, distance) => {
        if (_.isEmpty(term)) {
            return ({
                endpoint: '/radius', 
                parameters: {
                    params: {
                        lat: selectedCity.latitude,
                        lon: selectedCity.longitude,
                        radius: `${distance.id}`,
                        kinds: category.id,
                        rate: '1',
                        format: 'json',
                        apikey: '5ae2e3f221c38a28845f05b6f49a7b8966e8aa9ad3d18032148adf6f',
                        limit: '1000'
                    },
                }
            });
        } else {
            return ({
                endpoint: '/autosuggest', 
                parameters: {
                    params: {
                        name: term,
                        lat: selectedCity.latitude,
                        lon: selectedCity.longitude,
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
        setAccommodations(null)
        const {endpoint, parameters} = getSearchEndpoint(term, category, distance);
        
        const response = await opentripmap.get(endpoint, parameters);

        const bestRatedAccommodations = _(response.data)
            .filter((accommodation) => !isEmpty(accommodation.xid))
            .uniqBy((accommodation) => !isEmpty(accommodation.wikidata) ? accommodation.wikidata : {})
            .sortBy((accommodation) => 3 - accommodation.rate)
            .map((accommodation) => {
                return {
                    id: accommodation.xid,
                    name: accommodation.name,
                    latitude: accommodation.point.lat,
                    longitude: accommodation.point.lon,
                    rate: accommodation.rate,
                    wikidata: accommodation.wikidata
                }
            })
            .take(35)
            .value();

        setAccommodations(bestRatedAccommodations)
    }

    return [accommodations, search];
};