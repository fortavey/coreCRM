import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import registrators from "../../mobx/registrators";
import registratorChoose from "../../mobx/registratorChoose";
import isDev from "../../data/isDev";
import domains from "../../mobx/domains";

function ChooseRegistratorComponent() {
  const setNewRegistratorOnDomain = (id) => {
    registratorChoose.change(false);
    registratorChoose.setRegId(id);
  };

  const renderRegistratorList = () => {
    return registrators.list.map((reg) => (
      <div
        style={styles.item}
        key={reg.title}
        onClick={() => setNewRegistratorOnDomain(reg.id)}
      >
        {reg.title}
      </div>
    ));
  };

  return (
    <div
      style={styles.container}
      onClick={() => registratorChoose.change(false)}
    >
      <div style={styles.contentBlock} onClick={(e) => e.stopPropagation()}>
        <div style={styles.title}>Выберите Регистратор</div>
        <div style={styles.scrollBlock}>{renderRegistratorList()}</div>
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
    zIndex: 10,
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

export default observer(ChooseRegistratorComponent);
