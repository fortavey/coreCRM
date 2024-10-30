import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import tableStyles from "../domains/tableStyles";
import {observer} from "mobx-react-lite";
import Country from "./domainComponent/Country";
import CheckBox from "./domainComponent/CheckBox";
import AttentionIcon from "./domainComponent/AttentionIcon";
import EngineLogo from "./domainComponent/EngineLogo";
import DomainTitle from "./domainComponent/DomainTitle";
import Hosting from "./domainComponent/Hosting";
import Registrator from "./domainComponent/Registrator";
import CopyComponent from "./domainComponent/CopyComponent";


function DomainComponent({domain, openPopupHandler, idx, access}) {
    const renderBgColor = () => {
        if (!domain.hosting) return "silver";
        return domain.is_end ? "red" : "#fff";
    };

    const renderAdvType = () => {
        if (domain.adv_type === "yandex")
            return (
                <div style={styles.ya} title="Яндекс">
                    Я
                </div>
            );
        else if (domain.adv_type === "google")
            return (
                <div style={styles.google} title="Google">
                    G
                </div>
            );
        else if (domain.adv_type === "appstore")
            return (
                <div style={styles.google} title="AppStore">
                    A
                </div>
            );
    };

    return (
        <>
            <tr
                style={{
                    ...styles.item,
                    backgroundColor: renderBgColor(),
                }}
            >
                {/* Порядковый Номер */}
                <td style={styles.number}>{idx + 1}</td>

                {/* Дата создания */}
                <td style={styles.date}>{domain.date}</td>

                {/* Имя домена */}
                <td style={styles.title}>
                    {domain.adv_type !== "appstore" && (
                        <Country domain={domain} access={access}/>
                    )}
                    {domain.adv_type !== "appstore" && (
                        <EngineLogo domain={domain} access={access}/>
                    )}
                    {renderAdvType()}
                    <DomainTitle domain={domain}/>
                    <CopyComponent domain={domain}/>
                </td>

                {/* Хостинг */}
                {access > 9 && (
                    <td style={styles.hosting}>
                        <Hosting domain={domain} openPopupHandler={openPopupHandler}/>
                    </td>
                )}

                {/* Регистратор */}
                {access > 9 && (
                    <td style={styles.registrator}>
                        <Registrator domain={domain} openPopupHandler={openPopupHandler}/>
                    </td>
                )}

                {/* Блоки с галочками */}
                <CheckBox domain={domain} status={"готов"}/>
                <CheckBox domain={domain} status={"в работе"}/>
                <CheckBox domain={domain} status={"бан"}/>

                {/* Иконка удаления домена */}
                {domain.status === "бан" && (
                    <td style={styles.tdAbsolute}>
                        <FontAwesomeIcon
                            onClick={() =>
                                openPopupHandler({
                                    type: "remove",
                                    domeinOnRemove: domain,
                                })
                            }
                            icon={"trash"}
                            color={"red"}
                            style={styles.trash}
                        />
                    </td>
                )}

                {/* Предупреждение об оплате хостинга */}
                <AttentionIcon domain={domain}/>
            </tr>
        </>
    );
}

const iconSize = 20;

const styles = {
    ...tableStyles,
    checkbox: {
        cursor: "pointer",
        width: iconSize,
        height: iconSize,
    },
    trash: {
        width: 25,
        height: 25,
        cursor: "pointer",
    },
    tdAbsolute: {
        position: "absolute",
        top: 3,
        right: -35,
    },
    popupMsg: {
        backgroundColor: "#fff",
        position: "absolute",
        bottom: "100%",
        width: 200,
        padding: 5,
        border: "1px solid red",
    },
    ya: {
        fontSize: 12,
        width: 20,
        height: 20,
        cursor: "pointer",
        backgroundColor: "#F7C505",
        color: "#DE2320",
        fontWeight: "700",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginRight: 5,
    },
    google: {
        fontSize: 12,
        width: 20,
        height: 20,
        cursor: "pointer",
        backgroundColor: "#1763CC",
        color: "#fff",
        fontWeight: "700",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginRight: 5,
    },
};

export default observer(DomainComponent);
