import { FaShapes } from "react-icons/fa";
import { IoSync } from "react-icons/io5";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function OverallInfoCard() {
  return (
    <div className="grid grid-cols-1 gap-4 max-w-sm bg-[#111827] p-9 rounded-2xl">
      <div className="flex flex-column justify-between">
        <h2 className="text-[#F9F9F9] font-bold">Overall Information</h2>
        <button className="bg-[#111827] text-[#F9F9F9]">...</button>
      </div>
      <div className="flex flex-column justify-left gap-1 items-center my-4">
        <div className="text-[#F9F9F9] font-bold text-2xl">67</div>
        <div className="text-[#F9F9F9] ">|</div>
        <div className="text-[#F9F9F9] font-bold text-2xl">105</div>
        <p className="text-[#606467] text-xs ml-[10px] items-end">Tasks Done</p>
      </div>
      <div className="flex flex-column justify-between  mt-2">
        <button className="w-20 bg-[#E2E949] rounded-xl p-3">
          <div className="w-16 ">
            <div className="flex justify-center mt-2">
              <FaShapes />
            </div>
            <p className="font-bold text-lg mt-2">28</p>
            <p className="text-xs mt-2">Tasks</p>
          </div>
        </button>
        <button className="w-20 bg-[#36BCBA] rounded-xl p-3">
          <div className="w-16">
            <div className="flex justify-center mt-2">
              <IoSync />
            </div>
            <p className="font-bold text-lg mt-2">17</p>
            <p className="text-xs mt-2">In progress</p>
          </div>
        </button>
        <button className="w-20 bg-[#F55706] rounded-xl p-3">
          <div className="w-16">
            <div className="flex justify-center mt-2">
              <FaExternalLinkAlt />
            </div>
            <p className="font-bold text-lg mt-2">11</p>
            <p className="text-xs mt-2">Completed</p>
          </div>
        </button>
      </div>
    </div>
  );
}
