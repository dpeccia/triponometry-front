import {Component} from "react";

// const calendar = new Calendar(calendarEl, {
//   plugins: [dayGridPlugin, iCalendarPlugin],
//   events: {
//     url: 'https://mywebsite/icalendar-feed.ics',
//     format: 'ics'
//   }
// })

export class ResultCalendar extends Component {
    render() {
        return (
            //TODO: esta usando open web calendar para usar calendarios NO desde google, ver si nos sirve
            <iframe src="https://open-web-calendar.herokuapp.com/calendar.html?url=https%3A%2F%2Fwww.calendarlabs.com%2Fical-calendar%2Fics%2F46%2FGermany_Holidays.ics&amp;language=es"
            //style="border:solid 1px #777" 
            width="800" 
            height="600" 
            frameBorder="0" 
            scrolling="no"></iframe>
        );
    }
}