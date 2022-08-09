import React from "react";
import ICalendarLink from "react-icalendar-link";

export class ICalendar extends React.Component {


  render() {
    const event = {
      title: "My Title",
      description: "My Description",
      startTime: "2018-10-07T10:30:00+10:00",
      location: "10 Carlotta St, Artarmon NSW 2064, Australia"
    }
    const rawContent = `ATTENDEE;CN="Cyrus Daboo";CUTYPE=INDIVIDUAL;PARTSTAT=ACCEPTED:mailto:cyrus@example.com
ATTENDEE;CN="Wilfredo Sanchez Vega";CUTYPE=INDIVIDUAL;PARTSTAT=NEEDS-ACTION;ROLE=REQ-PARTICIPANT;RSVP=TRUE:mailto:wilfredo@example.com
ATTENDEE;CN="Bernard Desruisseaux";CUTYPE=INDIVIDUAL;PARTSTAT=NEEDS-ACTION;ROLE=REQ-PARTICIPANT;RSVP=TRUE:mailto:bernard@example.net
ATTENDEE;CN="Mike Douglass";CUTYPE=INDIVIDUAL;PARTSTAT=NEEDS-ACTION;RSVP=TRUE:mailto:mike@example.org`;

    return (
      <ICalendarLink event={event} rawContent={rawContent}>
        Download
      </ICalendarLink>
    );
  }
}