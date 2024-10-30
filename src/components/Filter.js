import React from "react";
import colors from "../data/colors";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import filterSettings from "../mobx/filterSettings";
import {observer} from "mobx-react-lite";
import countryes from "../data/countryes";

const allStatuses = [
    {slug: "gotov", title: "Готов"},
    {slug: "vrabote", title: "В работе"},
    {slug: "ban", title: "Бан"},
    {slug: "statusAll", title: "Показать все"},
];

const allAdv = [
    {slug: "advYandex", title: "Яндекс"},
    {slug: "advGoogle", title: "Google"},
    {slug: "advAppstore", title: "AppStore"},
    {slug: "advAll", title: "Все"},
];

const allEngine = [
    {slug: "wordpress", title: "Wordpress"},
    {slug: "webarchive", title: "Webarchive"},
    {slug: "tilda", title: "Tilda"},
    {slug: "tilda2", title: "Tilda2"},
    {slug: "tilda_index", title: "Tilda Index"},
    {slug: "webarchivex", title: "Webarchivex"},
    {slug: "business", title: "Business"},
    {slug: "business2", title: "Business2"},
    {slug: "business3", title: "Business3"},
    {slug: "engineAll", title: "Все"},
];

function Filter({setShowFilter}) {
    const changeStatus = (stat) => {
        filterSettings.changeStatus(stat);
    };

    const changeAdv = (adv) => {
        filterSettings.changeAdv(adv);
    };

    const changeEngine = (engine) => {
        filterSettings.changeEngine(engine);
    };

    const changeCountry = (country) => {
        filterSettings.changeCountry(country);
    };

    const renderStatusCheckboxes = () => {
        return allStatuses.map((el) => (
            <div
                onClick={() => changeStatus(el.slug)}
                style={styles.checkboxItem}
                key={el.slug}
            >
                <FontAwesomeIcon
                    icon={filterSettings.settings[el.slug] ? "check-square" : "square"}
                    color={filterSettings.settings[el.slug] ? "#30d130" : "#d2d6d2"}
                    style={styles.checkbox}
                />
                <span>{el.title}</span>
            </div>
        ));
    };

    const renderAdvCheckboxes = () => {
        return allAdv.map((el) => (
            <div
                onClick={() => changeAdv(el.slug)}
                style={styles.checkboxItem}
                key={el.slug}
            >
                <FontAwesomeIcon
                    icon={filterSettings.settings[el.slug] ? "check-square" : "square"}
                    color={filterSettings.settings[el.slug] ? "#30d130" : "#d2d6d2"}
                    style={styles.checkbox}
                />
                <span>{el.title}</span>
            </div>
        ));
    };

    const renderEngineCheckboxes = () => {
        return allEngine.map((el) => (
            <div
                onClick={() => changeEngine(el.slug)}
                style={styles.checkboxItem}
                key={el.slug}
            >
                <FontAwesomeIcon
                    icon={filterSettings.settings[el.slug] ? "check-square" : "square"}
                    color={filterSettings.settings[el.slug] ? "#30d130" : "#d2d6d2"}
                    style={styles.checkbox}
                />
                <span>{el.title}</span>
            </div>
        ));
    };

    const renderCountryesCheckboxes = () => {
        return countryes
            .sort((a, b) => {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            })
            .map((el) => (
                <div
                    onClick={() => changeCountry(el.name)}
                    style={styles.checkboxItem}
                    key={el.code}
                >
                    <FontAwesomeIcon
                        icon={
                            filterSettings.settings.country === el.name
                                ? "check-square"
                                : "square"
                        }
                        color={
                            filterSettings.settings.country === el.name
                                ? "#30d130"
                                : "#d2d6d2"
                        }
                        style={styles.checkbox}
                    />
                    <span>{el.name[0].toUpperCase() + el.name.slice(1)}</span>
                </div>
            ));
    };

    return (
        <div style={styles.cont}>
            <div style={styles.mainBlock}>
                <FontAwesomeIcon
                    onClick={() => setShowFilter(false)}
                    icon="rectangle-xmark"
                    color="red"
                    style={styles.closePopup}
                />
                <div style={styles.title}>Фильтр</div>
                <div style={styles.subtitle}>Тип аккаунта</div>
                {renderAdvCheckboxes()}
                <div style={styles.subtitle}>Статус домена</div>
                {renderStatusCheckboxes()}
                <div style={styles.subtitle}>Движок сайта</div>
                {renderEngineCheckboxes()}
                <div style={styles.subtitle}>Страна</div>
                {renderCountryesCheckboxes()}
                <div
                    onClick={() => changeCountry("all")}
                    style={styles.checkboxItem}
                    key={"all"}
                >
                    <FontAwesomeIcon
                        icon={
                            filterSettings.settings.country === "all"
                                ? "check-square"
                                : "square"
                        }
                        color={
                            filterSettings.settings.country === "all" ? "#30d130" : "#d2d6d2"
                        }
                        style={styles.checkbox}
                    />
                    <span>Показать все</span>
                </div>
                <div style={styles.reset} onClick={filterSettings.reset}>
                    Сбросить все
                </div>
            </div>
        </div>
    );
}

const iconSize = 20;

const styles = {
    cont: {
        position: "fixed",
        top: 0,
        right: 0,
        backgroundColor: "#fff",
        width: 250,
        height: "100vh",
        border: "2px solid" + colors.darkGrey,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 6,
    },
    btn: {
        backgroundColor: colors.darkGrey,
        width: 200,
        height: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 30,
        cursor: "pointer",
        color: "#fff",
    },
    mainBlock: {
        width: "100%",
        overflow: "scroll",
        paddingBottom: 10,
        overscrollBehavior: "contain",
    },
    title: {
        textAlign: "center",
        marginTop: 20,
    },
    checkboxItem: {
        paddingLeft: 10,
        cursor: "pointer",
    },
    checkbox: {
        marginRight: 10,
        cursor: "pointer",
        width: iconSize,
        height: iconSize,
    },
    closePopup: {
        width: 20,
        height: 20,
        display: "block",
        cursor: "pointer",
        position: "absolute",
        top: 10,
        right: 10,
    },
    subtitle: {
        backgroundColor: "silver",
        padding: "4px 10px",
        fontWeight: "700",
        margin: "5px 0",
    },
    reset: {
        width: 150,
        height: 30,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        border: "1px solid silver",
        margin: "20px auto",
    },
};

export default observer(Filter);
