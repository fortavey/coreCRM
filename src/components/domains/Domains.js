import React, { useEffect, useState } from "react";
import DomainComponent from "./DomainComponent";
import tableStyles from "../domains/tableStyles";
import HostingPopup from "../popups/HostingPopup";
import RegistratorPopup from "../popups/RegistratorPopup";
import Filter from "../Filter";
import RemoveSitePopup from "../popups/RemoveSitePopup";
import Search from "./Search";
import TopRightButtons from "./TopRightButtons";
import MainPopup from "../popups/MainPopup";
import renderTableHeader from "./renderTableHeader";
import filterDomainListFunction from "./filterDomainFunction";
import AttentionComponent from "./AttentionComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { observer } from "mobx-react-lite";
import user from "../../mobx/user";

function Domains(props) {
  const [showPopup, setShowPopup] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [currentPopup, setCurrentPopup] = useState(<></>);
  const [showAttentionDomains, setShowAttentionDomains] = useState(false);

  // Функция отрисовки списка доменов
  const renderDomainList = () => {
    return filterDomainListFunction(searchValue, showAttentionDomains).map(
      (domain, idx) => (
        <DomainComponent
          setShowPopup={setShowPopup}
          domain={domain}
          key={domain.id}
          openPopupHandler={openPopupHandler}
          idx={idx}
          access={user.access}
        />
      )
    );
  };

  // Обработчик открытия попап окна из DomainComponent
  const openPopupHandler = (props) => {
    setShowPopup(true);
    if (props.type === "host")
      setCurrentPopup(<HostingPopup hostId={props.hostId} />);
    if (props.type === "registrator")
      setCurrentPopup(<RegistratorPopup regId={props.regId} />);
    if (props.type === "remove")
      setCurrentPopup(
        <RemoveSitePopup
          domeinOnRemove={props.domeinOnRemove}
          setShowPopup={setShowPopup}
        />
      );
  };

  return (
    <div>
      <>
        <AttentionComponent setShowAttentionDomains={setShowAttentionDomains} />
        {showSearch && (
          <Search searchValue={searchValue} setSearchValue={setSearchValue} />
        )}
        {showAttentionDomains && (
          <div
            style={styles.attentionTopElement}
            onClick={() => setShowAttentionDomains(false)}
          >
            Домены требующие внимания
            <FontAwesomeIcon
              onClick={() => setShowFilter(false)}
              icon="rectangle-xmark"
              color="grey"
              style={styles.closeAttention}
            />
          </div>
        )}
        <table style={styles.table}>
          {renderTableHeader(user.access)}
          <tbody>{renderDomainList()}</tbody>
        </table>
      </>

      {showPopup && (
        <MainPopup setShowPopup={setShowPopup}>{currentPopup}</MainPopup>
      )}

      {showFilter && <Filter setShowFilter={setShowFilter} />}

      <TopRightButtons
        setShowFilter={setShowFilter}
        showSearch={showSearch}
        setShowSearch={setShowSearch}
      />
    </div>
  );
}

const styles = {
  ...tableStyles,
  table: {
    margin: "auto",
    boxShadow: "0px 14px 32px -8px rgba(0,0,0,0.75)",
    backgroundColor: "#fff",
  },
  attentionTopElement: {
    backgroundColor: "#fff",
    border: "1px solid grey",
    height: 30,
    width: 200,
    borderRadius: 5,
    fontSize: 14,
    padding: 5,
    margin: "0 auto 10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  closeAttention: {
    cursor: "pointer",
  },
};

export default observer(Domains);
