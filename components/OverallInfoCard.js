import { useState, useEffect } from "react";
import { FaShapes, FaExternalLinkAlt, FaSyncAlt } from "react-icons/fa";

// TaskItem component
const TaskItem = ({ icon, title, count, bgColor }) => {
  const itemStyle = `flex flex-col justify-center items-center basis-1/3 space-y-3 py-2 ${bgColor} text-gray-900 rounded-xl`;

  return (
    <div className={itemStyle}>
      <div className="text-current border rounded-full border-gray-500 p-2">
        {icon}
      </div>
      <p className="text-x">{title}</p>
      <p className="font-bold text-2xl">{count}</p>
    </div>
  );
};

export default function OverallInfoCard({ issuesClosed, issuesOpen }) {
  const [taskCount, setTaskCount] = useState(0);
  const [inProgressCount, setInProgressCount] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);

  const totalTasks = issuesClosed.length + issuesOpen.length;

  useEffect(() => {
    const interval = setInterval(() => {
      // Update taskCount
      if (taskCount < totalTasks) {
        setTaskCount((prevCount) => prevCount + 1);
      }

      // Update inProgressCount
      if (inProgressCount < issuesOpen.length) {
        setInProgressCount((prevCount) => prevCount + 1);
      }

      // Update completedTasks
      if (completedTasks < issuesClosed.length) {
        setCompletedTasks((prevCount) => prevCount + 1);
      }
    }, 30);

    return () => {
      clearInterval(interval);
    };
  }, [
    taskCount,
    inProgressCount,
    completedTasks,
    totalTasks,
    issuesOpen.length,
    issuesClosed.length,
  ]);

  return (
    <div className="flex flex-col max-w-sm md:max-w-lg xl:max-w-xl bg-[#1A1E1F] rounded-2xl">
      <div className="flex flex-col gap-8 h-96 w-96 text-#1A1E1F p-9">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-s text-white">Overall Information</h1>
        </div>
        <div className="flex justify-left gap-1 items-center">
          <div className="text-[#F9F9F9] font-bold text-2xl">
            {String(completedTasks)}
          </div>
          <div className="text-[#F9F9F9] ">|</div>
          <div className="text-[#F9F9F9] font-bold text-2xl">
            {String(totalTasks)}
          </div>
          <p className="text-[#606467] text-xs ml-[10px] items-end">
            Tasks Done
          </p>
        </div>
        <div className="flex justify-between space-x-4">
          <TaskItem
            icon={<FaShapes />}
            title="Tasks"
            bgColor="bg-yellow-300"
            count={String(taskCount)}
          />
          <TaskItem
            icon={<FaSyncAlt />}
            title="In Progress"
            bgColor="bg-orange-500"
            count={String(inProgressCount)}
          />
          <TaskItem
            icon={<FaExternalLinkAlt />}
            title="Completed"
            bgColor="bg-gray-200"
            count={String(completedTasks)}
          />
        </div>
        <div className="flex justify-center">
          {/* <button className="bg-[#37BCBA] text-black rounded-lg p-2 px-12 font-semibold">
            See All Tasks
          </button> */}
        </div>
      </div>
    </div>
  );
}
