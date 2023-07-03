"use client";
import React, { useEffect, useState } from "react";
// import groupsData from "groups.json";
import TeamCard from "./TeamCard";

export default function GroupsPage() {
  const [groups, setGroups] = useState([]);

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
    <div className="flex flex-row flex-wrap gap-4   w-full items-center justify-around">
      {groups.map((group) => (
        <div key={group.id}>
          <TeamCard group={group} />
        </div>
      ))}
    </div>
  );
}
