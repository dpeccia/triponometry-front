import {useCallback} from 'react'
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
  Calendar,
  Views,
  momentLocalizer,
} from 'react-big-calendar';
import CalendarEvent from './calendar/Event';
import getEventBackgroundColor from './calendar/CalendarDayColorMap';
import {ExportButton} from "./export/ExportButton";
import {Box, Flex} from "@chakra-ui/react";

moment.locale('en-GB');
const localizer = momentLocalizer(moment);

export var ResultCalendar = ({events}) => {

  const eventPropGetter = useCallback(
    (event, start, end, isSelected) => ({
      ...({
        style: {
          backgroundColor: getEventBackgroundColor(start.getDay()),
        },
      })
    }),
    []
  )

  const onDoubleClickEvent = useCallback((calEvent) => {
     window.setTimeout(() => {
      window.alert(calEvent.title)
    }, 250)
  }, [])

  const myEvents = events.map(event => {
    return new CalendarEvent(event.name,event.start,event.end);
  });

  const tripLengthInDays = (date1,date2) =>{
    let difference = date1.getDate() - date2.getDate();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return TotalDays+1;
  }
;

  return (
      <Flex direction='column' minW='735px'>
          <Box h='606px'>
              <Calendar
                  localizer={localizer}
                  views={[Views.AGENDA,Views.WEEK,Views.DAY,Views.MONTH]}
                  eventPropGetter={eventPropGetter}
                  defaultView={Views.AGENDA}
                  events={myEvents}
                  defaultDate={myEvents[0].start}
                  onDoubleClickEvent={onDoubleClickEvent}
                  length={tripLengthInDays(myEvents[0].start,myEvents[myEvents.length-1].end) }
                  min={myEvents[0].start}
              />
          </Box>
          <ExportButton exportType='calendar' requestData={events} fileType='text/plain' fileName='myCalendar.ics' downloadText='Descargar calendario'/>
      </Flex>
  );
}