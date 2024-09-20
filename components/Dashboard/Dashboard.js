import IssuesActivityCard from "@components/Dashboard/Components/IssuesActivityCard";
import ProjectCard from "@components/Dashboard/Components/ProjectCard";
import ShareButton from "@components/Dashboard/Components/ShareButton";
import TasksActivity from "@components/Dashboard/Components/TasksActivity";
import TeamActivityPie from "@components/Dashboard/Components/TeamActivityPie";
import Loading from "@components/Loading";
import { faSitemap } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState, useRef } from "react";

export default function Dashboard({ id }) {
  const [groups, setGroups] = useState([]);

  const [repo, setRepo] = useState({});
  const [issuesClosed, setIssuesClosed] = useState([]);
  const [allIssues, setAllIssues] = useState([]);
  const [pr, setPR] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const currentUrl = window.location.href;
      const url = new URL(currentUrl);
      const searchParams = new URLSearchParams(url.search);
      const idURL = searchParams.get("id");
      const res = await fetch("/api/repositories");
      const db = await res.json();
      const filterGroup = db.filter((el) => el.id === Number(idURL));
      const owner = filterGroup[0].repo_owner;
      const repository = filterGroup[0].repo_name;
      const groupName = filterGroup[0].team_name;
      setGroups(groupName);
      try {
        const response = await fetch("/api/gitHubAPI", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ owner, repository }),
        });
        const data = await response.json();
        setRepo(data[0]);
        setIssuesClosed(data[2]);
        setAllIssues(data[1]);
        setPR(data[3]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="flex flex-col justify-start w-full h-full p-4 pt-24 overflow-scroll sm:pt-0 sm:h-screen">
      <div className="flex items-center justify-between gap-2 px-6 md:pt-2">
        <div className="flex flex-col items-start justify-between py-2">
          <ul>
            <li className="flex items-center justify-start py-2 text-xl font-semibold text-white">
              Team
              <a
                href={repo.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="flex whitespace-nowrap font-semibold text-xl text-white p-2 hover:text-[#37BCBA]"
                title="Link to deployed webpage"
              >
                {groups}
                <FontAwesomeIcon icon={faSitemap} className="w-8 mr-3" />
              </a>
            </li>
          </ul>
          <p className="font-light text-gray-500 text-x">Track your projects, tasks & team activity here</p>
        </div>
        <ShareButton />
      </div>

      <div className="relative">
        <div
          ref={containerRef}
          className="grid gap-6 p-4 overflow-x-auto sm:flex sm:p-6 lg:gap-10 xl:gap-14 2xl:gap-24 lg:overflow-y-clip"
        >
          <ProjectCard repo={repo} pr={pr} />
          <TeamActivityPie pr={pr} repo={repo} />
          <IssuesActivityCard issuesClosed={issuesClosed} pr={pr} />
        </div>
      </div>
      <div className="flex items-center justify-between min-h-full sm:pb-16">
        <TasksActivity pr={pr} issuesClosed={issuesClosed} allIssues={allIssues} repo={repo} />
      </div>
    </div>
  );
}
