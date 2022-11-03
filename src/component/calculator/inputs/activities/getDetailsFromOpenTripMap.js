import opentripmap from "../../../../api/opentripmap";

export const getDetailsFromOpenTripMap = async (activity, setIsLoading, setImage, setWikipediaEnglishLink) => {
    setIsLoading(true)

    const xid = activity.id
    const response = await opentripmap.get(`/xid/${xid}`,{
        params: {
            apikey: '5ae2e3f221c38a28845f05b6f49a7b8966e8aa9ad3d18032148adf6f',
        }
    })

    setImage(!response.data.image ? '../logo-triponometry.png' : response.data.preview.source)
    setWikipediaEnglishLink(response.data.wikipedia)

    setIsLoading(false)
}