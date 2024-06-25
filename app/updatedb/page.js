"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import ToggleCheckbox from "@components/UpdateDb/ToggleCheckbox";

export default function UpdateDB() {
  const [action, setAction] = useState("update");
  const [message, setMessage] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleUpdateData = async () => {
    setData([]);

    try {
      setMessage(null);
      setLoading(true);

      const url = `/api/googleSheet?action=${action}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        setData(responseData.data.data);
        setMessage(responseData.message);
      } else {
        const errorMessage = await response.json();
        console.error("Error response:", errorMessage);
        setMessage(errorMessage.error);

        setData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessage("An error occurred. Please try again.");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleAction = () => {
    setAction((prevAction) => (prevAction === "update" ? "replace" : "update"));
  };

  return (
    <div className="flex flex-col justify-center items-start h-screen w-full bg-[#070E0E] p-4 pt-24 overflow-scroll md:pt-0 sm:h-screen">
      <div className="flex items-start justify-between px-2 pt-6 md:pt-6">
        <div className="flex flex-col justify-between gap-4 py-2">
          <div className="flex items-center">
            <FontAwesomeIcon
              icon={faGithub}
              className="text-[#37BCBA] h-7 mr-2"
            />
            <h1 className="text-2xl font-semibold text-white">
              <span className="mr-1">GOOD</span>
              <span className="text-[#37BCBA]">PR</span>
            </h1>
          </div>
          <p className="font-light text-gray-500 text-x">
            Updated Data from Google Spreadsheet
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-start w-full h-full gap-10 pt-20 sm:items-start sm:pl-6 md:flex-row">
        <div className="flex flex-col items-start justify-center gap-4 w-80">
          <button
            onClick={handleUpdateData}
            className="w-full text-center bg-[#37BCBA] text-gray-900 rounded-lg p-3 font-semibold flex items-center justify-center hover:bg-[#1a9997] whitespace-nowrap"
          >
            {action === "replace" ? "Replace Data" : "Update Data"}
          </button>

          <ToggleCheckbox
            message={"Remove Existing Data"}
            filterActive={action === "replace"}
            onToggle={toggleAction}
          />

          <div className="flex flex-col items-start justify-center ">
            {message && (
              <div className="ml-2 font-light text-s ">{message}</div>
            )}
          </div>
        </div>

        {loading ? (
          <div className="sm:pl-28 flex-1sm:">
            <div className="w-32 h-32 border-t-2 border-b-2 border-teal-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          data.length > 0 && (
            <div className="overflow-auto shadow w-96 sm:rounded-lg">
              <table className="min-w-full leading-normal bg-[#1e1e1e] text-sm text-gray-400">
                <thead className="text-xs font-medium uppercase bg-gray-800">
                  <tr>
                    <th className="px-4 py-4 tracking-wider text-left">#</th>
                    <th
                      scope="col"
                      className="px-6 py-4 tracking-wider text-left"
                    >
                      Team Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 tracking-wider text-left"
                    >
                      Cohort
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={item.id}>
                      <td className="px-4 py-4 border-b border-gray-700 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-700 whitespace-nowrap">
                        {item.team_name}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-700">
                        {item.cohort}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}
      </div>
    </div>
  );
}
