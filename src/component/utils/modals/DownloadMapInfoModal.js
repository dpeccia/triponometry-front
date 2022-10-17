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

export const DownloadMapInfoModal = (props) => {
    const openInNewTab = url => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <>
            <Modal size='lg' isCentered isOpen={props.isOpen} onClose={props.onClose}>
                {props.overlay}
                <ModalContent>
                    <ModalHeader>
                        Cómo importar tu mapa descargado
                    </ModalHeader>
                    <Divider />
                    <ModalCloseButton/>
                    <ModalBody>
                        <Heading fontSize='md'>
                            Descargaste el mapa y no sabes que hacer? Podes importarlo fácilmente en Google My Maps
                        </Heading>
                        <Text mt='3' mx='5'>
                            1) Entrá a 
                        <Button variant='link' fontWeight='bold' mx='2' onClick={() => openInNewTab("https://www.google.com/intl/es/maps/about/mymaps/")}>
                            Google My Maps
                        </Button>
                            con tu cuenta de Google
                        </Text>
                        <Text mt='2' mx='5'>2) Clickeá en el botón "Empezar"</Text>
                        <Text mt='2' mx='5'>3) Crea un nuevo mapa</Text>
                        <Text mt='2' mx='5'>4) Clická en "Importar" y arrastrá el archivo .kml que descargaste de Triponometry</Text>

                        <Text mt='5' fontWeight='semibold' textColor='yellow.600' >Listo! Ya importaste tu recorrido óptimo en Google My Maps para verlo durante tu viaje!</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant='solid' bg='#EFB4BF' onClick={props.onClose}> Cerrar </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}