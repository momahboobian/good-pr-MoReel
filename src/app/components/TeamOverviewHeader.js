import OverallInfoCard from "./OverallInfoCard";
import ProjectCard from "./ProjectCard";
import TaskActivity from "./TasksActivity";
import TeamActivity from "./TeamActivity";

const TeamOverview = () => {
  return (
    <div>
      {/* Content for the right div */}
      <h1 className="font-bold text-white ">Team Overview</h1>
      <p className="font-light	text-xs	text-gray-600	pt-2">
        Track you projects, tasks & team activity here
      </p>
      <div className="flex flex-column mt-4 w-full space-x-4 gap-4">
        <ProjectCard />
        <OverallInfoCard />
        <TeamActivity />
      </div>
      <TaskActivity />
    </div>
  );
};

export default TeamOverview;
