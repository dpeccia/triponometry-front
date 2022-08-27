import React from "react";
import axios from 'axios';

const backend = axios.create({
  baseURL: 'http://localhost:8080/',
});

export const ICalendar = ({events}) => {

  var rawContent = '';

  const calendarRequest = {
    "events": events,
    "startDate": {
      "day": 29,
      "hour": 0,
      "minute": 0,
      "month": 7,
      "year": 2022
    }
  }

  const loadData = async () => {
    await backend.post(
      'calendar/rawContent', 
      calendarRequest, 
      { headers: {"Access-Control-Allow-Origin": "*"}}
    ).catch((error) => {
      return null
    }).then((response) => {
      rawContent = response.data;
    });
  }

  const downloadTxtFile = async () => {
    await loadData();
    const element = document.createElement("a");
    const file = new Blob([rawContent], {
      type: "text/plain"
    });
    element.href = URL.createObjectURL(file);
    element.download = "myCalendar.ics";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div>
      <button onClick={() => {downloadTxtFile()}}>Download Calendar</button>
    </div>
  );
  
}