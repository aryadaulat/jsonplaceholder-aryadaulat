import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../index";

const Server = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});

export const getUsers = createAsyncThunk<any, undefined, { state: RootState }>(
  "users",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Server.get("/users", {
        headers: { Accept: "application/json" },
      });

      let messages = "something went wrong";
      if (response.status !== 200) {
        throw new Error(messages);
      }
      console.log("response ", response.data);
      const data = response.data;

      return {
        users: Object.values(data),
        status: response.status,
      };
    } catch (e: any) {
      return rejectWithValue(e.response.data);
    }
  }
);
