import React, { useEffect, useState } from "react";
import hostings from "../../mobx/hostings";
import registrators from "../../mobx/registrators";
import loader from "../../mobx/loader";
import { observer } from "mobx-react-lite";
import prodPath from "../../data/prodPath";

function UpdatePrice({ id }) {
  const [cost, setCost] = useState(null);
  const [inputValue, setInputValue] = useState(0);

  useEffect(() => {
    const obj = [...hostings.list, ...registrators.list].find(
      (el) => el.id === id
    );
    setCost(obj.price);
  }, [hostings.list, registrators.list]);

  const updateLists = (data) => {
    console.log(data);
    hostings.updateList();
    registrators.updateList();
  };

  const updateCost = () => {
    loader.change(true);
    if (inputValue > 0) {
      fetch(
        `${prodPath}/core/wp-admin/admin-ajax.php?action=update_price&id=${id}&value=${inputValue}`
      )
        .then((res) => res.json())
        .then((data) => updateLists())
        .catch((err) => console.log(err));
    }
  };

  return (
    <div style={styles.cont}>
      {cost != 0 ? (
        <div style={styles.price}>{cost} ₽</div>
      ) : (
        <div style={styles.inputBlock}>
          <input
            style={styles.input}
            value={inputValue}
            onChange={(e) => setInputValue(parseInt(e.target.value))}
          />

          <button onClick={updateCost}>ok</button>
        </div>
      )}
    </div>
  );
}

const styles = {
  cont: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  price: {
    color: "green",
  },
  input: {
    width: 70,
  },
};

export default observer(UpdatePrice);
