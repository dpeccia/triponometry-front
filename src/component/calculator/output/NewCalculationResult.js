import {Flex, MenuButton, MenuItem, Menu, MenuList} from "@chakra-ui/react";
import { NewCalculationResultInfo } from "./NewCalculationResultInfo";
import { PdfButtonExport1 } from "./ExportPdf";
import { SaveCalculationModal } from "../../utils/modals/SaveCalculationModal";
import { ResultTrip } from "../../result/ResultTrip";
import { IconButton } from "@chakra-ui/button";
import { SaveDraftAsTripModal } from "../../utils/modals/SaveDraftAsTripModal";
import { PlantillaBadge } from "../../utils/PlantillaBadge";
import {HamburgerIcon} from "@chakra-ui/icons";
import {BackButton} from "../../utils/BackButton";

export const NewCalculationResult = ({ setShowResults, calculatorInputs, calculatorOutputs, id, name, original, loggedIn, logout }) => {

    const saveModal = () => {
        if(loggedIn) {
            if (id) {
                return (
                    <SaveDraftAsTripModal tripId={id} calculatorName={name} calculatorInputs={calculatorInputs} calculatorOutputs={calculatorOutputs} logout={logout}/>
                )
            } else {
                return (
                    <SaveCalculationModal calculatorInputs={calculatorInputs} calculatorOutputs={calculatorOutputs} logout={logout}/>
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
            <Flex alignItems='center' width="100%" justifyContent='space-between' p={2}>
                <Flex alignItems='center' gap={1}>
                    <BackButton onClick={() => setShowResults(false)}/>
                    <NewCalculationResultInfo calculatorInputs={calculatorInputs} calculatorOutputs={calculatorOutputs} />
                </Flex>
                { loggedIn &&
                    <Flex mt={2} justifyContent='flex-end' gap={8}>
                        {plantillaBadge()}
                        <Menu>
                            <MenuButton as={IconButton} icon={<HamburgerIcon />} variant='outline'/>
                            <MenuList>
                                <MenuItem>
                                    <PdfButtonExport1 calculatorInputs={calculatorInputs} calculatorOutputs={calculatorOutputs}/>
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                }
            </Flex>
            <ResultTrip calculatorInputs={calculatorInputs} calculatorOutputs={calculatorOutputs} loggedIn={loggedIn} />
            <Flex justifyContent='flex-end'>
                {saveModal()}
            </Flex>
        </Flex>
    );
}