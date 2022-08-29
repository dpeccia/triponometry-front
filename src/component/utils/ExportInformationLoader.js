import { loadCalendarEvents, loadMapKml } from "../../BackendService";

export default class ExportInformationLoader {
    
    constructor(requestData){
      this.requestData = requestData;
      // this.exports = {
      //   'calendar' : async () => {await loadCalendarEvents(this.requestData)},
      //   'map' : async () => {await loadMapKml(this.requestData)}
      // }
    }

    getInformationToExport = async (exportType) => {
        var exportInformation = '';
        
        if(exportType === "map") exportInformation = await loadMapKml(this.requestData);
        if(exportType === "calendar") exportInformation = await loadCalendarEvents(this.requestData);

        return exportInformation;
    }
}