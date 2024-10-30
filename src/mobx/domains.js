import { makeObservable, action, observable } from "mobx";
import url from "../data/url";
import loader from "./loader";

class Domains {
  list = [];

  updateList = async () => {
    await fetch(url.getDomains)
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

const domains = new Domains();

export default domains;
