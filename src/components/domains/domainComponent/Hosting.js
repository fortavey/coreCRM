import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import hostingDatePicker from "../../../mobx/hostingDatePicker";
import hostingChoose from "../../../mobx/hostingChoose";
import colors from "../../../data/colors";

export default function Hosting({ domain, openPopupHandler }) {
  const renderHostTimeColor = () => {
    if (domain.is_end) return "red";
    if (domain.hours_left < 24) return "red";
    if (domain.hours_left < 125) return "yellow";
    return "#30d130";
  };

  const renderHostInfo = () => {
    if (domain.hosting)
      return (
        <>
          <div
            style={{
              ...styles.hostPaymentTime,
              backgroundColor: renderHostTimeColor(),
            }}
            onClick={() => {
              hostingDatePicker.change(true);
              hostingDatePicker.setId(domain.hosting.ID);
            }}
          >
            {domain.hosting_payment
              ? domain.hosting_payment.split("-").reverse().join(".")
              : "??.??.????"}
          </div>
          <FontAwesomeIcon
            onClick={() => {
              openPopupHandler({
                type: "host",
                hostId: domain.hosting.ID,
              });
            }}
            icon="circle-info"
            color="#66d4ed"
            style={styles.checkboxInfo}
          />
        </>
      );

    return (
      <div
        style={styles.border}
        onClick={() => {
          hostingChoose.setId(domain.id);
          hostingChoose.change(true);
        }}
      >
        <FontAwesomeIcon icon={"plus"} style={styles.engine} />
      </div>
    );
  };

  return <>{renderHostInfo()}</>;
}

const styles = {
  hostPaymentTime: {
    fontSize: 12,
    padding: "2px 5px",
    borderRadius: 6,
    marginRight: 2,
    cursor: "pointer",
  },
  checkboxInfo: {
    cursor: "pointer",
    width: 18,
    height: 18,
    display: "block",
    marginRight: 10,
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
    marginLeft: 20,
    alignItems: "center",
    justifyContent: "center",
    border: `1px solid ${colors.darkGrey}`,
    backgroundColor: "#fff",
    marginRight: 5,
  },
};
