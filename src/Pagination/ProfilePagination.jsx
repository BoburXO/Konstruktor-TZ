import React, { useContext } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useDispatch } from "react-redux";
import { fetchAllTzOfUser } from "../pages/Profile/profile_slice";
import { useState } from "react";

const ProfilePagination = ({ superTz }) => {
  const dispatch = useDispatch();
  return (
    <Stack spacing={2}>
      <Pagination
        onChange={(e, page) => {
          dispatch(fetchAllTzOfUser(page));
        }}
        count={superTz}
        color="primary"
      />
    </Stack>
  );
};

export default ProfilePagination;
