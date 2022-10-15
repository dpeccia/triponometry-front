import {Text, Flex, Avatar} from '@chakra-ui/react'
import Flag from 'react-world-flags'
import { useState, useEffect } from 'react';
import { getAllTrips } from '../../BackendService';
import { SpinnerSearchBox } from '../utils/SpinnerSearchBox';
import { ExplorerTable } from '../explorer/ExplorerTable';
import { useToast } from '../utils/useToast';

export const ExplorerPage = () => {
    const [_, showErrorToast] = useToast()
    const [trips, setTrips] = useState(null);
    const [isLoading, setIsLoading] = useState(true)

    const fetchTrips = async () => {
        return await getAllTrips()
    }

    const onFinish = (response) => {
        if (response?.status !== "Error") {
            const tripsMapped = response.map( (trip) => {
                return({
                    userInfo: trip.user,
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
        } else {
            showErrorToast(response.msg)
        }
    }

    useEffect(() => {
        fetchTrips().then(onFinish);
    }, []);

    const styleName = (name, imageUrl) => {
        return (
            <Flex alignItems='center'>
                <Avatar size='md' src={imageUrl}/>
                <Text ml={4}> {name} </Text>
            </Flex>
        )
    }

    const styleCountry = (code) => {
        return (
            <Flex h={5} w='30px' justifyContent='start' >
                <Flag code={code}/>
                <Text ml={2}> {code} </Text>
            </Flex>
        )
    }

    const colour = (rating) => {
        switch(rating){
            case 1:
                return 'red.500';
            case 2:
                return 'red.300';
            case 3:
                return 'orange.300';
            case 4:
                return 'green.300';
            case 5:
                return 'green.500';
            default:
                return 'gray.400'
        }
    }

    const styleRating = (rating) => {
        return (
            <Flex h={5} w='30px' justifyContent='space-between' alignItems='center' >
                <Text as='b' fontSize='md' color={colour(rating)}> {rating}</Text>
                <Flex alignItems='center'>
                    <StarIcon color={colour(rating)}/>
                </Flex>
            </Flex>
        )
    }

    return (
        <Flex direction='column' grow={2} ml={8} mr={8}>
            { isLoading ? <SpinnerSearchBox/> : <ExplorerTable data={trips} />}
        </Flex>
    )
}