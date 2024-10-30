import React, { useEffect, useState } from "react";
import popupStyles from "./popupStyles";
import OneRegistratorComponent from "../registrators/OneRegistratorComponent";
import registrators from "../../mobx/registrators";

function RegistratorPopup({ regId }) {
  const [regObj, setRegObj] = useState(null);

  useEffect(() => {
    const reg = registrators.list.find((h) => h.id === regId);
    if (regId !== null) setRegObj(reg);
  }, []);

  return <>{regObj !== null && <OneRegistratorComponent regObj={regObj} />}</>;
}

const styles = {
  ...popupStyles,
  closePopup: {
    width: 20,
    height: 20,
    display: "block",
    cursor: "pointer",
    position: "absolute",
    top: 10,
    right: 10,
  },
};

export default RegistratorPopup;
