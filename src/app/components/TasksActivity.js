import data from "g1-e-commerce.json";
import Image from "next/image";

const TaskActivity = () => {
  const noOfTasks = data.open_issues_count;

  return (
    <div className="text-white">
      <h2>Task Activity</h2>
      <table className="w-[90%] ">
        <thead>
          <tr className="text-[#6d7174]">
            <th className="font-light   text-left p-[1%]">Assigned to</th>
            <th className="font-light  text-left p-[1%]">Created at</th>
            <th className="font-light  text-left p-[1%]">Task</th>
            <th className="font-light  text-right p-[1%]">Status</th>
            <th className="font-light  text-left p-[1%]">Project</th>
          </tr>
        </thead>
        <tbody>
          {data.issues.map((el) =>
            el.assignees.length !== 0 ? ( //this line renders only the tasks that are assigned to someone
              <tr key={el.id}>
                <td className=" text-left ">
                  {el.assignees.map((assignee) => (
                    <span className="flex flex-row items-center ">
                      <img
                        src={assignee.avatar_url}
                        width={60}
                        height={60}
                        alt="Picture of the contributor"
                        className="rounded-[50%] p-[1%] m-[10%] bg-[white]"
                      />
                      <span>{assignee.login}</span>
                    </span>
                  ))}
                </td>

                <td className="text-left p-[1%]">
                  {el.created_at.slice(0, 10)}
                </td>
                <td className="text-left p-[1%]">{el.title}</td>
                <td className="text-right p-[1%]">
                  {el.state === "open" ? "In progress" : "Done"}
                </td>
                <td className="text-left p-[1%]">{data.name}</td>
                <td className="text-left p-[1%]">
                  <a href={el.html_url}>See details</a>{" "}
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
