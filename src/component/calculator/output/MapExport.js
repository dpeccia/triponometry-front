import React from "react";
import axios from 'axios';

const backend = axios.create({
  baseURL: 'http://localhost:8080/',
});

export const MapExport = ({kmlId}) => {

  const kmlRequest =`trip/kml/${kmlId}`;
  var kmlExport = "";

  const loadData = async () => {
    await backend.get(kmlRequest,
    {headers: {"Access-Control-Allow-Origin": "*"}})
    .catch((error) => {
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