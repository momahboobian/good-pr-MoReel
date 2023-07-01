"use client";
import { useState, useEffect } from "react";
import SidebarLogo from "@components/SidebarLogo";
import SidebarDashboard from "@components/SidebarDashboard";
import SidebarTeams from "@components/SidebarTeams";
import SidebarDarkMode from "@components/SidebarDarkMode";
import { FiMenu } from "react-icons/fi"; 

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
          className="fixed top-4 left-4 z-50 cursor-pointer text-[#606467]"
          onClick={handleBurgerMenuClick}
        >
          <FiMenu size={48} /> {/* Increase the size to 48 */}
        </div>
        <div
          className={`fixed z-20 first-letter:top-0 left-0 w-56 h-full bg-black bg-opacity-50 transform transition-transform duration-300 ${
            showSidebar ? "translate-x-0 w-1/3" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col items-center gap-10 pt-14 p-4 min-w-sm bg-[#1A1E1F] text-white">
            <SidebarLogo />
            <SidebarDashboard />
            {showSidebar && (
              <>
                <SidebarTeams />
                <SidebarDarkMode />
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-10 pt-14 p-4 min-w-sm bg-[#1A1E1F] text-white">
      <SidebarLogo />
      <SidebarDashboard />
      <SidebarTeams />
      <SidebarDarkMode />
    </div>
  );
}
