import React, {useEffect, useState} from "react";
import colors from "../data/colors";
import Domains from "./domains/Domains";
import Hostings from "./hostings/Hostings";
import Registrators from "./registrators/Registrators";
import Emails from "./emails/Emails";
import emails from "../mobx/emails";
import hostings from "../mobx/hostings";
import registrators from "../mobx/registrators";
import domains from "../mobx/domains";
import hostingDatePicker from "../mobx/hostingDatePicker";
import ChangeDate from "./hostings/ChangeDate";
import ChooseHostingComponent from "./hostings/ChooseHostingComponent";
import AddDomainComponent from "./domains/AddDomainComponent";
import AddDomainsComponent from "./domains/AddDomainsComponent";
import {observer} from "mobx-react-lite";
import hostingChoose from "../mobx/hostingChoose";
import registratorChoose from "../mobx/registratorChoose";
import ChooseRegistratorComponent from "./registrators/ChooseRegistratorComponent";
import addDomain from "../mobx/addDomain";
import addDomains from "../mobx/addDomains";
import Loader from "./Loader";
import loader from "../mobx/loader";
import GlobalError from "./GlobalError";
import globalError from "../mobx/globalError";
import user from "../mobx/user";
import Settings from "./settings/Settings";

const gradientColor = "rgba(163,162,173,1)";

function WorkComponent(props) {
    const [current, setCurrent] = useState(1);
    const [update, setUpdate] = useState(1);

    const updateAll = () => {
        domains.updateList();
        hostings.updateList();
        emails.updateList();
        registrators.updateList();
    };

    useEffect(() => {
        updateAll();
    }, []);

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            updateAll();
            setUpdate(Math.random());
            clearTimeout(timeOutId);
        }, 60000);
    }, [update]);


    const renderMainContent = () => {
        switch (current) {
            case 1:
                return <Domains/>;
                break;
            case 2:
                return <Hostings/>;
                break;
            case 3:
                return <Registrators/>;
                break;
            case 4:
                return <Emails/>;
                break;
            case 5:
                return <Settings/>;
                break;
            default:
                return <Domains/>;
        }
    };

    const renderHeaderItems = (num, name) => {
        return (
            <div
                onClick={() => setCurrent(num)}
                style={{
                    ...styles.item,
                    backgroundColor: current === num ? gradientColor : colors.darkGrey,
                    color: current === num ? "#000" : "#fff",
                    borderBottom: current === num ? "none" : "1px solid grey",
                }}
            >
                {name}
            </div>
        );
    };

    return user.access > 0 ? (
        <>
            <header style={styles.header}>
                {user.access > 0 && renderHeaderItems(1, "Домены")}
                {user.access > 41 && renderHeaderItems(2, "Хостинги")}
                {user.access > 41 && renderHeaderItems(3, "Регистраторы")}
                {user.access > 55 && renderHeaderItems(4, "Emails")}
                {user.access > 55 && renderHeaderItems(5, "Settings")}
            </header>
            <div style={styles.cont}>
                <main style={styles.main}>{renderMainContent()}</main>
            </div>
            {hostingDatePicker.show && <ChangeDate/>}
            {hostingChoose.show && <ChooseHostingComponent/>}
            {registratorChoose.show && <ChooseRegistratorComponent/>}
            {addDomain.show && <AddDomainComponent/>}
            {addDomains.show && <AddDomainsComponent/>}
            {loader.show && (
                <div style={styles.bigLoader}>
                    <Loader/>
                </div>
            )}
            {globalError.show && <GlobalError/>}
        </>
    ) : (
        <div style={{marginTop: 20, textAlign: "center"}}>
            У Вас нет прав доступа. Обратитесь к администратору
        </div>
    );
}

const styles = {
    cont: {
        background: "rgb(163,162,173)",
        background:
            "linear-gradient(180deg, rgba(163,162,173,1) 0%, rgba(255,255,255,1) 29%, rgba(255,255,255,1) 100%)",
    },
    header: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
    },
    main: {
        paddingTop: 10,
    },
    item: {
        textAlign: "center",
        width: "100%",
        height: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        border: "1px solid grey",
    },
    bigLoader: {
        width: "100%",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        backgroundColor: "rgba(0,0,0,0.5)",
    },
};

export default observer(WorkComponent);
