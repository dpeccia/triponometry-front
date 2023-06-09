import {Box, Badge, Image, Flex} from '@chakra-ui/react'
import {isUndefined} from "lodash";

const CalculationCard = (props) => {
    const { calculation, background, onHover, children } = props;

    const getCalculationImage = () => {
        if (isUndefined(calculation.imageUrl))
            return <Image w='22em' h='15em' objectFit='contain' src='../logo-triponometry.png' filter='grayscale(100%)'/>
        return (
            <Image w='22em' h='15em' objectFit='cover' src={calculation.imageUrl} />
        );
    }

    const getCalculationLabel = () => {
        if (isUndefined(calculation.days)) return
        return (
            <Box display='flex' alignItems='baseline'>
                <Badge borderRadius='full' px='2' colorScheme='red'>
                    {calculation.days} días
                </Badge>
                <Box color='gray.500' fontWeight='semibold' letterSpacing='wide' fontSize='xs' textTransform='uppercase' ml='2' noOfLines={1}>
                    {calculation.city} &bull; {calculation.country}
                </Box>
            </Box>
        );
    }

    return (
        <Box m='3' maxW='22em' bg={background} borderWidth='1px' borderRadius='xl' boxShadow='md' overflow='hidden' _hover={onHover}>
            <Box as='button' onClick={props.navigateTo}>
                {getCalculationImage()}
            </Box>
            <Box display='flex' justifyContent='space-between'>
                <Box p='5'>
                    {getCalculationLabel()}
                    <Box mt='1' fontWeight='semibold' as='h4' lineHeight='tight' maxW='250px' noOfLines={1}>
                        {calculation.name}
                    </Box>
                    <Box>
                        {calculation.price}
                    </Box>
                </Box>
                <Flex p='4' alignItems='center' w='120px' wrap='wrap' justifyContent='end' >
                    {children}
                </Flex>
            </Box>
        </Box>
    );
};

export default CalculationCard;