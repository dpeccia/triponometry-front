import {useNavigate, useParams} from "react-router";
import { useEffect, useState } from "react";
import { getMyTrip } from "../../BackendService";
import { SpinnerSearchBox } from "../utils/SpinnerSearchBox";
import { ResultTrip } from "../result/ResultTrip";
import {Flex, Menu, MenuButton, IconButton, MenuList, MenuItem, ModalOverlay, useDisclosure} from "@chakra-ui/react";
import { EditCalculationModal } from "../utils/modals/EditCalculationModal";
import { MyCalculationInfo } from "../my-calculations/MyCalculationInfo";
import { NotFound } from "./NotFoundPage";
import { UnarchiveCalculationModal } from "../utils/modals/UnarchiveCalculationModal";
import { PdfButtonExport1 } from "../calculator/output/ExportPdf";
import {HamburgerIcon} from "@chakra-ui/icons";
import {RiInboxUnarchiveFill} from "react-icons/ri";
import {FaEdit} from "react-icons/fa";
import {EditAvatarImageModal} from "../utils/modals/EditAvatarImageModal";
import {BackButton} from "../utils/BackButton";

export const MyCalculationPage = () => {
    const navigate = useNavigate()
    const params = useParams();
    const idCalculation = params.id;

    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(5px)'
        />
    )

    const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure()
    const { isOpen: isOpenUnarchive, onOpen: onOpenUnarchive, onClose: onCloseUnarchive } = useDisclosure()
    const { isOpen: isOpenEditAvatar, onOpen: onOpenEditAvatar, onClose: onCloseEditAvatar } = useDisclosure()
    const [overlay, setOverlay] = useState(<OverlayOne />)

    const [isValid, setIsValid] = useState(true)
    const [calculation, setCalculation] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    const [hasNewImage, setHasNewImage] = useState(false)

    const handleEditClick = () => {
        setOverlay(<OverlayOne />)
        onOpenEdit()
    }

    const handleUnarchiveClick = () => {
        setOverlay(<OverlayOne />)
        onOpenUnarchive()
    }

    const handleEditAvatarClick = () => {
        setHasNewImage(false)
        setOverlay(<OverlayOne />)
        onOpenEditAvatar()
    }

    const isDraft = () => {
        return calculation.status === 'DRAFT'
    }

    const isArchive = (calculation) => {
        return calculation.status === 'ARCHIVED'
    }

    const fetchCalculation = async () => {
        return await getMyTrip(idCalculation)
    }

    const onFinish = (response) => {
        if (response?.status !== "Error") {
            setCalculation(response)
            setIsLoading(false)
        } else {
            setIsValid(false)
        }
    }

    useEffect(() => {
        fetchCalculation().then(onFinish);
    }, [hasNewImage]);

    return (
        <Flex flexDirection="column" width="100%">
            {
                isValid ? (
                    isLoading ? <SpinnerSearchBox/> :
                        <>
                            <Flex alignItems='center' justifyContent='space-between' p={2}>
                                <Flex alignItems='center' gap={1}>
                                    <BackButton onClick={() => navigate(`/mis-calculos`)}/>
                                    <MyCalculationInfo
                                      calculatorName={calculation.name}
                                      calculatorInputs={calculation.calculatorInputs}
                                      calculatorOutputs={calculation.calculatorOutputs}
                                      userInfo={calculation.user}
                                      isDraft={isDraft()}
                                      isMine={true}
                                      isAvatarEditable={true}
                                      handleEditAvatarClick={handleEditAvatarClick}
                                      setNewImage={setHasNewImage}/>
                                </Flex>
                                <Flex mt={2} justifyContent='flex-end'>
                                    <Menu>
                                        <MenuButton as={IconButton} icon={<HamburgerIcon />} variant='outline'/>
                                        <MenuList>
                                            {
                                                isArchive(calculation) ? (
                                                    <MenuItem icon={<RiInboxUnarchiveFill/>} onClick={handleUnarchiveClick}>
                                                        Desarchivar cálculo
                                                    </MenuItem>
                                                ) : (
                                                    <MenuItem icon={<FaEdit/>} onClick={handleEditClick}>
                                                        Editar cálculo
                                                    </MenuItem>
                                                )
                                            }
                                            <MenuItem>
                                                <PdfButtonExport1 calculatorInputs={calculation.calculatorInputs} calculatorOutputs={calculation.calculatorOutputs}/>
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                                </Flex>
                            </Flex>
                            <ResultTrip calculatorInputs={calculation.calculatorInputs} calculatorOutputs={calculation.calculatorOutputs} isDraft={isDraft()} loggedIn={true}/>
                            <UnarchiveCalculationModal isOpen={isOpenUnarchive} onOpen={onOpenUnarchive} onClose={onCloseUnarchive} overlay={overlay} calculationId={calculation.id} calculationName={calculation.name}/>
                            <EditCalculationModal isOpen={isOpenEdit} onOpen={onOpenEdit} onClose={onCloseEdit} overlay={overlay} calculationId={calculation.id} calculationName={calculation.name}/>
                            <EditAvatarImageModal isOpen={isOpenEditAvatar} onOpen={onOpenEditAvatar} onClose={onCloseEditAvatar} overlay={overlay} calculationId={calculation.id} setHasNewImage={setHasNewImage}/>
                        </>
                ) : <NotFound />
            }
        </Flex>
    )
}