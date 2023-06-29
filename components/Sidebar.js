"use client";
import SidebarLogo from "@components/SidebarLogo";
import SidebarDashboard from "@components/SidebarDashboard";
import SidebarTeams from "@components/SidebarTeams";
import SidebarDarkMode from "@components/SidebarDarkMode";

export default function Sidebar() {
  return (
    <div
      className="flex flex-col items-center gap-10 pt-14 p-4 min-w-sm
     bg-[#1A1E1F] text-white"
    >
      <SidebarLogo />
      <SidebarDashboard />
      <SidebarTeams />
      <SidebarDarkMode />
    </div>
  );
}
