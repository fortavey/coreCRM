import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddRegistrator from "./AddRegistrator";
import registrators from "../../mobx/registrators";
import OneRegistratorComponent from "../registrators/OneRegistratorComponent";
import { observer } from "mobx-react-lite";
import user from "../../mobx/user";

function Registrators(props) {
  const [showAddRegistratorBlock, setShowAddRegistratorBlock] = useState(false);
  return (
    <>
      {user.access > 50 && (
        <div
          style={styles.addButton}
          onClick={() => setShowAddRegistratorBlock(!showAddRegistratorBlock)}
        >
          <FontAwesomeIcon
            icon={showAddRegistratorBlock ? "minus" : "plus"}
            color="#30d130"
            style={styles.addIcon}
          />
          Добавить нового регистратора
        </div>
      )}
      {showAddRegistratorBlock && (
        <AddRegistrator
          setShowAddRegistratorBlock={setShowAddRegistratorBlock}
        />
      )}
      <div style={styles.cont}>
        {registrators.list.map((r) => (
          <OneRegistratorComponent regObj={r} key={r.title} />
        ))}
      </div>
    </>
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
export default observer(Registrators);
