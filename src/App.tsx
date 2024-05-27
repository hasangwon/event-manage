import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EventListPage from "./pages/EventListPage";
import EventFormPage from "./pages/EventFormPage";
import { EventProvider } from "./context/EventContext";

const App: React.FC = () => {
  return (
    <Router>
      <EventProvider>
        <Routes>
          <Route path="/" element={<EventListPage />} />
          <Route path="/add" element={<EventFormPage />} />
          <Route path="/edit/:id" element={<EventFormPage />} />
        </Routes>
      </EventProvider>
    </Router>
  );
};

export default App;
