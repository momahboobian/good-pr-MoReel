"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Image } from "next/image";

export default function TeamCard({ group, color }) {
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    fetch("/api/avatars")
      .then((response) => response.json())
      .then((data) => {
        setAvatarUrl(data.url);
      })
      .catch((error) => {
        console.error("Error fetching avatar:", error);
      });
  }, []);

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
    <div className="flex flex-col justify-around h-[350px] w-[400px] max-w-sm bg-[#1a1e1f] text-white rounded-2xl">
      <Link href={`/dashboard?name=${group.name}&owner=${group.owner}`}>
        <div className="flex flex-col items-center justify-center h-2/3 p-2 bg-[#070e0e] rounded-2xl">
          <div
            className="w-20 h-20 relative shadow-[0_0px_30px_-5px_white] rounded-full"
            style={{ backgroundColor: color }}
          >
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt="Avatar"
                layout="fill"
                objectFit="cover"
              />
            ) : null}
          </div>
          <div className="text-center text-[18px] text-white">
            {group.team_name}
          </div>
          <div className="text-center text-white text-[18px] mt-1">
            {group.name}
          </div>
        </div>
      </Link>
      <div className="bg-[#1a1e1f] flex flex-row items-end justify-center flex-1 h-1/3 mb-2 py-[5%]">
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
    </div>
  );
}
