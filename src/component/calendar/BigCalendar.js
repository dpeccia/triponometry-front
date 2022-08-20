import React, { useMemo, useRef, useCallback, buildMessage } from 'react'
import moment from 'moment';
import { Box } from '@chakra-ui/layout';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
  Calendar,
  Views,
  momentLocalizer,
} from 'react-big-calendar';
import Event from '../utils/Event';
import getEventBackgroundColor from '../utils/CalendarDayColorMap';

moment.locale('en-GB');
const localizer = momentLocalizer(moment);

export const MyBigCalendar = ({events}) => {

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
    return new Event(event.name,event.start,event.end);
  });

  return (
    <Box h='650px' w='900px' mt={5}>
      <Calendar
        localizer={localizer}
        views={[Views.AGENDA,Views.WEEK,Views.DAY,Views.MONTH]}
        eventPropGetter={eventPropGetter}
        defaultView={Views.AGENDA}
        events={myEvents}
        defaultDate={myEvents[0].start}
        onDoubleClickEvent={onDoubleClickEvent}
      />
    </Box>
  );
}