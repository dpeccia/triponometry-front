import CalculationCard from "./CalculationCard";
import {Flex} from '@chakra-ui/react'
import { FaEdit, FaArchive, FaShareSquare } from 'react-icons/fa'; 
import {EditCalculationModal} from "../utils/modals/EditCalculationModal";
import {ArchiveCalculationModal} from "../utils/modals/ArchiveCalculationModal";
import {ShareCalculationModal} from "../utils/modals/ShareCalculationModal";
import {useNavigate} from "react-router";

const TabSaved = (props) => {
    const navigate = useNavigate()
    const onHover = { shadow: 'xl', filter: 'auto'}

    const calculationCards = props.savedCalculations.map((calculation) => {
        return (
            <CalculationCard key={calculation.id} calculation={calculation} navigateTo={() => navigate(`/mis-calculos/${calculation.id}`)} background='white' onHover={onHover}>
                <ShareCalculationModal icon={FaShareSquare}/>
                <EditCalculationModal calculationName={calculation.name}/>
                <ArchiveCalculationModal fetchCalculations={props.fetchCalculations} calculationId={calculation.id} calculationName={calculation.name}/>
            </CalculationCard>
        );
    });

    return (
        <Flex wrap='wrap'>
            {calculationCards}
        </Flex>  
    );
}

export default TabSaved;