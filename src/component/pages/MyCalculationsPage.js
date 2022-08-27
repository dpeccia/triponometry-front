import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Saved from "../my-calculations/Saved";
import Drafts from "../my-calculations/Drafts";
import Archive from "../my-calculations/Archive";

export const MyCalculationsPage = () => {

    const calculations = {
        saved: [
            {
                id: 1,
                name: "Amo Córdoba 💛",
                days: "2",
                city: "Córdoba",
                country: "ARG",
                price: "ARG $30.000",
                imageUrl: "https://pbs.twimg.com/media/DeX2MLQWsAAlozV.jpg"
            },
            {
                id: 2,
                name: "Paseo histórico",
                days: "3",
                city: "Roma",
                country: "ITA",
                price: "USD 3.148",
                imageUrl: "https://historia.nationalgeographic.com.es/medio/2018/03/01/coliseo-romano_16022ed4_1280x853.jpg"
            },
            {
                id: 3,
                name: "It’s beach time! 😎",
                days: "6",
                city: "Recife",
                country: "BRA",
                price: "USD 5.453",
                imageUrl: "http://www.eltiempo.com/files/image_640_428/uploads/2017/10/25/59f1585e0af3a.jpeg"
            },
            {
                id: 4,
                name: "Disney + Universal",
                days: "7",
                city: "Orlando",
                country: "USA",
                price: "USD 8.003",
                imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Mickey_and_Walt_Disney.jpg"
            },
            {
                id: 5,
                name: "Pirámides",
                days: "1",
                city: "El Cairo",
                country: "EGY",
                price: "USD 2.564",
                imageUrl: "https://static.dw.com/image/60495947_303.jpg"
            },
            {
                id: 6,
                name: "Bier 🍺",
                days: "3",
                city: "München",
                country: "DEU",
                price: "USD 2.453",
                imageUrl: "http://nexointernacional.fen.uchile.cl/wp-content/uploads/2020/10/3.Universitat_der_Bundeswehr_Munchen.jpg"
            }
        ],
        drafts: [
            {
                id: 1,
                name: "Borrador Rusia"
            },
            {
                id: 2,
                name: "Borrador México"
            },
            {
                id: 3,
                name: "Borrador Australia"
            }
        ],
        archive: [
            {
                id: 7,
                name: "Eslovenia a full",
                days: "2",
                city: "Ljubljana",
                country: "SVN",
                price: "USD 3.148",
                imageUrl: "https://www.vinosycaminos.com/images/showid2/3739211?w=1200&zc=4"
            },
            {
                id: 8,
                name: "Recorrido antiguo",
                days: "4",
                city: "Praga",
                country: "CZE",
                price: "USD 2.342",
                imageUrl: "https://www.miviaje.info/wp-content/uploads/2018/06/Viajar-a-Praga.jpeg"
            },
            {
                id: 9,
                name: "Oh La La, Paris!",
                days: "6",
                city: "París",
                country: "FRA",
                price: "USD 5.545",
                imageUrl: "https://viajes.nationalgeographic.com.es/medio/2022/07/13/paris_37bc088a_1280x720.jpg"
            },
            {
                id: 10,
                name: "Historia nórdica",
                days: "4",
                city: "Estocolmo",
                country: "SWE",
                price: "USD 4.003",
                imageUrl: "https://www.costacruceros.com/content/dam/costa/costa-magazine/articles-magazine/travel/stockholm-st-petersburg/stoccolma_m.jpg.image.694.390.low.jpg"
            }
        ]
    }

    return (
        <Tabs colorScheme='red'>
            <TabList>
                <Tab>Guardados</Tab>
                <Tab>Borradores</Tab>
                <Tab>Archivados</Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                    <Saved savedCalculations={calculations.saved} />
                </TabPanel>
                <TabPanel>
                    <Drafts draftsCalculations={calculations.drafts} />
                </TabPanel>
                <TabPanel>
                    <Archive archivedCalculations={calculations.archive} />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};