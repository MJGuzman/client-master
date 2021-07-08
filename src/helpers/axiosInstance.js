import axios from "axios";

const instance = axios.create({
  baseURL: "https://localhost:44394/api",
  headers: {
    "Content-type": "application/json",
  },
});

export default instance;
