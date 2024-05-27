import React from "react";
import { Event } from "../types/EventType";
import { Link } from "react-router-dom";

interface EventCardProps {
  event: Event;
  onDelete: (id: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onDelete }) => {
  return (
    <div className="border p-4 rounded shadow-md h-[14rem] flex flex-col justify-between w-full">
      <div>
        <h2 className="text-lg font-bold"> {event.name.length > 20 ? `${event.name.slice(0, 20)}...` : event.name}</h2>
        <p>
          <b>날짜 / 시간 :</b> {event.date || "-"} / {event.time || "-"}
        </p>
        <p>
          <b>장소 :</b> {event.location.length > 20 ? `${event.location.slice(0, 20)}...` : event.location || "-"}
        </p>
        <p>
          <b>설명 :</b> {event.description.length > 60 ? `${event.description.slice(0, 60)}...` : event.description || "-"}
        </p>
      </div>
      <div className="flex justify-end space-x-2">
        <Link to={`/edit/${event.id}`} className="bg-blue-500 text-white px-4 py-2 rounded">
          수정
        </Link>
        <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => onDelete(event.id!)}>
          삭제
        </button>
      </div>
    </div>
  );
};

export default EventCard;
