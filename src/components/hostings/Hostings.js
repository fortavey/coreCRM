import React, { useState } from "react";
import OneHostComponent from "./OneHostComponent";
import hostings from "../../mobx/hostings";
import { observer } from "mobx-react-lite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddHosting from "./AddHosting";
import user from "../../mobx/user";

function Hostings() {
  const [showAddHostingBlock, setShowAddHostingBlock] = useState(false);

  return (
    <div>
      {user.access > 50 && (
        <div
          style={styles.addButton}
          onClick={() => setShowAddHostingBlock(true)}
        >
          <FontAwesomeIcon
            icon={"plus"}
            color="#30d130"
            style={styles.addIcon}
          />
          Добавить новый хостинг
        </div>
      )}
      {showAddHostingBlock && (
        <AddHosting setShowAddHostingBlock={setShowAddHostingBlock} />
      )}
      <div style={styles.cont}>
        {hostings.list.map((host) => (
          <OneHostComponent hostObj={host} key={host.id} />
        ))}
      </div>
    </div>
  );
}

const styles = {
  cont: {
    width: "100%",
    maxWidth: 1200,
    margin: "auto",
    boxShadow: "0px 14px 32px -8px rgba(0,0,0,0.75)",
    backgroundColor: "#fff",
    padding: 10,
    marginTop: 30,
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  addIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  addButton: {
    width: "100%",
    maxWidth: 1200,
    height: 60,
    margin: "auto",
    boxShadow: "0px 14px 32px -8px rgba(0,0,0,0.75)",
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    paddingLeft: 20,
  },
};

export default observer(Hostings);
