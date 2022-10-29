import {Menu, MenuButton, MenuList, MenuItemOption, MenuOptionGroup, Button, Text, Flex} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

export const AccommodationsFilterMenu = ({selectedCategory, setSelectedCategory}) => {
    const accommodationsTypes = [
        { id: 'accomodations', name: 'Todos' },
        { id: 'alpine_hut', name: 'Refugio de montaña' },
        { id: 'apartments', name: 'Departamento' },
        { id: 'campsites', name: 'Campamento' },
        { id: 'guest_houses', name: 'Casas de huéspedes' },
        { id: 'hostels', name: 'Hostels' },
        { id: 'other_hotels', name: 'Hotels' },
        { id: 'resorts', name: 'Resorts' },
        { id: 'villas_and_chalet', name: 'Villas y Chalets' },
    ]

    return (
        <Flex direction='column' w='500px' alignItems='stretch'>
            <Text as='b' size='xs' align='center' color='#718096'>Tipo de alojamiento</Text>
            <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    { selectedCategory.name }
                </MenuButton>
                <MenuList>
                    <MenuOptionGroup defaultValue='asc' type='radio'>
                        {
                            accommodationsTypes.map( category => (
                                <MenuItemOption key={category.id} value={category.id} onClick={()=> setSelectedCategory(category)}>
                                    {category.name}
                                </MenuItemOption>
                            ))
                        }
                    </MenuOptionGroup>
                </MenuList>
            </Menu>
        </Flex>
    );
}