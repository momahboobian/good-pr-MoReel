import { faCircle, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SidebarDarkMode() {
<<<<<<< HEAD
  return (
    <div className="flex flex-row gap-1 pt-32">
      <div className="flex text-xs active:text-cyan-600">Light</div>
      <div className="flex flex-row gap-1 bg-[#2A3131] rounded-sm ">
        <span className="flex">
          <FontAwesomeIcon icon={faSun} className="w-[12px] text-[#D9D9D9]" />
        </span>
        <span className="flex">
          <FontAwesomeIcon icon={faCircle} className="w-[16px] text-[#37BCBA]" />
        </span>
      </div>
=======
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
>>>>>>> 60d7b2c6e096f957bb81572040c1c39291ead2f0

			<div className="flex text-xs active:text-cyan-600">Dark</div>
		</div>
	);
}
