import React, { useContext, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Context } from "../Context/Context";
import { useSearchParams } from "react-router-dom";

const SamplePagination = ({ sample }) => {
  const { allSample } = useContext(Context);
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    allSample({
      page: params.get("page"),
      sectId: params.get("sectId"),
      search: params.get("search"),
    });
  }, [params]);
  return (
    <Stack spacing={2}>
      <Pagination
        onChange={(e, page) =>
          setParams({
            page,
            sectId: params.get("sectId") ? params.get("sectId") : "",
            search: params.get("search") ? params.get("search") : "",
          })
        }
        count={sample}
        color="primary"
      />
    </Stack>
  );
};

export default SamplePagination;
