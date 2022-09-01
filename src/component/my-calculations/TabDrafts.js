import CalculationCard from "./CalculationCard";
import { Flex } from '@chakra-ui/react'
import { FaTrashAlt } from 'react-icons/fa'; 
import {DeleteCalculationModal} from "./modals/DeleteCalculationModal";

const TabDrafts = ({ draftsCalculations }) => {
    const onHover = { shadow: 'xl', filter: 'auto'}

    const calculationCards = draftsCalculations.map((calculation) => {
        return (
            <CalculationCard key={calculation.id} calculation={calculation} background='gray.300' onHover={onHover}>
                <DeleteCalculationModal
                    icon={FaTrashAlt}
                    calculationName={calculation.name}/>
            </CalculationCard>
        );
    });

    return (
        <Flex wrap='wrap'>
            {calculationCards}
        </Flex>  
    );
}

export default TabDrafts;