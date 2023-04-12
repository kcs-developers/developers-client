import React, { useState } from 'react';
import Popup from 'components/live/Popup';
import MentorProfile from 'components/live/MentorProfile';
import CalendarPopUp from "components/live/CalendarPopUp";

interface ShowMentoringProps {
  handleClose : () => void,
}

const ShowMentoring: React.FC<ShowMentoringProps> = ({handleClose}) => {
  const [showCalendarPopup, setShowCalendarPopup] = useState(false); // 다음 버튼을 누를 때
  
  const events = [
    {
      title: '테스트 1',
      startDate: new Date(new Date().setHours(new Date().getHours() - 5)),
      endDate: new Date(new Date().setHours(new Date().getHours() - 3)),
    },
    {
      title: '테스트 2',
      startDate: new Date(new Date().setHours(new Date().getHours())),
      endDate: new Date(new Date().setHours(new Date().getHours()+1)),
    },
    {
      title: '테스트 3',
      startDate: new Date(new Date().setHours(new Date().getHours() + 12)),
      endDate: new Date(new Date().setHours(new Date().getHours() + 14)),
      location:"test-Room"
    },
    {
      title: '테스트 3',
      startDate: new Date(new Date().setHours(new Date().getHours() + 48)),
      endDate: new Date(new Date().setHours(new Date().getHours() + 49)),
      location:"test-Room"
    },
    {
      title: '테스트 3',
      startDate: new Date(new Date().setHours(new Date().getHours() + 75)),
      endDate: new Date(new Date().setHours(new Date().getHours() + 77)),
      location:"test-Room"
    },
  ];
  return (
    <div>
        <Popup>
          {!showCalendarPopup ? (
            <div className="roomDescription">
                <h2 className="text-2xl pb-1 border-b border-gray-300"> [TEST] 지덕이와 함께 배우는 React~</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, ipsum minima soluta iste reiciendis ex, perferendis saepe voluptatem voluptates minus odio deserunt fugiat commodi impedit nemo. Amet neque exercitationem mollitia.</p>
              <MentorProfile imgUrl="https://cdn.pixabay.com/photo/2016/10/09/15/21/business-man-1725976_1280.png" bio="멘토에 대한 소개가 들어가는 페이지" />
              <button className="bg-blue-200 hover:bg-blue-300 px-3 py-2 mr-3 rounded" onClick={handleClose}>닫기</button>
              <button className="bg-blue-200 hover:bg-blue-300 px-3 py-2 rounded" onClick={() => setShowCalendarPopup(!showCalendarPopup)}>Next</button>
            </div>
          ) : (
            <CalendarPopUp events={events} handleClose={ handleClose } />
          )}
        </Popup>
    </div>
  );
}

export default ShowMentoring;
