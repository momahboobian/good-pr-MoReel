import ProjectCard from "./ProjectCard";

const TeamOverview = () => {
  return (
    <div className="flex-1 w-screen bg-[#070E0E] p-6">
      {/* Content for the right div */}
      <h1 className="font-bold ">Team Overview</h1>
      <p className="font-light	text-xs	text-gray-600	pt-2">
        Track you projects, tasks & team activity here
      </p>
      <ProjectCard />
    </div>
  );
};

export default TeamOverview;
