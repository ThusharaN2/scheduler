import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {  
  return (
    <ul>
    {props.days.map((day) => (
      <DayListItem   //goes through array of objects that have info about each day 
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={() => props.setDay(day.name)}
      />
    ))}
  </ul>
   );
}