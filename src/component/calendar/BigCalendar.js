import React from 'react';
import moment from 'moment';
import { Box } from '@chakra-ui/layout';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer } from 'react-big-calendar'

moment.locale('en-GB');
const localizer = momentLocalizer(moment);

var myEvents = [
    {
      'title': 'Evento 1',
      //'allDay': true,
      'start': new Date(2022, 6, 0),
      'end': new Date(2022, 6, 0)
    },
    {
      'title': 'Evento 2',
      'start': new Date(2022, 6, 28,0,60*8),
      'end': new Date(2022, 6, 28,0,9*60)
    },

    {
      'title': 'Evento 3',
      'start': new Date(2022, 6, 29, 20, 30),
      'end': new Date(2022, 6, 29, 21)
    },
  
    {
      'title': 'Evento 4',
      'start': new Date(2022, 6, 30, 10, 20, 0),
      'end': new Date(2022, 6, 30, 11, 0, 0)
    },
    // {
    //   'title': 'Some Event',
    //   'start': new Date(2015, 3, 9, 0, 0, 0),
    //   'end': new Date(2015, 3, 9, 0, 0, 0)
    // },
    // {
    //   'title': 'Conference',
    //   'start': new Date(2015, 3, 11),
    //   'end': new Date(2015, 3, 13),
    //   desc: 'Big conference for important people'
    // },
    // {
    //   'title': 'Meeting',
    //   'start': new Date(2015, 3, 12, 10, 30, 0, 0),
    //   'end': new Date(2015, 3, 12, 12, 30, 0, 0),
    //   desc: 'Pre-meeting meeting, to prepare for the meeting'
    // },
    // {
    //   'title': 'Lunch',
    //   'start': new Date(2015, 3, 12, 12, 0, 0, 0),
    //   'end': new Date(2015, 3, 12, 13, 0, 0, 0),
    //   desc: 'Power lunch'
    // },
    // {
    //   'title': 'Meeting',
    //   'start': new Date(2015, 3, 12, 14, 0, 0, 0),
    //   'end': new Date(2015, 3, 12, 15, 0, 0, 0)
    // },
    // {
    //   'title': 'Happy Hour',
    //   'start': new Date(2015, 3, 12, 17, 0, 0, 0),
    //   'end': new Date(2015, 3, 12, 17, 30, 0, 0),
    //   desc: 'Most important meal of the day'
    // },
    // {
    //   'title': 'Dinner',
    //   'start': new Date(2015, 3, 12, 20, 0, 0, 0),
    //   'end': new Date(2015, 3, 12, 21, 0, 0, 0)
    // },
    // {
    //   'title': 'Birthday Party',
    //   'start': new Date(2015, 3, 13, 7, 0, 0),
    //   'end': new Date(2015, 3, 13, 10, 30, 0)
    // },
    // {
    //   'title': 'Birthday Party 2',
    //   'start': new Date(2015, 3, 13, 7, 0, 0),
    //   'end': new Date(2015, 3, 13, 10, 30, 0)
    // },
    // {
    //   'title': 'Birthday Party 3',
    //   'start': new Date(2015, 3, 13, 7, 0, 0),
    //   'end': new Date(2015, 3, 13, 10, 30, 0)
    // },
    // {
    //   'title': 'Late Night Event',
    //   'start': new Date(2015, 3, 17, 19, 30, 0),
    //   'end': new Date(2015, 3, 18, 2, 0, 0)
    // },
    // {
    //   'title': 'Multi-day Event',
    //   'start': new Date(2015, 3, 20, 19, 30, 0),
    //   'end': new Date(2015, 3, 22, 2, 0, 0)
    // }
]

var state = {view: 'week'}
  
export const MyBigCalendar = () => {
  return (
    <Box h='650px' w='900px' mt={5}>
      <Calendar
        localizer={localizer}
        views={['week', 'day','month']}
        //view={state.view}
        events={myEvents}
        step={60}
        defaultDate={new Date(2022, 6, 29)}
      />
    </Box>
  );
}