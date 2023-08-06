import { min } from "moment";

export default class TimerAPI {
  constructor() {
    this.minutes = null;
    this.seconds = null;
    this.intervalId = null;
  }

  start(minutes, seconds, score) {
    this.minutes = minutes;
    this.seconds = seconds;

    if (score) {
      this.score = score;
    } else {
      this.score = 0;
    }

    this.intervalId = setInterval(() => {
      this.score = this.score + 1;
      let seconds = Math.trunc(this.score % 60);
      let minutes = Math.trunc((this.score / 60) % 60);
      if (seconds < 10) {
        seconds = `0${seconds}`;
      }
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }
      this.seconds.textContent = seconds;
      this.minutes.textContent = minutes;
    }, 1000);
  }

  stop() {
    window.clearInterval(this.intervalId);
    this.minutes = null;
    this.seconds = null;
    this.intervalId = null;
  }
}
