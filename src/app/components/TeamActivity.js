import data from "g1-e-commerce.json";

export default function TeamActivity() {
  let totalContributions = 0;
  data.contributors.forEach((contributor) => {
    totalContributions += contributor.contributions;
  });

  function calculatePercentage(user) {
    return Math.round((100 * user.contributions) / totalContributions);
  }

  return (
    <div className="grid grid-cols-1 gap-4 max-w-sm bg-[#1A1E1F] p-9 rounded-2xl">
      <div className="flex flex-column justify-between">
        <h2 className="text-[#F9F9F9] font-bold">Team Activity</h2>
      </div>

      {data.contributors.map((user) => (
        <div key={user.login} className="flex items-center space-x-4">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="w-10 h-10 rounded-full"
          />
          <div className="text-white">
            {user.login}: {calculatePercentage(user)}%
          </div>
        </div>
      ))}
    </div>
  );
}
