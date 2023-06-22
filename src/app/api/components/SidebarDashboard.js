import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseUser,
  faListCheck,
  faChartColumn,
} from "@fortawesome/free-solid-svg-icons";

const SidebarDashboard = () => {
  return (
    <ul className="flex flex-col items-start gap-6 pt-14">
      <li className="flex items-center text-sm text-[#37BCBA]">
        <FontAwesomeIcon icon={faHouseUser} className=" w-[15px] mr-3" />
        Dashboard
      </li>
      <li className="flex items-center text-sm">
        <FontAwesomeIcon icon={faListCheck} className=" w-[15px] mr-3" />
        My Tasks
      </li>
      <li className="flex items-center text-sm">
        <FontAwesomeIcon icon={faChartColumn} className=" w-[15px] mr-3" />
        Statistics
      </li>
    </ul>
  );
};

export default SidebarDashboard;
