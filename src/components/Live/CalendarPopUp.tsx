import React, {useState} from 'react'; // 임의 시간 변수 상태값
import Popup from "./Popup"
import {
  Scheduler,
  WeekView,
  Appointments,
  Toolbar,
  TodayButton,
  DateNavigator
} from "@devexpress/dx-react-scheduler-material-ui";
import { ViewState } from '@devexpress/dx-react-scheduler';

interface CalendarPopupProps {
  events: any[];
  handleClose: () => void;
}

const CustomAppointment = (props: any) => {
    const handleEventClick = () => {
      if (window.confirm('해당 시간에 입장하시겠습니까?')) {
        alert('입장이 완료되었습니다.');
      }
    };
  
    return (
      <Appointments.Appointment {...props} onClick={handleEventClick} />
    );
  };

const CalendarPopup: React.FC<CalendarPopupProps> = ({ events, handleClose }) => {  
  const [currentDate, setCurrentDate ] = useState(new Date()); // 시간 변수를 상태값으로 두어 변경 가능
  
  const currentDateChange = (newDate:Date) => {
    setCurrentDate(newDate);
  }

  return (
    <Popup>
      <div className="calendarPopup">
        <Scheduler data={events} height={700}>
          <ViewState currentDate={currentDate} onCurrentDateChange={currentDateChange} />
          <WeekView startDayHour={9} endDayHour={22} cellDuration={60} /> {/* 한 시간 간격으로 변경 */}
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <Appointments appointmentComponent={CustomAppointment} />
        </Scheduler>
        <button className="bg-blue-200 hover:bg-blue-300 px-3 py-2 mr-3 rounded" onClick={handleClose}>닫기</button>
      </div>
    </Popup>
  );
};

export default CalendarPopup;
