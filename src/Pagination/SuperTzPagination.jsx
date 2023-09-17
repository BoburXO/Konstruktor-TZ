import React, { useContext } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Context } from "../Context/Context";

const SuperTzPagination = ({
  superTz,
  paramsID,
  own,
  draft,
  type,
  page,
  setPage,
}) => {
  const { SuperTzGet } = useContext(Context);
  return (
    <Stack spacing={2}>
      <Pagination
        onChange={
          (e, page) => {
            setPage(page);
          }
          // SuperTzGet({ id: paramsID, page, owner: own, type, draft })
        }
        count={superTz}
        page={+page}
        color="primary"
      />
    </Stack>
  );
};

export default SuperTzPagination;
