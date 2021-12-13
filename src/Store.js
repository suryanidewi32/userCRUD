import { configureStore } from '@reduxjs/toolkit'
import userReducer from 'Controllers/Services/Users/module_user.service'

const reducer = {
  users: userReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;
