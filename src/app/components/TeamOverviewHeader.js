import OverallInfoCard from "./OverallInfoCard";
import ProjectCard from "./ProjectCard";
import TaskActivity from "./TasksActivity";
import TeamActivity from "./TeamActivity";

const TeamOverview = () => {
  return (
    <div className="flex-1  bg-[#070E0E] p-6">
      {/* Content for the right div */}
      <h1 className="font-bold text-white ">Team Overview</h1>
      <p className="font-light	text-xs	text-gray-600	pt-2">
        Track you projects, tasks & team activity here
      </p>
      <div className="flex flex-column gap-20 mt-4">
        <ProjectCard />
        <OverallInfoCard />
        <TeamActivity />
      </div>
      <TaskActivity />
    </div>
  );
};

export default TeamOverview;
