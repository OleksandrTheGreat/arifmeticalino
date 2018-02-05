import { Operations } from '../../domain';
import { SettingsModel, StatisticsModel, EquationsModel } from "./";
import { Ii18n, i18UA, i18EN } from "../i18n";

export class AppModel {
    settings = new SettingsModel([Operations.Add], 1, 1);
    statistics = new StatisticsModel();
    equations = new EquationsModel();
    i18n: Ii18n = window.location.search.indexOf('lang=en') >=0 ? new i18EN() : new i18UA();

    changeLanguage(lang: string): void {

        switch (lang.toLowerCase()) {
            case 'en':
                if (!window.location.href.endsWith('#en'))
                    window.location.href = window.location.href +  '?lang=en';
                break;
            case 'ua':
                window.location.href = window.location.href.replace('?lang=en', '');
                break;
        }
    }
};
