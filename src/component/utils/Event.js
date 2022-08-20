export default class Event {
    constructor(title,startDate,endDate){
      this.title = title;
      this.start = new Date(startDate.year,startDate.month,startDate.day,startDate.hour,startDate.minute);
      this.end = new Date(endDate.year,endDate.month,endDate.day,endDate.hour,endDate.minute);
    }
}