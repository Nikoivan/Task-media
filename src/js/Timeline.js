import "../js/components/css/timeline.css";
import Post from "./components/Post";
import microUrl from "../images/microphone.png";
import cameraUrl from "../images/camera.png";
import Popup from "./components/Popup";
import Creator from "./components/Creator";
import FormAPI from "./components/FormAPI";
import ValidatorAPI from "./components/ValidatorAPI";
import TimerAPI from "./components/TimerAPI";
import RecorderAPI from "./components/RecorderAPI";

export default class TimeLine {
  constructor(parentName) {
    this.container = document.querySelector(`.${parentName}`);
    this.PostType = Post;
    this.popupAPI = new Popup();
    this.creatorAPI = new Creator();
    this.validatorAPI = new ValidatorAPI();
    this.timerAPI = new TimerAPI();
    this.recordAPI = new RecorderAPI();
    this.posts = [];

    this.createPost = this.createPost.bind(this);
    this.getCoords = this.getCoords.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onAudio = this.onAudio.bind(this);
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
        </form>
        <div class="btns">
                <button class="microphone btn"><img src="${microUrl}" alt="кнопка записи аудио" class="mirco logo"></button>
                <button class="camera btn"><img src="${cameraUrl}" alt="кнопка записи видео" class="camera logo"></button>
        </div>    
    </div>`;
    this.container.append(element);

    this.element = element;
    this.formEl = this.element.querySelector(".timeline-footer");
    this.btns = this.element.querySelector(".btns");
    this.microphoneBtn = this.element.querySelector(".microphone");
    this.cameraBtn = this.element.querySelector(".camera");
    this.timeList = this.element.querySelector(".time-list");
    this.formAPI = new FormAPI(this.element.querySelector(".timeline-form"));

    this.formAPI.element.addEventListener("submit", this.onSubmit);
    this.microphoneBtn.addEventListener("click", this.onAudio);
    this.cameraBtn.addEventListener("click", this.onVideo);
  }

  onAudio(e) {
    const { element, startBtn, stopBtn, seconds, minutes } =
      this.creatorAPI.recordBtns;

    this.btns.classList.add("disable");
    const btns = this.btns;

    const stopCallback = this.onSubmit;

    startBtn.addEventListener("click", () => {
      this.timerAPI.start(minutes, seconds);
      this.getAudio();
    });
    stopBtn.addEventListener("click", () => {
      this.timerAPI.stop.call(this.timerAPI);
      stopCallback();
      this.recordAPI.stop.call(this.recordAPI);

      btns.classList.remove("disable");
      element.remove();
    });

    this.formEl.append(element);
  }

  async getAudio() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const recorder = new MediaRecorder(stream);

      const { element, audio } = this.creatorAPI.audioRecord;
      this.activeEl = element;

      this.recordAPI.startRecord({ stream, recorder, audio });
    } catch (err) {
      const modal = this.creatorAPI.warnWin;
      const { element, closeBtn } = modal;

      this.popupAPI.showPopup(element, this.formEl);

      closeBtn.addEventListener("click", (e) => {
        this.popupAPI.removePopup(element, e);
      });
      return;
    }
  }

  onVideo(e) {
    console.log(e);
  }

  onSubmit(e) {
    if (e) {
      e.preventDefault();
    }

    if (this.formAPI.content === "" && !this.activeEl) {
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
    const data = { coords, content };
    const post = new this.PostType(data);
    const element = post.getElement(this.activeEl);
    this.timeList.append(element);
    this.posts.push({ post, element });
    this.formAPI.reset();
    this.activeEl = null;
  }

  getCoords() {
    const modal = this.creatorAPI.getConfObj();
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
