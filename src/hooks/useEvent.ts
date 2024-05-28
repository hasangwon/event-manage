import { useState, useEffect } from "react";
import { createEvent, updateEvent, getEventById, deleteEvent } from "../api/events";
import { Event } from "../types/EventType";
import { useEventContext } from "../context/EventContext";
import { useNavigate } from "react-router-dom";
import { formatDateTime } from "../util/dateUtils";

export const eventsPerPage = 6;

export const useEventList = () => {
  const { events, setEvents, searchTerm, setSearchTerm, filterDate, setFilterDate, sortOrder, setSortOrder, currentPage, setCurrentPage } = useEventContext();
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const onClose = () => setShowDeleteModal(false);

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

  useEffect(() => {
    let filtered = [...events];

    if (searchTerm) {
      filtered = filtered.filter((event) => event.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    if (filterDate) {
      filtered = filtered.filter((event) => event.date === filterDate);
    }

    filtered.sort((a, b) => {
      const dateTimeA = formatDateTime(a.date, a.time);
      const dateTimeB = formatDateTime(b.date, b.time);

      return sortOrder === "asc" ? dateTimeA.getTime() - dateTimeB.getTime() : dateTimeB.getTime() - dateTimeA.getTime();
    });

    setFilteredEvents(filtered);

    if (currentPage !== 1 && events.length <= (currentPage - 1) * eventsPerPage) {
      setCurrentPage(currentPage - 1);
    }
  }, [events, searchTerm, sortOrder, filterDate, currentPage, setCurrentPage]);

  return {
    filteredEvents,
    showDeleteModal,
    handleDelete,
    confirmDelete,
    handleSearch,
    handleSortOrderChange,
    handleFilterDateChange,
    paginate,
    searchTerm,
    filterDate,
    sortOrder,
    currentPage,
    onClose,
  };
};

export const useEventForm = (id?: string) => {
  const navigate = useNavigate();
  const { setEvents } = useEventContext();
  const [event, setEvent] = useState<Event | null>(null);

  const handleSave = async (event: Event) => {
    try {
      if (id) {
        const updatedEvent = await updateEvent(id, event);
        setEvents((events) => events.map((e) => (e.id === id ? updatedEvent : e)));
      } else {
        const newEvent = await createEvent(event);
        setEvents((events) => [...events, newEvent]);
      }
      navigate("/");
    } catch (error) {
      console.error("Error in handleSave : ", error);
      alert("잠시 후 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    if (id) {
      fetchEvent(id);
    }
  }, [id]);

  const fetchEvent = async (id: string) => {
    try {
      const data = await getEventById(id);
      setEvent(data);
    } catch (error) {
      console.error("Error in fetchEvent : ", error);
      alert("잠시 후 다시 시도해주세요.");
    }
  };

  return {
    event,
    handleSave,
  };
};