import "../js/components/css/timeline.css";
import Post from "./components/Post";
import microUrl from "../images/microphone.png";
import cameraUrl from "../images/camera.png";
import Popup from "./components/Popup";
import Modal from "./components/Modal";
import FormAPI from "./components/FormAPI";
import ValidatorAPI from "./components/ValidatorAPI";

export default class TimeLine {
  constructor(parentName) {
    this.container = document.querySelector(`.${parentName}`);
    this.PostType = Post;
    this.popupAPI = new Popup();
    this.modalAPI = new Modal();
    this.validatorAPI = new ValidatorAPI();
    this.posts = [];

    this.createPost = this.createPost.bind(this);
    this.getCoords = this.getCoords.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  init() {
    const element = document.createElement("div");
    element.classList.add("timeline-wrap");
    element.innerHTML = `<div class="timeline-main">
        <ul class="time-list">            
        </ul>
    </div>
    <div class="timeline-footer">
        <form class="timeline-form">
            <input type="text" class="input timeline-input">
            <div class="btns">
                <button class="microphone btn"><img src="${microUrl}" alt="кнопка записи аудио" class="mirco logo"></button>
                <button class="camera btn"><img src="${cameraUrl}" alt="кнопка записи видео" class="camera logo"></button>
            </div>                    
        </form>
    </div>`;
    this.container.append(element);

    this.element = element;
    this.timeList = this.element.querySelector(".time-list");
    this.formAPI = new FormAPI(this.element.querySelector(".timeline-form"));

    this.formAPI.element.addEventListener("submit", this.onSubmit);
  }

  onAudio(form) {
    console.log(form);
  }

  onVideo(form) {
    console.log(form);
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.formAPI.content === "") {
      return;
    }
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((data) => {
        const coords = `${data.coords.latitude}, ${data.coords.longitude}`;
        this.createPost(coords);
      }, this.getCoords);
      return;
    }
  }

  createPost(coords) {
    const content = this.formAPI.content;
    const post = new this.PostType(coords, content);
    const element = post.element;
    this.timeList.append(element);
    this.posts.push({ post, element });
    this.formAPI.reset();
  }

  getCoords() {
    const modal = this.modalAPI.getConfObj();
    const { element, cancel, accept } = modal;
    this.popupAPI.showPopup(element, this.timeList);

    cancel.addEventListener("click", (e) => {
      e.preventDefault();
      this.popupAPI.removePopup(element);
    });

    accept.addEventListener("click", (e) => {
      e.preventDefault();
      const input = element.querySelector(".input");
      const validResult = this.validatorAPI.checkInput(input);
      if (!validResult) return;
      const coords = validResult;
      this.createPost(coords);
      this.popupAPI.removePopup(element);
    });
  }
}
