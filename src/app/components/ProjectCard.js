import data from "g1-e-commerce.json";
import Image from "next/image";

const avatarBoarder = (state) => {
  if (state === "open") {
    return "border-yellow-200";
  } else if (state === "closed") {
    return "border-orange-600";
  } else if (state === "close") {
    return "border-cyan-700";
  } else if (state === "d") {
    return "border-violet-600	";
  }
};

const ProjectCard = () => {
  return (
    <div className="flex flex-col gap-6 pt-10 pr-10">
      {/* <div className="flex items-center justify-between">*/}
      <div className="flex items-center gap-4">
        <div className="flex flex-col justify-between h-80 w-72 bg-[#1A1E1F] rounded-2xl p-9 ">
          <h1 className="font-bold text-s text-white">Project</h1>
          <div className="border-2 border-[#37BCBA] rounded-lg">
            <div className="relative">
              {data.assignees.map((assignee, index) => (
                <img
                  key={assignee.id}
                  src={assignee.avatar_url}
                  alt={assignee.login}
                  className={`w-11 h-11 rounded-full border-2 object-cover absolute transform translate-x-1/2 translate-y-1/2`}
                  style={{
                    zIndex: index + 1,
                    marginLeft: `${index * 2}rem`,
                  }}
                />
              ))}
            </div>
          </div>

          <button className="bg-[#37BCBA] text-black rounded-lg p-2 pl-6 pr-6">
            See All Project
          </button>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default ProjectCard;
