import {Flex, Box, Button, Image} from "@chakra-ui/react";
import { useState } from "react";
import { CalculatorComponent } from "../calculator/CalculatorComponent";
import {CityInput} from "../calculator/inputs/city/CityInput";
import { AccommodationInput } from "../calculator/inputs/accommodation/AccommodationInput";
import { ActivitiesInputs } from "../calculator/inputs/activities/ActivitiesInput";
import { HorariosInput } from "../calculator/inputs/horarios/HorariosInput";
import { MobilityInput } from "../calculator/inputs/mobility/MobilityInput";
import { NewCalculationResult } from "../calculator/output/NewCalculationResult";
import { calculateNewTrip} from "../../BackendService";
import { isNull } from "lodash";
import { Heading } from "@chakra-ui/layout";
import { useToast } from "../utils/useToast";
import { EditCalculationResult } from "../calculator/output/EditCalculationResult";
import { EditBadge } from "../utils/EditBadge";
import { PlantillaBadge } from "../utils/PlantillaBadge";
import { getRandomImage } from "../utils/AdHandler";
import { useEffect } from "react";
import { ArrowRightIcon } from "@chakra-ui/icons";

export const NewCalculationPage = ({ tripId, edit, beginInput, inputs, name, status, original, userInfo, loggedIn }) => {
    const [_, showErrorToast] = useToast()
    const changeInputType = (inputType) => { setInputType(inputType) }
    const [image, setImage] = useState(getRandomImage())

    useEffect(() =>{
        setImage(getRandomImage())
    },[])

    const setInitialState = () => {
        if (edit || status === 'DRAFT' || original) {
            return inputs
        } else {
            return { city: {}, accommodation: {}, activities: [], horarios: {}, mobility: "" }
        }
    }

    const [calculatorInputs, setCalculatorInputs] = useState(setInitialState());

    const [inputType, setInputType] = useState(beginInput);

    const InputComponents = {
        CITY: <CityInput calculatorInputs={calculatorInputs} nextStep={changeInputType} setCalculatorInputs={setCalculatorInputs}/>,
        ACCOMMODATION: <AccommodationInput calculatorInputs={calculatorInputs} nextStep={changeInputType} setCalculatorInputs={setCalculatorInputs}/>,
        ACTIVITIES: <ActivitiesInputs calculatorInputs={calculatorInputs} nextStep={changeInputType} setCalculatorInputs={setCalculatorInputs}/>,
        TIME: <HorariosInput calculatorInputs={calculatorInputs} nextStep={changeInputType} setCalculatorInputs={setCalculatorInputs}/>,
        MOBILITY: <MobilityInput calculatorInputs={calculatorInputs} setCalculatorInputs={setCalculatorInputs}/>
    }

    const inputSpecificComponent = InputComponents[inputType]

    const [showResults, setShowResults] = useState(false)
    const [calculatorOutputs, setCalculatorOutputs] = useState(null)
    const [showAd, setShowAd] = useState(false)

    const closeAd = () => {
        setShowAd(false)
    }

    const calculateTrip = async () => {
        setShowAd(true)
        setCalculatorOutputs(null)
        setShowResults(true)

        const response = await calculateNewTrip(calculatorInputs)
        
        if (response?.status !== "Error") {
            setTimeout(() => setCalculatorOutputs({ mapId: response.kml, events: response.events, daysAmount: response.daysAmount }), 3000)
        } else {
            setShowResults(false)
            showErrorToast(response.msg)
        }
    }

    const addEditBadge = () => {
        if(edit)
            return <EditBadge justify='start' align='end' />
        if(original){
            return <PlantillaBadge justify='start' align='end' original={original}/>
        }
    }


    if(showResults) {
        if(showAd) {
            return (
                <Flex direction='column' minHeight='600px' w='100%' justify='center' align='center'>
                    <Heading size='lg' mb={2}>Calculando tu viaje ideal en {calculatorInputs.city.name}...</Heading>
                    <iframe 
                        width="1200" 
                        height="630" 
                        src={image+"?&autoplay=1"} 
                        title="Publicidad" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                    <Button mt={2}
                        rightIcon={<ArrowRightIcon />}
                        isLoading={isNull(calculatorOutputs)}
                        colorScheme='pink'
                        variant='outline'
                        onClick={closeAd}
                    >
                        Ver viaje
                    </Button>
                </Flex>
            );
        }

        if(edit) {
            return <EditCalculationResult setShowResults={setShowResults} id={tripId} name={name} calculatorInputs={calculatorInputs} calculatorOutputs={calculatorOutputs} status={status} userInfo={userInfo} loggedIn={loggedIn}/>
        } else {
            return <NewCalculationResult setShowResults={setShowResults} calculatorInputs={calculatorInputs} calculatorOutputs={calculatorOutputs} status={status} id={tripId} name={name} original={original} loggedIn={loggedIn}/>
        }
    }
    return (
        <>
            <CalculatorComponent handleClick={changeInputType} calculatorInputs={calculatorInputs} setCalculatorInputs={setCalculatorInputs} calculateTrip={calculateTrip} 
                                 name={name} tripId={tripId} status={status}/>

            <Flex direction='column' marginLeft={3} grow='1' alignItems='center'>
                {addEditBadge()}
                {inputSpecificComponent}
            </Flex>
        </>
    )
}