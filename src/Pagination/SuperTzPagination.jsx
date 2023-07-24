import React, { useContext } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Context } from "../Context/Context";

const SuperTzPagination = ({ superTz, paramsID, own, draft, type }) => {
  const { SuperTzGet } = useContext(Context);
  return (
    <Stack spacing={2}>
      <Pagination
        onChange={(e, page) =>
          SuperTzGet({ id: paramsID, page, owner: own, type, draft })
        }
        count={superTz}
        color="primary"
      />
    </Stack>
  );
};

export default SuperTzPagination;
