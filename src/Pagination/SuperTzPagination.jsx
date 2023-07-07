import React, { useContext } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Context } from "../Context/Context";

const SuperTzPagination = ({ superTz, paramsID }) => {
  const { SuperTzGetPagination } = useContext(Context);
  return (
    <Stack spacing={2}>
      <Pagination
        onChange={(e, page) => SuperTzGetPagination(page, paramsID)}
        count={superTz}
        color="primary"
      />
    </Stack>
  );
};

export default SuperTzPagination;
