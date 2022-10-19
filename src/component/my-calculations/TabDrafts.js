import CalculationCard from "./CalculationCard";
import { Flex } from '@chakra-ui/react'
import { FaTrashAlt } from 'react-icons/fa'; 
import {DeleteDraftModal} from "../utils/modals/DeleteDraftModal";
import {useNavigate} from "react-router";
import { EmptyDraftsPage } from "./EmptyDraftsPage";
import { isEmpty } from "lodash";

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

    const showDraftsComponent = () => {
        if (isEmpty(draftsCalculations)) {
            return <EmptyDraftsPage />
        }
        return (
            <Flex wrap='wrap'>
                {calculationCards}
            </Flex>
        )
    }

    return showDraftsComponent()
}

export default TabDrafts;