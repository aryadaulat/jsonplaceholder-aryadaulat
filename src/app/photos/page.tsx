"use client";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Image } from "@nextui-org/react";
import { Suspense } from "react";

const Server = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});

export default function Photos() {
  const searchParams = useSearchParams();
  const [photos, setPhotos] = useState<any[]>();

  const getPhotos = useCallback(async ({ albumId }: { albumId: string }) => {
    try {
      const response = await Server.get(`/photos?albumId=${albumId}`, {
        headers: { Accept: "application/json" },
      });
      setPhotos(response.data);
    } catch (error) {}
  }, []);
  useEffect(() => {
    const id = searchParams.get("albumId");
    if (id) {
      getPhotos({ albumId: id });
    }
  }, [getPhotos, searchParams]);

  return (
    <Suspense>
      <div className="grid grid-cols-4 gap-4 pb-5">
        {photos &&
          photos.length > 1 &&
          photos.map((item) => (
            <div key={item.id}>
              <Image width={300} alt={item.title} src={item.url} />
            </div>
          ))}
      </div>
    </Suspense>
  );
}
