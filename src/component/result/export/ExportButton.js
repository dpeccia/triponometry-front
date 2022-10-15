import React from "react";
import { Button, useDisclosure } from "@chakra-ui/react";
import ExportInformationLoader from "./ExportInformationLoader";
import {BiDownload} from "react-icons/bi";
import { SelectStartDateCalendarModal } from "../../utils/modals/SelectStartDateCalendarModal";
import { useState } from "react";

export const ExportButton = (props) => {
  const [isLoading, setIsLoading] = useState(false)

  var myFile = '';
  var exportInformationLoader = new ExportInformationLoader(props.requestData);

  const { isOpen: isOpenSelectStartDateCalendar, onOpen: onOpenSelectStartDateCalendar, onClose: onCloseSelectStartDateCalendar } = useDisclosure()

  const handleSelectStartDateCalendarClick = () => {
    onOpenSelectStartDateCalendar()
}

  const downloadFile = async () => {
    setIsLoading(true)
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
    setIsLoading(false)
  };

  return (
    props.exportType === 'map' ?
    <Button isLoading={isLoading} leftIcon={<BiDownload />} onClick={downloadFile} mt={3} bg='#EFB4BF'>{props.downloadText}</Button>
    :
    <>
    <Button isLoading={isLoading} leftIcon={<BiDownload />} onClick={handleSelectStartDateCalendarClick} mt={3} bg='#EFB4BF'>{props.downloadText}</Button>
    <SelectStartDateCalendarModal isOpen={isOpenSelectStartDateCalendar} onOpen={onOpenSelectStartDateCalendar} onClose={onCloseSelectStartDateCalendar} exportInfoLoader={exportInformationLoader} onConfirm={downloadFile}></SelectStartDateCalendarModal>
    </>
  );
  
}