export default function FilterToggle({ filterActive, onToggle }) {
  return (
    <div className="flex flex-col justify-between py-2">
      <div className="flex items-center justify-center w-full">
        <div className="font-light text-xl text-white pr-2">
          Who Needs Help:{" "}
        </div>
        <label className="flex items-center cursor-pointer">
          <div className="relative border border-white rounded-full w-16 h-8 transition">
            <input
              id="toggleB"
              type="checkbox"
              checked={filterActive}
              onChange={onToggle}
              className="hidden"
            />
            <div
              className="dot absolute  top-[0.20rem] w-6 h-6 rounded-full transition"
              style={{
                left: filterActive ? "calc(100% - 1.6rem)" : "0.1rem",
                backgroundColor: filterActive ? "#37BCBA" : "white",
                transition: "left 0.3s ease",
              }}
            ></div>
          </div>
        </label>
      </div>
    </div>
  );
}
