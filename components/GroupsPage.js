import React from "react";
import groupsData from "groups.json";
import TeamCard from "./TeamCard";

export default function GroupsPage() {
  const getRandomAvatar = (collaborators) => {
    const randomIndex = Math.floor(Math.random() * collaborators.length);
    return collaborators[randomIndex].avatar_url;
  };

  return (
    <div className="flex flex-row flex-wrap gap-4   w-full items-center justify-around">
      {groupsData.groups.map((group) => (
        <div key={group.id}>
          <TeamCard group={group} getRandomAvatar={getRandomAvatar} />
        </div>
      ))}
    </div>
  );
}
