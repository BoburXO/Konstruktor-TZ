import React, { useContext, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Context } from "../Context/Context";
import { useSearchParams } from "react-router-dom";

const ContentPagination = ({ contentSite }) => {
  const { getContentSearch } = useContext(Context);
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    getContentSearch({
      page: params.get("page"),
      isPublish: params.get("isPublish"),
      id: params.get("id"),
      orgId: params.get("orgId"),
    });
  }, [params]);

  return (
    <Stack spacing={2}>
      <Pagination
        onChange={(e, page) =>
          setParams({
            page,
            isPublish: params.get("isPublish") ? params.get("isPublish") : "",
            id: params.get("id") ? params.get("id") : "",
            orgId: params.get("orgId") ? params.get("orgId") : "",
          })
        }
        count={contentSite}
        color="primary"
      />
    </Stack>
  );
};

export default ContentPagination;
