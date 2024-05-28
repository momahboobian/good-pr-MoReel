"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function UpdateDB() {
  const [sheetId, setSheetId] = useState("");

  const handleUpdateData = async () => {
    try {
      if (!sheetId) {
        alert("Please enter a Google Sheet ID");
        return;
      }

      const url = `/api/update-db?sheetId=${encodeURIComponent(sheetId)}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
      } else {
        console.error("Error updating data:", response.statusText);
        alert("Incorrect Google Sheet ID");
      }
    } catch (error) {
      console.error("Error updating data:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-start h-screen w-full bg-[#070E0E]">
      <div className="flex items-start justify-between px-6 md:pt-6">
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
      <div className="flex items-start justify-start h-full pt-10">
        <div className="flex items-center gap-10">
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
              className="p-3 pl-12 bg-[#edeaea] font-medium rounded-md md:w-80 my-[10%] text-left text-md text-teal-700"
            />
          </div>
          <button
            onClick={handleUpdateData}
            className="bg-[#37BCBA] text-gray-900 rounded-lg p-3 px-16 font-semibold flex items-center hover:bg-[#1a9997]"
          >
            Update Data
          </button>
        </div>
      </div>
    </div>
  );
}
