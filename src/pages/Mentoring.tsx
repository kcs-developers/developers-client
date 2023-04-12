import React, { useEffect, useState } from 'react';
import ShowSchedule from 'components/live/ShowSchedule';
import LiveList from '../components/live/LiveList';

const Mentoring = () => {
  const [showPopup, setShowPopup] = useState(false); // 팝업 창 취소
  const [showScheduler, setShowScheduler] = useState(true); // 보여주는 창 변경

  const handleClickScheduler = () => {
    setShowScheduler(true);
  };

  const handleClickRoomList = () => {
    setShowScheduler(false);
  }

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

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
  ]; // 임의의 스케쥴 event 값

  return (
    <div className="container mx-auto">
      <div className="flex mt-5 mb-3 justify-center">
        <button
          className={`flex-1 py-2 px-4 border border-blue-500 text-center ${
            showScheduler ? 'bg-blue-500' : 'bg-blue-300'
          }`}
          onClick={handleClickScheduler}
        >
          일정 관리
        </button>
        <button
          className={`flex-1 py-2 px-4 border border-blue- text-center ${
            showScheduler ? 'bg-blue-300' : 'bg-blue-500'
          }`}
          onClick={handleClickRoomList}
        >
          전체 방 목록
        </button>
      </div>
      {showScheduler ? (
        <ShowSchedule events={events} />
      ) : ( 
        <LiveList></LiveList>
      )}
    </div>
  );
}

export default Mentoring;
