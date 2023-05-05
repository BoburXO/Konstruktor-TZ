import React, { useContext } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Context } from "../Context/Context";

const LkAvtorPagination = ({createTz}) => {
       const { getCreateTz } = useContext(Context);
  return (
    <Stack spacing={2}>
      <Pagination
        onChange={(page) => getCreateTz(page)}
        count={createTz}
        color="primary"
      />
    </Stack>
  );
};

export default LkAvtorPagination;
