import React from "react";

export default function DataСhecking({ valueArr }) {
  return (
    <>
      <div style={styles.title}>Проверьте правильность данных</div>
      <table style={styles.table}>
        <thead></thead>
        <tbody>
          <tr style={styles.trCol}>
            <td style={styles.td} colSpan="2">
              Основной Email
            </td>
          </tr>
          <tr>
            <td style={styles.td}>Email</td>
            <td style={styles.td}>{valueArr[0]}</td>
          </tr>
          <tr>
            <td style={styles.td}>Пароль</td>
            <td style={styles.td}>{valueArr[1]}</td>
          </tr>
          <tr style={styles.trCol}>
            <td style={styles.td} colSpan="2">
              Дополнительный Email
            </td>
          </tr>
          <tr>
            <td style={styles.td}>Email</td>
            <td style={styles.td}>{valueArr[2]}</td>
          </tr>
          <tr>
            <td style={styles.td}>Пароль</td>
            <td style={styles.td}>{valueArr[3]}</td>
          </tr>
          <tr>
            <td style={styles.td}>Телефон</td>
            <td style={styles.td}>{valueArr[4]}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

const styles = {
  table: {
    margin: "auto",
  },
  title: {
    fontSize: 20,
    color: "grey",
    textAlign: "center",
    marginBottom: 20,
  },
  td: {
    border: "1px solid grey",
    padding: "5px 10px",
  },
  trCol: {
    textAlign: "center",
    backgroundColor: "silver",
  },
};
