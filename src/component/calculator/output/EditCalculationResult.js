import {Flex, Menu, MenuButton, MenuList, MenuItem} from "@chakra-ui/react";
import { SaveEditionModal } from "../../utils/modals/SaveEditionModal";
import {ResultTrip} from "../../result/ResultTrip";
import { MyCalculationInfo } from "../../my-calculations/MyCalculationInfo";
import { EditBadge } from "../../utils/EditBadge";
import { PdfButtonExport1 } from "./ExportPdf";
import {BackButton} from "../../utils/BackButton";
import {IconButton} from "@chakra-ui/button";
import {HamburgerIcon} from "@chakra-ui/icons";

export const EditCalculationResult = ({ setShowResults, id, name, calculatorInputs, calculatorOutputs, status, userInfo, loggedIn, logout }) => {
    return (
        <Flex flexDirection="column" width="100%">
            <Flex alignItems='center' width="100%" justifyContent='space-between' p={2}>
                <Flex alignItems='center' gap={1}>
                    <BackButton onClick={() => setShowResults(false)}/>
                    <MyCalculationInfo calculatorName={name} calculatorInputs={calculatorInputs} calculatorOutputs={calculatorOutputs} userInfo={userInfo}/>
                </Flex>
                <Flex mt={2} justifyContent='flex-end' gap={8}>
                    <EditBadge justify='end' align='center'/>
                    <Menu>
                        <MenuButton as={IconButton} icon={<HamburgerIcon />} variant='outline'/>
                        <MenuList>
                            <MenuItem>
                                <PdfButtonExport1 calculatorInputs={calculatorInputs} calculatorOutputs={calculatorOutputs}/>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </Flex>
            <ResultTrip calculatorInputs={calculatorInputs} calculatorOutputs={calculatorOutputs} loggedIn={loggedIn}/>
            <SaveEditionModal tripId={id} calculatorName={name} calculatorInputs={calculatorInputs} calculatorOutputs={calculatorOutputs} status={status} logout={logout}/>
        </Flex>
    );
}