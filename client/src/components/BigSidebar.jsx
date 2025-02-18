import React from "react";
import Wrapper from "../assets/wrappers/BigSidebar";
import { useDashboardContext } from "../pages/DashboardLayout";
import { FaTimes } from "react-icons/fa";
import Logo from "./Logo";
import links from "../utils/links";
import NavLinks from "./NavLinks";
function BigSidebar() {
  const { showSidebar } = useDashboardContext();

  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container " : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks isBigSidebar/> 
          {/* sidebar ın büyük ekranda tıklandıgıdna kapanmaması sabit kalması icin isBigSidebar */}
        </div>
      </div>
    </Wrapper>
  );
}
export default BigSidebar;
