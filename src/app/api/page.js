"use client";

import ContributorsList from "./components/ContributorsList";

export default function Home() {
  // displaying Contributor and contributor's Avatar
  return (
    <div className="flex flex-col justify-center justify-items-center text-center p-6">
      <h1 className="text-6xl font-bold">This is a test for Json file</h1>
      <ContributorsList />
    </div>
  );
}
