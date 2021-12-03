import http from "../http";

const getAll = () => {
  return http.get("/");
};

const get = id => {
  return http.get(`/${id}`);
};

const create = data => {
  return http.post("/", data);
};

const update = (id, data) => {
  return http.put(`/${id}`, data);
};

const remove = id => {
  return http.delete(`/${id}`);
};

const UserService = {
  getAll,
  get,
  create,
  update,
  remove
};

export default UserService;
