import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Saved from "../my-calculations/Saved";
import Drafts from "../my-calculations/Drafts";
import Archive from "../my-calculations/Archive";
import { useEffect, useState } from 'react';
import { getMyTrips } from '../../BackendService';
import { SpinnerSearchBox } from '../utils/SpinnerSearchBox';
import { take } from 'lodash';

export const MyCalculationsPage = () => {
    const [calculations, setCalculations] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const toCalculationCardInfo = (trip) => {
        return {
            id: trip.id,
            name: trip.name,
            days: trip.calculatorOutputs.daysAmount,
            city: trip.calculatorInputs.city.name,
            country: take(trip.calculatorInputs.city.country, 3), // TODO obtener codigo de pais
            price: "", // TODO solucionar tema precios
            imageUrl: trip.calculatorInputs.city.imageUrl
        }
    }

    const fetchCalculations = async () => {
        setCalculations(null)
        setIsLoading(true)
        const tripsResponse = await getMyTrips()
        if(tripsResponse) {
            const myTrips = {
                saved: tripsResponse.active.map((activeTrip) => toCalculationCardInfo(activeTrip)),
                drafts: tripsResponse.draft.map((draftTrip) => {
                    return {
                        id: draftTrip.id,
                        name: draftTrip.name,
                    }
                }),
                archive: tripsResponse.archived.map((archivedTrip) => toCalculationCardInfo(archivedTrip))
            }
            setCalculations(myTrips)
            setIsLoading(false)
        } 
    }

    useEffect(() => {
        fetchCalculations();
    }, []);

    return (
        <Tabs colorScheme='red'>
            <TabList>
                <Tab>Guardados</Tab>
                <Tab>Borradores</Tab>
                <Tab>Archivados</Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                    { isLoading ? <SpinnerSearchBox/> : <Saved savedCalculations={calculations.saved} fetchCalculations={fetchCalculations}/> }
                </TabPanel>
                <TabPanel>
                    { isLoading ? <SpinnerSearchBox/> : <Drafts draftsCalculations={calculations.drafts} /> }
                </TabPanel>
                <TabPanel>
                    { isLoading ? <SpinnerSearchBox/> : <Archive archivedCalculations={calculations.archive} /> }
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};