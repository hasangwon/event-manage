export const formatDateTime = (date: string, time?: string): Date => {
  return new Date(`${date}T${time ? time : "00:00"}`);
};
