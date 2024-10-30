import { makeObservable, action, observable } from "mobx";

class ShowDatePicker {
  show = false;
  id = 0;

  change = (bool) => {
    this.show = bool;
  };

  setId = (id) => {
    this.id = id;
  };

  constructor(show, id) {
    makeObservable(this, {
      show: observable,
      id: observable,
      change: action,
      setId: action,
    });
  }
}

const hostingDatePicker = new ShowDatePicker();

export default hostingDatePicker;
