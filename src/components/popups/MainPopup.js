import React from "react";
import popupStyles from "./popupStyles";

export default function MainPopup({ setShowPopup, children }) {
  return (
    <div style={styles.container} onClick={() => setShowPopup(false)}>
      <div style={styles.contentBlock} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
const styles = {
  ...popupStyles,
};
