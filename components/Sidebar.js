"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import SidebarLogo from "@components/SidebarLogo";
import SidebarDashboard from "@components/SidebarDashboard";
import SidebarTeams from "@components/SidebarTeams";
import SidebarDarkMode from "@components/SidebarDarkMode";

export default function Sidebar() {
  const [isMobile, setIsMobile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    // Initial check
    checkIsMobile();

    // Event listener for window resize
    window.addEventListener("resize", checkIsMobile);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const handleBurgerMenuClick = () => {
    setShowSidebar(!showSidebar);
  };

  if (isMobile) {
    return (
      <div className="relative">
        <div
          className=" flex fixed space-x-6 p-2 bg-local bg-[#1A1E1F]  
         bg-repeat-x w-full m-0 h-24 z-50 items-center"
        >
          <FontAwesomeIcon
            icon={faBars}
            className="z-20 text-white cursor-pointer text-3xl pl-4"
            onClick={handleBurgerMenuClick}
          />
          <SidebarLogo className="w-auto h-8" />
        </div>
        <div
          className={`fixed z-20 first-letter:top-0 left-0 w-1/2 h-full transform transition-transform duration-300 ${
            showSidebar ? "translate-x-0 w-1/3" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col items-center gap-10 pt-36 p-4 h-full min-w-sm bg-[#1A1E1F] text-white">
            <SidebarDashboard />
            {showSidebar && (
              <>
                {/* <SidebarTeams /> */}
                {/* <SidebarDarkMode /> */}
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex xl:flex-col justify-start items-center gap-10 p-4 xl:pt-10 h-full xl:w-[200px] bg-[#1A1E1F] text-white min-h-[100px]">
      <SidebarLogo className="w-auto h-8" />
      <SidebarDashboard />
      {/* <SidebarTeams /> */}
      {/* <SidebarDarkMode /> */}
    </div>
  );
}
