import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareArrowUpRight,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarTeams() {
  const pathname = usePathname();

  return (
    <ul className="flex flex-col items-start gap-6 pt-40">
      <li className="flex items-center ml-3 text-sm text-[#717578]active:text-cyan-600">
        <Link href="/">
          <span
            className={`${
              pathname === "/" ? "text-cyan-600" : "text-[#717578]"
            }`}
          >
            TEAMS
          </span>
        </Link>
      </li>
      <li className="flex items-center text-xs active:text-cyan-600">
        <Link href="#">
          <span
            className={`${pathname === "#" ? "text-cyan-600" : "text-white"}`}>
            <FontAwesomeIcon
              icon={faSquareArrowUpRight}
              className="w-[15px] mr-3 text-[#8F46EA]"
            />
            Group 2
          </span>
        </Link>
      </li>
      <li className="flex items-center text-xs active:text-cyan-600">
        <Link href="#">
          <span
            className={`${pathname === "#" ? "text-cyan-600" : "text-white"}`}
          >
            <FontAwesomeIcon
              icon={faSquareArrowUpRight}
              className="w-[15px] mr-3 text-[#E3820C]"
            />
            Group 3
          </span>
        </Link>
      </li>
      <li className="flex items-center text-xs active:text-cyan-600">
               <Link href="#">
          <span
            className={`${pathname === "#" ? "text-cyan-600" : "text-white"}`}
          > 
        <FontAwesomeIcon
          icon={faSquareArrowUpRight}
          className="w-[15px] mr-3 text-[#E3EA46]"
        />
        Group 4
        </span>
        </Link>
      </li>
      <li className="flex items-center text-xs active:text-cyan-600">
        <Link href="#">
          <span
            className={`${pathname === "#" ? "text-cyan-600" : "text-white"}`}
          >
        <FontAwesomeIcon
          icon={faSquarePlus}
          className="w-[15px] mr-3 text-[#D9D9D9]"
        />
        View all
        </span>
        </Link>
      </li>
    </ul>
  );
}
