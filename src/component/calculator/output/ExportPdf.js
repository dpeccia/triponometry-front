import React from 'react';
import ReactToPrint from 'react-to-print';
import '../../utils/ExportPdfStyles.css';
import {Flex, Text} from "@chakra-ui/react";
import { Showprint } from './Showprint';
import {GrDocumentPdf} from "react-icons/gr";
import {Icon} from "@chakra-ui/icons";

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
        trigger={() => {
            return (
                <Flex alignItems='center'>
                    <Icon as={GrDocumentPdf} boxSize={3} mr={3}/>
                    <Text>Descargar cálculo</Text>
                </Flex>
            );}}
        content={() => componentRef.current}
      />
      {map ? <Showprint refPropWithAnotherName={componentRef} inputs={props.calculatorInputs} outputs={props.calculatorOutputs}/> : <h1></h1>}
    </>
  );
}

