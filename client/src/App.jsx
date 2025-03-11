import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
  AddJob,
  Stats,
  AllJobs,
  Profile,
  Admin,
  EditJob,
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

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

checkDefaultTheme();

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
        action: loginAction,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <AddJob />,
            action: addJobAction,
          },
          {
            path: "stats",
            element: <Stats />,
            loader: statsLoader,
          },
          {
            path: "all-jobs",
            element: <AllJobs />,
            loader: allJobsLoader,
          },
          {
            path: "profile",
            element: <Profile />,
            action: profileAction,
          },
          {
            path: "admin",
            element: <Admin />,
            loader: adminLoader,
          },
          {
            path: "edit-job/:id",
            element: <EditJob />,
            loader: editJobLoader,
            action: editJobAction,
          },
          {
            path: "delete-job/:id",
            action: deleteJobAction,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
