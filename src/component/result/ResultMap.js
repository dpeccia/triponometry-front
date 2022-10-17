import { GoogleMap } from "@react-google-maps/api";
import { DownloadMapInfoModal } from "../utils/modals/DownloadMapInfoModal";
import { ExportButton } from "./export/ExportButton";
import { useDisclosure } from "@chakra-ui/hooks";
import { ModalOverlay } from "@chakra-ui/modal";
import { useState } from "react";
import { IconButton } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
import { InfoOutlineIcon } from "@chakra-ui/icons";

const containerStyle = {
  width: '100%', height: '350px'
};

export const ResultMap = ({ mapId, accommodation }) => {
  const kmlTest =`https://yji8each99.execute-api.us-east-1.amazonaws.com/dev/s3/${mapId}`;

  const OverlayOne = () => (
    <ModalOverlay
        bg='blackAlpha.300'
        backdropFilter='blur(5px)'
    />
  )

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [overlay, setOverlay] = useState(<OverlayOne />)

  const handleClick = () => {
    setOverlay(<OverlayOne />)
    onOpen()
  }

  return (
      <>
        <GoogleMap id="mapExport"
            center={{ lat: accommodation.latitude, lng: accommodation.longitude }}
            mapContainerStyle={containerStyle}
            zoom={10}
            onLoad={map => {
              new window.google.maps.KmlLayer(kmlTest, {
                suppressInfoWindows: true,
                preserveViewport: false,
                map: map
              });
            }}/>
        <Flex alignItems='center' justify='space-between' mt={3}>
          <ExportButton exportType='map' requestData={mapId} fileType='text/xml' fileName='myMap.kml' downloadText='Descargar mapa'/>
          <IconButton p={1} variant='ghost' color='yellow.500' as={InfoOutlineIcon} onClick={handleClick}/>
        </Flex>
        <DownloadMapInfoModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} overlay={overlay}/>
      </>
  );
}