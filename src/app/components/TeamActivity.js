import data from "g1-e-commerce.json";

function getFeatureDistribution(range, portion) {
  // check percentage is in range which is currently generously plus and minus 1 eg: even: 100/4 = 25% max: 100/3 == 33% min: 100/5 == 20% CONSIDER REVISING PLEASE
  const sumRange = range.reduce((sum, value) => 1 * sum + 1 * value);
  const sizeOfTeam = range.length;
  const contribution = Math.round((portion / sumRange) * 100);
  const minimumContribution = 100 / (sizeOfTeam + 1);
  const maximumContribution = 100 / (sizeOfTeam - 1);
  return contribution >= minimumContribution &&
    contribution <= maximumContribution
    ? contribution + "% OK"
    : contribution + "% INTERVENE";
}


export default function TeamActivity() {
  return (
    <div className="grid grid-cols-1 gap-4 max-w-sm bg-[#1A1E1F] p-9 rounded-2xl">
      <div className="flex flex-column justify-between">
        <h2 className="text-[#F9F9F9] font-bold">Team Activity</h2>
      </div>
      <div className="text-white">Lorena:</div>
      
    </div>
  );
}
