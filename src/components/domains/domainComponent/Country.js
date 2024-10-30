import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import colors from "../../../data/colors";
import domains from "../../../mobx/domains";
import loader from "../../../mobx/loader";
import countryes from "../../../data/countryes";
import prodPath from "../../../data/prodPath";

export default function Country({ domain, access }) {
  const countryCode = () => {
    return countryes.find((c) => c.name === domain.country).code;
  };

  const [showChoosePopup, setShowChoosePopup] = useState(false);

  useEffect(() => {
    if (access < 45) setShowChoosePopup(false);
  }, [showChoosePopup]);

  const renderCountryesList = () => {
    return countryes.map((c) => (
      <div
        style={styles.item}
        key={c.name}
        onClick={() => changeCountry(c.name)}
      >
        <strong style={{ color: "#000" }}>
          {c.name[0].toUpperCase() + c.name.slice(1)}
        </strong>
      </div>
    ));
  };

  const changeCountry = (country) => {
    loader.change(true);
    fetch(
      `${prodPath}/core/wp-admin/admin-ajax.php?action=update_country&domain_id=${domain.id}&new_country=${country}`
    )
      .then((res) => res.json())
      .then((data) => {
        domains.updateList();
        setShowChoosePopup(false);
      })
      .catch((err) => console.log(err));
  };

  if (domain.country)
    return (
      <div
        style={styles.country}
        onClick={() => setShowChoosePopup(true)}
        title={domain.country[0].toUpperCase() + domain.country.slice(1)}
      >
        {countryCode()}
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
            {renderCountryesList()}
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
          {renderCountryesList()}
        </div>
      )}
    </div>
  );
}

const styles = {
  country: {
    fontSize: 12,
    width: 20,
    height: 20,
    cursor: "pointer",
    backgroundColor: "#66d4ed",
    color: "#fff",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginRight: 5,
    position: "relative",
  },
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
  border: {
    width: 20,
    height: 20,
    borderRadius: 10,
    display: "flex",
    fontSize: 12,
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
