import {Text, Flex, Avatar} from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import { getAllTrips } from '../../BackendService';
import { SpinnerSearchBox } from '../utils/SpinnerSearchBox';
import { ExplorerTable } from '../explorer/ExplorerTable';


export const ExplorerPage = () => {
    const [trips, setTrips] = useState(null);
    const [isLoading, setIsLoading] = useState(true)

    const fetchTrips = async () => {
        return await getAllTrips()
    }

    const onFinish = (response) => {
        const tripsMapped = response.map( (trip) => {
            return({
                id: trip.id,
                name: trip.name,
                imageUrl: trip.calculatorInputs.city.imageUrl,
                days: trip.calculatorOutputs.daysAmount,
                city: trip.calculatorInputs.city.name,
                country: trip.calculatorInputs.city.country,
                rating: trip.rating,
            })
        })
        setTrips(tripsMapped)
        setIsLoading(false)
    }

    useEffect(() => {
        fetchTrips().then(onFinish);
    }, []);

    return (
        <Flex direction='column' grow={2} ml={8} mr={8}>
            { isLoading ? <SpinnerSearchBox/> : <ExplorerTable data={trips} />}
        </Flex>
    )
}