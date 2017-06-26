import { Ii18nSettings, i18nSettingsUA, i18nSettingsEN } from "./";

export interface Ii18n {
    settings: Ii18nSettings;
}

export class i18UA implements Ii18n {
    settings = new i18nSettingsUA();
}

export class i18EN implements Ii18n {
    settings = new i18nSettingsEN();
}