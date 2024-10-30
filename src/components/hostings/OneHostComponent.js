import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import EmailInfo from "../emails/EmailInfo";
import emails from "../../mobx/emails";
import Telegram from "./Telegram";
import { observer } from "mobx-react-lite";
import UpdatePrice from "../universal/UpdatePrice";

function OneHostComponent({ hostObj }) {
  const [domainsOpened, setDomainsOpened] = useState(false);
  const [emailInfo, setEmailInfo] = useState({});
  const [showEmailInfo, setShowEmailInfo] = useState(false);

  useEffect(() => {
    const email = emails.list.filter((e) => e.id === hostObj.email.ID)[0];
    setEmailInfo(email);
  }, []);

  return (
    <div style={styles.cont}>
      <UpdatePrice id={hostObj.id} />
      <div style={styles.title}>{hostObj.title}</div>
      <Telegram host={hostObj} />
      <hr />
      <div style={{ padding: 10 }}>
        <div style={styles.item}>
          Email: <span style={styles.resItem}>{hostObj.email.post_title}</span>
          <FontAwesomeIcon
            onClick={() => setShowEmailInfo(!showEmailInfo)}
            icon="circle-info"
            color="#66d4ed"
            style={styles.infoIcon}
          />
        </div>
        {showEmailInfo && <EmailInfo email={emailInfo} />}
        <div style={styles.item}>
          Ссылка:{" "}
          <a
            href={`https://${hostObj.link_account}`}
            target="_blank"
            style={styles.resItem}
          >
            {hostObj.link_account}
          </a>
        </div>
        <div style={styles.item}>
          Пароль: <span style={styles.resItem}>{hostObj.password}</span>
        </div>
        <hr />
        <div style={styles.title}>ISP панель</div>
        <div style={styles.item}>
          Ссылка:{" "}
          <a
            href={`https://${hostObj.isp_link}`}
            target="_blank"
            style={styles.resItem}
          >
            {hostObj.isp_link}
          </a>
        </div>
        <div style={styles.item}>
          Логин: <span style={styles.resItem}>{hostObj.isp_login}</span>
        </div>
        <div style={styles.item}>
          Пароль: <span style={styles.resItem}>{hostObj.isp_pass}</span>
        </div>
        <hr />
        <div style={styles.title}>FTP</div>
        <div style={styles.item}>
          Сервер: <span style={styles.resItem}>{hostObj.ftp}</span>
        </div>
        <div style={styles.item}>
          Логин:{" "}
          <span style={styles.resItem}>
            {hostObj.ftp_login || hostObj.isp_login}
          </span>
        </div>
        <div style={styles.item}>
          Пароль:{" "}
          <span style={styles.resItem}>
            {hostObj.ftp_password || hostObj.isp_pass}
          </span>
        </div>
        <hr />
        <div style={styles.title}>Домены</div>

        {!domainsOpened && (
          <div
            style={styles.openDomainListBtn}
            onClick={() => setDomainsOpened(true)}
          >
            <FontAwesomeIcon icon="angle-down" />
          </div>
        )}
        {domainsOpened && (
          <div style={styles.domainList}>
            {hostObj.domains.map((domain) => (
              <div style={styles.item} key={domain}>
                <a
                  href={`https://${domain}`}
                  target="_blank"
                  style={styles.resItem}
                >
                  {domain}
                </a>
              </div>
            ))}
          </div>
        )}
        {domainsOpened && (
          <div
            style={styles.openDomainListBtn}
            onClick={() => setDomainsOpened(false)}
          >
            <FontAwesomeIcon icon="angle-up" />
          </div>
        )}
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

export default observer(OneHostComponent);
