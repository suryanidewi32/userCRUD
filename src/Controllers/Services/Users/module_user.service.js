import UserService from "./module.service";

const Createdata = "Createdata";
const Retrive = "Retrive";
const Update = "Update";
const Delete = "Delete";
  
  export const createUser = (name, username, email, password, role, id) => async (dispatch) => {
    try {
      const res = await UserService.create({ name, username, email, password, role, id });
  
      dispatch({
        type: Createdata,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const retrieveUser = () => async (dispatch) => {
    try {
      const res = await UserService.getAll();
  
      dispatch({
        type: Retrive,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const updateUser = (id, data) => async (dispatch) => {
    try {
      const res = await UserService.update(id, data);
  
      dispatch({
        type: Update,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deleteUser = (id) => async (dispatch) => {
    try {
      await UserService.remove(id);
  
      dispatch({
        type: Delete,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };