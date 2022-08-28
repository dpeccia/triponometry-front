import {Box, Badge, Image, Flex} from '@chakra-ui/react'

const CalculationCard = (props) => {
    const { calculation, background, onHover, children } = props;

    const getCalculationImage = () => {
        if (calculation.imageUrl == undefined)
            return <Image w='18em' h='15em' objectFit='contain' src='../logo-triponometry.png' filter='grayscale(100%)'/>
        return (
            <Image w='22em' h='15em' objectFit='cover' src={calculation.imageUrl} />
        );
    }

    const getCalculationLabel = () => {
        if (calculation.days == undefined) return
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
            {getCalculationImage()}

            <Box display='flex' justifyContent='space-between'>
                <Box p='5'>
                    {getCalculationLabel()}
                    <Box mt='1' fontWeight='semibold' as='h4' lineHeight='tight' noOfLines={1}>
                        {calculation.name}
                    </Box>
                    <Box>
                        {calculation.price}
                    </Box>
                </Box>
                <Flex p='5' alignItems='center' w='120px' wrap='wrap' justifyContent='end' >
                    {children}
                </Flex>
            </Box>
        </Box>
    );
};

export default CalculationCard;