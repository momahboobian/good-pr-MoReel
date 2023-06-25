import SidebarLogo from "./SidebarLogo";
import SidebarDashboard from "./SidebarDashboard";
import SidebarTeams from "./SidebarTeams";
import SidebarDarkMode from "./SidebarDarkMode";

const Sidebar = () => {
  return (
    <div
      className="flex flex-col items-center gap-10 pt-10 p-4 min-w-sm
     bg-[#1A1E1F] text-white"
    >
      <SidebarLogo />
      <SidebarDashboard />
      <SidebarTeams />
      <SidebarDarkMode />
    </div>
  );
};

export default Sidebar;
