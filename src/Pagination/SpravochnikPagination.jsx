import React, { useContext } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Context } from "../Context/Context";

const SpravochnikPagination = ({ spravochnik }) => {
  const { getAllSpraSearch } = useContext(Context);
  return (
    <Stack spacing={2}>
      <Pagination
        onChange={(e, page) => getAllSpraSearch(page)}
        count={spravochnik}
        color="primary"
      />
    </Stack>
  );
};

export default SpravochnikPagination;
