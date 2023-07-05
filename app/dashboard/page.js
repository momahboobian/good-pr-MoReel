import Sidebar from "@components/Sidebar";
import TeamOverviewHeader from "@components/TeamOverviewHeader";

export default function Home() {
  return (
    <main className="flex justify-center items-center lg:p-2 lg:bg-zinc-900">
      <div className="flex flex-col xl:flex-row rounded-xl overflow-hidden xl:overflow-x-auto border-gray-950">
        <div>
          <Sidebar />
        </div>
        <div className="flex justify-center items-start bg-[#070E0E] h-full md:w-screen md:p-2">
          <TeamOverviewHeader />
        </div>
      </div>
    </main>
  );
}
