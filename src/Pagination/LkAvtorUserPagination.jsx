import React, { useContext } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Context } from "../Context/Context";

const LkAvtorUserPagination = ({
  superTz,
  paramsID,
  type,
  own,
  draft,
  page,
  setPage,
}) => {
  const { SuperAuthor } = useContext(Context);
  return (
    <Stack spacing={2}>
      <Pagination
        onChange={
          (e, page) => {
            setPage(page);
          }
          // SuperAuthor({ page, id: paramsID, type, draft, owner: own })
        }
        count={superTz}
        page={+page}
        color="primary"
      />
    </Stack>
  );
};

export default LkAvtorUserPagination;
