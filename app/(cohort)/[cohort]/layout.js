import Sidebar from "@components/Sidebar/Sidebar";

export const metadata = {
  title: "The Good PR",
  description:
    "Track your GitHub Pull Requests, projects, tasks, and team activity here",
};

export default function CohortDashboardLayout({ children }) {
  return (
    <main className=" xl:p-2 h-full">
      <div className="flex flex-col xl:flex-row xl:rounded-xl overflow-hidden border-gray-100 h-full">
        <div className="xl:min-w-1/4">
          <Sidebar />
        </div>
        <div className="bg-zinc-900 flex-grow overflow-auto">{children}</div>
      </div>
    </main>
  );
}
