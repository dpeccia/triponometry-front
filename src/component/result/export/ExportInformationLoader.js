import { loadCalendarEvents, loadMapKml } from "../../../BackendService";

export default class ExportInformationLoader {
    constructor(requestData){
      this.requestData = requestData;
    }

    getInformationToExport = async (exportType) => {
        var exportInformation = '';
        
        if(exportType === "map") exportInformation = await loadMapKml(this.requestData);
        if(exportType === "calendar") exportInformation = await loadCalendarEvents(this.requestData);

        return exportInformation;
    }
}