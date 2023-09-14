import { useMemo } from "react";

export const useQuery = (search) => {
  const searchParams = useMemo(() => {
    return new URLSearchParams(search);
  }, [search]);
  return searchParams;
};
