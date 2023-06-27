import React from "react";
import groupsData from "groups.json";

const GroupsPageCards = () => {
  const getRandomAvatar = (collaborators) => {
    const randomIndex = Math.floor(Math.random() * collaborators.length);
    return collaborators[randomIndex].avatar_url;
  };

  return (
    <div className="flex flex-wrap">
      {groupsData.groups.map((group) => (
        <div key={group.id} className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <img
              src={getRandomAvatar(group.collaborators)}
              alt="Group Avatar"
              className="w-16 h-16 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-center">
              {group.groupName}
            </h3>
            <p className="text-sm text-gray-500 text-center mb-2">
              Last update: {group.updatedDate}
            </p>
            <p className="text-sm text-gray-500 text-center">
              Pull requests: {group.pullRequests}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GroupsPageCards;
