import { GridItem, IconButton } from '@chakra-ui/react'

const CardButton = ({ icon }) => {
    if (icon === undefined) {
        return <GridItem w='100%' h='100%' />
    }
    return (
        <GridItem w='100%' h='100%'>
            <IconButton as={icon} size='sm' p='2' />
        </GridItem>
    );
}

export default CardButton;