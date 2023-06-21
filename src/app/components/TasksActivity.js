import data from "g1-e-commerce.json";
import Image from "next/image";

const TaskActivity = () => {
  const noOfIssues = data.issues.number;

  return (
    <div className="my-12 mr-12 relative h-max overflow-auto">
      <div className="flex flex-row justify-between">
        <h2 className="text-white font-bold">Tasks Activity</h2>
        <span className="text-white font-bold flex flex-row justify-between">
          <button
            type="button"
            class="bg-[#1a1e1f] text-white rounded-l-md border-r border-gray-100 py-2 hover:text-gray-500 duration-150 hover:bg-gray-50 px-3"
          >
            <div class="flex flex-row align-middle">
              <svg
                class="w-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <p class="ml-2 text-[12px]">Prev</p>
            </div>
          </button>
          <button
            type="button"
            class="bg-[#1a1e1f] text-white rounded-r-md py-2 border-l border-gray-200 hover:text-gray-500 duration-150 hover:bg-gray-50  px-3"
          >
            <div class="flex flex-row align-middle">
              <span class="mr-2 text-[12px]">Next</span>
              <svg
                class="w-5 ml-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
          </button>
        </span>
      </div>

      <table className="w-[100%] table-auto text-xs text-left">
        <thead className="text-[#6d7174]  border-b border-[rgba(124,124,123,0.6)] font-medium  ">
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
        <tbody className="text-white divide-y divide-[rgba(124,124,123,0.2)]  ">
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
                      <span className="pl-2 font-medium text-[1.2em]">
                        {assignee.login}
                      </span>
                    </span>
                  ))}
                </td>
                <td className="pr-6 py-4  ">
                  {el.updated_at.slice(0, 16).replace("T", " ")}
                </td>

                <td className="pr-6 py-4 ">{el.title}</td>
                <td className="pr-6 py-4  text-right ">
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
