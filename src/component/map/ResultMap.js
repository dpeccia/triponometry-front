import { position } from "@chakra-ui/react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { GoogleMap, LoadScript, MarkerF, PolylineF } from "@react-google-maps/api";
import { Component } from "react";

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const markers = [
  {
    id: 1,
    name: "Chicago, Illinois",
    position: { lat: 41.881832, lng: -87.623177 }
  },
  {
    id: 2,
    name: "Denver, Colorado",
    position: { lat: 39.739235, lng: -104.99025 }
  },
  {
    id: 3,
    name: "Los Angeles, California",
    position: { lat: 34.052235, lng: -118.243683 }
  },
  {
    id: 4,
    name: "New York, New York",
    position: { lat: 40.712776, lng: -74.005974 }
  }
];

const coordinatesForPolyline = [{ lat: 41.881832, lng: -87.623177 },
{ lat: 39.739235, lng: -104.99025 },
{ lat: 34.052235, lng: -118.243683 },
{ lat: 40.712776, lng: -74.005974 }

];

const handleOnLoad = (map) => {
  const bounds = new window.google.maps.LatLngBounds();
  markers.forEach(({ position }) => bounds.extend(position));
  map.fitBounds(bounds);
};

export class ResultMap extends Component {

  constructor(props) {
    super(props);
    //    this.setPlacesInformation();
  }

  render() {
    return (
      <LoadScript
        googleMapsApiKey="AIzaSyDYHoM5Y6ZVqIX5tR76bPVTN8dCYtpQDTM">
        <GoogleMap
          onLoad={(map) => handleOnLoad(map)}
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        >

          {markers.map(marker => (
            <MarkerF
              key={marker.id}
              position={marker.position}
            ></MarkerF>))}

          {/* TODO: PolylineF solamente crea una ruta directa, no una ruta "viable". */}
          {<PolylineF
            path={coordinatesForPolyline}
            geodesic={true}
            options={{
              strokeColor: "#ff2527",
              strokeOpacity: 0.75,
              strokeWeight: 2,
            }}
          >
          </PolylineF>}
        </GoogleMap>
      </LoadScript>
    )
  }
}