import React from "react";
import { Input } from '@chakra-ui/react'
import axios from 'axios';
import Event from '../utils/Event';

export const MapExport = ({kmlId}) => {


  const kmlRequest =`http://localhost:8080/trip/kml/${kmlId}`;
  var kmlExport = "";
    
  const loadData = async () => {
    await axios.get(kmlRequest,{headers: {  "origin": "http://localhost:3000/nuevo",
    "x-requested-with": "http://localhost:3000/nuevo",}}).catch((error) => {
      return null
    }).then((response) => {
        console.log(response);
        kmlExport = response.data;
    });
  }

  const downloadTxtFile = async () => {
    await loadData();
    const element = document.createElement("a");
    const file = new Blob([kmlExport], {
      type: "text/xml"
    });
    element.href = URL.createObjectURL(file);
    element.download = "myMap.kml";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div>
      <button onClick={() => {downloadTxtFile()}}>Download Map</button>
    </div>
  );
  
}