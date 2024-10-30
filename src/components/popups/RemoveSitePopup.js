import React, { useEffect, useState } from "react";
import popupStyles from "./popupStyles";
import prodPath from "../../data/prodPath";
import domains from "../../mobx/domains";
import loader from "../../mobx/loader";

function RemoveSitePopup({ domeinOnRemove, setShowPopup }) {
  const removeSite = () => {
    loader.change(true);
    setShowPopup(false);
    fetch(
      `${prodPath}/core/wp-admin/admin-ajax.php?action=remove_domain&id=${domeinOnRemove.id}`
    )
      .then((res) => res.json())
      .then((data) => {
        domains.updateList();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={styles.bg}>
      <div style={styles.title}>
        Вы уверены что хотите удалить сайт {domeinOnRemove.title}?
      </div>
      <div style={styles.desc}>
        Удаление отменить не возможно! После удаления восстановить сайт можно
        будет только вручную через базу данных в течении 30 дней.
      </div>
      <div style={styles.buttons}>
        <div
          style={{ ...styles.removeBtn, ...styles.item }}
          onClick={removeSite}
        >
          Удалить
        </div>
        <div
          style={{ ...styles.cancelBtn, ...styles.item }}
          onClick={() => setShowPopup(false)}
        >
          Отмена
        </div>
      </div>
    </div>
  );
}

const styles = {
  ...popupStyles,
  bg: {
    backgroundColor: "#fff",
    padding: "20px 10px",
  },
  closePopup: {
    width: 20,
    height: 20,
    display: "block",
    cursor: "pointer",
    position: "absolute",
    top: 10,
    right: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: 30,
  },
  item: {
    width: 150,
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid grey",
    cursor: "pointer",
  },
  desc: {
    width: "90%",
    margin: "20px auto",
    border: "1px solid silver",
    padding: 10,
    fontStyle: "italic",
  },
};

export default RemoveSitePopup;
