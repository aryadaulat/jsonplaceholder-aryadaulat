import { createSlice } from "@reduxjs/toolkit";
import { getAlbums } from "./actions";
import { Post } from "@/types/PostState";
import { Album } from "@/types/AlbumState";

export interface AlbumState {
  albums: {
    isRefresh: boolean;
    status: boolean;
    data: Album[];
  };
}

const initialState: AlbumState = {
  albums: {
    isRefresh: false,
    status: false,
    data: [],
  },
};

export const albumsSlice = createSlice({
  name: "albumsState",
  initialState: initialState,
  reducers: {
    clearMarker: (state) => {
      state.albums = { status: false, data: [], isRefresh: false };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAlbums.fulfilled, (state, action) => {
      state.albums.data = action.payload.albums;
      state.albums.isRefresh = false;
      state.albums.status = false;
    });
  },
});

export const { clearMarker } = albumsSlice.actions;
