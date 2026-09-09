import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json"
  }
});

export const getBooks = () => api.get("/books");

export const registerUser = (data: {
  name: string;
  email: string;
  password: string;
}) => api.post("/users/register", data);

export const loginUser = (data: {
  email: string;
  password: string;
}) => api.post("/users/login", data);

export default api;