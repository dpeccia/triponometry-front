import { GoogleMap } from "@react-google-maps/api";
import { ExportButton } from "./export/ExportButton";

const containerStyle = {
  width: '100%', height: '350px'
};

export const ResultMap = ({ mapId, accommodation }) => {

  const kmlTest =`https://yji8each99.execute-api.us-east-1.amazonaws.com/dev/s3/${mapId}`;
  return (
      <>
        <GoogleMap
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
        <ExportButton exportType='map' requestData={mapId} fileType='text/xml' fileName='myMap.kml' downloadText='Descargar mapa'/>
      </>

  );
}