import React, { useState } from "react";
import prodPath from "../../data/prodPath";
import emails from "../../mobx/emails";
import loader from "../../mobx/loader";

export default function AddEmail({
  valueArr,
  setShowAddEmailBlock,
  setValueArr,
}) {
  const [errorResponse, setErrorResponse] = useState(false);

  const addNewEmail = () => {
    loader.change(true);

    const title = valueArr[0].trim();
    const password_value = valueArr[1].trim();
    const email_dop_value = valueArr[2].trim();
    const pass_dop_value = valueArr[3].trim();
    const phone_dop_value = valueArr[4].trim();

    fetch(
      `${prodPath}/core/wp-admin/admin-ajax.php?action=add_email&title=${title}&password_value=${password_value}&email_dop_value=${email_dop_value}&pass_dop_value=${pass_dop_value}&phone_dop_value=${phone_dop_value}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (
          data.title &&
          data.password &&
          data.email_dop &&
          data.pass_dop &&
          data.phone_dop
        ) {
          setValueArr([]);
          setShowAddEmailBlock(false);
          emails.updateList();
        } else {
          setErrorResponse(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorResponse(true);
      });
  };

  const duplicate = emails.list.some(
    (email) => email.title.trim() === valueArr[0].trim()
  );

  const renderBtnOrErr = () => {
    if (errorResponse)
      return <div style={styles.errorText}>Ошибка оединения с сервером</div>;
    return (
      <div style={styles.btn} onClick={addNewEmail}>
        Все верно, добавить новый Email
      </div>
    );
  };

  return duplicate ? (
    <div style={styles.errorText}>Такой Email уже существует</div>
  ) : (
    renderBtnOrErr()
  );
}

const styles = {
  btn: {
    width: 300,
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    backgroundColor: "#30d130",
    borderRadius: 10,
    margin: "20px auto",
  },
  errorText: {
    color: "red",
    fontSize: 20,
    textAlign: "center",
    margin: "10px",
  },
};
