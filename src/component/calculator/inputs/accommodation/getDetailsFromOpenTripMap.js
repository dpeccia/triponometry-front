import opentripmap from "../../../../api/opentripmap";
import {first} from "lodash";

export const getDetailsFromOpenTripMap = async (accommodation, setIsLoading, setImage, setStars, setAddress, setUrl, setWikipedia) => {
    setIsLoading(true)

    const xid = accommodation.id
    const response = await opentripmap.get(`/xid/${xid}`,{
        params: {
            apikey: '5ae2e3f221c38a28845f05b6f49a7b8966e8aa9ad3d18032148adf6f',
        }
    })

    setImage(!response.data.image ? '../logo-triponometry.png' : response.data.preview.source)
    setStars(!response.data.stars ? parseInt(first(response.data.rate)) : response.data.stars)
    setAddress(response.data.address)
    setUrl(response.data.url)
    setWikipedia(response.data.wikipedia)

    setIsLoading(false)
}