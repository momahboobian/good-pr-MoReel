import { faSquareArrowUpRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/repositories");
        const data = await response.json();
        setGroups(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col justify-start gap-4 p-2 pt-10 sm:hidden xl:flex">
      <div className="bg-gray-700 h-[1px] w-full opacity-10"></div>

      <p className="text-[#606467] text-xs items-end">GROUPS</p>
      <ul className="flex flex-col items-start max-w-sm gap-6 overflow-hidden text-clip whitespace-nowrap pt-15 ">
        {groups.slice(0, 10).map((group) => (
          <li
            className="flex items-center overflow-hidden text-xs cursor-pointer text-clip whitespace-nowrap"
            key={group.id}
          >
            <Link
              href={{ pathname: "/dashboard", query: { id: `${group.id}` } }}
              onClick={() => {
                router.push({
                  pathname: "/dashboard",
                  query: { id: group.id },
                });
              }}
            >
              <span
                className={`${
                  router.asPath === `/dashboard?id=${group.id}` ? "text-cyan-600" : "text-white"
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
