"use client";

import Link from "next/link";
import Image from "next/image";

export default function TeamCard({ group, color }) {
  const lastActivityDate = (repo) => {
    if (repo.updated_at) {
      const updatedAt = new Date(repo.updated_at);
      const options = { day: "numeric", month: "long", year: "numeric" };
      const formattedDate = updatedAt.toLocaleDateString(undefined, options);
      return formattedDate;
    }
    return "";
  };

  return (
    <div className="flex flex-col justify-around p-1 min-w-full sm:min-w-[345px] md:min-w-[370px] lg:min-w-[400px] h-[fit-content] bg-[#1a1e1f] text-white rounded-2xl shadow-[0_0_10px_-5px_white] transition-all duration-300 hover:transform hover:scale-105 hover:shadow-[0_0_15px_-7px_white]">
      <Link
        href={`/dashboard?name=${group.name}&owner=${group.owner}`}
        className="flex flex-col items-center justify-center p-4 bg-[#479e9e] border-2 border-[#070E0E] rounded-t-lg"
      >
        <div className="w-20 h-20 relative border-t-[3px] border-r-[3px] rounded-full">
          <Image
            key={group.id}
            src={`/api/avatars`}
            alt="Avatar"
            layout="responsive"
            width={100}
            height={100}
          />
        </div>
        <div className="text-center text-[18px] text-white">
          {group.team_name}
        </div>
      </Link>
      <div className="flex justify-center items-center flex-1 h-1/3 py-6">
        <div className="flex-1">
          <div className="text-center">{lastActivityDate(group)}</div>
          <div className="text-center text-[14px] text-[#606467] font-light">
            Last Update
          </div>
        </div>
        <div className="flex-1">
          <div className="text-center">
            <p>{group.total_prs}</p>
          </div>
          <div className="text-center text-[14px] text-[#606467] font-light">
            Pull Requests
          </div>
        </div>
      </div>

      <ul className="flex items-center justify-center p-4">
        <li className="">
          <a
            href={`https://github.com/${group.owner}${group.name}`}
            target="_blank"
            className="flex items-center text-sx text-white font-light p-2 border rounded-md hover:text-[#37BCBA] hover:border-[#37BCBA] "
          >
            Repo: {group.name}
          </a>
        </li>
        {/* Other list items */}
      </ul>
    </div>
  );
}
