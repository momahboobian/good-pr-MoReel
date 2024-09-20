export default function ToggleCheckbox({ message, filterActive, onToggle }) {
  return (
    <div className="flex flex-col justify-between py-2">
      <div className="flex items-center justify-center w-full">
        <h3 className="p-2 text-lg font-light text-white">{message}</h3>
        <label className="flex items-center cursor-pointer">
          <div className="relative w-16 h-8 transition border border-white rounded-full">
            <input
              id="toggleB"
              type="checkbox"
              checked={filterActive}
              onChange={onToggle}
              className="hidden"
            />
            <div
              className="dot absolute top-[0.16rem] w-6 h-6 rounded-full transition"
              style={{
                left: filterActive ? "calc(100% - 1.7rem)" : "0.15em",
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
