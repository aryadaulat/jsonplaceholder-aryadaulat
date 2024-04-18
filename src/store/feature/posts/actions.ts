import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../index";

const Server = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});

export const getPosts = createAsyncThunk<any, undefined, { state: RootState }>(
  "posts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Server.get("/posts", {
        headers: { Accept: "application/json" },
      });

      let messages = "something went wrong";
      if (response.status !== 200) {
        throw new Error(messages);
      }
      const data = response.data;

      return {
        posts: Object.values(data),
        status: response.status,
      };
    } catch (e: any) {
      return rejectWithValue(e.response.data);
    }
  }
);
