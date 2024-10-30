import React, { useEffect, useState } from "react";
import emails from "../../mobx/emails";
import { observer } from "mobx-react-lite";
import registrators from "../../mobx/registrators";
import hostings from "../../mobx/hostings";

function ChooseEmailComponent({ setEmail, type, setShowChooseEmailPopup }) {
  const [listExistedEmails, setListExistedEmails] = useState([]);

  useEffect(() => {
    if (type === "registrator") {
      setListExistedEmails(registrators.list.map((r) => r.email.ID));
    }
    if (type === "hostings") {
      setListExistedEmails(hostings.list.map((r) => r.email.ID));
    }
  }, []);

  const renderEmailList = () => {
    return emails.list
      .filter((e) => !listExistedEmails.includes(e.id))
      .map((email) => (
        <div
          style={styles.item}
          key={email.title}
          onClick={() => setEmail(email)}
        >
          {email.title}
        </div>
      ));
  };

  return (
    <div
      style={styles.container}
      onClick={() => setShowChooseEmailPopup(false)}
    >
      <div style={styles.contentBlock} onClick={(e) => e.stopPropagation()}>
        <div style={styles.title}>Выберите свободный Email</div>
        <div style={styles.scrollBlock}>{renderEmailList()}</div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: "fixed",
    width: "100%",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.5)",
    top: 0,
    left: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "scroll",
    paddingTop: 20,
  },
  contentBlock: {
    padding: 10,
    paddingTop: 40,
    width: 600,
    position: "relative",
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  scrollBlock: {
    height: 400,
    overflow: "scroll",
  },
  title: {
    fontSize: 20,
    color: "grey",
    textAlign: "center",
    marginBottom: 20,
  },
  item: {
    height: 30,
    border: "1px solid silver",
    marginBottom: 2,
    display: "flex",
    alignItems: "center",
    paddingLeft: 10,
    cursor: "pointer",
  },
};

export default observer(ChooseEmailComponent);
