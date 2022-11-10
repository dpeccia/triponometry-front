import {isEmpty} from "lodash";
import {wikidataDetails, wikidataImages} from "../../../../api/wikidata";

const getImagePath = async (wikiDataDetailsObject) => {
    const imageName = wikiDataDetailsObject?.claims?.P18?.at(0)?.mainsnak?.datavalue?.value

    if (isEmpty(imageName))
        return '../logo-triponometry.png'

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

    const imageSource = imagePageResponse?.data?.query?.pages[0]?.thumbnail?.source

    if(isEmpty(imageSource))
        return '../logo-triponometry.png'

    return imageSource
}

export const getDetailsFromWikidata = async (activity, setIsLoading, setImage, setDescription, setWikipediaEnglishLink, setWikipediaSpanishLink) => {
    setIsLoading(true)

    const wikiDataId = activity.wikidata
    const response = await wikidataDetails.get(`${wikiDataId}.json`)

    const wikiDataDetailsObject = response.data.entities[wikiDataId]

    const image = await getImagePath(wikiDataDetailsObject)
    const description = wikiDataDetailsObject?.descriptions?.en?.value
    const wikipediaEnglish = wikiDataDetailsObject?.sitelinks?.enwiki?.url
    const wikipediaSpanish = wikiDataDetailsObject?.sitelinks?.eswiki?.url

    setImage(image)
    setDescription(description)
    setWikipediaEnglishLink(wikipediaEnglish)
    setWikipediaSpanishLink(wikipediaSpanish)

    setIsLoading(false)
}