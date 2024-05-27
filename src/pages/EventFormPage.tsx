import React, { useEffect } from "react";
import { createEvent, updateEvent, getEventById } from "../api/events";
import EventForm from "../components/EventForm";
import { Event } from "../types/EventType";
import { useNavigate, useParams } from "react-router-dom";
import { useEventContext } from "../context/EventContext";

const EventFormPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = React.useState<Event | null>(null);
  const { setEvents } = useEventContext();

  useEffect(() => {
    if (id) {
      fetchEvent(id);
    }
  }, [id]);

  const fetchEvent = async (id: string) => {
    const data = await getEventById(id);
    setEvent(data);
  };

  const handleSave = async (event: Event) => {
    if (id) {
      await updateEvent(id, event);
      setEvents((events) => events.map((e) => (e.id === id ? event : e)));
    } else {
      const newEvent = await createEvent(event);
      setEvents((events) => [...events, newEvent]);
    }
    navigate("/");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{id ? "이벤트 수정" : "이벤트 추가"}</h1>
      <EventForm event={event} onSave={handleSave} />
    </div>
  );
};

export default EventFormPage;
