export function handleTooltips() {
  const tooltips = document.querySelectorAll("[data-tooltip-target]");

  tooltips.forEach((tooltip) => {
    const targetId = tooltip.dataset.tooltipTarget;
    const target = document.getElementById(targetId);

    tooltip.addEventListener("mouseenter", () => {
      target.classList.remove("invisible");
      target.classList.add("visible");
      target.style.opacity = "1";
    });

    tooltip.addEventListener("mouseleave", () => {
      target.classList.remove("visible");
      target.classList.add("invisible");
      target.style.opacity = "0";
    });
  });
}
