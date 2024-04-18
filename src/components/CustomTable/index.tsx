import {
  Table,
  Pagination,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Button,
} from "@nextui-org/react";
import Link from "next/link";
import React from "react";

export default function CustomTable({
  data,
  mode,
  onDetail,
  onDelete,
}: {
  data: any[];
  mode: string;
  onDetail?: any;
  onDelete?: any;
}) {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;

  const pages = Math.ceil(data.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return data.slice(start, end);
  }, [page, data]);

  const renderCell = React.useCallback((item: any, columnKey: any) => {
    switch (columnKey) {
      case "name":
        return <p>{item.name}</p>;
      case "status":
        return (
          <div className="flex gap-2">
            <Button>
              <Link href={`/posts?userId=${item.id}`}>Posts</Link>
            </Button>
            <Button>
              <Link href={`/albums?userId=${item.id}`}>Albums</Link>
            </Button>
          </div>
        );
      case "posts":
        return (
          <div>
            <h1 className="font-bold">{item.title}</h1>
            <p>{item.body}</p>
          </div>
        );
      case "statusPost":
        return (
          <div className="flex gap-2">
            <Button>
              <Link href={`/comments?postId=${item.id}`}>Comment</Link>
            </Button>
            <Button onPress={() => onDetail(item)}>Edit</Button>
            <Button onPress={() => onDelete(item)}>Delete</Button>
          </div>
        );
      case "title":
        return <div>{item.title}</div>;

      case "statusAlbum":
        return (
          <div className="flex gap-2">
            <Button>
              <Link href={`/photos?albumId=${item.id}`}>Detail</Link>
            </Button>
          </div>
        );
    }
  }, [onDelete, onDetail]);

  if (mode === "users") {
    return (
      <Table
        aria-label="Example table with client side pagination"
        className="light"
        fullWidth={true}
        bottomContent={
          <div className="flex w-full justify-center ">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        classNames={{
          wrapper: "min-h-[222px]",
          td: "border-b-1",
        }}
      >
        <TableHeader>
          <TableColumn key="name">NAME</TableColumn>
          <TableColumn key="status" align="end">
            STATUS
          </TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  } else if (mode === "post") {
    return (
      <Table
        aria-label="Post Table"
        className="light"
        fullWidth={true}
        hideHeader={true}
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        classNames={{
          wrapper: "min-h-[222px]",
          td: "border-b-1",
        }}
      >
        <TableHeader>
          <TableColumn key="posts">NAME</TableColumn>
          <TableColumn key="statusPost" align="end">
            STATUS
          </TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  } else if (mode === "albums") {
    return (
      <Table
        aria-label="Post Table"
        className="light"
        fullWidth={true}
        hideHeader={true}
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        classNames={{
          wrapper: "min-h-[222px]",
          td: "border-b-1",
        }}
      >
        <TableHeader>
          <TableColumn key="title">NAME</TableColumn>
          <TableColumn key="statusAlbum" align="end">
            STATUS
          </TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  }
}
