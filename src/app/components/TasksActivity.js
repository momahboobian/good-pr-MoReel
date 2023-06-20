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
          {data.issues.map((el) => (
            <tr>
              <td>
                <img
                  src={el.user.avatar_url}
                  width={80}
                  height={80}
                  alt="Picture of the contributor"
                />
              </td>
              <td>{el.user.login}</td>
              <td>{el.title}</td>
              <td>{el.state}</td>
              <td>{data.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskActivity;
