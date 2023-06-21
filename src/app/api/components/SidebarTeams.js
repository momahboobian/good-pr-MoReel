import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareArrowUpRight,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";

const SidebarTeams = () => {
  return (
    <ul className="flex flex-col items-start gap-6 pt-10">
      <li className="flex items-center ml-3 text-sm text-[#717578]">TEAMS</li>
      <li className="flex items-center text-xs">
        <FontAwesomeIcon
          icon={faSquareArrowUpRight}
          className="w-[15px] mr-3 text-[#8F46EA]"
        />
        Group 2
      </li>
      <li className="flex items-center text-xs">
        <FontAwesomeIcon
          icon={faSquareArrowUpRight}
          className="w-[15px] mr-3 text-[#E3820C]"
        />
        Group 3
      </li>
      <li className="flex items-center text-xs">
        <FontAwesomeIcon
          icon={faSquareArrowUpRight}
          className="w-[15px] mr-3 text-[#E3EA46]"
        />
        Group 4
      </li>
      <li className="flex items-center text-xs">
        <FontAwesomeIcon
          icon={faSquarePlus}
          className="w-[15px] mr-3 text-[#D9D9D9]"
        />
        View all
      </li>
    </ul>
  );
};
export default SidebarTeams;
