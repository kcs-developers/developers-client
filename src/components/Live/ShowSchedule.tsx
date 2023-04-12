import React, { useState } from 'react';
import Popup from './Popup';
import {
  Scheduler,
  WeekView,
  Appointments,
  Toolbar,
  TodayButton,
  DateNavigator
} from "@devexpress/dx-react-scheduler-material-ui";
import { ViewState } from '@devexpress/dx-react-scheduler';

interface CalendarProps {
  events: any[];
}

interface CancelEventPopupProps {
  handleClose: () => void;
  event: any;
}

const CustomAppointment = (props: any) => {
  const handleEventClick = () => {
    props.onClick(props.data);
  };

  return (
    <Appointments.Appointment {...props} onClick={handleEventClick} />
  );
};

const CancelEventPopup: React.FC<CancelEventPopupProps> = ({ handleClose, event }) => {
  const handleCancelEvent = () => {
    if (window.confirm('해당 시간을 취소하시겠습니까?')) {
      alert('취소가 완료되었습니다.');
      handleClose();
    }
  };

  return (
    <Popup>
      <div className="cancelEventPopup">
        <h2>{event.title}</h2>
        <button  className="bg-blue-200 hover:bg-blue-300 px-3 py-2 mr-3 rounded" onClick={handleCancelEvent}>취소하기</button>
        <button  className="bg-blue-200 hover:bg-blue-300 px-3 py-2 mr-3 rounded" onClick={handleClose}>닫기</button>
      </div>
    </Popup>
  );
};

const ShowSchedule: React.FC<CalendarProps> = ({ events }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showCancelEventPopup, setShowCancelEventPopup] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const currentDateChange = (newDate: Date) => {
    setCurrentDate(newDate);
  };

  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
    setShowCancelEventPopup(true);
  };

  const handleClosePopup = () => {
    setShowCancelEventPopup(false);
  };

  return (
    <div className="calendar">
      <Scheduler data={events} height={window.innerHeight-250}>
        <ViewState currentDate={currentDate} onCurrentDateChange={currentDateChange} />
        <WeekView startDayHour={9} endDayHour={22} cellDuration={60} />
        <Toolbar />
        <DateNavigator />
        <TodayButton />
        <Appointments appointmentComponent={(props) => <CustomAppointment {...props} onClick={handleEventClick} />} />
      </Scheduler>
      {showCancelEventPopup && (
        <CancelEventPopup event={selectedEvent} handleClose={handleClosePopup} />
      )}
    </div>
  );
};

export default ShowSchedule;
