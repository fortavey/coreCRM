import {action, makeObservable, observable} from "mobx";

class FilterSettings {
    settings = {
        // Статус
        gotov: false,
        vrabote: false,
        ban: false,
        statusAll: true,
        // Рекламный аккаунт
        advGoogle: false,
        advYandex: false,
        advAppstore: false,
        advAll: true,
        // Движок сайта
        tilda: false,
        tilda2: false,
        tilda_index: false,
        wordpress: false,
        webarchive: false,
        webarchivex: false,
        business: false,
        business2: false,
        engineAll: true,
        // Страна
        country: "all",
        server: 'all'
    };

    constructor(
        settings,
        changeStatus,
        changeAdv,
        changeEngine,
        changeCountry,
        changeServer,
        reset
    ) {
        makeObservable(this, {
            settings: observable,
            changeStatus: action,
            changeAdv: action,
            changeEngine: action,
            changeCountry: action,
            changeServer: action,
            reset: action,
        });
    }

    changeStatus = (stat) => {
        this.settings.gotov = false;
        this.settings.vrabote = false;
        this.settings.ban = false;
        this.settings.statusAll = false;
        this.settings[stat] = true;
    };

    changeAdv = (adv) => {
        this.settings.advYandex = false;
        this.settings.advGoogle = false;
        this.settings.advAppstore = false;
        this.settings.advAll = false;
        this.settings[adv] = true;
    };

    changeEngine = (engine) => {
        // engines.forEach(engine => {
        //     this.settings[engine.name] = false;
        // })
        this.settings.tilda = false;
        this.settings.tilda2 = false;
        this.settings.tilda_index = false;
        this.settings.wordpress = false;
        this.settings.webarchive = false;
        this.settings.webarchivex = false;
        this.settings.business = false;
        this.settings.business2 = false;
        this.settings.engineAll = false;
        this.settings[engine] = true;
    };

    changeCountry = (country) => {
        this.settings.country = country;
    };

    changeServer = (server) => {
        this.settings.country = server;
    };

    reset = () => {
        this.settings = {
            gotov: false,
            vrabote: false,
            ban: false,
            statusAll: true,
            advGoogle: false,
            advYandex: false,
            advAppstore: false,
            advAll: true,
            tilda: false,
            tilda2: false,
            tilda_index: false,
            wordpress: false,
            webarchive: false,
            webarchivex: false,
            business: false,
            business2: false,
            engineAll: true,
            country: "all",
            server: 'all'
        };
    };
}

const filterSettings = new FilterSettings();

export default filterSettings;
