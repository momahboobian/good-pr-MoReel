import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faHouseUser,
	faColumns,
	faListCheck,
	faChartColumn,
} from "@fortawesome/free-solid-svg-icons";

export default function SidebarDashboard() {
	const pathname = usePathname();

	return (
		<ul
			className={`flex flex-col md:flex-row xl:flex-col justify-start items-start gap-6 xl:pt-20 whitespace-nowrap`}
		>
			<li className="flex items-center">
				<Link href="/" className="flex items-center">
					<span className={`${pathname === "/" ? "text-[#37BCBA]" : ""}`}>
						<FontAwesomeIcon icon={faHouseUser} className="w-[15px] mr-3" />
						Teams
					</span>
				</Link>
			</li>
			{/* <li className="flex items-center">
        <Link href="/dashboard" className="flex items-center">
          <span
            className={`${pathname === "/dashboard" ? "text-[#37BCBA]" : ""}`}
          >
            <FontAwesomeIcon icon={faColumns} className="w-[15px] mr-3" />
            Dashboard
          </span>
        </Link>
      </li> */}
			{/* <li className="flex items-center text-sm">
        <Link href="/my-tasks">

          <span
            className={`${pathname === "/my-tasks" ? "text-[#37BCBA]" : ""}`}
          >
            <FontAwesomeIcon icon={faListCheck} className="w-[15px] mr-3" />
            My Tasks
          </span>
        </Link>
      </li>
      <li className="flex items-center text-sm">
        <Link href="/statistics">
          <span
            className={`${pathname === "/statistics" ? "text-[#37BCBA]" : ""}`}
          >
            <FontAwesomeIcon icon={faChartColumn} className="w-[15px] mr-3" />
            Statistics
          </span>
        </Link>
      </li> */}
		</ul>
	);
}
