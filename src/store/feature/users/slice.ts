import { User } from "@/types/UserState";
import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: [],
};

export const usersSlice = createSlice({
  name: "usersSlice",
  initialState: initialState,
  reducers: {
    clearMarker: (state) => {
      state.users = [];
    },
  },
});

export const { clearMarker } = usersSlice.actions;
