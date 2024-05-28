import React, { useState, useEffect } from "react";
import { Event } from "../types/EventType";
import { Link } from "react-router-dom";

interface EventFormProps {
  event?: Event | null;
  onSave: (event: Event) => void;
}

const EventForm: React.FC<EventFormProps> = ({ event, onSave }) => {
  const [formData, setFormData] = useState<Event>({
    name: "새 이벤트",
    date: "",
    time: "",
    location: "",
    description: "",
  });

  useEffect(() => {
    if (event) {
      setFormData(event);
    }
  }, [event]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      return alert("이벤트명을 입력해주세요.");
    }
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block">이벤트명</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} className="border p-2 rounded w-full" />
      </div>
      <div>
        <label className="block">날짜</label>
        <input type="date" name="date" value={formData.date} onChange={handleChange} className="border p-2 rounded w-full" />
      </div>
      <div>
        <label className="block">시간</label>
        <input type="time" name="time" value={formData.time} onChange={handleChange} className="border p-2 rounded w-full" />
      </div>
      <div>
        <label className="block">장소</label>
        <input type="text" name="location" value={formData.location} onChange={handleChange} className="border p-2 rounded w-full" />
      </div>
      <div>
        <label className="block">설명</label>
        <textarea name="description" value={formData.description} onChange={handleChange} className="border p-2 rounded w-full" />
      </div>
      <div className="w-full flex justify-end">
        <Link to={"/"} className="bg-gray-200 text-gray-800 px-4 py-2 rounded mr-4">
          취소
        </Link>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          저장
        </button>
      </div>
    </form>
  );
};

export default EventForm;
