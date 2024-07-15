import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareArrowUpRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const getRandomColor = () => {
  const colors = [
    "text-red-400",
    "text-yellow-400",
    "text-green-400",
    "text-blue-400",
    "text-indigo-400",
    "text-purple-400",
    "text-pink-400",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export default function SidebarTeams() {
  const [groups, setGroups] = useState([]);
  const pathname = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/repositories");
        const data = await response.json();

        const urlPath = pathname.split("/");
        const teamIdFromUrl = urlPath[urlPath.length - 1];

        if (!isNaN(teamIdFromUrl)) {
          const teamInUrl = data.find(
            (team) => team.id === Number(teamIdFromUrl)
          );

          const cohortName = teamInUrl.cohort;
          const filteredTeam = data.filter(
            (team) => team.cohort === cohortName
          );
          setGroups(filteredTeam);
        } else {
          setGroups([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [pathname]);

  return (
    <div className="flex flex-col sm:hidden xl:flex justify-start gap-4 pt-10 p-2">
      <div className="bg-gray-700 h-[1px] w-full opacity-10"></div>

      <p className="text-[#606467] text-xs items-end">GROUPS</p>
      <ul className="flex flex-col items-start max-w-sm text-clip overflow-hidden whitespace-nowrap gap-6 pt-15 ">
        {groups.map((group) => (
          <li
            className="flex items-center text-xs text-clip overflow-hidden whitespace-nowrap cursor-pointer"
            key={group.id}
          >
            <Link
              href={{ pathname: `/${group.cohort.toLowerCase()}/${group.id}` }}
            >
              <span
                className={`${
                  pathname.asPath === `/${group.cohort}/${group.id}`
                    ? "text-cyan-600"
                    : "text-white"
                }  hover:text-[#1a9997]`}
              >
                <FontAwesomeIcon
                  icon={faSquareArrowUpRight}
                  className={`w-[15px] mr-3 ${getRandomColor()} hover:text-[#1a9997]`}
                />
                {group.team_name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
