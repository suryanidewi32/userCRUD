import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "./module.service";

const initialState = [];

export const createUser = createAsyncThunk(
  "users/create",
  async ({ name, username, email, password, role, id }) => {
    const res = await UserService.create({ name, username, email, password, role, id });
    return res.data;
  }
);

export const retrieveUser = createAsyncThunk(
  "users/retrieve",
  async () => {
    const res = await UserService.getAll();
    return res.data;
  }
);

export const updateUser = createAsyncThunk(
  "users/update",
  async ({ id, data }) => {
    const res = await UserService.update(id, data);
    return res.data;
  }
);

export const deleteUser = createAsyncThunk(
  "users/delete",
  async ({ id }) => {
    await UserService.delete(id);
    return { id };
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    [createUser.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [retrieveUser.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [updateUser.fulfilled]: (state, action) => {
      const index = state.findIndex(user => user.id === action.payload.id);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [deleteUser.fulfilled]: (state, action) => {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1);
    },
  },
});

const { reducer } = userSlice;
export default reducer;
