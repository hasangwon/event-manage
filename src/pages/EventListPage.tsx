import React, { useState, useEffect } from "react";
import { deleteEvent } from "../api/events";
import EventList from "../components/EventList";
import { Event } from "../types/EventType";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../components/DeleteModal";
import { useEventContext } from "../context/EventContext";

const EventListPage: React.FC = () => {
  const navigate = useNavigate();
  const { events, setEvents, searchTerm, setSearchTerm, filterDate, setFilterDate, sortOrder, setSortOrder, currentPage, setCurrentPage } = useEventContext();

  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);

  useEffect(() => {
    let filtered = [...events];

    if (searchTerm) {
      filtered = filtered.filter((event) => event.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    if (filterDate) {
      filtered = filtered.filter((event) => event.date === filterDate);
    }

    filtered.sort((a, b) => {
      const dateTimeA = new Date(`${a.date}T${a.time ? a.time : "00:00"}`);
      const dateTimeB = new Date(`${b.date}T${b.time ? b.time : "00:00"}`);

      return sortOrder === "asc" ? dateTimeA.getTime() - dateTimeB.getTime() : dateTimeB.getTime() - dateTimeA.getTime();
    });

    setFilteredEvents(filtered);

    if (currentPage !== 1 && events.length <= (currentPage - 1) * 6) {
      setCurrentPage(1);
    }
  }, [events, searchTerm, sortOrder, filterDate, currentPage, setCurrentPage]);

  const handleDelete = async (id: string) => {
    setShowDeleteModal(true);
    setEventToDelete(id);
  };

  const confirmDelete = async () => {
    if (eventToDelete !== null) {
      await deleteEvent(eventToDelete);
      setEvents(events.filter((event) => event.id !== eventToDelete));

      setEventToDelete(null);
      setShowDeleteModal(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(1);
    setSearchTerm(e.target.value);
  };

  const handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentPage(1);
    setSortOrder(e.target.value as "asc" | "desc");
  };

  const handleFilterDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(1);
    setFilterDate(e.target.value);
  };

  return (
    <div className="container mx-auto p-4 h-full">
      <h1 className="text-2xl font-bold mb-4 flex justify-between">
        <button>이벤트 목록</button>
        <button className="bg-blue-500 text-white px-4 rounded text-lg" onClick={() => navigate("/add")}>
          추가
        </button>
      </h1>
      <div className="mb-4 flex space-x-4">
        <input type="text" placeholder="이벤트명 검색" value={searchTerm} onChange={handleSearch} className="border p-2 rounded" />
        <input type="date" value={filterDate} onChange={handleFilterDateChange} className="border p-2 rounded" />
        <select value={sortOrder} onChange={handleSortOrderChange} className="border p-2 rounded">
          <option value="desc">최신 순</option>
          <option value="asc">오래된 순</option>
        </select>
      </div>
      <EventList events={filteredEvents} onDelete={handleDelete} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <DeleteModal show={showDeleteModal} onClose={() => setShowDeleteModal(false)} onDelete={confirmDelete} />
    </div>
  );
};

export default EventListPage;
