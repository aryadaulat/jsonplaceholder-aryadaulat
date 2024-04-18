"use client";
import { Providers } from "@/app/provider";
import React from "react";
import TopBar from "../TopBar";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Provider } from "react-redux";
import { store } from "@/store";

function MainPage({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <Provider store={store}>
      <Providers>
        <div className="flex flex-col min-h-screen h-full ">
          <TopBar />
          <div className="flex flex-col px-10 ">
            <div>Home / App</div>
            <div className="flex md:flex-row md:h-[50vh] w-full bg-gray-100">
              <div className="pt-6 px-6 border-r-2 flex flex-col gap-5">
                <Button
                  variant="ghost"
                  href="/users"
                  className={
                    pathname === "/users"
                      ? "bg-gray-500 text-white"
                      : "bg-transparent text-black"
                  }
                >
                  <Link href="/users">Users</Link>
                </Button>
                <Button
                  className={
                    pathname === "/posts"
                      ? "bg-gray-500 text-white"
                      : "bg-transparent text-black"
                  }
                  variant="ghost"
                >
                  <Link href="/posts">Posts</Link>
                </Button>
                <Button
                  className={
                    pathname === "/albums"
                      ? "bg-gray-500 text-white"
                      : "bg-transparent text-black"
                  }
                  variant="ghost"
                >
                  <Link href="/albums">Albums</Link>
                </Button>
              </div>
              <div className="pl-2 w-full">{children}</div>
            </div>
          </div>
        </div>
      </Providers>
    </Provider>
  );
}

export default MainPage;
