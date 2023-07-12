import { useState, useEffect } from "react";
export default function TicketStatusCard({ issuesClosed }) {

  const [issues, setIssues] = useState([]);
 

  useEffect(() => {
    fetch("https://api.github.com/repos/nataliiazab/good-pr/issues")
      .then((response) => response.json())
      .then((data) => {
        setIssues(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div className="bg-[#1A1E1F] rounded-2xl w-full min-w-max">
      <div className="flex flex-col justify-between max-w-xs mx-auto md:max-w-md lg:max-w-lg p-6 space-y-12 w-full">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-s text-white">Issues Status</h1>
        </div>
        <div>
          <div className="flex flex-col justify-center items-center  bg-[#fff043cc] text-gray-900 rounded-xl whitespace-nowrap">
            <p className="text-sm md:text-sm font-normal">Overall issues:</p>
            <p className="font-bold text-2xl">{issues.length}</p>
          </div>
          <div>
            <div className="flex flex-col justify-center items-center  bg-[#fff043cc] text-gray-900 rounded-xl whitespace-nowrap">
              <p className="text-sm md:text-sm font-normal">Closed issues</p>
              <p className="font-bold text-2xl">{issuesClosed.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
