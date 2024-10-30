import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import domains from "../../mobx/domains";

export default function AttentionComponent({ setShowAttentionDomains }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setShow(!show);
      clearTimeout(timeOutId);
    }, 500);
  }, [show]);

  if (
    domains.list.some(
      (domain) => (domain.hosting && domain.is_end) || domain.hours_left < 24
    )
  ) {
    return (
      <div style={styles.cont} onClick={() => setShowAttentionDomains(true)}>
        {show && (
          <FontAwesomeIcon
            icon={"fa-exclamation-triangle"}
            color={"red"}
            style={styles.icon}
          />
        )}
      </div>
    );
  } else if (
    domains.list.some((domain) => domain.hosting && domain.hours_left < 48)
  ) {
    return (
      <div style={styles.cont} onClick={() => setShowAttentionDomains(true)}>
        {show && (
          <FontAwesomeIcon
            icon={"fa-exclamation-triangle"}
            color={"yellow"}
            style={styles.icon}
          />
        )}
      </div>
    );
  } else return <></>;
}

const styles = {
  cont: {
    width: 100,
    height: 100,
    position: "fixed",
    top: 70,
    left: 20,
    cursor: "pointer",
  },
  icon: {
    width: 80,
    height: 80,
  },
};
