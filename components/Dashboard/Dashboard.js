'use client'

import React, { useEffect, useState, useRef } from 'react'
import ProjectCard from '@components/Dashboard/Components/ProjectCard'
import ShareButton from '@components/Dashboard/Components/ShareButton'
import IssuesActivityCard from '@components/Dashboard/Components/IssuesActivityCard'
import TeamActivityPie from '@components/Dashboard/Components/TeamActivityPie'
import TasksActivity from '@components/Dashboard/Components/TasksActivity'
import Loading from '@components/Loading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSitemap } from '@fortawesome/free-solid-svg-icons'

export default function Dashboard({ teamId }) {
  const [groups, setGroups] = useState([])

  const [repo, setRepo] = useState({})
  const [issuesClosed, setIssuesClosed] = useState([])
  const [allIssues, setAllIssues] = useState([])
  const [pr, setPR] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const containerRef = useRef(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const res = await fetch('/api/repositories')
      const db = await res.json()
      const filterGroup = db.find(el => el.id === Number(teamId))

      const owner = filterGroup.repo_owner
      const repository = filterGroup.repo_name
      const groupName = filterGroup.team_name

      setGroups(groupName)
      try {
        const response = await fetch('/api/gitHubAPI', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ owner, repository }),
        })
        const data = await response.json()
        setRepo(data[0])
        setIssuesClosed(data[2])
        setAllIssues(data[1])
        setPR(data[3])
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])


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
          <p className="font-light text-gray-500 text-x">
            Track your projects, tasks & team activity here
          </p>
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
  )
}
