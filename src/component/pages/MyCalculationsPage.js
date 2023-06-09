import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import TabSaved from "../my-calculations/TabSaved";
import TabDrafts from "../my-calculations/TabDrafts";
import TabArchive from "../my-calculations/TabArchive";
import { useEffect, useState } from 'react';
import { getMyTrips } from '../../BackendService';
import { SpinnerSearchBox } from '../utils/SpinnerSearchBox';
import { take } from 'lodash';
import { useLocation } from 'react-router';
import { useToast } from '../utils/useToast';
import { checkErrorTokenExpired } from '../../BackendService';

export const MyCalculationsPage = ({logout}) => {
    const [_, showErrorToast] = useToast()
    const {state} = useLocation()
    const defaultIndex = state ? state.defaultIndex : 0
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
        if (tripsResponse?.status !== "Error") {
            const myTrips = {
                saved: tripsResponse.active.map((activeTrip) => toCalculationCardInfo(activeTrip)),
                drafts: tripsResponse.draft.map((draftTrip) => {
                    return {
                        id: draftTrip.id,
                        name: draftTrip.name,
                        status: draftTrip.status,
                    }
                }),
                archive: tripsResponse.archived.map((archivedTrip) => toCalculationCardInfo(archivedTrip))
            }
            setCalculations(myTrips)
            setIsLoading(false)
        } else {
            setIsLoading(false)
            showErrorToast(tripsResponse.msg, logout)
        }
    }

    useEffect(() => {
        fetchCalculations();
    }, []);

    return (
        <Tabs colorScheme='red' defaultIndex={defaultIndex} w='100%' size='lg'>
            <TabList>
                <Tab fontWeight='medium'>Guardados</Tab>
                <Tab fontWeight='medium'>Borradores</Tab>
                <Tab fontWeight='medium'>Archivados</Tab>
            </TabList>

            <TabPanels h='100%'>
                <TabPanel h='100%' >
                    { isLoading ? <SpinnerSearchBox/> : <TabSaved savedCalculations={calculations.saved} fetchCalculations={fetchCalculations}/> }
                </TabPanel>
                <TabPanel h='100%'>
                    { isLoading ? <SpinnerSearchBox/> : <TabDrafts draftsCalculations={calculations.drafts} fetchCalculations={fetchCalculations} /> }
                </TabPanel>
                <TabPanel h='100%'>
                    { isLoading ? <SpinnerSearchBox/> : <TabArchive archivedCalculations={calculations.archive} /> }
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};