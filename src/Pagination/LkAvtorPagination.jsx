import React, { useContext } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Context } from "../Context/Context";

const LkAvtorPagination = ({ superTz }) => {
  const { SuperTzGetPagination } = useContext(Context);
  return (
    <Stack spacing={2}>
      <Pagination
        onChange={(e, page) => SuperTzGetPagination(page)}
        count={superTz}
        color="primary"
      />
    </Stack>
  );
};

export default LkAvtorPagination;
