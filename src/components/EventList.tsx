import { eventsPerPage } from "../hooks/useEvent";
import { Event } from "../types/EventType";
import EventCard from "./EventCard";
import Pagination from "./Pagination";

interface EventListProps {
  currentPage: number;
  paginate: (pageNumber: number) => void;
  events: Event[];
  onDelete: (id: string) => void;
}
const EventList: React.FC<EventListProps> = ({ currentPage, paginate, events, onDelete }) => {
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
  return (
    <div className="h-full">
      <div className="border rounded p-4 overflow-y-auto h-[calc(100%-10rem)] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-min place-items-start">
        {currentEvents.map((event) => (
          <EventCard key={event.id} event={event} onDelete={onDelete} />
        ))}
      </div>
      <Pagination currentPage={currentPage} eventsPerPage={eventsPerPage} totalEvents={events.length} paginate={paginate} />
    </div>
  );
};

export default EventList;
