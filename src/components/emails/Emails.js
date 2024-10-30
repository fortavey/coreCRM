import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import AddEmail from "./AddEmail";
import DataСhecking from "./DataСhecking";
import EmailInput from "./EmailInput";
import EmailList from "./EmailList";
import { observer } from "mobx-react-lite";

function Emails() {
  const [valueArr, setValueArr] = useState([]);
  const [showAddEmailBlock, setShowAddEmailBlock] = useState(false);

  useEffect(() => {
    if (valueArr.length === 4) {
      const title = valueArr[0].trim();
      const password_value = valueArr[1].trim();
      const email_dop_value = valueArr[3].trim();
      const pass_dop_value = "NO";
      const phone_dop_value = valueArr[2].trim();

      setValueArr([
        title,
        password_value,
        email_dop_value,
        pass_dop_value,
        phone_dop_value,
      ]);
    }
  }, [valueArr]);

  return (
    <>
      {showAddEmailBlock ? (
        <div style={styles.cont}>
          <EmailInput setValueArr={setValueArr} valueArr={valueArr} />
          {valueArr.length === 5 && (
            <>
              <DataСhecking valueArr={valueArr} />
              <AddEmail
                valueArr={valueArr}
                setShowAddEmailBlock={setShowAddEmailBlock}
                setValueArr={setValueArr}
              />
            </>
          )}
        </div>
      ) : (
        <div
          style={styles.addButton}
          onClick={() => setShowAddEmailBlock(true)}
        >
          <FontAwesomeIcon
            icon={"plus"}
            color="#30d130"
            style={styles.addIcon}
          />
          Добавить новый Email
        </div>
      )}
      <EmailList />
    </>
  );
}

const styles = {
  cont: {
    width: "100%",
    maxWidth: 1200,
    margin: "auto",
    boxShadow: "0px 14px 32px -8px rgba(0,0,0,0.75)",
    backgroundColor: "#fff",
    paddingBottom: 20,
  },
  addIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  addButton: {
    width: "100%",
    maxWidth: 1200,
    height: 60,
    margin: "auto",
    boxShadow: "0px 14px 32px -8px rgba(0,0,0,0.75)",
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    paddingLeft: 20,
  },
};

export default observer(Emails);
