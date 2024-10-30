import { makeObservable, action, observable } from "mobx";

class Loader {
  show = true;

  change = (bool) => {
    this.show = bool;
  };

  constructor(show) {
    makeObservable(this, {
      show: observable,
      change: action,
    });
  }
}

const loader = new Loader();

export default loader;
