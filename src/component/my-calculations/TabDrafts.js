import CalculationCard from "./CalculationCard";
import { Flex } from '@chakra-ui/react'
import { FaTrashAlt } from 'react-icons/fa'; 
import {DeleteDraftModal} from "../utils/modals/DeleteDraftModal";
import {useNavigate} from "react-router";

const TabDrafts = ({ draftsCalculations, fetchCalculations }) => {
    const navigate = useNavigate()
    const onHover = { shadow: 'xl', filter: 'auto'}

    const calculationCards = draftsCalculations.map((calculation) => {
        return (
            <CalculationCard key={calculation.id} calculation={calculation} navigateTo={() => {navigate(`/mis-calculos/${calculation.id}/edicion`)}} background='gray.300' onHover={onHover}>
                <DeleteDraftModal
                    icon={FaTrashAlt}
                    calculationName={calculation.name}
                    draftId={calculation.id}
                    fetchCalculations={fetchCalculations}
                    />
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