import domains from "../../mobx/domains";
import filterSettings from "../../mobx/filterSettings";
import user from "../../mobx/user";

const chooseStatus = (d) => {
    if (filterSettings.settings.sozdan && d.status === "создан") {
        return true;
    } else if (filterSettings.settings.gotov && d.status === "готов") {
        return true;
    } else if (filterSettings.settings.vrabote && d.status === "в работе") {
        return true;
    } else if (filterSettings.settings.ban && d.status === "бан") {
        return true;
    } else if (filterSettings.settings.statusAll) {
        return true;
    }
    return false;
};

const chooseAdv = (d) => {
    if (filterSettings.settings.advYandex && d.adv_type === "yandex") {
        return true;
    } else if (filterSettings.settings.advGoogle && d.adv_type === "google") {
        return true;
    } else if (filterSettings.settings.advAppstore && d.adv_type === "appstore") {
        return true;
    } else if (filterSettings.settings.advAll) {
        return true;
    }
    return false;
};

const chooseEngine = (d) => {
    if (filterSettings.settings.tilda && d.engine === "tilda") {
        return true;
    } else if (filterSettings.settings.tilda2 && d.engine === "tilda2") {
        return true;
    } else if (filterSettings.settings.tilda_index && d.engine === "tilda_index") {
        return true;
    } else if (filterSettings.settings.wordpress && d.engine === "wordpress") {
        return true;
    } else if (filterSettings.settings.webarchive && d.engine === "webarchive") {
        return true;
    } else if (filterSettings.settings.webarchivex && d.engine === "webarchivex") {
        return true;
    } else if (filterSettings.settings.business && d.engine === "business") {
        return true;
    } else if (filterSettings.settings.business2 && d.engine === "business2") {
        return true;
    } else if (filterSettings.settings.engineAll) {
        return true;
    }
    return false;
};

const chooseCountry = (d) => {
    if (d.hasOwnProperty("country")) {
        if (filterSettings.settings.country === d.country) {
            return true;
        } else if (filterSettings.settings.country === "all") {
            return true;
        }
    }
    return false;
};

const renderNewDomain = (d) => {
    if (!d.hosting) {
        return user.access > 90 ? true : false;
    }
    return true;
};

const filterDomainListFunction = (searchValue, showAttentionDomains) => {
    return domains.list.filter((d) => {
        if (!renderNewDomain(d)) return false;
        if (showAttentionDomains) {
            if (d.is_end || d.hours_left < 48) return true;
        } else if (searchValue !== "") {
            if (searchValue.trim().split('?')[0] === d.title.split('?')[0]) return true;
        } else {
            if (
                chooseStatus(d) &&
                chooseAdv(d) &&
                chooseEngine(d) &&
                chooseCountry(d)
            )
                return true;
        }
    });
};

export default filterDomainListFunction;
