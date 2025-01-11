import Dashboard from "@components/Dashboard/Dashboard";

export default function page({ params }) {
  const { id } = params;
  return (
    <div className="flex justify-center items-start bg-[#070E0E] h-full">
      <Dashboard teamId={id} />
    </div>
  );
}
