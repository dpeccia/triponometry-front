import '../../utils/ExportPdfStyles.css';
import { Box, Heading, VStack, StackDivider } from "@chakra-ui/react";
import convert from 'react-from-dom';
import React from 'react';
import { NewCalculationResultInfo } from './NewCalculationResultInfo';
import { TripElementPdf } from './TripElementPdf';

const containerStyle = {
  width: '100%', height: '350px'
};

export const Showprint = (props) => {

  const [agenda, setAgenda] = React.useState("");

  React.useEffect(
    () => {
      setAgenda(convert(document.querySelector('.rbc-agenda-view')));
    },
    []
  )

  return (
    <div ref={props.refPropWithAnotherName} className='pdfExport'>
      <Box bg='#f7e6e9' margin={5} borderTopRadius='40px' px='5' py='6' boxShadow='lg'>
        <Box>
          <TripElementPdf elementName="tripInfo" element={convert(document.getElementById("tripInfo"))} calculatorInputs={props.inputs} calculatorOutputs={props.outputs} shouldHideTitle={true}></TripElementPdf>
        </Box>
        <TripElementPdf elementName="mapa" element={convert(document.getElementById("mapExport"))} calculatorInputs={props.inputs} calculatorOutputs={props.outputs} shouldHideTitle={false}></TripElementPdf>
        <div className="page-break"/>
        <TripElementPdf elementName="agenda" element={agenda} calculatorInputs={props.inputs} calculatorOutputs={props.outputs} shouldHideTitle={false}></TripElementPdf>
      </Box>
    </div>
  );
}