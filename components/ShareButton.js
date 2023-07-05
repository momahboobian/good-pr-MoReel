import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareFromSquare } from "@fortawesome/free-solid-svg-icons";

const ShareButton = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleShareClick = () => {
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
        }, 2000); // Show the popup for 2 seconds
      })
      .catch((error) => {
        console.error("Failed to copy URL to clipboard:", error);
      });
  };

  return (
    <div className="relative">
      <button
        onClick={handleShareClick}
        className="bg-[#37BCBA] text-gray-900 rounded-lg p-2 px-4 font-semibold flex items-center"
      >
        <FontAwesomeIcon
          icon={faShareFromSquare}
          className="w-[15px] mr-3 hidden md:block"
        />
        Share <span className="hidden md:inline-block ml-1">this page</span>
      </button>
      {showPopup && (
        <div className="fixed top-1/2 md:top-16 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#37BCBA] text-gray-900 font-semibold shadow-lg py-8 px-4 rounded-md text-center z-10">
          <p>URL copied to clipboard!</p>
        </div>
      )}
    </div>
  );
};

export default ShareButton;
