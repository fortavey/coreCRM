import React, { useState, useEffect } from "react";

export default function EmailInput({ valueArr, setValueArr }) {
  const [inputValue, setInputValue] = useState(valueArr[0] || "");

  useEffect(() => {
    setValueArr(inputValue.split(":"));
  }, [inputValue]);

  return (
    <div style={styles.addEmailBlock}>
      <div style={styles.title}>Вставьте информацию о Email</div>
      <input
        style={styles.input}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  );
}

const styles = {
  addEmailBlock: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    color: "grey",
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    height: 50,
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
  },
};
