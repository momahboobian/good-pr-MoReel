export default function FilterToggle({ groupStatus, onToggle }) {
  return (
    <div className="flex flex-col justify-between py-2">
      <div className="flex items-center justify-center w-full">
        <div className="font-light text-xl text-white">Who Needs Help: </div>
        <label htmlFor="toggleB" className="flex items-center cursor-pointer">
          <div className="relative border border-white rounded-full w-16 h-8 transition">
            <input
              id="toggleB"
              type="checkbox"
              checked={groupStatus}
              onChange={onToggle}
              // className="hidden"
            />
            <div
              className={`dot absolute left-1 top-1 w-6 h-6 rounded-full transition ${
                groupStatus ? "bg-teal-600" : "bg-white"
              }`}
            ></div>
          </div>
        </label>
      </div>
    </div>
  );
}
