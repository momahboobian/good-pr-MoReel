import Image from "next/image";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

// Color for the avatar border based on the index
const avatarBorderColor = (index) => {
  const colors = [
    "border-yellow-200",
    "border-orange-600",
    "border-cyan-700",
    "border-violet-600",
    "border-yellow-700",
  ];
  const colorIndex = index % colors.length;
  return colors[colorIndex];
};

// Calculate the start and Current dates for the progress line
const calculateProgressDates = (repo) => {
  const currentDate = new Date();
  const startDate = new Date(repo.created_at);
  return { startDate, currentDate };
};

export default function ProjectCard({ repo, pr }) {
  // Enable tooltips feature on component mount
  useEffect(() => {
    import("@components/Tooltips").then((module) => {
      const handleTooltips = module.handleTooltips;
      handleTooltips();
    });
  }, []);

  // Finding the date for the last activity from the pull request
  const lastActivityDate = () => {
    if (repo) {
      const updatedAt = new Date(repo.pushed_at);
      const options = { day: "numeric", month: "long", year: "numeric" };
      const formattedDate = updatedAt.toLocaleDateString(undefined, options);

      // Split the date into day, month, and year
      const [day, month, year] = formattedDate.split(" ");
      return (
        <div className="text-[#F9F9F9] font-bold text-2xl space-x-1">
          <span>{day}</span>
          <span className="text-base">{month}</span>
          <span>{year}</span>
        </div>
      );
    }
  };

  const trainees = (pr && pr.filter((el) => el.total_count !== 0)) || [];

  const { startDate, currentDate } = calculateProgressDates(repo);

  // Calculate the total number of days
  const totalDays = Math.round(
    (currentDate - startDate) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="bg-[#1A1E1F] rounded-2xl w-full min-w-min">
      <div className="flex flex-col justify-between max-w-xs mx-auto md:max-w-md lg:max-w-lg p-6 space-y-12 w-full">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="font-bold text-s text-white">Project</h1>
            <div className="relative ml-2">
              <FontAwesomeIcon
                icon={faInfoCircle}
                data-tooltip-target="tooltip-project"
                data-tooltip-placement="bottom"
                className="w-4 h-4 cursor-help text-white hover:text-gray-400 transition duration-300 hover:scale-110"
              />
              <div
                id="tooltip-project"
                role="tooltip"
                className="absolute z-10 right-full top-1/2 px-2 py-1 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip border border-slate-100 dark:bg-[#1A1E1F] "
              >
                This card contains; The arrow diagram to represent the final
                project timeline. Collaborators GitHub profile's picture. The
                last pull request of the team.
                <div className="tooltip-arrow" data-popper-arrow></div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center mt-4 min-w-[280px]">
          <div
            className="bg-yellow-500 h-3 rounded-l-full flex-grow-1 relative"
            style={{
              width: `${((totalDays / 28) * 100).toFixed(2)}%`,
            }}
          >
            <div className="absolute top-[0] -right-2 w-3 h-3 bg-[#1A1E1F] transform rotate-45 translate-x-1/2"></div>
            <div className="absolute top-[0] right-0 w-3 h-3 bg-yellow-500 transform rotate-45 translate-x-1/2"></div>
            <p className="absolute -top-5 text-[#606467] text-xs rounded-full">
              {totalDays} days
            </p>
            <p className="absolute top-4 text-[#606467] text-xs whitespace-nowrap">
              Team Progress
            </p>
          </div>

          <div className="bg-gray-300 h-4 flex-grow ml-2 rounded-r-full"></div>
        </div>

        <div className="flex border rounded-full border-gray-600 p-1">
          {trainees.map((trainee, index) => (
            <div key={trainee.items[0].user.id} className="group relative">
              {/* Element with tooltip */}
              <div
                className={`w-14 h-14 rounded-full border-2 overflow-hidden ${
                  index !== 0 ? "ml-[-20%]" : ""
                }`}
              >
                <Image
                  src={trainee.items[0].user.avatar_url}
                  width={40}
                  height={40}
                  alt={trainee.items[0].user.login}
                  className="object-cover"
                />
              </div>
              {/* Tooltip */}
              <div className="invisible absolute bg-gray-200 text-gray-800 p-2 rounded-md shadow group-hover:visible">
                {trainee.items[0].user.login}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-left items-center">
          <div className="text-[#F9F9F9] font-bold text-2xl">
            {lastActivityDate()}
          </div>
          <p className="text-[#606467] text-xs pl-4 items-end  whitespace-nowrap">
            Last Activity
          </p>
        </div>
      </div>
    </div>
  );
}
