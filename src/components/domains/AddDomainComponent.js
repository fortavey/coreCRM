import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import registratorChoose from "../../mobx/registratorChoose";
import registrators from "../../mobx/registrators";
import addDomain from "../../mobx/addDomain";
import prodPath from "../../data/prodPath";
import domains from "../../mobx/domains";
import loader from "../../mobx/loader";
import globalError from "../../mobx/globalError";

function AddDomainComponent() {
  const [title, setTitle] = useState("");
  const [registrator, setRegistrator] = useState({ title: "" });

  useEffect(() => {
    if (registrators.list.length && registratorChoose.regId)
      setRegistrator(
        registrators.list.find((r) => r.id == registratorChoose.regId)
      );
  }, [registratorChoose.regId]);

  const addRegistratorOpen = () => {
    registratorChoose.change(true);
  };

  const reset = () => {
    registratorChoose.setRegId(0);
    domains.updateList();
    addDomain.change(false);
  };

  const createNewDomain = () => {
    if (domains.list.some((d) => d.title === title)) {
      globalError.change(true, "Сайт с таким именем уже существует");
      reset();
      return;
    }
    loader.change(true);
    fetch(
      `${prodPath}/core/wp-admin/admin-ajax.php?action=add_domain&title=${title}&registrator_id=${registrator.id}`
    )
      .then((res) => res.json())
      .then((data) => {
        reset();
      })
      .catch((err) => console.log(err));
  };

  const clearDomainName = (domainName) => {
    let str = domainName;
    str = str.trim().replace(/^https?:\/\//, "");
    return str;
  };

  return (
    <div style={styles.container} onClick={() => addDomain.change(false)}>
      <div style={styles.contentBlock} onClick={(e) => e.stopPropagation()}>
        <div style={styles.title}>Добавление нового домена</div>

        <div style={styles.subTitle}>Обязательные данные</div>

        <div style={styles.itemBlock}>
          <div style={styles.itemName}>Название</div>
          <input
            style={styles.input}
            value={title}
            onChange={(e) => setTitle(clearDomainName(e.target.value))}
          />
        </div>

        <div style={styles.itemBlock}>
          <div style={styles.itemName}>Регистратор</div>
          <strong>{registrator.title}</strong>
          <FontAwesomeIcon
            icon={registrator.title ? "edit" : "plus"}
            color="#30d130"
            style={
              registrator.title ? styles.addEmailIconSmall : styles.addEmailIcon
            }
            onClick={addRegistratorOpen}
          />
        </div>
        <div style={styles.subTitle}>Не обязательные данные</div>
        {title && registrator.id && (
          <div style={styles.addBtn} onClick={createNewDomain}>
            Создать
          </div>
        )}
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
    width: 800,
    height: 500,
    position: "relative",
    backgroundColor: "#fff",
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
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
    width: 250,
    height: 40,
    backgroundColor: "#30d130",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    marginRight: 20,
    cursor: "pointer",
    color: "#fff",
    marginTop: "auto",
    marginLeft: "auto",
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

export default observer(AddDomainComponent);
