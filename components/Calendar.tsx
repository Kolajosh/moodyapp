import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!

const Calendar = () => {
  return (
    <>
      <div className="border border-[#D6B0E4] rounded-2xl p-5">
        <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
      </div>
    </>
  );
};

export default Calendar;
