import {Menu, MenuButton, MenuList, MenuItemOption, MenuOptionGroup, Button, Text, Flex} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

export const AccommodationsFilterMenu = ({selectedCategory, setSelectedCategory}) => {
    const accommodationsTypes = [
        { id: 'accomodations', name: 'Todos' },
        { id: 'campsites', name: 'Camping' },
        { id: 'apartments', name: 'Departamento' },
        { id: 'hostels', name: 'Hostel' },
        { id: 'other_hotels', name: 'Hotel' },
        { id: 'guest_houses', name: 'Pensión' },
        { id: 'resorts', name: 'Resort' },
    ]

    return (
        <Flex direction='column' w='500px' alignItems='stretch' gap={1}>
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