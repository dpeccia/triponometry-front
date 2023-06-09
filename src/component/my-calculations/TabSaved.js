import CalculationCard from "./CalculationCard";
import {Flex} from '@chakra-ui/react'
import {ArchiveCalculationModal} from "../utils/modals/ArchiveCalculationModal";
import {ShareCalculationModal} from "../utils/modals/ShareCalculationModal";
import {useNavigate} from "react-router";
import {EditCalculationIconModal} from "../utils/modals/EditCalculationIconModal";
import { isEmpty } from "lodash";
import { EmptySavedPage } from "./EmptySavedPage";

const TabSaved = (props) => {
    const navigate = useNavigate()
    const onHover = { shadow: 'xl', filter: 'auto'}

    const calculationCards = props.savedCalculations.map((calculation) => {
        return (
            <CalculationCard key={calculation.id} calculation={calculation} navigateTo={() => navigate(`/mis-calculos/${calculation.id}`)} background='white' onHover={onHover}>
                <ShareCalculationModal calculationId={calculation.id}/>
                <EditCalculationIconModal calculationId={calculation.id} calculationName={calculation.name}/>
                <ArchiveCalculationModal fetchCalculations={props.fetchCalculations} calculationId={calculation.id} calculationName={calculation.name}/>
            </CalculationCard>
        );
    });

    const showSavedComponent = () => {
        if (isEmpty(props.savedCalculations)) {
            return <EmptySavedPage />
        }
        return (
            <Flex wrap='wrap'>
                {calculationCards}
            </Flex>
        )
    }

    return showSavedComponent()
}

export default TabSaved;