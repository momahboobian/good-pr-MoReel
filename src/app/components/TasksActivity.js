import data from "g1-e-commerce.json";
import Image from "next/image";

const TaskActivity = () => {
  return (
    <div className="my-12 mr-12 relative h-[350px] w-full min-w-fit overflow-auto">
      <div className="text-[#F9F9F9] font-bold">Task Activity</div>
      <div className="table-responsive">
        <table className="table-auto text-xs text-left">
          <thead className="text-[#6d7174] border-b border-[rgba(124,124,123,0.6)] font-medium sticky top-0 bg-[#070E0E]">
            <tr>
              <th className="py-6 pr-4 pl-0 font-medium text-[1.2em]">
                Assigned to
              </th>
              <th className="py-6 pr-4 font-medium text-[1.2em]">
                Last Update at
              </th>
              <th className="py-6 pr-4 font-medium text-[1.2em]">Task</th>
              <th className="py-[2%] pr-[2%] font-medium text-right text-[1.2em]">
                Status
              </th>
              <th className="py-6 pr-4 font-medium text-[1.2em]">Project</th>
              <th className="py-6 pr-4 font-medium text-[1.2em]"></th>
            </tr>
          </thead>

          <tbody className="text-white divide-y divide-[rgba(124,124,123,0.2)]">
            {data.issues.map((el, idx) =>
              el.assignees.length !== 0 ? (
                <tr key={idx}>
                  <td className="pr-6 py-4">
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
                        <span className="pl-2 font-medium text-[1.2em]">
                          {assignee.login}
                        </span>
                      </span>
                    ))}
                  </td>
                  <td className="pr-6 py-4">
                    {el.updated_at.slice(0, 16).replace("T", " ")}
                  </td>
                  <td className="pr-6 py-4">{el.title}</td>
                  <td className="pr-6 py-4 text-right">
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
                  <td className="pr-6 py-4">{data.name}</td>
                  <td className="text-right">
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
  );
};

export default TaskActivity;
