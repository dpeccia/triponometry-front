import CalculationCard from "./CalculationCard";
import { Flex } from '@chakra-ui/react'
import { FaEdit, FaArchive, FaShareSquare } from 'react-icons/fa'; 
import CardButton from "./CardButton";

const Saved = ({ savedCalculations }) => {
    const onHover = { bg: "gray.50", shadow: 'xl', filter: 'auto', brightness: '95%'}

    const calculationCards = savedCalculations.map((calculation) => {
        return (
            <CalculationCard key={calculation.id} calculation={calculation} background='white' onHover={onHover}>
                <CardButton icon={FaEdit} />
                <CardButton icon={FaShareSquare} />
                <CardButton/>
                <CardButton icon={FaArchive} />
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