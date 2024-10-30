import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTelegram } from "@fortawesome/free-brands-svg-icons";
import prodPath from "../../data/prodPath";
import registrators from "../../mobx/registrators";
import hostings from "../../mobx/hostings";
import loader from "../../mobx/loader";
import { observer } from "mobx-react-lite";

function Telegram({ host }) {
  const sendMsg = () => {
    loader.change(true);
    const reg = registrators.list.find((r) => r.email.ID === host.email.ID);
    const emailId = host.email.ID;
    const regId = reg.id;
    const hostId = host.id;
    const domains = host.domains.join(",");

    const str = `title=${host.title}&email_id=${emailId}&domains=${domains}&host_id=${hostId}&reg_id=${regId}`;

    fetch(`${prodPath}/core/wp-admin/admin-ajax.php?action=telegram&${str}`)
      .then((res) => res.json())
      .then((data) => {
        hostings.updateList();
      })
      .catch((err) => console.log(err));
  };

  return host.domains.length && !host.telegram ? (
    <div style={styles.cont} onClick={sendMsg}>
      <FontAwesomeIcon
        icon={faTelegram}
        style={styles.icon}
        color={"#239FDC"}
      />
    </div>
  ) : (
    <></>
  );
}

const styles = {
  cont: {
    position: "absolute",
    top: 5,
    right: 5,
    cursor: "pointer",
  },
  icon: {
    width: 30,
    height: 30,
  },
};

export default observer(Telegram);
