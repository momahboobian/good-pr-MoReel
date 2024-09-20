import { faShareFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

export default function ShareButton() {
	const [buttonText, setButtonText] = useState("Share this page");

	const handleShareClick = () => {
		const currentUrl = window.location.href;
		navigator.clipboard
			.writeText(currentUrl)
			.then(() => {
				setButtonText("Shareable Link Copied!");
				setTimeout(() => {
					setButtonText("Share this page");
				}, 2000); // Show the popup for 2 seconds
			})
			.catch((error) => {
				console.error("Failed to copy URL to clipboard:", error);
			});
	};

<<<<<<< HEAD
  return (
    <button
      onClick={handleShareClick}
      className="bg-[#37BCBA] text-gray-900 rounded-lg p-2 px-4 font-semibold flex items-center hover:bg-[#1a9997]"
    >
      <div className="flex items-center">
        {buttonText !== "Shareable Link Copied!" && (
          <FontAwesomeIcon icon={faShareFromSquare} className="w-[15px] mr-3 hidden md:block" />
        )}
        {buttonText}
      </div>
    </button>
  );
=======
	return (
		<button
			onClick={handleShareClick}
			className="bg-[#37BCBA] text-gray-900 rounded-lg p-2 px-4 font-semibold flex items-center hover:bg-[#1a9997]"
		>
			<div className="flex items-center">
				{buttonText !== "Shareable Link Copied!" && (
					<FontAwesomeIcon
						icon={faShareFromSquare}
						className="w-[15px] mr-3 hidden md:block"
					/>
				)}
				{buttonText}
			</div>
		</button>
	);
>>>>>>> 60d7b2c6e096f957bb81572040c1c39291ead2f0
}
