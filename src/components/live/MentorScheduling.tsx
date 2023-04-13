import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Popup from './PopUp';
import ModifyRoomInfo from './ModifyRoomInfo';

export interface Room {
    mentoringRoomId: number,
    title: string,
    mentorName: string,
    description: string,
    createdAt: Date
}

const memberId = 1;

const MentorScheduling: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [roomList, setRoomList] = useState<Room[]>([]);
    const [selectedRoom, setSelectedRoom] = useState<Room>(null as any);

    useEffect(() => {
        axios({
            url: `http://localhost:9002/api/room/mentor/${memberId}`,
            method: 'get'
        }).then((res) => {
            setRoomList(res.data['data']);
        })
    }, [])

    console.log(roomList);

    const handleClickRoom = (room: Room) => {
        setIsModalOpen(true);
        setSelectedRoom(room);
    }

    let num = 1;

    return (
        <div className="flex flex-wrap justify-center" >
            {roomList.map((room, idx) => (
                <div key={num++} className="w-1/3 p-4 flex flex-col justify-center items-center">
                    <h2 className="text-lg font-semibold mt-2" onClick={() => handleClickRoom(room)}>{idx + 1}{room.title}</h2>
                    <h3 className=''>{room.description}</h3>
                    <h3 className=''>{room.mentorName}</h3>
                </div>
            ))}
            {isModalOpen && (
                <Popup>
                    {/* <div>
                        방 수정 및 일정 추가
                    </div>
                    <button onClick={() => setStep(1)}>나가기</button> */}
                    <ModifyRoomInfo room={selectedRoom} onClose={() => setIsModalOpen(false)}></ModifyRoomInfo>
                </Popup>
            )}
        </div>
    );
}

export default MentorScheduling;
