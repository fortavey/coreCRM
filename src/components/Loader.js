import React from "react";

function Loader({ height }) {
  return (
    <div style={{ ...styles.cont, height }}>
      <img
        style={styles.img}
        // src="https://media.tenor.com/8KWBGNcD-zAAAAAC/loader.gif"
        src="https://i.gifer.com/origin/b4/b4d657e7ef262b88eb5f7ac021edda87.gif"
      />
    </div>
  );
}

const styles = {
  cont: {
    width: "100%",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: 70,
  },
};

export default Loader;
