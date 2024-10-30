import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import EmailInfo from "../emails/EmailInfo";
import emails from "../../mobx/emails";
import domains from '../../mobx/domains'

function OneRegComponent({ regObj }) {
  const [domainsOpened, setDomainsOpened] = useState(false);
  const [emailInfo, setEmailInfo] = useState({});
  const [showEmailInfo, setShowEmailInfo] = useState(false);

  useEffect(() => {
    const email = emails.list.filter((e) => e.id === regObj.email.ID)[0];
    setEmailInfo(email);
  }, []);

  const renderDomainsCount = () => {
    const domainsFromRegistarator = domains.list.filter(el => el.registrator.ID === regObj.id)
    return domainsFromRegistarator.length
  }

  return (
    <div style={styles.cont}>
      
      <div style={styles.title}>{regObj.title} ({renderDomainsCount()})</div>
      <hr />
      <div style={{ padding: 10 }}>
        <div style={styles.item}>
          Email: <span style={styles.resItem}>{regObj.email.post_title}</span>
          <FontAwesomeIcon
            onClick={() => setShowEmailInfo(!showEmailInfo)}
            icon="circle-info"
            color="#66d4ed"
            style={styles.infoIcon}
          />
        </div>
        {showEmailInfo && <EmailInfo email={emailInfo} />}
        <div style={styles.item}>
          Пароль: <span style={styles.resItem}>{regObj.password}</span>
        </div>
        <hr />
      </div>
    </div>
  );
}

const styles = {
  cont: {
    border: "1px solid grey",
    borderRadius: 15,
    paddingTop: 10,
    margin: "auto",
    marginBottom: 20,
    maxWidth: 600,
    minWidth: 500,
    flexGrow: 1,
    backgroundColor: "#fff",
    boxShadow: "0px 14px 32px -8px rgba(0,0,0,0.75)",
    position: "relative",
  },
  title: {
    textAlign: "center",
    fontWeight: 700,
  },
  item: {
    fontWeight: 700,
    marginBottom: 5,
    display: "flex",
    alignItems: "center",
  },
  resItem: {
    fontWeight: 400,
    fontStyle: "italic",
  },
  openDomainListBtn: {
    backgroundColor: "silver",
    padding: 5,
    textAlign: "center",
    cursor: "pointer",
  },
  infoIcon: { width: 20, height: 20, cursor: "pointer", marginLeft: 10 },
};

export default OneRegComponent;
