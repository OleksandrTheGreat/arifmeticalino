import { Ii18nSettings, i18nSettingsUA, i18nSettingsEN } from "./i18n.settings";
import { Ii18nStatistics, i18nStatisticsUA, i18nStatisticsEN } from "./i18n.statistics";

export interface Ii18n {
    settings: Ii18nSettings;
    statistics: Ii18nStatistics
}

export class i18UA implements Ii18n {
    settings = new i18nSettingsUA();
    statistics =  new i18nStatisticsUA();
}

export class i18EN implements Ii18n {
    settings = new i18nSettingsEN();
    statistics =  new i18nStatisticsEN();
}