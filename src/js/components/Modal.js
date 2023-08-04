import "./css/modal.css";

export default class Modal {
  constructor() {}

  getConfObj() {
    const element = document.createElement("div");
    element.classList.add("confirm-window");
    element.innerHTML = `<div class="confirm-header"><p class="confirm-title">Что-то пошло не так</p></div>
    <div class="confirm-main"><p class="confirm-text">К сожалению нам не удалось определить ваше местоположение, пожалуйста, дайте разрешение на использование геолокации, либо введите координаты вручную.</p>
    <p class="text">Широта и долгота через запятую</p>     
    </div>       
    <div class="confirm-footer">
    <form class="confirm-form" novalidate>
        <div class="confirm-header">
            <input class="input confirm-input" required>
        </div>
        <div class="confirm-btns">
            <button class="confirm-cancel-btn">Отмена</button>
            <button class="confirm-accept-btn">Ок</button>
        </div>
    </form>
    </div>`;

    const cancel = element.querySelector(".confirm-cancel-btn");
    const accept = element.querySelector(".confirm-accept-btn");

    return {
      element,
      cancel,
      accept,
    };
  }

  get window() {
    const element = document.createElement("div");
    element.classList.add("confirm-window");
    element.innerHTML = `<div class="confirm-header"><span class="confirm-title">Удалить тикет</span></div>
    <div class="confirm-main"><p class="confirm-text">Вы уверены, что хотите удалить тикет? Это действие необратимо.</p></div>       
    <div class="confirm-footer">
        <span class="confirm-cancel-btn">Отмена</span>
        <span class="confirm-accept-btn">Ок</span>
    </div>`;
    return element;
  }
}
