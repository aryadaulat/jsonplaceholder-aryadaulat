"use client";
import CustomTable from "@/components/CustomTable";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { getPosts } from "@/store/feature/posts/actions";
import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Post } from "@/types/PostState";
import {
  Button,
  Checkbox,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import { Suspense } from "react";

function Posts() {
  const dispatch = useAppDispatch();
  const { posts } = useAppSelector((state) => state.postsState);
  const searchParams = useSearchParams();
  const [filterData, setfilterData] = useState<any[]>();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [choosedData, setchoosedData] = useState<any>();
  const [condition, setcondition] = useState(1);

  const Server = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com/",
  });

  const getData = useCallback(async () => {
    await dispatch(getPosts());
  }, [dispatch]);
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const id = searchParams.get("userId");
    if (id) {
      let data = posts.data.filter((item) => item.userId.toString() !== id);
      setfilterData(data as Post[]);
    } else {
      setfilterData(posts.data);
    }
  }, [posts.data, searchParams]);

  function openModal(data: any) {
    setchoosedData(data);
    setcondition(1);
    onOpen();
  }
  function openDelete(data: any) {
    setchoosedData(data);
    setcondition(2);
    onOpen();
  }

  async function Edit(item: any) {
    try {
      const response = await Server.put(`/posts/${item.id}`, {
        item,
      });
      if (response.status === 200) {
        onClose();
      }
    } catch (error) {}
  }

  async function onDelete(item: any) {
    try {
      const response = await Server.delete(`/posts/${item.id}`);
      if (response.status === 200) {
        onClose();
      }
    } catch (error) {}
  }
  function tembahModal(data: any) {
    setchoosedData(data);
    setcondition(3);
    onOpen();
  }
  async function onPost(item: any) {
    try {
      const response = await Server.post(`/posts`, { item });
      if (response.status === 201) {
        onClose();
      }
    } catch (error) {}
  }
  return (
    <Suspense>
      <div className="w-full">
        <div className="flex justify-between">
          <h1 className="px-2 py-2 font-bold">Post</h1>
          <Button
            color="primary"
            onPress={() => tembahModal({ userId: 1, title: "", body: "" })}
          >
            Add Post
          </Button>
        </div>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
          className="light"
        >
          {condition === 1 ? (
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Edit Post
                  </ModalHeader>
                  <ModalBody>
                    <Input
                      autoFocus
                      label="Title"
                      placeholder="Enter your Title"
                      variant="bordered"
                      value={choosedData?.title ?? ""}
                      onValueChange={(item) =>
                        setchoosedData((prev: any) => {
                          return { ...prev, title: item };
                        })
                      }
                    />
                    <Input
                      label="Body"
                      placeholder="Enter your body"
                      variant="bordered"
                      value={choosedData?.body ?? ""}
                      onValueChange={(item) =>
                        setchoosedData((prev: any) => {
                          return { ...prev, body: item };
                        })
                      }
                      size="lg"
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                      Cancel
                    </Button>
                    <Button color="primary" onPress={() => Edit(choosedData)}>
                      Edit
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          ) : condition === 2 ? (
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Are You Sure?
                  </ModalHeader>
                  <ModalBody>
                    <p>apakah kamu yakin menghapus postingan ini ?</p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="default" variant="flat" onPress={onClose}>
                      Cancel
                    </Button>
                    <Button
                      color="danger"
                      onPress={() => onDelete(choosedData)}
                    >
                      Delete
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          ) : condition === 3 ? (
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Tambah Post
                  </ModalHeader>
                  <ModalBody>
                    <Input
                      autoFocus
                      label="Title"
                      placeholder="Enter your Title"
                      variant="bordered"
                      value={choosedData?.title ?? ""}
                      onValueChange={(item) =>
                        setchoosedData((prev: any) => {
                          return { ...prev, title: item };
                        })
                      }
                    />
                    <Input
                      label="Body"
                      placeholder="Enter your body"
                      variant="bordered"
                      value={choosedData?.body ?? ""}
                      onValueChange={(item) =>
                        setchoosedData((prev: any) => {
                          return { ...prev, body: item };
                        })
                      }
                      size="lg"
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                      Cancel
                    </Button>
                    <Button color="primary" onPress={() => onPost(choosedData)}>
                      Tambah
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          ) : null}
        </Modal>
        {posts.data.length > 1 && !filterData ? (
          <CustomTable
            data={posts.data}
            mode="post"
            onDetail={(item: any) => openModal(item)}
            onDelete={(item: any) => openDelete(item)}
          />
        ) : (
          filterData && (
            <CustomTable
              data={filterData}
              mode="post"
              onDetail={(item: any) => openModal(item)}
              onDelete={(item: any) => openDelete(item)}
            />
          )
        )}
      </div>
    </Suspense>
  );
}

export default Posts;
