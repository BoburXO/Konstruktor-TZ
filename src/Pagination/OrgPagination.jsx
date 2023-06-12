import React, { useContext } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Context } from "../Context/Context";

const OrgPagination = ({ organization }) => {
  const { SuperOrganizations } = useContext(Context);
  return (
    <Stack spacing={2}>
      <Pagination
        onChange={(e, page) => SuperOrganizations(page)}
        count={organization}
        color="primary"
      />
    </Stack>
  );
};

export default OrgPagination;
