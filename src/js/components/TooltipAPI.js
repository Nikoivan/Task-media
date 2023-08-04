import "./css/tooltip.css";

export default class TooltipAPI {
  constructor() {}

  showTooltip(data) {
    const { message, element } = data;

    const tooltipText = document.createElement("p");
    tooltipText.textContent = message;
    tooltipText.classList.add("tooltip-text");

    const tooltipEl = document.createElement("div");
    tooltipEl.classList.add("tooltip");

    tooltipEl.append(tooltipText);

    document.body.append(tooltipEl);

    const { top, left } = element.getBoundingClientRect();

    tooltipEl.style.top = `${top - tooltipEl.offsetHeight - 15}px`;
    tooltipEl.style.left = `${
      left + element.offsetWidth / 2 - tooltipEl.offsetWidth / 2 + 10
    }px`;

    this.activeTooltip = tooltipEl;
    return this.removeTooltip;
  }

  removeTooltip() {
    console.log(this.activeTooltip);
    this.activeTooltip.remove();
    this.activeTooltip = null;
  }
}
