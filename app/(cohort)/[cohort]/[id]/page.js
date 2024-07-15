import Dashboard from "@components/Dashboard/Dashboard";

export default function page({ params }) {
  const { id } = params;
  return <Dashboard teamId={id} />;
}
