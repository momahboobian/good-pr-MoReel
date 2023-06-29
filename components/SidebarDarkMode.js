import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faSun } from "@fortawesome/free-solid-svg-icons";

export default function SidebarDarkMode() {
  return (
    <div className="flex flex-row gap-1 pt-32">
      <div className="flex text-xs active:text-cyan-600">Light</div>
      <div className="flex flex-row gap-1 bg-[#2A3131] rounded-sm ">
        <span className="flex">
          <FontAwesomeIcon icon={faSun} className="w-[12px] text-[#D9D9D9]" />
        </span>
        <span className="flex">
          <FontAwesomeIcon
            icon={faCircle}
            className="w-[16px] text-[#37BCBA]"
          />
        </span>
      </div>

      <div className="flex text-xs active:text-cyan-600">Dark</div>
    </div>
  );
}
