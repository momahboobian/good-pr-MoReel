import {
  faHouseUser,
  faColumns,
  faListCheck,
  faChartColumn,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function SidebarDashboard() {
  return (
    <ul className="flex flex-col items-start gap-6 pt-14">
      <li className="flex items-center text-sm text-[#37BCBA] active:text-cyan-600">
        <Link  href="/">
          <FontAwesomeIcon icon={faHouseUser} className="w-[15px] mr-3" />
          Home
        </Link>
      </li>
      <li className="flex items-center text-sm active:text-cyan-600">
        <Link className="flex items-center" href="/dashboard">
          <FontAwesomeIcon icon={faColumns} className="w-[15px] mr-3" />
          Dashboard
        </Link>
      </li>
      <li className="flex items-center text-sm active:text-cyan-600">
        <Link className="flex items-center" href="/my-tasks">
          <FontAwesomeIcon icon={faListCheck} className="w-[15px] mr-3" />
          My Tasks
        </Link>
      </li>
      <li className="flex items-center text-sm active:text-cyan-600">
        <Link className="flex items-center" href="/statistics">
          <FontAwesomeIcon icon={faChartColumn} className="w-[15px] mr-3" />
          Statistics
        </Link>
      </li>
    </ul>
  );
}
