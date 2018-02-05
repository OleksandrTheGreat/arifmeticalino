import { Operations } from '../../domain';
import { SettingsModel, StatisticsModel, EquationsModel } from "./";
import { Ii18n, i18UA, i18EN } from "../i18n";

export class AppModel {
    settings = new SettingsModel([Operations.Add], 1, 1);
    statistics = new StatisticsModel();
    equations = new EquationsModel();
    i18n: Ii18n = window.location.href.endsWith('en') ? new i18EN() : new i18UA();
};
