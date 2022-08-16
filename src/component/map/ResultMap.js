import { GoogleMap} from "@react-google-maps/api";
import { Component } from "react"

const containerStyle = {
  width: '100%',
  height: '500px'
};

export class ResultMap extends Component {

  //Habria que cambiar test por el id del viaje
 kmlTest ="https://yji8each99.execute-api.us-east-1.amazonaws.com/dev/agenda/kml/test";

 render() {

   return (
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
   )
 }
}