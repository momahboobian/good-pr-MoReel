"use client";

import TeamCard from "@components/GroupsPage/Components/TeamCard";
import Loading from "@components/Loading";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

import FilterToggle from "./Components/FillterToggle";

export default function GroupsPage() {
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterActive, setFilterActive] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/repositories");
        const data = await response.json();
        setGroups(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterToggle = () => {
    setFilterActive(!filterActive);
  };

  const filteredGroups = filterActive ? groups.filter((group) => group.statusId === 2) : groups;

  const noTeamsNeedHelp = filteredGroups.length === 0;

  return isLoading ? (
    <Loading />
  ) : (
    <div className="flex flex-col justify-start w-full h-full pt-24 sm:pt-0 ">
      <div className="flex items-center justify-between px-6 md:pt-6">
        <div className="flex flex-col justify-between gap-4 py-2">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faGithub} className="text-[#37BCBA] h-7 mr-2" />
            <h1 className="text-2xl font-semibold text-white">
              <span className="mr-1">GOOD</span>
              <span className="text-[#37BCBA]">PR</span>
            </h1>
          </div>
          <p className="font-light text-gray-500 text-x">Track teams & members</p>
          <FilterToggle filterActive={filterActive} onToggle={handleFilterToggle} />
        </div>
      </div>
      <div className="flex flex-wrap items-center content-start justify-around w-full h-full gap-6 p-4 sm:p-6">
        {noTeamsNeedHelp ? (
          <div className="flex items-center justify-center py-8 text-3xl text-white">
            <span className="mr-2 text-6xl transform -rotate-90">🎉</span>
            All Teams on track
            <span className="ml-2 text-6xl">🎉</span>
          </div>
        ) : (
          filteredGroups.map((group) => <TeamCard key={group.id} group={group} groupStatus={group.statusId} />)
        )}
      </div>
    </div>
  );
}
