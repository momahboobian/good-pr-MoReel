import GroupsPage from "@components/GroupsPage/GroupsPage";

export default function Cohort({ params }) {
  const { cohort } = params;
  return <GroupsPage cohort={cohort} />;
}
