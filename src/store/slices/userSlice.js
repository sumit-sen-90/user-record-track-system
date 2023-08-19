import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    userInfo: [
      {
        id: 1,
        name: "Sumit",
        email: "sumit722776@gmail.com",
        gender: "male",
        status: "active",
      },
    ],
  },
  reducers: {
    addUser: (state, action) => {
      const { name, email, gender, status } = action.payload;
      const maxId = state.userInfo.reduce(
        (max, user) => Math.max(max, user.id),
        0
      );
      const newUser = {
        id: maxId + 1,
        name: name,
        email: email,
        gender: gender,
        status: status,
      };
      state.userInfo.push(newUser);
    },
    removeUser: (state, action) => {
      const idToRemove = action.payload;
      state.userInfo = state.userInfo.filter((user) => user.id !== idToRemove);
    },
    updateUser: (state, action) => {
      const { id, updatedUserData } = action.payload;
      const userIndex = state.userInfo.findIndex((user) => user.id === id);

      if (userIndex !== -1) {
        state.userInfo[userIndex] = {
          ...state.userInfo[userIndex],
          ...updatedUserData,
        };
      }
    },
  },
});
export const { addUser, removeUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
