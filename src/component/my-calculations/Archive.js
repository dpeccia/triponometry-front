import CalculationCard from "./CalculationCard";
import { Flex } from '@chakra-ui/react'
import { FaShareSquare } from 'react-icons/fa'; 
import CardButton from "./CardButton";

const Archive = ({ archivedCalculations }) => {
    const onHover = { bg: "gray.300", shadow: 'xl', filter: 'auto', brightness: '95%'}

    const calculationCards = archivedCalculations.map((calculation) => {
        return (
            <CalculationCard key={calculation.id} calculation={calculation} background='gray.200' onHover={onHover}>
                <CardButton/>
                <CardButton icon={FaShareSquare} />
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