import { Operations } from '../../domain';
import { SettingsModel, StatisticsModel, ProgressModel } from "./";

export class AppModel {
    settings = new SettingsModel([Operations.Add], 1, 1);
    statics = new StatisticsModel();
    progress = new ProgressModel(); 
};
