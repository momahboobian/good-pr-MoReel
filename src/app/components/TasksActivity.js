import data from "g1-e-commerce.json";
import Image from "next/image";

const TaskActivity = () => {
  return (
    <div className="w-full p-6">
      <div className=" flex text-white font-bold mt-4 pt-4 p-2">Task Activity</div>

      <div
        className=" flex first-letter:my-2 relative h-[350px]"
      >
        x{" "}
        <div className="table-responsive w-full">
          <table className="table-auto text-xs text-left w-full">
            <thead className="text-[#6d7174] border-b border-[rgba(124,124,123,0.6)] font-medium sticky top-0 bg-[#070E0E]">
              <tr>
                <th className="w-24 p-3 pl-0 font-medium text-[1.2em]">
                  Assigned to
                </th>
                <th className="w-24 p-3 font-medium text-[1.2em]">
                  Last Update at
                </th>
                <th className="w-32 p-3 font-medium text-[1.2em]">Task</th>
                <th className="w-24 p-6 font-medium text-right text-[1.2em]">
                  Status
                </th>
                <th className="w-24 p-3 font-medium text-[1.2em]">Project</th>
                <th className="w-24 p-3 font-medium text-[1.2em]"></th>
              </tr>
            </thead>

            <tbody className="text-white divide-y divide-[rgba(124,124,123,0.2)] ">
              {data.issues.map((el, idx) =>
                el.assignees.length !== 0 ? (
                  <tr key={idx}>
                    <td className="pr-6 py-4 min-w-max whitespace-nowrap">
                      {el.assignees.map((assignee) => (
                        <span
                          key={assignee.id}
                          className="flex flex-row items-center"
                        >
                          <Image
                            src={assignee.avatar_url}
                            width={40}
                            height={40}
                            alt="Picture of the contributor"
                            className={`rounded-[50%] p-[1%] ${
                              el.state === "open"
                                ? "bg-[#bc8d5e]"
                                : "bg-[#b9c170]"
                            }`}
                          />
                          <span className="pl-2 font-medium text-[1.2em] min-w-max">
                            {assignee.login}
                          </span>
                        </span>
                      ))}
                    </td>
                    <td className="pr-6 py-4 min-w-max whitespace-nowrap">
                      {el.updated_at.slice(0, 16).replace("T", " ")}
                    </td>
                    <td className="pr-6 py-4 min-w-max whitespace-nowrap">
                      {el.title}
                    </td>
                    <td className="pr-6 py-4 text-right min-w-max whitespace-nowrap">
                      <span
                        className={`px-6 py-3 rounded-full font-semibold text-xs ${
                          el.state === "open"
                            ? "text-[#bc8d5e] bg-[#282e16]"
                            : "text-[#b9c170] bg-[#122a29]"
                        }`}
                      >
                        {el.state === "open" ? "In progress" : "Done"}
                      </span>
                    </td>
                    <td className="pr-6 py-4 min-w-max whitespace-nowrap">
                      {data.name}
                    </td>
                    <td className="text-right min-w-max whitespace-nowrap ">
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
};

export default TaskActivity;
