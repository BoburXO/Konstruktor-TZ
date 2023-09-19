import React, { useContext, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Context } from "../Context/Context";
import { useSearchParams } from "react-router-dom";

const OrgPagination = ({ organization }) => {
  const { SuperOrganizations } = useContext(Context);
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    SuperOrganizations({
      page: params.get("page"),
      own: params.get("own"),
      searchorg: params.get("searchorg"),
    });
  }, [params]);

  return (
    <Stack spacing={2}>
      <Pagination
        onChange={(e, page) => {
          setParams({
            page,
            own: params.get("own") ? params.get("own") : "",
            searchorg: params.get("searchorg") ? params.get("searchorg") : "",
          });
        }}
        count={organization}
        color="primary"
      />
    </Stack>
  );
};

export default OrgPagination;
