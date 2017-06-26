import { Operations } from '../../domain';
import { SettingsModel, StatisticsModel, ProgressModel } from "./";
import { Ii18n } from "../i18n";

export class AppModel {
    settings = new SettingsModel(["0"], 1, 1);
    statics = new StatisticsModel();
    progress = new ProgressModel();
    i18n: Ii18n;
};
