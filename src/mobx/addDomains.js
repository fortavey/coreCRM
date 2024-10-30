import { makeObservable, action, observable } from "mobx";

class AddDomains {
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

const addDomains = new AddDomains();

export default addDomains;
