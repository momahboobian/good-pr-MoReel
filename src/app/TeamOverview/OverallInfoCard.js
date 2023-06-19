
import { FaShapes } from "react-icons/fa";
import { IoSync } from "react-icons/io5";


export default function OverallInfoCard() {
  return (
    <div className="grid grid-cols-1 gap-4 max-w-xs bg-[#111827]">
      <div className="flex flex-column justify-between">
        <h2 className="text-[#F9F9F9]">Overall Information</h2>
        <button className="bg-[#111827] text-[#F9F9F9]">...</button>
      </div>
      <div className="flex flex-column justify-left gap-1 ">
        <div className="text-[#F9F9F9] font-bold">67</div>
        <div className="text-[#F9F9F9] ">|</div>
        <div className="text-[#F9F9F9] font-bold">105</div>
        <p className="text-[#606467]">Tasks Done</p>
      </div>
      <div className="flex flex-column justify-between ">
        <div className="bg-[#E2E949]">
          <FaShapes />
          <div>28</div>
          <p>Issues</p>
        </div>
        <div className="bg-[#36BCBA]">
          <IoSync />
          <div>17</div>
          <p>In progress</p>
        </div>
        <div className="bg-[#F55706]">
          
          <div>11</div>
          <p>Completed</p>
        </div>
      </div>
    </div>
  );
}
