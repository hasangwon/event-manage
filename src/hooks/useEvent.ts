import { useState, useEffect } from "react";
import { createEvent, updateEvent, getEventById, deleteEvent } from "../api/events";
import { Event } from "../types/EventType";
import { useEventContext } from "../context/EventContext";
import { useNavigate } from "react-router-dom";
import { formatDateTime } from "../utils/dateUtils";

export const eventsPerPage = 6;

interface UseEventListReturn {
  filteredEvents: Event[];
  showDeleteModal: boolean;
  handleDelete: (id: string) => void;
  confirmDelete: () => Promise<void>;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSortOrderChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleFilterDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  paginate: (pageNumber: number) => void;
  searchTerm: string;
  filterDate: string;
  sortOrder: "asc" | "desc";
  currentPage: number;
  onClose: () => void;
}

export const useEventList = (): UseEventListReturn => {
  const { events, setEvents, searchTerm, setSearchTerm, filterDate, setFilterDate, sortOrder, setSortOrder, currentPage, setCurrentPage } = useEventContext();
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const onClose = () => setShowDeleteModal(false);

  const handleDelete = (id: string) => {
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

interface UseEventFormReturn {
  event: Event | null;
  handleSave: (event: Event) => Promise<void>;
}

export const useEventForm = (id?: string): UseEventFormReturn => {
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
