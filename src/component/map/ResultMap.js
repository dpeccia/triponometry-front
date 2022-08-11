import { GoogleMap, KmlLayer, LoadScript, } from "@react-google-maps/api";
import { Component } from "react"

const containerStyle = {
  width: '400px',
  height: '400px'
};

export class ResultMap extends Component {

  //Habria que cambiar test por el id del viaje
 kmlTest ="https://yji8each99.execute-api.us-east-1.amazonaws.com/dev/agenda/kml/test";

 render() {

   return (
     <div className="App">
     <LoadScript googleMapsApiKey="AIzaSyAIQZSE4hWZYz9YcyNuTCSjjs6j3jObME0">
       <GoogleMap
         center={{ lat: 48.865127, lng: 2.350331 }}
         mapContainerStyle={containerStyle}
         zoom={4}
         onLoad={map => {
            new window.google.maps.KmlLayer(this.kmlTest, {
            suppressInfoWindows: true,
            preserveViewport: false,
            map: map
          });
        }}
       >
       </GoogleMap>
     </LoadScript>
   </div>
   )
 }
}