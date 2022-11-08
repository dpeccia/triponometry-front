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
import {Box, Flex, Text, Link} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { ModalOverlay } from "@chakra-ui/modal";
import { useState } from "react";
import { IconButton } from "@chakra-ui/button";
import { DownloadCalendarInfoModal } from '../utils/modals/DownloadCalendarInfoModal';
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { Link as ReachLink } from "react-router-dom";
import {FiInfo} from "react-icons/fi";


moment.locale('en-GB');
const localizer = momentLocalizer(moment);

export var ResultCalendar = ({events,daysAmount, loggedIn}) => {

  const eventPropGetter = useCallback(
    (event, start, end, isSelected) => ({
      ...({
        style: {
          backgroundColor: getEventBackgroundColor(getDateNumber(start.toDateString())),
        },
      })
    }),
    []
  )

  const myEvents = events.map(event => {
    return new CalendarEvent(event.name,event.start,event.end);
  });

  const myDates = new Set()

  const loadMyDates = () => {
    myEvents.map(event => {
      myDates.add(event.start.toDateString())
      myDates.add(event.end.toDateString())
    })
  }

  loadMyDates()
  
  const getDateNumber = (stringDate) => Array.from(myDates).indexOf(stringDate)+1

  const OverlayOne = () => (
    <ModalOverlay
        bg='blackAlpha.300'
        backdropFilter='blur(5px)'
    />
  )

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [overlay, setOverlay] = useState(<OverlayOne />)

  const handleClick = () => {
    setOverlay(<OverlayOne />)
    onOpen()
  }

  const NotLoggedMessage = () => {
    return(
      <Text fontSize='md' mt={4}>
        Si querés guardar tu viaje y acceder a mas funcionalidades {<Link as={ReachLink} to='/sign-up' color='#F0A7B4' fontWeight='bold'> registrate </Link>} o {<Link as={ReachLink} to='/sign-in' color='#F0A7B4' fontWeight='bold'> inicia sesión </Link>}
      </Text>
    )
  }

  const exportButton = () => {
    if(loggedIn){
      return(
        <>
        <Flex alignItems='center' mt={3} gap={1}>
          <ExportButton exportType='calendar' requestData={events} fileType='text/plain' fileName='myCalendar.ics' downloadText='Descargar calendario'/>
          <IconButton p={1} size='sm' colorScheme='blackAlpha' variant='ghost' as={FiInfo} onClick={handleClick}/>
        </Flex>
        <DownloadCalendarInfoModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} overlay={overlay}/>
        </>
      ) 
    }
    
    return(<NotLoggedMessage/>) 
  }

  return (
      <Flex direction='column' minW='735px'>
          <Box h='606px'>
              <Calendar
                  localizer={localizer}
                  views={[Views.AGENDA]}
                  toolbar={false}
                  eventPropGetter={eventPropGetter}
                  defaultView={Views.AGENDA}
                  events={myEvents}
                  defaultDate={myEvents[0].start}
                  formats={
                    {
                      agendaDateFormat : (date, culture, localizer) => "DIA " + getDateNumber(date.toDateString())
                    }
                  }
                  length={daysAmount}
                  messages={{date : "DÍA", time: "HORARIO", event: "ACTIVIDAD"}}
              />
          </Box>
          {exportButton()}
      </Flex>
  );
}