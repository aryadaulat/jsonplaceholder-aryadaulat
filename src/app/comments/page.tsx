"use client";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { Suspense } from "react";

const Server = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});

export default function Comments() {
  const searchParams = useSearchParams();
  const [comments, setComments] = useState<any[]>();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [choosedData, setchoosedData] = useState<any>();
  const [condition, setcondition] = useState(1);
  const [idParams, setidParams] = useState<string>();

  const getComments = useCallback(async ({ postId }: { postId: string }) => {
    try {
      const response = await Server.get(`/comments?postId=${postId}`, {
        headers: { Accept: "application/json" },
      });
      setComments(response.data);
    } catch (error) {}
  }, []);

  useEffect(() => {
    const id = searchParams.get("postId");
    if (id) {
      setidParams(id);
      getComments({ postId: id });
    }
  }, [getComments, searchParams]);

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
  function tembahModal(data: any) {
    setchoosedData(data);
    setcondition(3);
    onOpen();
  }

  async function Edit(item: any) {
    try {
      const response = await Server.put(`/comments/${item.id}`, {
        item,
      });
      if (response.status === 200) {
        onClose();
      }
    } catch (error) {}
  }

  async function onDelete(item: any) {
    try {
      const response = await Server.delete(`/comments/${item.id}`);
      if (response.status === 200) {
        onClose();
      }
    } catch (error) {}
  }
  async function onPost(item: any) {
    try {
      const response = await Server.post(`/comments`, { item });
      if (response.status === 201) {
        onClose();
      }
    } catch (error) {}
  }
  return (
    <div>
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
                  Edit Comment
                </ModalHeader>
                <ModalBody>
                  <Input
                    autoFocus
                    label="Name"
                    placeholder="Enter your Title"
                    variant="bordered"
                    value={choosedData?.name ?? ""}
                    onValueChange={(item) =>
                      setchoosedData((prev: any) => {
                        return { ...prev, name: item };
                      })
                    }
                  />
                  <Input
                    label="Email"
                    placeholder="Enter your Email"
                    variant="bordered"
                    value={choosedData?.email ?? ""}
                    onValueChange={(item) =>
                      setchoosedData((prev: any) => {
                        return { ...prev, email: item };
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
                  <Button color="danger" onPress={() => onDelete(choosedData)}>
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
                  Tambah Comment
                </ModalHeader>
                <ModalBody>
                  <Input
                    autoFocus
                    label="Name"
                    placeholder="Enter your Title"
                    variant="bordered"
                    value={choosedData?.name ?? ""}
                    onValueChange={(item) =>
                      setchoosedData((prev: any) => {
                        return { ...prev, name: item };
                      })
                    }
                  />
                  <Input
                    label="Email"
                    placeholder="Enter your Email"
                    variant="bordered"
                    value={choosedData?.email ?? ""}
                    onValueChange={(item) =>
                      setchoosedData((prev: any) => {
                        return { ...prev, email: item };
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
                    Post
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        ) : null}
      </Modal>
      <div className="flex justify-between">
        <h1 className="px-2 py-2 font-bold">Comments</h1>
        <Button
          color="primary"
          onPress={() =>
            tembahModal({ postId: idParams, name: "", email: "", body: "" })
          }
        >
          Add Comment
        </Button>
      </div>
      <Suspense>
        {comments &&
          comments.length > 1 &&
          comments.map((item) => (
            <div
              key={item.id}
              className="bg-gray-300 py-5 my-2 px-2 rounded-md justify-between flex"
            >
              <div>
                <h1 className="font-bold">{item.name}</h1>
                <p>{item.email}</p>
                <p className="font-semibold">{item.body}</p>
              </div>
              <div className="flex gap-2 items-center">
                <Button onPress={() => openModal(item)}>Edit</Button>
                <Button onPress={() => openDelete(item)}>Delete</Button>
              </div>
            </div>
          ))}
      </Suspense>
    </div>
  );
}
