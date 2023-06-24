import { FaShapes, FaExternalLinkAlt, FaSyncAlt } from "react-icons/fa";
import data from "g1-e-commerce.json";

export default function OverallInfoCard() {
  return (
    <div className="grid grid-cols-1 gap-4 max-w-sm bg-[#1A1E1F] p-9 rounded-2xl">
      <div className="flex flex-column justify-between">
        <h2 className="text-[#F9F9F9] font-bold">Overall Information</h2>
        <button className=" text-gray-500">...</button>
      </div>
      <div className="flex flex-column justify-left gap-1 items-center my-4">
        <div className="text-[#F9F9F9] font-bold text-2xl">
          {" "}
          {String(
            data.issues.filter((issue) => issue.state === "completed").length
          )}
          {/* when the issue.state is not open , it will calculate the number of completed issues. To double check with the real API, so we can know for sure how to track them       */}
        </div>
        <div className="text-[#F9F9F9] ">|</div>
        <div className="text-[#F9F9F9] font-bold text-2xl">
          {String(data.issues[0].number)}
          {/* number of issues in total. double-check accuracy of the code with the real API */}
        </div>
        <p className="text-[#606467] text-xs ml-[10px] items-end">Tasks Done</p>
      </div>
      <div className="flex flex-column justify-between  gap-6 mt-2">
        <button className="w-20 bg-[#E2E949] rounded-xl p-3 flex justify-center items-center">
          <div className="w-16 ">
            <div className="flex justify-center mt-2">
              <FaShapes />
            </div>
            <p className="font-bold text-lg mt-2">
              {" "}
              {String(data.issues[0].number)}
              {/* number of issues in total. To double-check accuracy of the code with the real API */}
            </p>
            <p className="text-xs mt-2 text-black">Tasks</p>
          </div>
        </button>
        <button className="w-20 bg-[#36BCBA] rounded-xl p-3 flex flex-col justify-center items-center">
          <div className="w-16">
            <div className="flex justify-center mt-2">
              <FaSyncAlt />
            </div>
            <p className="font-bold text-lg mt-2">
              {String(
                data.issues.filter((issue) => issue.state == "open")
                  .length
              )}
              {/* number of issues in progress. To double-check accuracy of the status name in the real API */}
            </p>
            <p className="text-xs mt-2 text-black">In progress</p>
          </div>
        </button>
        <button className="w-20 bg-[#F55706] rounded-xl p-3 flex flex-col justify-center items-center">
          <div className="w-16">
            <div className="flex justify-center mt-2">
              <FaExternalLinkAlt />
            </div>
            <p className="font-bold text-lg mt-2">
              {" "}
              {String(
                data.issues.filter((issue) => issue.state === "closed").length
              )}
              {/* number of completed issues. To double-check accuracy of the status name in the real API */}
            </p>
            <p className="text-xs mt-2 text-black">Completed</p>
          </div>
        </button>
      </div>
    </div>
  );
}
