import React from "react";
import emails from "../../mobx/emails";
import { observer } from "mobx-react-lite";

function EmailList() {
  const renderEmails = () => {
    return emails.list.map((email) => (
      <div style={styles.item} key={email.title}>
        {email.title} : {email.password} : {email.email_dop} : {email.pass_dop}{" "}
        : {email.phone_dop}
      </div>
    ));
  };
  return <div style={styles.cont}>{renderEmails()}</div>;
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
  },
  item: {
    borderBottom: "1px solid silver",
    marginBottom: 5,
  },
};

export default observer(EmailList);
