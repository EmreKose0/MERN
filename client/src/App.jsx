import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
  AddJob,
  AllJobs,
  Profile,
  Admin,
  EditJob,
  Stats,
} from "./pages";

import { action as registerAction } from "./pages/Register.jsx";
import { action as loginAction } from "./pages/Login.jsx";
import { loader as dashboardLoader } from "./pages/DashboardLayout.jsx";
import { action as addJobAction } from "./pages/AddJob.jsx";
import { loader as allJobsLoader } from "./pages/AllJobs.jsx";
import { loader as editJobLoader } from "./pages/EditJob.jsx";
import { action as editJobAction } from "./pages/EditJob.jsx";
import { action as deleteJobAction } from "./pages/DeleteJob.jsx";
import { loader as adminLoader } from "./pages/Admin.jsx";
import { action as profileAction } from "./pages/Profile.jsx";
import { loader as statsLoader } from "./pages/Stats.jsx";
import ErrorElement from "./components/ErrorElement.jsx";

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

checkDefaultTheme();

const queryClient = new QueryClient({
  //tüm veri sorgularını ön bellege alır, aynı sorgular cekilirse, tekrar tekar db den sorgu cekmez cache den ceker
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, //5 dk ms cinsinden
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />, //parent route Layout mantığı
    errorElement: <Error />,
    children: [
      {
        index: true, //parent Route gittiginde gösterilecek element
        element: <Landing />,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction, //action ı hersayfada kensinine özel belirledik
        // action: () => {
        //   console.log("hello there"); //olusacak action ı sec
        //   return null; //return etmek zorunda hata almamak ıcın
        // },
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction(queryClient),
      },
      {
        path: "dashboard",
        element: <DashboardLayout queryClient={queryClient} />,
        loader: dashboardLoader(queryClient),
        children: [
          {
            index: true,
            element: <AddJob />,
            action: addJobAction(queryClient),
          },
          {
            path: "stats",
            element: <Stats />,
            loader: statsLoader(queryClient), //Reactquery kullanmak icin
            errorElement: <ErrorElement />,
          },
          {
            path: "all-jobs",
            element: <AllJobs />,
            loader: allJobsLoader(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: "profile",
            element: <Profile />,
            action: profileAction(queryClient),
          },
          {
            path: "admin",
            element: <Admin />,
            loader: adminLoader,
          },
          {
            path: "edit-job/:id",
            element: <EditJob />,
            loader: editJobLoader(queryClient),
            action: editJobAction(queryClient),
          },
          {
            path: "delete-job/:id",
            action: deleteJobAction(queryClient),
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
