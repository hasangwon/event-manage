import React from "react";
import { useNavigate } from "react-router-dom";
import EventList from "../components/EventList";
import DeleteModal from "../components/DeleteModal";
import { useEventList } from "../hooks/useEvent";

const EventListPage: React.FC = () => {
  const navigate = useNavigate();
  const { filteredEvents, showDeleteModal, handleDelete, confirmDelete, handleSearch, handleSortOrderChange, handleFilterDateChange, paginate, searchTerm, filterDate, sortOrder, currentPage, onClose } = useEventList();

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
      <EventList events={filteredEvents} onDelete={handleDelete} currentPage={currentPage} paginate={paginate} />
      <DeleteModal show={showDeleteModal} onClose={onClose} onDelete={confirmDelete} />
    </div>
  );
};

export default EventListPage;
