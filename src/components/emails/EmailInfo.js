import React from "react";

export default function EmailInfo({ email }) {
  return (
    <table style={{ marginBottom: 10 }}>
      <thead></thead>
      <tbody>
        <tr>
          <td style={styles.td}>{email.title}</td>
          <td style={styles.td}>{email.password}</td>
        </tr>
        <tr>
          <td style={styles.td}>{email.email_dop}</td>
          <td style={styles.td}>{email.pass_dop}</td>
          <td style={styles.td}>{email.phone_dop}</td>
        </tr>
      </tbody>
    </table>
  );
}

const styles = {
  td: {
    border: "1px solid grey",
    fontSize: 14,
    padding: "2px 5px",
  },
};
