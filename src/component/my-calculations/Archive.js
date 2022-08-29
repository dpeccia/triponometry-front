import CalculationCard from "./CalculationCard";
import { Flex } from '@chakra-ui/react'
import { FaShareSquare } from 'react-icons/fa'; 
import {ShareCalculationModal} from "./modals/ShareCalculationModal";

const Archive = ({ archivedCalculations }) => {
    const onHover = { shadow: 'xl', filter: 'auto'}

    const calculationCards = archivedCalculations.map((calculation) => {
        return (
            <CalculationCard key={calculation.id} calculation={calculation} background='gray.300' onHover={onHover}>
                <ShareCalculationModal
                    icon={FaShareSquare}/>
            </CalculationCard>
        );
    });

    return (
        <Flex wrap='wrap'>
            {calculationCards}
        </Flex>  
    );
}

export default Archive;