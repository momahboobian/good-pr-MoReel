import data from "g1-e-commerce.json";
import Image from "next/image";

const TaskActivity = () => {
  return (
    <div className="mt-12 relative h-max overflow-auto">
      <table className="w-[80%] table-auto text-xs text-left">
        <thead className="text-[#6d7174]  border-b font-medium  ">
          <tr>
            <th className="py-6 pr-4 pl-0 font-medium">Assigned to</th>
            <th className="py-6 pr-4 font-medium">Last Update at</th>
            <th className="py-6 pr-4 font-medium ">Task</th>
            <th className="py-[2%] pr-[2%] font-medium text-right">Status</th>
            <th className="py-6 pr-4 font-medium">Project</th>
            <th className="py-6 pr-4 font-medium"></th>
          </tr>
        </thead>
        <tbody className="text-white divide-y divide-[#6d7174]  ">
          {data.issues.map((el, idx) =>
            el.assignees.length !== 0 ? (
              <tr key={idx}>
                <td className="pr-6 py-4 ">
                  {el.assignees.map((assignee) => (
                    // eslint-disable-next-line react/jsx-key
                    <span className="flex flex-row items-center ">
                      <img
                        src={assignee.avatar_url}
                        width={40}
                        height={40}
                        alt="Picture of the contributor"
                        className={`rounded-[50%] p-[1%]  ${
                          el.state === "open" ? "bg-[#bc8d5e]" : "bg-[#b9c170]"
                        }`}
                      />
                      <span className="pl-2">{assignee.login}</span>
                    </span>
                  ))}
                </td>
                <td className="pr-6 py-4 ">
                  {el.updated_at.slice(0, 16).replace("T", " ")}
                </td>

                <td className="pr-6 py-4 ">{el.title}</td>
                <td className="pr-6 py-4  text-right">
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
                <td className="pr-6 py-4 ">{data.name}</td>
                <td className="text-right ">
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
  );
};

export default TaskActivity;
