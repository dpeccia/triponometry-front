import {Flex, MenuButton, MenuItem, Menu, MenuList} from "@chakra-ui/react";
import { NewCalculationResultInfo } from "./NewCalculationResultInfo";
import { PdfButtonExport1 } from "./ExportPdf";
import { SaveCalculationModal } from "../../utils/modals/SaveCalculationModal";
import { ResultTrip } from "../../result/ResultTrip";
import { IconButton } from "@chakra-ui/button";
import { MdArrowBackIosNew } from "react-icons/md";
import { SaveDraftAsTripModal } from "../../utils/modals/SaveDraftAsTripModal";
import { PlantillaBadge } from "../../utils/PlantillaBadge";
import {HamburgerIcon} from "@chakra-ui/icons";

export const NewCalculationResult = ({ setShowResults, calculatorInputs, calculatorOutputs, id, name, original, loggedIn }) => {

    const saveModal = () => {
        if(loggedIn) {
            if (id) {
                return (
                    <SaveDraftAsTripModal tripId={id} calculatorName={name} calculatorInputs={calculatorInputs} calculatorOutputs={calculatorOutputs} />
                )
            } else {
                return (
                    <SaveCalculationModal calculatorInputs={calculatorInputs} calculatorOutputs={calculatorOutputs} />
                )
            }
        }
    }

    const plantillaBadge = () => {
        if (original){
            return <PlantillaBadge justify='end' align='center' original={original} />
        }
    }

    return (
        <Flex flexDirection="column" width="100%">
            <Flex width="100%">
                <IconButton variant='ghost' as={MdArrowBackIosNew} size='lg' mt={5} ml={5} p={1} onClick={() => setShowResults(false)} />
                <Flex alignItems='center' width="100%" justifyContent='space-between'>
                    <NewCalculationResultInfo calculatorInputs={calculatorInputs} calculatorOutputs={calculatorOutputs} />
                    {plantillaBadge()}
                    { loggedIn &&
                    <Flex mt={2} justifyContent='flex-end'>
                        <Menu>
                            <MenuButton as={IconButton} icon={<HamburgerIcon />} variant='outline'/>
                            <MenuList>
                                <MenuItem>
                                    <PdfButtonExport1 calculatorInputs={calculatorInputs} calculatorOutputs={calculatorOutputs}/>
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>}
                </Flex>
            </Flex>
            <ResultTrip calculatorInputs={calculatorInputs} calculatorOutputs={calculatorOutputs} loggedIn={loggedIn} />
            {saveModal()}
        </Flex>
    );
}