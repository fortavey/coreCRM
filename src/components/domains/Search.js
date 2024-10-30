import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Search({ searchValue, setSearchValue }) {
  return (
    <div style={styles.searchBlock}>
      <input
        style={styles.searchInput}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <div style={styles.clearSearchBtn} onClick={() => setSearchValue("")}>
        <FontAwesomeIcon
          icon={"close"}
          color={"grey"}
          style={styles.clearSearchBtnIcon}
        />
      </div>
    </div>
  );
}

const styles = {
  searchBlock: {
    maxWidth: 1155,
    margin: "10px auto",
    position: "relative",
  },
  searchInput: {
    width: "100%",
    height: 50,
    boxSizing: "border-box",
    paddingLeft: 10,
    fontSize: 20,
    color: "grey",
    outline: "none",
  },
  clearSearchBtn: {
    position: "absolute",
    right: 10,
    top: 10,
    cursor: "pointer",
  },
  clearSearchBtnIcon: {
    width: 30,
    height: 30,
  },
};
