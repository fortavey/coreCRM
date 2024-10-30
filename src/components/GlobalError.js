import React, { useEffect, useState } from "react";
import globalError from "../mobx/globalError";

function GlobalError() {
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      globalError.change(false, "Текст ошибки");
      clearTimeout(timeOutId);
    }, 2000);
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.contentBlock}>
        <div style={styles.title}>{globalError.text}</div>
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
    zIndex: 1000,
  },
  contentBlock: {
    padding: 10,
    paddingTop: 40,
    width: 600,
    position: "relative",
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    color: "grey",
    textAlign: "center",
    marginBottom: 20,
  },
};

export default GlobalError;
