"use client";

import { useEffect, useState } from "react";
import TeamCard from "@components/TeamCard";
import Loading from "@components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function GroupsPage() {
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  return isLoading ? (
    <Loading />
  ) : (
    <div className="flex flex-col pt-24 sm:pt-0 justify-start w-full h-full ">
      <div className="flex justify-between items-center md:pt-6 px-6">
        <div className="flex flex-col justify-between py-2 gap-4">
          <div className="flex items-center">
            <FontAwesomeIcon
              icon={faGithub}
              className="text-[#37BCBA] w-[20px] mr-1"
            />
            <h1 className="font-semibold text-xl  text-white">
              <span className="mr-1">GOOD</span>
              <span className="text-[#37BCBA]">PR</span>
            </h1>
          </div>
          <p className="font-light text-xs text-gray-500">
            Track teams & members
          </p>
        </div>
      </div>
      <div className="flex flex-wrap w-full items-center justify-between gap-6 p-4 sm:p-6 ">
        {groups.map((group) => (
          <TeamCard key={group.id} group={group} />
        ))}
      </div>
    </div>
  );
}
