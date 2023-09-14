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
  setPage,
}) => {
  const { SuperAuthor } = useContext(Context);
  return (
    <Stack spacing={2}>
      <Pagination
        onChange={(e, page) =>
          // SuperAuthor({ page, id: paramsID, type, draft, owner: own })
          setPage(page)
        }
        count={superTz}
        color="primary"
      />
    </Stack>
  );
};

export default LkAvtorUserPagination;
