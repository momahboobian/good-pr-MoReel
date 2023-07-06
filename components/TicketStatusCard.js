import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShapes,
  faSyncAlt,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";

// TaskItem component
const TaskItem = ({ icon, title, count, bgColor }) => {
  const itemStyle = `flex flex-col justify-center items-center basis-1/3 min-w-[70px] space-y-3 p-2 ${bgColor} text-gray-900 rounded-xl whitespace-nowrap`;

  return (
    <div className={itemStyle}>
      <div className="text-current border rounded-full border-gray-900 p-2">
        <FontAwesomeIcon icon={icon} />
      </div>
      <p className="text-sm md:text-sm font-normal">{title}</p>
      <p className="font-bold text-2xl">{count}</p>
    </div>
  );
};

export default function TicketStatusCard({ issuesClosed, issuesOpen }) {
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
    <div className="bg-[#1A1E1F] rounded-2xl w-full min-w-max">
      <div className="flex flex-col justify-between max-w-xs mx-auto md:max-w-md lg:max-w-lg p-6 space-y-12 w-full">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-s text-white">Ticket Status</h1>
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
        <div className="flex justify-between space-x-3 md:space-x-4 pb-2">
          <TaskItem
            icon={faShapes}
            title="Issues"
            bgColor="bg-[#fff043cc]"
            count={String(taskCount)}
          />
          <TaskItem
            icon={faSyncAlt}
            title="In Progress"
            bgColor="bg-[#ea580ccc]"
            count={String(inProgressCount)}
          />
          <TaskItem
            icon={faExternalLinkAlt}
            title="Completed"
            bgColor="bg-[#0e7490cc]"
            count={String(completedTasks)}
          />
        </div>
      </div>
    </div>
  );
}
