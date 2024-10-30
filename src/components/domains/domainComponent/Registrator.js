import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Registrator({ domain, openPopupHandler }) {
  return (
    <>
      <FontAwesomeIcon
        onClick={() => {
          openPopupHandler({
            type: "registrator",
            regId: domain.registrator.ID,
          });
        }}
        icon="circle-info"
        color="#66d4ed"
        style={styles.checkboxInfo}
      />
    </>
  );
}

const styles = {
  checkboxInfo: {
    cursor: "pointer",
    width: 18,
    height: 18,
    display: "block",
    marginRight: 10,
  },
};
