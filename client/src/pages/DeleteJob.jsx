import React from "react";
import customFetch from "../utils/customFetch";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify"; // Bu satırı eklemeniz gerekiyor
import { QueryClient } from "@tanstack/react-query";

export const action =
  (QueryClient) =>
  async ({ params }) => {
    try {
      await customFetch.delete(`/jobs/${params.id}`);
      toast.success("job deleted successfully");
      queryClient.invalidateQueries(["jobs"]);

      return redirect("/dashboard/all-jobs");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return redirect("/dashboard/all-jobs");
    }
  };

const DeleteJob = () => {
  return <div>DeleteJob</div>;
};

export default DeleteJob;
