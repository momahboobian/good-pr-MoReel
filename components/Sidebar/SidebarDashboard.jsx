import { faHouseUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarDashboard() {
  const pathname = usePathname();

  return (
    <ul className={`flex flex-col md:flex-row xl:flex-col justify-start items-start gap-6 xl:pt-20 whitespace-nowrap`}>
      <li className="flex items-center">
        <Link href="/" className="flex items-center">
          <span className={`${pathname === "/" ? "text-[#37BCBA]" : ""}`}>
            <FontAwesomeIcon icon={faHouseUser} className="w-[15px] mr-3" />
            Teams
          </span>
        </Link>
      </li>
    </ul>
  );
}
