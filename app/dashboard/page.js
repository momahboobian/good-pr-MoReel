import Sidebar from "@components/Sidebar";
import TeamOverviewHeader from "@components/TeamOverviewHeader";

export default function Home() {
  return (
    <main className="flex justify-center min-h-screen md:p-5">
      <div className="flex border-neutral-800 overflow-hidden rounded-lg">
        <Sidebar />
        <div className="flex-1 w-screen bg-[#070E0E]">
          <TeamOverviewHeader />
        </div>
      </div>
    </main>
  );
}
