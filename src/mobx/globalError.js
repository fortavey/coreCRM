import { makeObservable, action, observable } from "mobx";

class GlobalError {
  show = false;
  text = "Текст ошибки";

  change(bool, text) {
    this.show = bool;
    this.text = text;
  }

  constructor(show, text) {
    makeObservable(this, {
      show: observable,
      text: observable,
      change: action,
    });
  }
}

const globalError = new GlobalError();

export default globalError;
