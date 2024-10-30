import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChooseEmailComponent from "../emails/ChooseEmailComponent";
import prodPath from "../../data/prodPath";
import registrators from "../../mobx/registrators";
import loader from "../../mobx/loader";

export default function AddRegistrator({ setShowAddRegistratorBlock }) {
  const [email, setEmail] = useState({ title: "" });
  const [pass, setPass] = useState("");
  const [login, setLogin] = useState("");
  const [showChooseEmailPopup, setShowChooseEmailPopup] = useState(false);

  useEffect(() => setShowChooseEmailPopup(false), [email]);

  const addEmailOpen = () => {
    setShowChooseEmailPopup(true);
  };

  const resetAll = () => {
    setEmail({ title: "" });
    setPass("");
  };

  const sendAddRegistratorRequest = () => {
    setShowAddRegistratorBlock(false);
    loader.change(true);
    fetch(
      `${prodPath}/core/wp-admin/admin-ajax.php?action=add_registrator&title=${email.title}&password_value=${pass}&email_id=${email.id}&login_value=${login}`
    )
      .then((res) => res.json())
      .then((data) => {
        registrators.updateList();
        resetAll();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={styles.cont}>
      <div>
        <div style={styles.title}>Добавление нового регистратора</div>

        <div style={styles.itemBlock}>
          <div style={styles.itemName}>Email</div>
          <strong>{email.title}</strong>
          <FontAwesomeIcon
            icon={email.title ? "edit" : "plus"}
            color="#30d130"
            style={email.title ? styles.addEmailIconSmall : styles.addEmailIcon}
            onClick={addEmailOpen}
          />
        </div>

        <div style={styles.itemBlock}>
          <div style={styles.itemName}>Пароль</div>

          <input
            style={styles.input}
            value={pass}
            onChange={(e) => setPass(e.target.value.trim())}
          />
        </div>
        <div style={styles.itemBlock}>
          <div style={styles.itemName}>Логин (для nic.ru)</div>

          <input
            style={styles.input}
            value={login}
            onChange={(e) => setlogin(e.target.value.trim())}
          />
        </div>
        {showChooseEmailPopup && (
          <ChooseEmailComponent
            setEmail={setEmail}
            type="registrator"
            setShowChooseEmailPopup={setShowChooseEmailPopup}
          />
        )}
      </div>
      {email.title && pass && (
        <>
          <div style={styles.addBtn} onClick={sendAddRegistratorRequest}>
            Добавить
          </div>
        </>
      )}
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
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    color: "grey",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    width: 300,
    height: 30,
    paddingLeft: 10,
  },
  addEmailIcon: {
    width: 30,
    height: 30,
    cursor: "pointer",
    marginLeft: 10,
  },
  addEmailIconSmall: {
    width: 20,
    height: 20,
    cursor: "pointer",
    marginLeft: 10,
  },
  itemBlock: {
    display: "flex",
    alignItems: "center",
    height: 50,
  },
  itemName: {
    width: 200,
  },
  addBtn: {
    width: 300,
    height: 80,
    backgroundColor: "#30d130",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 23,
    marginRight: 20,
    cursor: "pointer",
    color: "#fff",
  },
};
