import { Flex, HStack, VStack, WrapItem, Avatar, Box } from "@chakra-ui/react";

export const TripInfo = () => {

    const trip = {
        id: 2,
        name: "Paseo histórico",
        days: "3",
        city: "Roma",
        country: "ITA",
        price: "USD 3.148",
        imageUrl: "https://historia.nationalgeographic.com.es/medio/2018/03/01/coliseo-romano_16022ed4_1280x853.jpg"
    }

    return (

        <Flex flexDirection='row'
        width="100%"
        justifyContent="space-between"
        >

        <Box>

            <Flex>

            <Avatar size='md' src="https://historia.nationalgeographic.com.es/medio/2018/03/01/coliseo-romano_16022ed4_1280x853.jpg"/>{' '}
        
            <VStack marginLeft={3} >
                <h1>{trip.name}</h1>
                <HStack>
                    <h3>{trip.city} en {trip.days} días</h3>
                    <h3>{trip.price}</h3>
                </HStack>
            </VStack>

            </Flex>

        </Box>

        <img src="https://cdn-icons-png.flaticon.com/512/80/80942.png" width="50" height="auto"></img>

    </Flex>
    );

}