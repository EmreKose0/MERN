import React from "react";
import { Outlet } from "react-router-dom";

function HomeLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default HomeLayout;

// outlet burada parent oldugunu ve layout seklinde calıstıgını saglar
