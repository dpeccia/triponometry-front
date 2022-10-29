import {Menu, MenuButton, MenuList, MenuItemOption, MenuOptionGroup, Button, Text, Flex} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

export const AccommodationsDistanceMenu = ({selectedDistance, setSelectedDistance}) => {
    const accommodationsDistance = [
        { id: '1000', name: 'Menos de 1 km' },
        { id: '3000', name: 'Menos de 3 km' },
        { id: '5000', name: 'Menos de 5 km' },
        { id: '10000', name: 'Menos de 10 km' },
    ]

    return (
        <Flex direction='column' w='600px' alignItems='stretch'>
            <Text as='b' size='xs' align='center' color='#718096'>Distancia desde el centro</Text>
            <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    { selectedDistance.name }
                </MenuButton>
                <MenuList>
                    <MenuOptionGroup defaultValue='asc' type='radio'>
                        {
                            accommodationsDistance.map( dist => (
                                <MenuItemOption key={dist.id} value={dist.id} onClick={()=> setSelectedDistance(dist)}>
                                    {dist.name}
                                </MenuItemOption>
                            ))
                        }
                    </MenuOptionGroup>
                </MenuList>
            </Menu>
        </Flex>
    );
}