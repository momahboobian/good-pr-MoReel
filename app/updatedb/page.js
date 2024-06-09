"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import ToggleCheckbox from "@/components/UpdateDB/ToggleCheckbox";

export default function UpdateDB() {
  const [sheetId, setSheetId] = useState("");
  const [action, setAction] = useState("update");
  const [message, setMessage] = useState(null);
  const [data, setData] = useState([]);

  const handleUpdateData = async () => {
    try {
      setMessage(null);

      if (!sheetId) {
        setMessage("Please enter a Google Sheet ID");
        return;
      }

      const url = `/api/update-db?sheetId=${encodeURIComponent(
        sheetId
      )}&action=${action}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        setData(responseData.data);
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
    }
  };

  const toggleAction = () => {
    setAction((prevAction) => (prevAction === "update" ? "remove" : "update"));
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
        <div className="flex flex-col items-start justify-center gap-4">
          <div className="flex flex-col items-start justify-center">
            <div className="relative focus-within:text-teal-700 ">
              <span className="absolute inset-y-0 left-0 flex items-center ">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="h-5 pl-4 text-teal-700 "
                />
              </span>
              <input
                type="text"
                value={sheetId}
                onChange={(e) => setSheetId(e.target.value)}
                placeholder="Enter Google Sheet ID"
                className="p-3 pl-12 bg-[#edeaea] font-medium rounded-md w-80 my-2 text-left text-md text-teal-700"
              />
            </div>

            {message && (
              <div
                className={`ml-2 text-s w-80 font-light text-${
                  message.includes("successfully") ? "green" : "red"
                }-500`}
              >
                {message}
              </div>
            )}
          </div>

          <ToggleCheckbox
            Remove
            Existing
            Data
            message={"Remove Existing Data"}
            filterActive={action !== "update"}
            onToggle={toggleAction}
          />

          <button
            onClick={handleUpdateData}
            className="bg-[#37BCBA] text-gray-900 rounded-lg p-3 px-28 font-semibold flex items-center hover:bg-[#1a9997] whitespace-nowrap"
          >
            Update Data
          </button>
        </div>

        {data.length > 0 && (
          <div className="mt-2 overflow-hidden shadow w-96 sm:rounded-lg">
            <table className="min-w-full leading-normal bg-[#1e1e1e] text-sm text-gray-400">
              <thead className="text-xs font-medium uppercase bg-gray-800">
                <tr>
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
                {data.map((item) => (
                  <tr key={item.id}>
                    <td className="w-1/2 px-6 py-4 border-b border-gray-700 whitespace-nowrap">
                      {item.team_name}
                    </td>
                    <td className="w-1/2 px-6 py-4 border-b border-gray-700">
                      {item.cohort}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
