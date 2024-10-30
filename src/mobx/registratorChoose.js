import { makeObservable, action, observable } from "mobx";

class RegistratorChoose {
  show = false;
  domainId = 0;
  regId = 0;

  change = (bool) => {
    this.show = bool;
  };

  setDomainId = (id) => {
    this.domainId = id;
  };

  setRegId = (id) => {
    this.regId = id;
  };

  constructor(show, domainId, regId) {
    makeObservable(this, {
      show: observable,
      domainId: observable,
      regId: observable,
      change: action,
      setDomainId: action,
      setRegId: action,
    });
  }
}

const registratorChoose = new RegistratorChoose();

export default registratorChoose;
