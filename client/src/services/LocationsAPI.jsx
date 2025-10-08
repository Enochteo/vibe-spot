const fetchLocations = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/locations");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Could not fetch locations", error);
  }
};

export default fetchLocations;
