import {SpinnerSearchBox} from "../utils/SpinnerSearchBox";
import {Flex, IconButton, Menu, MenuButton, MenuList,MenuItem, ModalOverlay, useDisclosure} from "@chakra-ui/react";
import {MyCalculationInfo} from "../my-calculations/MyCalculationInfo";
import {ResultTrip} from "../result/ResultTrip";
import {useNavigate, useParams} from "react-router";
import {getATrip} from "../../BackendService";
import {useEffect, useState} from "react";
import {SaveRatingModal} from "../explorer/SaveRatingModal";
import {FaRegLightbulb} from "react-icons/fa";
import {RatingDrawer} from "../explorer/RatingDrawer";
import {HamburgerIcon} from "@chakra-ui/icons";
import {MdOutlineAddComment, MdOutlineInsertComment} from "react-icons/md";
import {BackButton} from "../utils/BackButton";
import { useToast } from "../utils/useToast";
import { checkErrorTokenExpired } from "../../BackendService";

export const ExploredCalculationPage = ({logout}) => {
    const navigate = useNavigate()
    const params = useParams();
    const idCalculation = params.id;

    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(5px)'
        />
    )

    const { isOpen: isOpenModal, onOpen: onOpenModal, onClose: onCloseModal } = useDisclosure()
    const { isOpen: isOpenDrawer, onOpen: onOpenDrawer, onClose: onCloseDrawer } = useDisclosure()
    const [overlay, setOverlay] = useState(<OverlayOne />)

    const [calculation, setCalculation] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [hasNewRating, setNewRating] = useState(false)
    const [_, showErrorToast] = useToast()


    const handlePlantillaClick = () => {
        navigate(`/explorar/${idCalculation}/edicion`)
    }

    const handleModalClick = () => {
        setOverlay(<OverlayOne />)
        onOpenModal()
    }

    const handleDrawerClick = () => {
        setOverlay(<OverlayOne />)
        onOpenDrawer()
    }

    const fetchCalculation = async () => {
        return await getATrip(idCalculation)
    }

    const onFinish = (response) => {
        if (response?.status !== "Error") {
            setCalculation(response)
            setIsLoading(false)
        } else {
            showErrorToast(response.msg, logout)
        }        
    }

    useEffect(() => {
        fetchCalculation().then(onFinish);
    }, [hasNewRating]);

    return (
        <Flex flexDirection="column" width="100%">
            {
                isLoading ? <SpinnerSearchBox/> :
                    <>
                        <Flex alignItems='center' justifyContent='space-between' p={2}>
                            <Flex alignItems='center' gap={1}>
                                <BackButton onClick={() => navigate(`/explorar`)}/>
                                <MyCalculationInfo
                                  calculatorName={calculation.name}
                                  calculatorInputs={calculation.calculatorInputs}
                                  calculatorOutputs={calculation.calculatorOutputs}
                                  userInfo={calculation.user}
                                  isMine={false}
                                  isAvatarEditable={false}/>
                            </Flex>
                            <Flex mt={2} justifyContent='flex-end'>
                                <Menu>
                                    <MenuButton as={IconButton} icon={<HamburgerIcon />} variant='outline'/>
                                    <MenuList>
                                        <MenuItem icon={<FaRegLightbulb/>} onClick={handlePlantillaClick}>
                                            Usar como plantilla
                                        </MenuItem>
                                        <MenuItem icon={<MdOutlineAddComment/>} onClick={handleModalClick}>
                                            Opinar
                                        </MenuItem>
                                        <MenuItem icon={<MdOutlineInsertComment/>} onClick={handleDrawerClick}>
                                            Ver opiniones
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            </Flex>
                        </Flex>
                        <ResultTrip calculatorInputs={calculation.calculatorInputs} calculatorOutputs={calculation.calculatorOutputs} loggedIn={true}/>
                        <SaveRatingModal isOpen={isOpenModal} onOpen={onOpenModal} onClose={onCloseModal} overlay={overlay} calculationId={idCalculation} calculatorName={calculation.name} calculatorInputs={calculation.calculatorInputs} calculatorOutputs={calculation.calculatorOutputs} setNewRating={setNewRating}/>
                        <RatingDrawer isOpen={isOpenDrawer} onOpen={onOpenDrawer} onClose={onCloseDrawer} overlay={overlay} reviews={calculation.reviews} averageRating={calculation.rating}/>
                    </>
            }
        </Flex>
    )
}