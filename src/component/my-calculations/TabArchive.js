import CalculationCard from "./CalculationCard";
import { Flex } from '@chakra-ui/react'
import { FaShareSquare } from 'react-icons/fa'; 
import {ShareCalculationModal} from "../utils/modals/ShareCalculationModal";
import {useNavigate} from "react-router";

const TabArchive = ({ archivedCalculations }) => {
    const navigate = useNavigate()
    const onHover = { shadow: 'xl', filter: 'auto'}

    const calculationCards = archivedCalculations.map((calculation) => {
        return (
            <CalculationCard key={calculation.id} calculation={calculation} navigateTo={() => navigate(`/mis-calculos/${calculation.id}`)} background='gray.300' onHover={onHover}>
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

export default TabArchive;