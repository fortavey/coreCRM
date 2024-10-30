import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChooseEmailComponent from "../emails/ChooseEmailComponent";
import prodPath from "../../data/prodPath";
import hostings from "../../mobx/hostings";
import loader from "../../mobx/loader";

export default function AddHosting({ setShowAddHostingBlock }) {
  const [title, setTitle] = useState("");

  const [linkAccount, setLinkAccount] = useState("");
  const [email, setEmail] = useState({ title: "" });
  const [pass, setPass] = useState("");

  const [linkISP, setLinkISP] = useState("");
  const [loginISP, setLoginISP] = useState("");
  const [passISP, setPassISP] = useState("");

  const [serverFTP, setServerFTP] = useState("");

  const [showChooseEmailPopup, setShowChooseEmailPopup] = useState(false);

  useEffect(() => setShowChooseEmailPopup(false), [email]);

  const addEmailOpen = () => {
    setShowChooseEmailPopup(true);
  };

  const clearLink = (link) => {
    let str = link;
    str = str.trim().replace(/^https?:\/\//, "");
    str = str.replace(/\/$/, "");
    return str;
  };

  const resetAll = () => {
    setTitle("");
    setEmail({ title: "" });
    setPass("");
    setShowAddHostingBlock(false);
  };

  const sendAddHostingRequest = () => {
    loader.change(true);
    fetch(
      `${prodPath}/core/wp-admin/admin-ajax.php?action=add_hosting&title=${title}&link_account_value=${linkAccount}&password_value=${pass}&email_id=${email.id}&isp_link_value=${linkISP}&isp_login_value=${loginISP}&isp_pass_value=${passISP}&ftp_value=${serverFTP}`
    )
      .then((res) => res.json())
      .then((data) => {
        hostings.updateList();
        resetAll();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={styles.cont}>
      <div>
        <div style={styles.title}>Добавление нового хостинга</div>

        <div style={styles.itemBlock}>
          <div style={styles.itemName}>Название</div>
          <input
            style={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div style={styles.subTitle}>Аккаунт</div>
        <div style={styles.itemBlock}>
          <div style={styles.itemName}>Ссылка</div>
          <input
            style={styles.input}
            value={linkAccount}
            onChange={(e) => setLinkAccount(clearLink(e.target.value))}
          />
        </div>

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
            onChange={(e) => setPass(e.target.value)}
          />
        </div>

        <div style={styles.subTitle}>ISP панель</div>

        <div style={styles.itemBlock}>
          <div style={styles.itemName}>Ссылка</div>
          <input
            style={styles.input}
            value={linkISP}
            onChange={(e) => setLinkISP(clearLink(e.target.value))}
          />
        </div>

        <div style={styles.itemBlock}>
          <div style={styles.itemName}>Логин</div>
          <input
            style={styles.input}
            value={loginISP}
            onChange={(e) => setLoginISP(e.target.value)}
          />
        </div>

        <div style={styles.itemBlock}>
          <div style={styles.itemName}>Пароль</div>

          <input
            style={styles.input}
            value={passISP}
            onChange={(e) => setPassISP(e.target.value)}
          />
        </div>

        <div style={styles.subTitle}>FTP доступ</div>

        <div style={styles.itemBlock}>
          <div style={styles.itemName}>Сервер</div>
          <input
            style={styles.input}
            value={serverFTP}
            onChange={(e) => setServerFTP(clearLink(e.target.value))}
          />
        </div>

        {showChooseEmailPopup && (
          <ChooseEmailComponent
            setEmail={setEmail}
            type="hostings"
            setShowChooseEmailPopup={setShowChooseEmailPopup}
          />
        )}
      </div>
      {title &&
        email.title &&
        pass &&
        linkISP &&
        loginISP &&
        passISP &&
        serverFTP && (
          <div style={styles.addBtn} onClick={sendAddHostingRequest}>
            Добавить
          </div>
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
  subTitle: {
    backgroundColor: "silver",
    padding: 5,
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    textShadow: "2px 1px 1px #000",
  },
};
