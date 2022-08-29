import React from "react";
import { Button } from "@chakra-ui/react";
import ExportInformationLoader from "../../utils/ExportInformationLoader";

export const Export = (props) => {

  var myFile = '';
  var exportInformationLoader = new ExportInformationLoader(props.requestData);

  const downloadFile = async () => {
    myFile = await exportInformationLoader.getInformationToExport(props.exportType);
    const myFileType = props.fileType;
    const myFileName = props.fileName;
    const element = document.createElement("a");
    const file = new Blob([myFile], {
      type: myFileType
    });
    element.href = URL.createObjectURL(file);
    element.download = myFileName;
    document.body.appendChild(element);
    element.click();
  };

  return (
    <Button onClick={downloadFile}>{props.downloadText}</Button>
  );
  
}