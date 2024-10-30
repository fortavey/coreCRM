import { makeObservable, action, observable } from "mobx";
import url from "../data/url";
import loader from "./loader";

class Hostings {
  list = [];

  updateList = async () => {
    await fetch(url.getHostings)
      .then((res) => res.json())
      .then((data) => {
        this.list = data;
        loader.change(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  constructor(list) {
    makeObservable(this, {
      list: observable,
      updateList: action,
    });
  }
}

const hostings = new Hostings();

export default hostings;
