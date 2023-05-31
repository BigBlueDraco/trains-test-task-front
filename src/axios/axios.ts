import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/",
});
export const getTrains = async (where?: { fromId: number; toId: number }) => {
  try {
    const response = await api.get("/trains", {
      params: {
        fromId: where?.fromId,
        toId: where?.toId,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const getCities = async () => {
  try {
    const response = await api.get("/cities");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
