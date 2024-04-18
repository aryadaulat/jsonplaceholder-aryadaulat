import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { usersSlice } from "./feature/users/slice";
import { postSlice } from "./feature/posts/slice";
import { albumsSlice } from "./feature/albums/slice";

const combinedReducer = combineReducers({
  usersState: usersSlice.reducer,
  postsState: postSlice.reducer,
  albumsState: albumsSlice.reducer,
});

const rootReducer = (state: any, action: any) => {
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
