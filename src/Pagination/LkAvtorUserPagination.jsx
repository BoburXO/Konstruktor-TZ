import React, { useContext } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Context } from "../Context/Context";

const LkAvtorUserPagination = ({ createTzUser }) => {
  const { getCreateTzUser } = useContext(Context);
  return (
    <Stack spacing={2}>
      <Pagination
        onChange={(e, page) => getCreateTzUser(page)}
        count={createTzUser}
        color="primary"
      />
    </Stack>
  );
};

export default LkAvtorUserPagination;
