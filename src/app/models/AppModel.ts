import { Operations } from '../../domain';
import { SettingsModel, StatisticsModel, EquationsModel } from "./";
import { Ii18n, i18UA } from "../i18n";

export class AppModel {
    settings = new SettingsModel([Operations.Add], 1, 1);
    statistics = new StatisticsModel();
    equations = new EquationsModel();
    i18n: Ii18n = new i18UA();
};
