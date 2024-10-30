import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import url from "../../../data/url";
import domains from "../../../mobx/domains";

export default function CheckBox({ domain, status }) {
  const bool = domain.status === status;

  const updateStatus = () => {
    fetch(url.updateStatus(status, domain.id))
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err))
      .finally((x) => {
        domains.updateList();
      });
  };

  return (
    <td style={styles.statusItem}>
      <FontAwesomeIcon
        onClick={() => (!bool ? updateStatus(status) : null)}
        icon={bool ? "check-square" : "square"}
        color={bool ? "#30d130" : "#d2d6d2"}
        style={styles.checkbox}
      />
    </td>
  );
}

const iconSize = 20;

const styles = {
  checkbox: {
    cursor: "pointer",
    width: iconSize,
    height: iconSize,
  },
  statusItem: {
    width: 100,
    textAlign: "center",
  },
};
