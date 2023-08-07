import React, { useContext } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Context } from "../Context/Context";

const ContentPagination = ({ contentSite, isPublish, spId }) => {
  const { getContentSearch } = useContext(Context);
  return (
    <Stack spacing={2}>
      <Pagination
        onChange={(e,page) => getContentSearch({isPublish, page, id:spId})}
        count={contentSite}
        color="primary"
      />
    </Stack>
  );
};

export default ContentPagination;
