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

export default function ProjectCard({ repo, pr }) {
  // finding the date for the last activity from the pull request
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

    return "";
  };

  const trainees = pr.filter((el) => el.total_count !== 0);

  return (
    <div className=" flex flex-cols-1 gap-4 max-w-sm bg-[#1A1E1F] p-0 rounded-2xl">
      <div className="flex items-start gap-4">
        <div className="flex flex-col justify-between h-80 w-[22rem] bg-[#1A1E1F] rounded-2xl p-6 relative">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-s text-white">Project</h1>
          </div>
          <div className="flex items-center justify-between">
            <span className="w-11 h-2 bg-yellow-500 rounded-full"></span>
            <span className="w-11 h-2 bg-yellow-500 rounded-full"></span>
            <span className="w-11 h-2 relative">
              <span className="absolute left-0 top-0 w-1/2 h-full bg-yellow-500 rounded-l-full "></span>
              <span className="absolute right-0 top-0 w-1/2 h-full bg-gray-500 rounded-r-full "></span>
            </span>
            <span className="w-11 h-2 bg-gray-500 rounded-full"></span>
            <p className="text-[#606467] text-xs items-end pl-2 whitespace-nowrap">
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
