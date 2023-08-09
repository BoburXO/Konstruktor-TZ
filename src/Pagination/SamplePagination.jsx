import React, { useContext } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Context } from "../Context/Context";

const SamplePagination = ({ sample,sectId }) => {
  const { allSample } = useContext(Context);
  return (
    <Stack spacing={2}>
      <Pagination
        onChange={(e,page) => allSample({id:sectId, page})}
        count={sample}
        color="primary"
      />
    </Stack>
  );
};

export default SamplePagination;
