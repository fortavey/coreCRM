import { makeObservable, action, observable } from "mobx";

class AddDomain {
  show = false;

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

const addDomain = new AddDomain();

export default addDomain;
