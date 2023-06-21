import Sidebar from "./api/components/Sidebar";
import TeamOverviewHeader from "./components/TeamOverviewHeader";

export default function Home() {
  return (
    <main className="flex min-h-screen justify-between p-6">
      <div className="flex border-neutral-800 rounded-3xl overflow-hidden">
        <Sidebar />
        <div className="flex-1 w-screen bg-[#070E0E] p-6">
          <TeamOverviewHeader />
        </div>
      </div>
    </main>
  );
}
