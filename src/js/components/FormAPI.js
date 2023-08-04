export default class FormAPI {
  constructor(element) {
    this.form = element;
    this.input = this.form.querySelector(".input");
  }

  get content() {
    return this.input.value;
  }
  get element() {
    return this.form;
  }

  reset() {
    this.form.reset();
  }
}
