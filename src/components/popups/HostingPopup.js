import React, { useEffect, useState } from "react";
import popupStyles from "./popupStyles";
import OneHostComponent from "../hostings/OneHostComponent";
import hostings from "../../mobx/hostings";

function HostingPopup({ hostId }) {
  const [hostObj, setHostObj] = useState(null);

  useEffect(() => {
    const host = hostings.list.find((h) => h.id === hostId);
    if (hostId !== null) setHostObj(host);
  }, []);

  return <>{hostObj !== null && <OneHostComponent hostObj={hostObj} />}</>;
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

export default HostingPopup;
