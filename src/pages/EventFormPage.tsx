import React from "react";
import EventForm from "../components/EventForm";
import { useEventForm } from "../hooks/useEvent";
import { useParams } from "react-router-dom";

const EventFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { event, handleSave } = useEventForm(id);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{id ? "이벤트 수정" : "이벤트 추가"}</h1>
      <EventForm event={event} onSave={handleSave} />
    </div>
  );
};

export default EventFormPage;
