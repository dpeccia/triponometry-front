import CalculationCard from "./CalculationCard";
import {Flex} from '@chakra-ui/react'
import { FaEdit, FaArchive, FaShareSquare } from 'react-icons/fa'; 
import {EditCalculationModal} from "./modals/EditCalculationModal";
import {ArchiveCalculationModal} from "./modals/ArchiveCalculationModal";
import {ShareCalculationModal} from "./modals/ShareCalculationModal";

const Saved = (props) => {
    const onHover = { shadow: 'xl', filter: 'auto'}

    const calculationCards = props.savedCalculations.map((calculation) => {
        return (
            <CalculationCard key={calculation.id} calculation={calculation} background='white' onHover={onHover}>
                <ShareCalculationModal icon={FaShareSquare}/>
                <EditCalculationModal icon={FaEdit} calculationName={calculation.name}/>
                <ArchiveCalculationModal icon={FaArchive} fetchCalculations={props.fetchCalculations} calculationId={calculation.id} calculationName={calculation.name}/>
            </CalculationCard>
        );
    });

    return (
        <Flex wrap='wrap'>
            {calculationCards}
        </Flex>  
    );
}

export default Saved;