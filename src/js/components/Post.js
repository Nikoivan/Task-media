import "./css/post.css";
import moment from "moment/moment";

export default class Post {
  constructor(coords, content) {
    this.coords = `[${coords}]`;
    this.content = content;
  }

  get element() {
    const element = document.createElement("li");
    element.classList.add("post");
    element.innerHTML = `<div class="timeline-post-wrap">
    <div class="post-main">
        <div class="content-wrap">
            <span class="content">${this.content}</span>
        </div>
        <div class="date-wrap">
            <span class="date">${moment().format("DD.MM.YY")} 
            ${moment().hour()}:${moment().minutes()}</span>
        </div>
    </div>
    <div class="item-footer">
        <span class="coordinates">${this.coords}</span>
        <span class="eye">&#x1F441;</span>
    </div>
</div>`;
    return element;
  }
}
