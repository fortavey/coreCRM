import React, { useEffect, useState } from "react";
import hostingDatePicker from "../../mobx/hostingDatePicker";
import hostings from "../../mobx/hostings";
import DatePicker from "react-datepicker";
import prodPath from "../../data/prodPath";
import domains from "../../mobx/domains";
import loader from "../../mobx/loader";

let hostDate = false;
try {
  hostDate = hostings.list.filter((host) => host.id === hostingDatePicker.id)[0]
    .payment_time;
} catch {
  hostDate = false;
}

function ChangeDate() {
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    if (hostDate) setStartDate(new Date(hostDate));
  }, []);

  const saveNewDate = () => {
    loader.change(true);
    fetch(
      `${prodPath}/core/wp-admin/admin-ajax.php?action=update_host_date&id=${
        hostingDatePicker.id
      }&new_date=${startDate.toISOString().split("T")[0]}`
    )
      .then((res) => res.json())
      .then((data) => {
        hostings.updateList();
        domains.updateList();
        hostingDatePicker.change(false);
      });
  };

  return (
    <div style={styles.container}>
      <div style={styles.contentBlock}>
        <div style={styles.title}>Выберите дату следующего платежа</div>
        <>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            autoFocus={true}
          />
          <div style={styles.btn} onClick={saveNewDate}>
            Сохранить
          </div>
        </>
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: "fixed",
    width: "100%",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.5)",
    top: 0,
    left: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "scroll",
    paddingTop: 20,
  },
  contentBlock: {
    padding: "40px 20px",
    width: 400,
    height: 290,
    position: "relative",
    backgroundColor: "#fff",
    borderRadius: 10,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    color: "grey",
    textAlign: "center",
    marginBottom: 20,
  },
  flex: {
    display: "flex",
    justifyContent: "space-between",
    height: 270,
    alignItems: "flex-end",
  },
  btn: {
    width: 140,
    height: 30,
    border: "1px solid silver",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    marginTop: 90,
  },
};

export default ChangeDate;
