import data from "g1-e-commerce.json";
import Image from "next/image";

const TaskActivity = () => {
  const noOfTasks = data.open_issues_count;

  return (
    <div className="text-white">
      <h2>Task Activity</h2>
      <table>
        <thead>
          <tr>
            <th>Assigned to</th>
            <th>Created at</th>
            <th>Task</th>
            <th>Status</th>
            <th>Project</th>
          </tr>
        </thead>
        <tbody>
          {data.issues.map((el) =>
            el.assignees.length !== 0 ? ( //this line renders only the tasks that are assigned to someone
              <tr key={el.id}>
                <td>
                  {el.assignees.map((assignee) => (
                    <span>
                      <img
                        src={assignee.avatar_url}
                        width={80}
                        height={80}
                        alt="Picture of the contributor"
                      />
                      {assignee.login}
                    </span>
                  ))}
                </td>
                <td>{el.created_at.slice(0, 10)}</td>
                <td>{el.title}</td>
                <td>{el.state}</td>
                <td>{data.name}</td>
                <td>
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
