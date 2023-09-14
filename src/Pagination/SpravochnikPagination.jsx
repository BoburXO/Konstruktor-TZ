import React, { useContext, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Context } from "../Context/Context";
import { useSearchParams } from "react-router-dom";

const SpravochnikPagination = ({ spravochnik }) => {
  const { getAllSpraSearch } = useContext(Context);
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    getAllSpraSearch({
      page: params.get("page"),
      orgId: params.get("orgId"),
      search: params.get("search"),
    });
  }, [params]);

  return (
    <Stack spacing={2}>
      <Pagination
        onChange={(e, page) =>
          setParams({
            page,
            orgId: params.get("orgId") ? params.get("orgId") : "",
            search: params.get("search") ? params.get("search") : "",
          })
        }
        count={spravochnik}
        color="primary"
      />
    </Stack>
  );
};

export default SpravochnikPagination;
