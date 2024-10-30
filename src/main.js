import React from "react";
import ReactDom from "react-dom";

import MainComponent from "./components/MainComponent";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheckSquare,
  faSquare,
  faCircleInfo,
  faRectangleXmark,
  faFilter,
  faSliders,
  faTrash,
  faExclamationCircle,
  faExclamationTriangle,
  faClose,
  faSearch,
  faPlus,
  faMinus,
  faEdit,
  faAngleDown,
  faAngleUp,
  faClone,
  faUsd,
    faDatabase
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faCheckSquare,
  faSquare,
  faCircleInfo,
  faRectangleXmark,
  faFilter,
  faSliders,
  faTrash,
  faExclamationCircle,
  faExclamationTriangle,
  faClose,
  faSearch,
  faPlus,
  faMinus,
  faEdit,
  faAngleDown,
  faAngleUp,
  faClone,
  faUsd,
    faDatabase
);

ReactDom.render(<MainComponent />, document.querySelector(".app"));
