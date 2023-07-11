"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareArrowUpRight,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function SidebarTeams() {
  const [groups, setGroups] = useState([]);
  const pathname = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/repositories");
        const data = await response.json();
        setGroups(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
      }
    };

    fetchData();
  }, []);

  return (
    <ul className="flex flex-col items-start gap-6 pt-40">
      <li className="flex items-center ml-3 text-sm text-[#717578]active:text-cyan-600">
        <span
          className={`${pathname === "#" ? "text-cyan-600" : "text-[#717578]"}`}
        >
          TEAMS
        </span>
      </li>
      {groups.map((group) => (
        <Link key={group.id} href={`/dashboard?id=${group.id}`}>
          <li className="flex items-center text-xs active:text-cyan-600">
            <span
              className={`${pathname === "#" ? "text-cyan-600" : "text-white"}`}
            >
              <FontAwesomeIcon
                icon={faSquareArrowUpRight}
                className="w-[15px] mr-3 text-[#8F46EA]"
              />
              {group.name}
            </span>
          </li>
        </Link>
      ))}
    </ul>
  );
}
