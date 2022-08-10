import {
    Button,
    Flex,
    HStack, IconButton,
    Menu,
    MenuButton,
    MenuItemOption,
    MenuList,
    MenuOptionGroup, useToast,
    VStack
} from "@chakra-ui/react";
import {ArrowForwardIcon, ChevronDownIcon, SearchIcon} from "@chakra-ui/icons";
import {useState} from "react";
import opentripmapradius from "../api/opentripmapradius";
import { HorariosInput } from "./calculator/horarios/HorariosInput";

const SelectActivities = (props) => {
    const [selectedCategory, setSelectedCategory] = useState()
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState()
    const [selectedSubCategory, setSelectedSubCategory] = useState("")

    const mainCategory = [
        {id:"architecture", index: 0, name: "Architectura"},
        {id:"cultural", index: 1, name: "Cultura"},
        {id:"historic", index: 2, name: "Historia"},
        {id:"natural", index: 3, name: "Naturaleza"}]

    const subCategory = [
        [ {id:"bridges",name:'Puentes'}, {id:"historic_architecture",name:"Arquitectura Historica"}, {id:"lighthouses",name:"Faros"}, {id:"skyscrapers",name:"Rascacielos"}, {id:"towers",name:"Edificios"} ],
        [ {id:"museums",name: "Museo"}, {id:"theatres_and_entertainments",name:"Teaatros"} ],
        [ {id:"archaeology",name: "Arqueologia"}, {id:"historical_places",name:"Lugares historicos"}],
        [ {id:"beaches",name: "Playas"}, {id:"nature_reserves",name:"Reserva natural"}],]

    const onClick = async () => {
        const response = await opentripmapradius.get(
            '',
            {
                params: {
                    lat: props.accommodationLat,
                    lon: props.accommodationLon,
                    radius: '1000',
                    kinds: `${selectedCategory},${selectedSubCategory}`,
                    limit: '10',
                    rate: '2',
                    apikey: '5ae2e3f221c38a28845f05b6f49a7b8966e8aa9ad3d18032148adf6f'
                },
            });
        props.setActivitiesResponse(response.data.features)
    }

    return (
        <HStack spacing={1} mb={1}>
            <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />} mb={1} >
                    { !selectedCategory ? "Seleccione categoria de interes" : selectedCategory }
                </MenuButton>
                <MenuList>
                    <MenuOptionGroup defaultValue='asc' type='radio'>
                        {
                            mainCategory.map( category => (
                                <MenuItemOption key={category.id} value={category.id} onClick={()=> {
                                    setSelectedCategory(category.id)
                                    setSelectedCategoryIndex(category.index)
                                }}>
                                    {category.name}
                                </MenuItemOption>
                            ))
                        }
                    </MenuOptionGroup>
                </MenuList>
            </Menu>
            <Menu isDisabled={!!selectedCategory}>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    { !selectedSubCategory ? "Seleccione subcategoria de interes" : selectedSubCategory }
                </MenuButton>
                <MenuList>
                    <MenuOptionGroup defaultValue='asc' type='radio'>
                        {
                            subCategory.at(selectedCategoryIndex).map( subcategory => (
                                <MenuItemOption key={subcategory.id} value={subcategory.id} onClick={()=>setSelectedSubCategory(subcategory.id)}>
                                    {subcategory.name}
                                </MenuItemOption>
                            ))
                        }
                    </MenuOptionGroup>
                </MenuList>
            </Menu>
            <IconButton type="submit"  icon={<SearchIcon />} onClick={onClick}/>
        </HStack>
    )
}

const ActivitiesList = (props) => {
    const activities = props.activities.map( (activity) => {
        return (
            <ActivitiesCard
                activity={activity} mt={2}
                selectedActivities={props.selectedActivities}
                setSelectedActivities={props.setSelectedActivities}
                setStepFinished={props.setStepFinished}/>
        )
    })
    return (
        <VStack spacing={1} mt={1} mb={1} align='stretch'>
            {activities}
        </VStack>
    )
}

const ActivitiesCard = (props) => {
    const toast = useToast()
    const onClick =  () => {
        props.setSelectedActivities([... props.selectedActivities, props.activity])
        props.setStepFinished(true)
        toast({
            title: 'Actividad seleccionada!',
            description: `Elegiste ${props.activity.name}`,
            status: 'success',
            duration: 1800,
        })
    }
    return (
        <Button variant='outline' onClick={onClick}>
            {`${props.activity.name}`}
        </Button>
    )
}

export const ActivitiesInputs = (props) => {
    const [selectedActivities, setSelectedActivities] = useState([]);
    const [stepFinished, setStepFinished] = useState(false);
    const [activitiesResponse, setActivitiesResponse] = useState([]);

    const activities = activitiesResponse.map((activity) => {
        return {
            name: activity.properties.name,
            latitude: activity.geometry.coordinates[1],
            longitude: activity.geometry.coordinates[0],
            rate: activity.properties.rate,
        }
    })

    return (
        <Flex direction="column" alignContent="space-around" mt='2vh'>
            <SelectActivities
                selectedAccommodation={props.selectedAccommodation}
                setActivitiesResponse={setActivitiesResponse}
                accommodationLat={props.selectedAccommodation.latitude}
                accommodationLon={props.selectedAccommodation.longitude}/>
            <ActivitiesList
                activities={activities}
                selectedActivities={selectedActivities}
                setSelectedActivities={setSelectedActivities}
                setStepFinished={setStepFinished}/>
            <Button
                rightIcon={<ArrowForwardIcon />}
                colorScheme='pink'
                variant='outline'
                isDisabled={!stepFinished}
                onClick={() => {
                    props.setCalculatorInputs(prevState => ({...prevState, activities: selectedActivities}))
                    props.nextStep(
                        <HorariosInput nextStep={props.nextStep} setCalculatorInputs={props.setCalculatorInputs}/>
                    )
                }}
            >
                Continua con HORARIOS
            </Button>
        </Flex>
    )
}