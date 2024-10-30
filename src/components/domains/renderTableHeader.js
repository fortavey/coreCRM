import React, { useEffect, useState } from "react";
import tableStyles from "./tableStyles";

const renderTableHeader = (access) => {
  const [position, setPosition] = useState("relative");
  useEffect(() => {
    window.addEventListener("scroll", fixedHeader);
  }, []);

  const fixedHeader = () => {
    if (window.pageYOffset > 60 && position === "relative")
      setPosition("fixed");
    if (window.pageYOffset < 60) setPosition("relative");
  };

  return (
    <thead style={{ ...styles.thead, position }}>
      <tr style={styles.item}>
        <th style={styles.number}>#</th>
        <th style={styles.date}>Дата</th>
        <th style={styles.title}>Домен</th>
        {access > 9 && <th style={styles.hosting}>Хостинг</th>}
        {access > 9 && <th style={styles.registrator}>Регистр.</th>}
        <th style={styles.statusItem}>Готов</th>
        <th style={styles.statusItem}>В работе</th>
        <th style={styles.statusItem}>Бан</th>
      </tr>
    </thead>
  );
};

const styles = {
  ...tableStyles,
  thead: {
    top: 0,
    zIndex: 2,
    backgroundColor: "#fff",
  },
};

export default renderTableHeader;
