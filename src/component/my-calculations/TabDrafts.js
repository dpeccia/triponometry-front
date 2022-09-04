import CalculationCard from "./CalculationCard";
import { Flex } from '@chakra-ui/react'
import { FaTrashAlt } from 'react-icons/fa'; 
import {DeleteCalculationModal} from "../utils/modals/DeleteCalculationModal";
import {useNavigate} from "react-router";

const TabDrafts = ({ draftsCalculations }) => {
    const navigate = useNavigate()
    const onHover = { shadow: 'xl', filter: 'auto'}

    const calculationCards = draftsCalculations.map((calculation) => {
        return (
            <CalculationCard key={calculation.id} calculation={calculation} navigateTo={() => {}} background='gray.300' onHover={onHover}>
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