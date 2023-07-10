"use client";

import TeamOverviewHeader from "@components/TeamOverviewHeader";

export default function dashboardId({id,}) {
  return (
    <div className="flex justify-center items-start bg-[#070E0E] h-full md:w-screen">
      <TeamOverviewHeader />
    </div>
  );
}
