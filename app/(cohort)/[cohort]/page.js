import GroupsPage from "@components/GroupsPage/GroupsPage";

export default async function Cohort(props) {
  const params = await props.params;
  const { cohort } = params;
  return <GroupsPage cohort={cohort} />;
}
