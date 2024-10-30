import { makeObservable, action, observable } from "mobx";

class HostingChoose {
  show = false;
  domainId = 0;

  change = (bool) => {
    this.show = bool;
  };

  setId = (id) => {
    this.domainId = id;
  };

  constructor(show, domainId) {
    makeObservable(this, {
      show: observable,
      domainId: observable,
      change: action,
      setId: action,
    });
  }
}

const hostingChoose = new HostingChoose();

export default hostingChoose;
