"use client";

import OverallInfoCard from "@components/OverallInfoCard";
import ProjectCard from "@components/ProjectCard";
import TeamActivityPie from "@components/TaskActivityPie";
import TaskActivity from "@components/TasksActivity";
import React, { useEffect, useState } from "react";

const TeamOverview = () => {
  const [repo, setRepo] = useState({});
  const [assignees, setAssignees] = useState([]);
  const [issuesClosed, setIssuesClosed] = useState([]);
  const [issuesOpen, setIssuesOpen] = useState([]);
  const [contributors, setContributors] = useState([]);
  const [languages, setLanguages] = useState({});
  const [pr, setPR] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/gitHubAPI");
      const data = await response.json();
      setRepo(data[0]);
      setAssignees(data[1]);
      setIssuesClosed(data[2]);
      setIssuesOpen(data[3]);
      setContributors(data[4]);
      setLanguages(data[5]);
      setPR(data[6]);
    };

    fetchData();
  }, []);

  // console.log("repo", repo);
  // console.log("assignees", assignees);
  // console.log("issues", issues);
  // console.log("contributors", contributors);
  // console.log("languages", languages);
  // console.log("pr", pr);

  return (
    <div className=" p-6">
      {/* Content for the right div */}
      <h1 className="font-bold text-white p-4 ">Team Overview</h1>
      <p className="font-light	text-xs	text-gray-600	pt-1 p-4 ">
        Track you projects, tasks & team activity here
      </p>
      <div className=" flex flex-nowrap justify-between mt-4 gap-4 p-6 ">
        <ProjectCard assignees={assignees} repo={repo} />
        <TeamActivityPie assignees={assignees} pr={pr} />
        <OverallInfoCard issuesClosed={issuesClosed} issuesOpen={issuesOpen} />
      </div>
      <TaskActivity issuesClosed={issuesClosed} issuesOpen={issuesOpen} />
    </div>
  );
};

export default TeamOverview;
