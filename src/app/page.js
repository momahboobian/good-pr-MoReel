import TeamOverviewHeader from "./components/TeamOverviewHeader";

export default function Home() {
  return (
    <main className="flex min-h-screen justify-between">
      <div className="flex border-neutral-800  overflow-hidden">
        {/* Content for the sidebar */}
        
        
        <div className="flex-1 w-screen bg-[#070E0E] p-6">
          <TeamOverviewHeader />
        </div>
      </div>
    </main>
  );
}
