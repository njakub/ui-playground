import React from "react";
import styled from "styled-components";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";

const CalendarContainer = styled.div`
  /* height: 10rem; */
  /* display: block; */
  .fc {
    margin-left: 2rem;
    height: 40rem;
    width: 50rem;
  }
`;

export default function FullCalendarDemo() {
  const handleDateClick = (arg) => {
    // bind with an arrow function
    alert(arg.dateStr);
  };

  const handleEventClick = (info) => {
    // bind with an arrow function
    console.log("event info", info);
    alert("CLICKED");
  };

  const demoEvents = [
    {
      title: "event 1",
      date: "2021-07-13T12:30:00",
      end: "2021-07-13T14:30:00",
    },
  ];

  return (
    <>
      <CalendarContainer>
        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            listPlugin,
            interactionPlugin,
          ]}
          initialView="timeGridDay"
          events={demoEvents}
          resources={[
            {
              title: "event 1",
              date: "2021-07-13T12:30:00",
              end: "2021-07-13T14:30:00",
            },
          ]}
          validRange={{
            start: "2021-07-13",
            end: "2021-07-17",
          }}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
        />
      </CalendarContainer>
    </>
  );
}
