import { faShapes, faSyncAlt, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

TaskItem.propTypes = {
  icon: PropTypes.array.isRequired,
  title: PropTypes.object.isRequired,
  count: PropTypes.object.isRequired,
  bgColor: PropTypes.object.isRequired,
};

TicketStatusCard.propTypes = {
  issuesClosed: PropTypes.array.isRequired,
  issuesOpen: PropTypes.object.isRequired,
};

const TaskItem = ({ icon, title, count, bgColor }) => {
  const itemStyle = `flex flex-col justify-center items-center basis-1/3 min-w-[70px] space-y-3 p-2 ${bgColor} text-gray-900 rounded-xl whitespace-nowrap`;

  return (
    <div className={itemStyle}>
      <div className="p-2 text-current border border-gray-900 rounded-full">
        <FontAwesomeIcon icon={icon} />
      </div>
      <p className="text-sm font-normal md:text-sm">{title}</p>
      <p className="text-2xl font-bold">{count}</p>
    </div>
  );
};

export default function TicketStatusCard({ issuesClosed, issuesOpen }) {
  // Enable tooltips feature on component mount
  useEffect(() => {
    import("@components/Dashboard/Components/Tooltips").then((module) => {
      const handleTooltips = module.handleTooltips;
      handleTooltips();
    });
  }, []);
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
  }, [taskCount, inProgressCount, completedTasks, totalTasks, issuesOpen.length, issuesClosed.length]);

  return (
    <div className="bg-[#1A1E1F] rounded-2xl w-full min-w-max">
      <div className="flex flex-col justify-between w-full max-w-xs p-6 mx-auto space-y-12 md:max-w-md lg:max-w-lg">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-white text-s">Issues Activity</h1>
          <div className="relative ml-2">
            <FontAwesomeIcon
              icon={faInfoCircle}
              data-tooltip-target="tooltip-issues"
              data-tooltip-placement="bottom"
              className="w-4 h-4 text-white transition duration-300 cursor-help hover:text-gray-400 hover:scale-110"
            />
            <div
              id="tooltip-issues"
              role="tooltip"
              className="absolute z-10 right-full top-1/2 px-2 py-1 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip border border-slate-100 dark:bg-[#1A1E1F] "
            >
              This pie chart shows the closed issues.
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 justify-left">
          <div className="text-[#F9F9F9] font-bold text-2xl">{String(completedTasks)}</div>
          <div className="text-[#F9F9F9] ">|</div>
          <div className="text-[#F9F9F9] font-bold text-2xl">{String(totalTasks)}</div>
          <p className="text-[#606467] text-xs ml-[10px] items-end">Tasks Done</p>
        </div>
        <div className="flex justify-between pb-2 space-x-3 md:space-x-4">
          <TaskItem icon={faShapes} title="Issues" bgColor="bg-[#fff043cc]" count={String(taskCount)} />
          <TaskItem icon={faSyncAlt} title="In Progress" bgColor="bg-[#ea580ccc]" count={String(inProgressCount)} />
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
