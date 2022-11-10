import {
    Button,
    Divider,
    Modal,
    ModalBody,
    ModalCloseButton, ModalContent, ModalFooter,
    ModalHeader,
    Text,
} from "@chakra-ui/react";
import { Heading } from "@chakra-ui/layout";

export const DownloadCalendarInfoModal = (props) => {
    const openInNewTab = url => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <>
            <Modal size='lg' isCentered isOpen={props.isOpen} onClose={props.onClose}>
                {props.overlay}
                <ModalContent>
                    <ModalHeader>
                        Cómo importar tu calendario descargado
                    </ModalHeader>
                    <Divider />
                    <ModalCloseButton/>
                    <ModalBody>
                        <Heading fontSize='md'>
                            ¿Descargaste el calendario y no sabés que hacer? Podés importarlo fácilmente en Google Calendar
                        </Heading>
                        <Text mt='3' mx='5'>
                            1) Entrá a 
                        <Button variant='link' fontWeight='bold' mx='2' onClick={() => openInNewTab("https://www.google.com/calendar")}>
                            Google Calendar
                        </Button>
                            con tu cuenta de Google
                        </Text>
                        <Text mt='2' mx='5'>2) Presioná el + en "Otros Calendarios" y seleccioná la opción de "Importar"</Text>
                        <Text mt='2' mx='5'>3) Seleccioná el archivo .ics que descargaste de Triponometry</Text>

                        <Text mt='5' fontWeight='semibold' textColor='yellow.600' >¡Listo! Ya importaste tu itinerario en Google Calendar para verlo durante tu viaje</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant='solid' bg='#EFB4BF' onClick={props.onClose}> Cerrar </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}