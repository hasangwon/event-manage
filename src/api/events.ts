import axios from "axios";
import { Event } from "../types/EventType";

const API_URL = "http://localhost:3001/events";

export const getEvents = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getEventById = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createEvent = async (event: Event) => {
  const response = await axios.post(API_URL, event);
  return response.data;
};

export const updateEvent = async (id: string, event: Event) => {
  const response = await axios.put(`${API_URL}/${id}`, event);
  return response.data;
};

export const deleteEvent = async (id: string) => {
  await axios.delete(`${API_URL}/${id}`);
};
