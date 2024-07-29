import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!

type event = {
  title: string;
  date: string;
};
interface CalendarProps {
  events: event[];
}

const Calendar: React.FC<CalendarProps> = ({ events }) => {
   const handleDateClick = (arg: any) => {
    alert(arg.dateStr)
   }
  return (
    <>
      <div className="border border-[#D6B0E4] rounded-2xl p-5">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          dateClick={handleDateClick}
        />
      </div>
    </>
  );
};

export default Calendar;
