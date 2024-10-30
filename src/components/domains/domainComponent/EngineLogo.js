import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import colors from "../../../data/colors";
import engines from "../../../data/engines";
import prodPath from "../../../data/prodPath";
import domains from "../../../mobx/domains";
import loader from "../../../mobx/loader";

export default function EngineLogo({ domain, access }) {
  const [showChoosePopup, setShowChoosePopup] = useState(false);

  useEffect(() => {
    if (access < 45) setShowChoosePopup(false);
  }, [showChoosePopup]);

  const engineLogo = () => {
    return engines.find((e) => e.name === domain.engine).img;
  };

  const renderEnginesList = () => {
    return engines.map((e) => (
      <div
        style={styles.item}
        key={e.name}
        onClick={() => changeEngine(e.name)}
      >
        <img src={e.img} style={styles.logo} />
        <strong>{e.name}</strong>
      </div>
    ));
  };

  const changeEngine = (engine) => {
    loader.change(true);
    fetch(
      `${prodPath}/core/wp-admin/admin-ajax.php?action=update_engine&domain_id=${domain.id}&new_engine=${engine}`
    )
      .then((res) => res.json())
      .then((data) => {
        domains.updateList();
        setShowChoosePopup(false);
      })
      .catch((err) => console.log(err));
  };

  if (domain.engine)
    return (
      <div style={styles.border1} onClick={() => setShowChoosePopup(true)}>
        <img
          src={engineLogo()}
          style={styles.engineImg}
          title={domain.engine}
        />
        {showChoosePopup && (
          <div style={styles.popup}>
            <FontAwesomeIcon
              onClick={(e) => {
                e.stopPropagation();
                setShowChoosePopup(false);
              }}
              icon="rectangle-xmark"
              color="red"
              style={styles.closePopup}
            />
            {renderEnginesList()}
          </div>
        )}
      </div>
    );

  return (
    <div style={styles.border} onClick={() => setShowChoosePopup(true)}>
      <FontAwesomeIcon icon={"plus"} style={styles.engine} />
      {showChoosePopup && (
        <div style={styles.popup}>
          <FontAwesomeIcon
            onClick={(e) => {
              e.stopPropagation();
              setShowChoosePopup(false);
            }}
            icon="rectangle-xmark"
            color="red"
            style={styles.closePopup}
          />
          {renderEnginesList()}
        </div>
      )}
    </div>
  );
}

const styles = {
  engineImg: {
    width: 20,
    height: 20,
    marginRight: 5,
    cursor: "pointer",
  },
  engine: {
    width: 15,
    height: 15,
    cursor: "pointer",
    color: colors.darkGrey,
  },
  border1: {
    width: 20,
    height: 20,
    position: "relative",
    marginRight: 5,
  },
  border: {
    width: 20,
    height: 20,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: `1px solid ${colors.darkGrey}`,
    backgroundColor: "#fff",
    marginRight: 5,
    position: "relative",
  },
  popup: {
    width: 200,
    position: "absolute",
    top: "100%",
    left: "100%",
    backgroundColor: "#fff",
    border: "1px solid grey",
    zIndex: 6,
    padding: "25px 10px",
  },
  item: {
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid silver",
    paddingBottom: 5,
    marginBottom: 5,
    cursor: "pointer",
  },
  logo: {
    width: 25,
    marginRight: 10,
  },
  closePopup: {
    width: 15,
    height: 15,
    position: "absolute",
    top: 10,
    right: 10,
    cursor: "pointer",
    zIndex: 10,
  },
};
