import { User } from "@/types/UserState";
import { createSlice } from "@reduxjs/toolkit";
import { getUsers } from "./actions";

export interface UserState {
  users: {
    isRefresh: boolean;
    status: boolean;
    data: User[];
  };
}

const initialState: UserState = {
  users: {
    isRefresh: false,
    status: false,
    data: [],
  },
};

export const usersSlice = createSlice({
  name: "usersState",
  initialState: initialState,
  reducers: {
    clearMarker: (state) => {
      state.users = { status: false, data: [], isRefresh: false };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      console.log("action ", action.payload.users);
      state.users.data = action.payload.users;
      state.users.isRefresh = false;
      state.users.status = false;
    });
  },
});

export const { clearMarker } = usersSlice.actions;
