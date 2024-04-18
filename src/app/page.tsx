"use client";
import { store } from "@/store";
import React from "react";
import { Provider } from "react-redux";

export default function Home() {
  return (
    <main className="flex min-h-screen">
      <Provider store={store}>
        <div></div>
      </Provider>
    </main>
  );
}
