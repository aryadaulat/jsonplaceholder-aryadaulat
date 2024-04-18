"use client";
import CustomTable from "@/components/CustomTable";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { getUsers } from "@/store/feature/users/actions";
import { Table } from "@nextui-org/react";
import React, { useCallback, useEffect } from "react";

function Users() {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.usersState);

  const getData = useCallback(async () => {
    await dispatch(getUsers());
  }, [dispatch]);
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // useEffect(() => {
  //   console.log("users ", users.data);
  // }, [users.data]);

  return (
    <div className="w-full">
      <div>Header</div>
      {users.data.length > 1 && <CustomTable data={users.data} mode="users" />}
    </div>
  );
}

export default Users;
