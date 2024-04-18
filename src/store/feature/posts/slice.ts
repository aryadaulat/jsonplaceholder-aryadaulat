import { createSlice } from "@reduxjs/toolkit";
import { getPosts } from "./actions";
import { Post } from "@/types/PostState";

export interface PostState {
  posts: {
    isRefresh: boolean;
    status: boolean;
    data: Post[];
  };
}

const initialState: PostState = {
  posts: {
    isRefresh: false,
    status: false,
    data: [],
  },
};

export const postSlice = createSlice({
  name: "postState",
  initialState: initialState,
  reducers: {
    clearMarker: (state) => {
      state.posts = { status: false, data: [], isRefresh: false };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts.data = action.payload.posts;
      state.posts.isRefresh = false;
      state.posts.status = false;
    });
  },
});

export const { clearMarker } = postSlice.actions;
