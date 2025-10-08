const fetchEvents = async () => {
  const response = await fetch("http://localhost:3000/api/events");
  const data = await response.json();
  return data;
};

export default fetchEvents;
