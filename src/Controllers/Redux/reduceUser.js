const Createdata = "Createdata";
const Retrive = "Retrive";
const Update = "Update";
const Delete = "Delete";
  
  const initialState = [];
  
  const userReducer = (users = initialState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case Createdata:
        return [...users, payload];
  
      case Retrive:
        return payload;
  
      case Update:
        return users.map((user) => {
          if (user.id === payload.id) {
            return {
              ...user,
              ...payload,
            };
          } else {
            return user;
          }
        });
  
      case Delete:
        return users.filter(({ id }) => id !== payload.id);
  
      default:
        return users;
    }
  };
  
  export default userReducer;
  
  