export function handleTooltips() {
  const tooltips = document.querySelectorAll("[data-tooltip-target]");

  tooltips.forEach(function (tooltip) {
    const targetId = tooltip.dataset.tooltipTarget;
    const target = document.getElementById(targetId);

    tooltip.addEventListener("mouseenter", function () {
      target.classList.remove("invisible");
      target.classList.add("visible");
      target.style.opacity = "1";
    });

    tooltip.addEventListener("mouseleave", function () {
      target.classList.remove("visible");
      target.classList.add("invisible");
      target.style.opacity = "0";
    });
  });
}
