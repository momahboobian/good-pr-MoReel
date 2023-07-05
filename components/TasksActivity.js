import Image from "next/image";

// Color for the avatar border based on the assignee's ID
const avatarBorderColor = (assigneeId) => {
  const colors = [
    "border-yellow-200",
    "border-orange-600",
    "border-cyan-700",
    "border-violet-600",
    "border-yellow-700",
  ];
  const colorIndex = assigneeId % colors.length;
  return colors[colorIndex];
};

export default function TaskActivity({ issuesClosed, issuesOpen, repo }) {
  const issues = [...issuesClosed, ...issuesOpen].sort(
    (a, b) => b.created_at - a.created_at
  );

  return (
    <div className="p-6">
      <div className="flex text-white font-bold py-4">Task Activity</div>
      <div className="flex justify-center relative h-[450px] lg:h-80 overflow-auto">
        <div className="w-full">
          <table className="table-auto text-white text-xs text-left w-full">
            <thead
              className="sticky top-0 bg-[#070E0E]"
              style={{ height: "40px" }}
            >
              <div className="bg-gray-600 h-[1px] w-full absolute top-10 "></div>

              <tr>
                <th className="text-sm font-normal">Assigned to</th>
                <th className="text-sm font-normal">Last Update at</th>
                <th className="text-sm font-normal">Task</th>
                <th className="text-sm font-normal">Status</th>
                <th className="text-sm font-normal">Project</th>
                <th className="text-sm font-normal"></th>
              </tr>
            </thead>
            <tbody className="py-4 text-white divide-y divide-gray-900">
              {issues.map((el, idx) =>
                el.assignees.length !== 0 ? (
                  <tr key={idx}>
                    <td className="py-4 min-w-[170px] whitespace-nowrap">
                      <span className="flex flex-row items-center">
                        <Image
                          src={el.assignees[0].avatar_url}
                          width={40}
                          height={40}
                          className={`w-10 h-10 rounded-full border-2 object-cover ${avatarBorderColor(
                            idx
                          )}`}
                        />
                        <span className="pl-2 font-medium text-[1.2em] min-w-max">
                          {el.assignees[0].login}
                        </span>
                      </span>
                    </td>
                    <td className="pr-4 py-4 max-w-min whitespace-nowrap">
                      {el.updated_at.slice(0, 16).replace("T", " ")}
                    </td>
                    <td className="pr-6 py-4 max-w-[220px] whitespace-nowrap overflow-hidden">
                      {el.title}
                    </td>
                    <td className="pr-4 min-w-max whitespace-nowrap">
                      <span
                        className={`px-4 py-3 rounded-full font-semibold text-xs ${
                          el.state === "open"
                            ? "text-[#bc8d5e] bg-[#282e16]"
                            : "text-[#b9c170] bg-[#122a29]"
                        }`}
                      >
                        {el.state === "open" ? "In progress" : "Done"}
                      </span>
                    </td>
                    <td className="pr-4 py-4 min-w-full whitespace-nowrap">
                      {repo.name}
                    </td>
                    <td className="text-right min-w-max whitespace-nowrap">
                      <a
                        href={el.html_url}
                        className="py-3 px-6 text-[#696d6f] bg-[#1a1e1f] border-none hover:text-gray-500 duration-150 hover:bg-gray-50 border rounded-lg"
                      >
                        See Details
                      </a>
                    </td>
                  </tr>
                ) : null
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
