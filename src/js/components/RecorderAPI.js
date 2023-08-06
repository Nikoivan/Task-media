export default class RecorderAPI {
  constructor(container) {
    this.container = container;
    this.stream = null;
    this.recorder = null;
  }

  startRecord(data) {
    const { stream, recorder, audio } = data;
    const chunks = [];

    recorder.addEventListener("dataavailable", (e) => {
      chunks.push(e.data);
    });

    recorder.addEventListener("stop", () => {
      /*const element = document.createElement("div");
      element.classList.add("cont");
      element.innerHTML = `<audio class="audio" controls></audio>`;

      const audio = element.querySelector(".audio");*/

      const blob = new Blob(chunks);

      audio.src = URL.createObjectURL(blob);
    });

    recorder.start();

    this.stream = stream;
    this.recorder = recorder;
  }

  stop() {
    if (!this.recorder) return;
    this.recorder.stop();
    this.stream.getTracks().forEach((track) => track.stop());

    this.stream = null;
    this.recorder = null;
  }
}
