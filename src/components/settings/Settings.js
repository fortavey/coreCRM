import React, { useEffect, useState } from "react";
import registrators from "../../mobx/registrators";
import hostings from "../../mobx/hostings";
import { observer } from "mobx-react-lite";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const currentDate = new Date();
const firstDayOfMonth = `${currentDate.getFullYear()}-${
  currentDate.getMonth() + 1
}-01`;

function Settings() {
  const [totalReg, setTotalReg] = useState(0);
  const [totalHost, setTotalHost] = useState(0);
  const [hostList, setHostList] = useState([]);
  const [regList, setRegList] = useState([]);

  const [startDate, setStartDate] = useState(new Date(firstDayOfMonth));
  const [endDate, setEndDate] = useState(currentDate);
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  useEffect(() => {
    const func = (v) => {
      return v.filter((el) => {
        const date = new Date(el.date.split(".").reverse().join("-"));
        if (date < endDate && date > startDate) return true;
        return false;
      });
    };
    setHostList(func(hostings.list));
    setRegList(func(registrators.list));
  }, [endDate]);

  useEffect(() => {
    setTotalHost(hostList.reduce((acc, el) => acc + parseInt(el.price), 0));
    setTotalReg(regList.reduce((acc, el) => acc + parseInt(el.price), 0));
  }, [hostList, regList]);

  useEffect(() => {
    setHostList(hostings.list);
    setRegList(registrators.list);
  }, [registrators.list, hostings.list]);

  const renderTable = (target) => {
    return target.map((r) => (
      <tr key={r.title}>
        <td style={{ ...styles.td, ...styles.date }}>{r.date}</td>
        <td style={{ ...styles.td, ...styles.title }}>{r.title}</td>
        <td style={{ ...styles.td, ...styles.price }}>{r.price} ₽</td>
      </tr>
    ));
  };

  const renderNormalDate = (date) => {
    var dd = date.getDate();
    if (dd < 10) dd = "0" + dd;

    var mm = date.getMonth() + 1;
    if (mm < 10) mm = "0" + mm;

    var yy = date.getFullYear();

    return dd + "." + mm + "." + yy;
  };

  const renderPeriod = () => {
    return endDate ? (
      <>
        <span>{renderNormalDate(startDate)}</span> -
        <span>{renderNormalDate(endDate)}</span>
      </>
    ) : (
      "Все время"
    );
  };

  return (
    <div style={styles.cont}>
      <div style={styles.topIconsBlock}>
        <div style={styles.btn}>
          <FontAwesomeIcon icon={"usd"} style={styles.usd} color={"green"} />
        </div>
      </div>
      <div style={styles.mainInfo}>
        <DatePicker
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
        />
        <div style={styles.infoRight}>
          <div>Период: {renderPeriod()}</div>
          <div>Хостинги: {totalHost} ₽</div>
          <div>Регистр.: {totalReg} ₽</div>
          <div style={styles.total}>TOTAL: {totalReg + totalHost} ₽</div>
        </div>
      </div>
      <div style={styles.mainBlock}>
        <table style={styles.table}>
          <thead>
            <tr>
              <td>Регистраторы</td>
            </tr>
          </thead>
          <tbody>{renderTable(regList)}</tbody>
        </table>
        <table style={styles.table}>
          <thead>
            <tr>
              <td>Хостинги</td>
            </tr>
          </thead>
          <tbody>{renderTable(hostList)}</tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  table: {
    backgroundColor: "#fff",
  },
  mainInfo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  infoRight: {
    marginLeft: 20,
    borderLeft: "2px solid grey",
    paddingLeft: 10,
  },
  total: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 20,
  },
  mainBlock: {
    display: "flex",
    justifyContent: "space-around",
  },
  td: {
    border: "1px solid silver",
    fontSize: 15,
  },
  date: {
    fontSize: 12,
    color: "grey",
    width: 80,
  },
  title: {
    width: 350,
  },
  price: {
    width: 60,
  },
  topIconsBlock: {
    padding: 10,
  },
  btn: {
    width: 70,
    height: 70,
    border: "1px solid silver",
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  usd: {
    width: 30,
    height: 30,
  },
};

export default observer(Settings);
