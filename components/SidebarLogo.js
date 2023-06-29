import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
export default function SidebarLogo() {
  return (
    <Link href="/" className="flex items-center">
        <FontAwesomeIcon
          icon={faGithub}
          className="text-[#37BCBA] w-[20px] mr-1"
        />

        <h1 className="font-bold text-xl  text-white">
          <span className="mr-1">GOOD</span>
          <span className="text-[#37BCBA]">PR</span>
        </h1>
    </Link>
  );
}
