import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3003/users",
  headers: {
    "Content-type": "application/json"
  }
});
