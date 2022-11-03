import {
    Button,
    Divider,
    Modal,
    ModalBody,
    ModalCloseButton, ModalContent, ModalFooter,
    ModalHeader,
    Text,
    Center,
    Input
} from "@chakra-ui/react";
import moment from 'moment';


export const SelectStartDateCalendarModal = (props) => {

    const goToEdit = () => {
         
        const dateValue = document.querySelector('input[type="date"]').value + "T00:00:00"

        const startDate = new Date(dateValue)

        //startDate.setDate(startDate.getDate() + 1)

        props.exportInfoLoader.calendarStartDate = startDate

        props.onConfirm()
        props.onClose()
    }

    return (
        <>
            <Modal isCentered isOpen={props.isOpen} onClose={props.onClose}>
                {props.overlay}
                <ModalContent>
                    <ModalHeader> Seleccionar fecha de inicio de viaje </ModalHeader>
                    <Divider />
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>
                            Por favor, indique la <Text as='abbr' fontWeight='bold'> fecha de inicio </Text> del viaje para descargar su calendario.
                        </Text>
                        <Center marginTop="10px">
                            {/* <DatePicker onChange={onChange} value={value} /> */}
                            <Input
                                defaultValue={moment(new Date()).format('YYYY-MM-DD')}
                                size="md"
                                type="date"
                            />
                        </Center>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant='outline' onClick={props.onClose} m={1}> Cancelar </Button>
                        <Button variant='solid' bg='#EFB4BF' onClick={goToEdit}> Confirmar </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}