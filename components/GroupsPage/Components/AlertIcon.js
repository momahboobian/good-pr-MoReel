import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AlertIcon({ tooltipId }) {
  return (
    <div>
      <FontAwesomeIcon
        icon={faTriangleExclamation}
        className="text-[#BCBA36] h-10 w-10 absolute top-2 right-2"
        data-tooltip-target={tooltipId}
        data-tooltip-placement="alert"
      />
      <div
        id={tooltipId}
        role="tooltip"
        className="absolute z-10 right-0 top-12 invisible p-2 mx-6 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip border border-slate-100 dark:bg-[#1A1E1F]"
      >
        Need help!
        <div className="tooltip-arrow" data-popper-arrow></div>
      </div>
    </div>
  );
}
