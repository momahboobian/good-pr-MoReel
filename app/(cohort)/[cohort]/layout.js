import Sidebar from "@components/Sidebar/Sidebar";

export const metadata = {
  title: "The Good PR",
  description:
    "Track your GitHub Pull Requests, projects, tasks, and team activity here",
};

export default function CohortDashboardLayout({ children }) {
  return (
    <main className="lg:bg-zinc-900 xl:p-2">
      <div className="flex flex-col xl:flex-row xl:rounded-xl overflow-hidden xl:overflow-x-auto border-gray-950 ">
        <div className="xl:min-w-1/4">
          <Sidebar />
        </div>
        <div className="bg-zinc-900 flex-grow overflow-auto">{children}</div>
      </div>
    </main>
  );
}
