import { useState, useEffect } from "react";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { TextField, Button, Grid } from "@mui/material";
import {
    Scheduler,
    WeekView,
    Appointments
} from "@devexpress/dx-react-scheduler-material-ui";
import { ViewState } from '@devexpress/dx-react-scheduler';

interface CalendarProps {
    onClose: () => void;
};

const events = [
    {
        title: '멘토링1',
        startDate: new Date(),
        endDate: new Date(new Date().setHours(new Date().getHours() + 1)),
    },
    {
        title: '멘토링2',
        startDate: new Date(new Date().setHours(new Date().getHours() + 2)),
        endDate: new Date(new Date().setHours(new Date().getHours() + 3)),
    },
];

const availableTimeSlots = [
    '7:00 AM',
    '8:00 AM',
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '1:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
    '5:00 PM',
    '6:00 PM',
    '7:00 PM',
    '8:00 PM',
    '9:00 PM',
    '10:00 PM',
    '11:00 PM',
    '00:00 AM',
];

const CreateScheduleDate: React.FC<CalendarProps> = ({ onClose }) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    // 현재는 각각 events, availableTimeSlots 라는 상수로 지정해서 사용
    // const [mySchedules, setMySchedules] = useState<Date | null>(null);
    // const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>();

    useEffect(() => {
        if (selectedDate) {
            // API와 통신하여 나의 모든 스케쥴(mySchedule) 가져오고,
            // 해당 날짜에 대한 예약 가능한 시간대(availableTimeSlots)를 계산해서 출력
            console.log(selectedDate);
        }
    }, [selectedDate]);

    // 예약 가능한 시간대 버튼을 동적으로 생성해주는 함수
    const renderTimeSlotButtons = () => {
        if (availableTimeSlots.length === 0) {
            return <div>No available time slots</div>;
        }

        return availableTimeSlots.map((timeSlot, index) => (
            <Grid item key={index}>
                <Button variant="contained" onClick={() => handleSelectTimeSlot(timeSlot)}>
                    {timeSlot}
                </Button>
            </Grid>
        ));
    };

    // 예약 가능한 시간대 버튼을 클릭했을 때의 동작
    const handleSelectTimeSlot = (timeSlot: string) => {
        console.log(`Selected time slot: ${timeSlot}`);
    };

    return (
        <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-10">
            <div className="bg-white p-5 rounded-lg max-w-4xl h-500 overflow-y-auto flex flex-col justify-between">
                <div>
                    <h2 className="text-lg font-bold mb-4">방 생성</h2>
                    <h3 className="italic mb-4">생성하신 멘토링을 진행하실 시각을 선택해주세요! (한시간 단위)</h3>
                    <div>
                        <Scheduler data={events} height={500}>
                            <ViewState defaultCurrentDate={new Date()} />
                            <WeekView startDayHour={0} endDayHour={23} />
                            <Appointments/>
                        </Scheduler>
                    </div>
                    <div className="flex flex-wrap justify-between">
                        <div className="w-full md:w-1/3 px-4 mt-4">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Controlled picker"
                                    value={selectedDate}
                                    onChange={(newValue: any) => setSelectedDate(newValue)}
                                    renderInput={(params: any) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </div>
                        <div className="w-full md:w-2/3 px-4 mt-4">
                            <Grid container spacing={2}>
                                {renderTimeSlotButtons()}
                            </Grid>
                        </div>
                    </div>
                </div>

                <div className="text-right">
                    <button type="button" className="mt-4 ml-auto" onClick={onClose}>
                        완료
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreateScheduleDate;
