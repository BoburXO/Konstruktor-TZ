import React, { useContext } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useDispatch } from "react-redux";
import { fetchAllTzOfUser } from "../pages/Profile/profile_slice";

const ProfilePagination = ({ superTz, tz_name }) => {
  const dispatch = useDispatch();
  return (
    <Stack spacing={2}>
      <Pagination
        onChange={(e, page) => {
          dispatch(fetchAllTzOfUser({ page, tz_name }));
        }}
        count={superTz}
        color="primary"
      />
    </Stack>
  );
};

export default ProfilePagination;
