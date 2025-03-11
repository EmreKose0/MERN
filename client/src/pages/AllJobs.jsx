import { toast } from "react-toastify";
import { JobsContainer, SearchContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";
import React from "react";
import { useQuery } from "@tanstack/react-query";

const allJobQuery = (params) => {
  const { search, jobStatus, jobType, sort, page } = params;
  return {
    queryKey: [
      "jobs",
      search ?? "",
      jobStatus ?? "all",
      jobType ?? "all",
      sort ?? "newest",
      page ?? 1,
    ], //requestlerin cache te kalmaması icin burası yapıldı
    queryFn: async () => {
      const { data } = await customFetch.get("/jobs", {
        params,
      });
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    console.log(request.url);
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    await queryClient.ensureQueryData(allJobQuery(params));
    return {
      searchValues: { ...params },
    };
  };

const AllJobsContext = createContext();

// AllJobs.jsx
const AllJobs = () => {
  const { searchValues } = useLoaderData();
  const { data } = useQuery(allJobQuery(searchValues));
  // API'den gelen verilere bakalım
  console.log(data); // Bu satırı ekleyin ve konsola bakmayı unutmayın

  return (
    <AllJobsContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};

export const useAllJobsContext = () => useContext(AllJobsContext);

export default AllJobs;
