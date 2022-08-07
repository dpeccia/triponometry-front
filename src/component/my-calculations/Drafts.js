import CalculationCard from "./CalculationCard";
import { Flex } from '@chakra-ui/react'
import { FaTrashAlt } from 'react-icons/fa'; 
import CardButton from "./CardButton";

const Drafts = ({ draftsCalculations }) => {
    const onHover = { bg: "gray.300", shadow: 'xl', filter: 'auto', brightness: '95%'}

    const calculationCards = draftsCalculations.map((calculation) => {
        return (
            <CalculationCard key={calculation.id} calculation={calculation} background='gray.200' onHover={onHover}>
                <CardButton/>
                <CardButton icon={FaTrashAlt} />
            </CalculationCard>
        );
    });

    return (
        <Flex wrap='wrap'>
            {calculationCards}
        </Flex>  
    );
}

export default Drafts;