"use client";
import CustomTable from "@/components/CustomTable";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { getAlbums } from "@/store/feature/albums/actions";
import { getPosts } from "@/store/feature/posts/actions";
import { Album } from "@/types/AlbumState";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { Suspense } from "react";

function Albums() {
  const dispatch = useAppDispatch();
  const { albums } = useAppSelector((state) => state.albumsState);
  const searchParams = useSearchParams();
  const [filterData, setfilterData] = useState<any[]>();

  const getData = useCallback(async () => {
    await dispatch(getAlbums());
  }, [dispatch]);
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const id = searchParams.get("userId");
    if (id) {
      let data = albums.data.filter((item) => item.userId.toString() !== id);
      setfilterData(data as Album[]);
    } else {
      setfilterData(albums.data);
    }
  }, [albums.data, searchParams]);
  // useEffect(() => {
  //   console.log("users ", users.data);
  // }, [users.data]);

  return (
    <Suspense>
      <div className="w-full">
        <div>Header</div>
        {albums.data.length > 1 && !filterData ? (
          <CustomTable data={albums.data} mode="albums" />
        ) : (
          filterData && <CustomTable data={filterData!} mode="albums" />
        )}
      </div>
    </Suspense>
  );
}

export default Albums;
