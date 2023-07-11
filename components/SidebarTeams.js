import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareArrowUpRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function SidebarTeams() {
  const [groups, setGroups] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/repositories");
        const data = await response.json();
        setGroups(data);
      } 
      catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ul className="flex flex-col items-start gap-6 pt-15">
      {/* <li className="flex items-center ml-3 text-sm text-[#717578] active:text-cyan-600">
        <span
          className={`${
            router.asPath === "#" ? "text-cyan-600" : "text-[#717578]"
          }`}
        >
          TEAMS
        </span>
      </li> */}

      {groups.map((group) => (
        <li className="flex items-center text-xs active:text-cyan-600 cursor-pointer">
          <Link
            href={{ pathname: "/dashboard", query: { id: `${group.id}` } }}
            key={group.id}
            onClick={() => {
              router.push({ pathname: "/dashboard", query: { id: group.id } });
            }}
          >
            <span
              className={`${
                router.asPath === "/dashboard?id=${group.id}"
                  ? "text-cyan-600"
                  : "text-white"
              }`}
            >
              <FontAwesomeIcon
                icon={faSquareArrowUpRight}
                className="w-[15px] mr-3 text-[#8F46EA]"
              />
              {group.name}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
