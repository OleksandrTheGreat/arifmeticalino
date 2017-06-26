import * as ko from "knockout";

import './app/styles/index';
//import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { AppModel } from "./app/models/AppModel";
import { i18UA, i18EN } from "./app/i18n";
import { SettingsModelHandler } from "./app/handlers/SettingsModelHandler";

let appModel = new AppModel();
appModel.i18n = new i18UA();

new SettingsModelHandler(appModel.settings);

ko.applyBindings(appModel);
