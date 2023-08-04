import TooltipAPI from "./TooltipAPI";
import formatCoords from "./formatcoords";

export default class ValidatorAPI {
  constructor() {
    this.tooltipAPI = new TooltipAPI();
    this.validateFunc = formatCoords;
    this.valErrors = {
      //patternMismatch: "Неверный формат введенных координат",
      valueMissing: "Введите координаты",
    };
  }

  checkInput(input) {
    let callback;

    if (!input.validity.valid) {
      [...Object.keys(ValidityState.prototype)].some((el) => {
        if (input.validity[el]) {
          callback = this.tooltipAPI.showTooltip({
            message: this.valErrors[el],
            element: input,
          });
          this.bindTooltip(input, callback);
          return null;
        }
      });
      //костырь но по другому не получилось
      // любое регулярное выражение при погружении в атрибут pattern
      //тэга input все время выдавала несовпадение, хотя ручные тесты проходили
    }
    const coords = formatCoords(input.value);
    if (!coords) {
      callback = this.tooltipAPI.showTooltip({
        message: "Неверный формат введенных координат",
        element: input,
      });
      this.bindTooltip(input, callback);
      return null;
    }

    return coords;
  }

  bindTooltip(input, callback) {
    const removeCall = () => {
      callback.call(this.tooltipAPI);
      input.removeEventListener("focus", removeCall);
    };
    input.addEventListener("focus", removeCall);
  }
}
