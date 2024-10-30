import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import colors from "../../data/colors";
import addDomain from "../../mobx/addDomain";
import addDomains from "../../mobx/addDomains";
import user from "../../mobx/user";

export default function TopRightButtons({
  setShowFilter,
  showSearch,
  setShowSearch,
}) {
  return (
    <>
      <div style={styles.filterButtonBlock}>
        <FontAwesomeIcon
          onClick={() => setShowFilter(true)}
          icon={"sliders"}
          color={colors.darkGrey}
          style={styles.filterBtn}
        />
      </div>
      <div style={styles.searchButtonBlock}>
        <FontAwesomeIcon
          onClick={() => {
            setShowSearch(!showSearch);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          icon={"search"}
          color={colors.darkGrey}
          style={styles.searchBtn}
        />
      </div>
      {user.access > 90 && (
        <>
          <div style={styles.addButtonBlock}>
            <FontAwesomeIcon
              onClick={() => {
                addDomain.change(true);
              }}
              icon={"plus"}
              color={colors.darkGrey}
              style={styles.searchBtn}
            />
          </div>

          <div
            style={{ ...styles.addButtonBlock, ...styles.addButtonBlockMore }}
            onClick={() => {
              addDomains.change(true);
            }}
          >
            <FontAwesomeIcon
              icon={"clone"}
              color={colors.darkGrey}
              style={styles.searchBtn}
            />
          </div>
        </>
      )}
    </>
  );
}

const styles = {
  filterBtn: {
    width: 40,
    height: 40,
    cursor: "pointer",
  },
  searchBtn: {
    width: 30,
    height: 30,
    cursor: "pointer",
  },
  filterButtonBlock: {
    backgroundColor: "#fff",
    position: "fixed",
    top: 70,
    right: 0,
    zIndex: 5,
    padding: "5px 30px 5px 5px",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  searchButtonBlock: {
    backgroundColor: "#fff",
    position: "fixed",
    top: 135,
    right: 0,
    zIndex: 5,
    padding: "10px 34px 10px 10px",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  addButtonBlock: {
    backgroundColor: "#fff",
    position: "fixed",
    top: 200,
    right: 0,
    zIndex: 5,
    padding: "10px 34px 10px 10px",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  addButtonBlockMore: {
    top: 265,
  },
};
