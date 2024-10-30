import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AttentionIcon({ domain }) {
  const renderAttentionIcon = () => {
    if (domain.is_end) return null;
    if (domain.hours_left < 24)
      return (
        <FontAwesomeIcon
          icon={"fa-exclamation-circle"}
          color={"red"}
          style={styles.trash}
        />
      );
    if (domain.hours_left < 125)
      return (
        <FontAwesomeIcon
          icon={"fa-exclamation-triangle"}
          color={"yellow"}
          style={styles.trash}
        />
      );
  };
  return <td style={styles.tdAbsoluteLeft}>{renderAttentionIcon()}</td>;
}

const styles = {
  tdAbsoluteLeft: {
    position: "absolute",
    top: 3,
    left: -35,
  },
  trash: {
    width: 25,
    height: 25,
    cursor: "pointer",
  },
};
