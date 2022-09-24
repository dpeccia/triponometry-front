import React from 'react';
import ReactToPrint from 'react-to-print';
import '../../utils/ExportPdfStyles.css';
import {  Img } from "@chakra-ui/react";
import { Showprint } from './Showprint';

export const PdfButtonExport1 = (props) => {

  const componentRef = React.useRef();

  const [map, setMap] = React.useState(false);

  const waitForMapAngAgenda = () => {
    if(document.querySelector('[aria-label="Mapa"]') != null && document.querySelector('.rbc-agenda-view') != null){
      setMap(true);
    }
    else {
      window.setTimeout(() => {
        waitForMapAngAgenda();
      }, 3000);
    }
  }

  React.useEffect(
    () => {
      waitForMapAngAgenda()
    }
  )

  return (
    <>
      <ReactToPrint
        trigger={() => {return <Img src={'../../exportPdf.png'}></Img>;}}
        content={() => componentRef.current}
      />
      {map ? <Showprint refPropWithAnotherName={componentRef} inputs={props.calculatorInputs} outputs={props.calculatorOutputs}/> : <h1></h1>}
    </>
  );
}

