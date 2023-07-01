import Image from "next/image";

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

// Calculate the start and end dates for the progress line
const calculateProgressDates = (repo) => {
  const startDate = new Date(repo.created_at);
  const endDate = new Date(startDate.getTime() + 4 * 7 * 24 * 60 * 60 * 1000); // 4 weeks in milliseconds
  return { startDate, endDate };
};

export default function ProjectCard({ repo, pr }) {
  // Finding the date for the last activity from the pull request
  const lastActivityDate = () => {
    if (repo) {
      const updatedAt = new Date(repo.updated_at);
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

  const trainees = pr.filter((el) => el.total_count !== 0);

  const { startDate, endDate } = calculateProgressDates(repo);

  // Calculate the total number of days
  const totalDays = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24));

  return (
    <div className="flex flex-cols-1 gap-4 max-w-sm bg-[#1A1E1F] rounded-2xl">
      <div className="flex items-start gap-4">
        <div className="flex flex-col justify-between h-80 w-[22rem] bg-[#1A1E1F] rounded-2xl p-6 relative">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-s text-white">Project</h1>
          </div>
          <div className="flex justify-between items-center mt-4">
            {/* <div className="bg-gray-300 h-2 flex-1 mr-2 rounded-full"></div> */}
            <div
              className="bg-yellow-500 h-2 rounded-full relative"
              style={{
                width: `${
                  ((Date.now() - startDate) / (endDate - startDate)) * 100
                }%`,
              }}
            >
              <div className="absolute top-[-18px] text-[#606467] text-xs rounded-full">
                {totalDays} days
              </div>
              <div className="absolute top-0 right-0 w-2 h-2 bg-yellow-500 transform rotate-45 translate-x-1/2"></div>
            </div>
            <div className="bg-gray-300 h-2 flex-1 ml-3 rounded-full"></div>
            <p className="text-[#606467] text-xs items-end pl-3 whitespace-nowrap">
              Team Progress
            </p>
          </div>

          <div className="flex just border rounded-full border-gray-600 p-1">
            {trainees.map((trainee, index) => (
              <Image
                key={trainee.items[0].user.id}
                src={trainee.items[0].user.avatar_url}
                width={40}
                height={40}
                alt={trainee.items[0].user.login}
                className={`w-14 h-14 rounded-full border-2 object-cover
                 ${avatarBorderColor(index)}
                }`}
                style={{
                  zIndex: index + 1,
                  position: "relative",
                  left: `${index * -5}%`,
                }}
              />
            ))}
          </div>

          <div className="flex justify-left items-center pb-1">
            <div className="text-[#F9F9F9] font-bold text-2xl">
              {lastActivityDate()}
            </div>
            <p className="text-[#606467] text-xs pl-4 items-end ">
              Last Activity
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
