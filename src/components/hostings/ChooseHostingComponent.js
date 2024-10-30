import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import hostings from "../../mobx/hostings";
import hostingChoose from "../../mobx/hostingChoose";
import prodPath from "../../data/prodPath";
import domains from "../../mobx/domains";
import loader from "../../mobx/loader";

function ChooseHostingComponent() {
  const setNewHostingOnDomain = (id) => {
    loader.change(true);
    fetch(
      `${prodPath}/core/wp-admin/admin-ajax.php?action=update_domain_host&domain_id=${hostingChoose.domainId}&host_id=${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        hostingChoose.change(false);
        domains.updateList();
      })
      .catch((err) => console.log(err));
  };

  const renderHostingsList = () => {
    return hostings.list.map((host) => (
      <div
        style={styles.item}
        key={host.title}
        onClick={() => setNewHostingOnDomain(host.id)}
      >
        {host.title}
      </div>
    ));
  };

  return (
    <div style={styles.container} onClick={() => hostingChoose.change(false)}>
      <div style={styles.contentBlock} onClick={(e) => e.stopPropagation()}>
        <div style={styles.title}>Выберите хостинг</div>
        <div style={styles.scrollBlock}>{renderHostingsList()}</div>
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

export default observer(ChooseHostingComponent);
