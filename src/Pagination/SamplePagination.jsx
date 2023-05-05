import React, { useContext } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Context } from "../Context/Context";

const SamplePagination = ({ sample }) => {
  const { allSample } = useContext(Context);
  return (
    <Stack spacing={2}>
      <Pagination
        onChange={(page) => allSample(page)}
        count={sample}
        color="primary"
      />
    </Stack>
  );
};

export default SamplePagination;
