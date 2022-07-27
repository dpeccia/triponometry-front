import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { GoogleMap, LoadScript, withGoogleMaps } from "@react-google-maps/api";
import {Component} from "react";

const containerStyle = {
    width: '400px',
    height: '400px'
  };
  
  const center = {
    lat: -3.745,
    lng: -38.523
  };
  
export class ResultMap extends Component {

    static defaultProps = {
        center: {lat: 59.95, lng: 30.33},
        zoom: 11
      };
    

    render() {
    return (
        <LoadScript googleMapsApiKey="AIzaSyDYHoM5Y6ZVqIX5tR76bPVTN8dCYtpQDTM">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
          >
            { /* Child components, such as markers, info windows, etc. */ }
            <></>
          </GoogleMap>
        </LoadScript>
      )
    }
}