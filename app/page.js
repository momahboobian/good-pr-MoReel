import GroupsPage from "@components/GroupsPage";

export default function Home() {
  return (
    <main className="flex min-h-screen justify-between p-0 text-[white] ">
      <div className="flex border-neutral-800 overflow-hidden rounded-lg">
        <div className="flex-1 w-[100%] bg-[#070e0e] pl-[5%] pr-[5%]">
          

          <div className="">
            <GroupsPage />
          </div>
        </div>
      </div>
    </main>
  );
}
