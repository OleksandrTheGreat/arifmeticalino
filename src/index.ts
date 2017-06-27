import * as ko from "knockout";

import './app/styles/index';
//import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { ABus } from "abus";
import { AppModel } from "./app/models/AppModel";
import { i18UA, i18EN } from "./app/i18n";
import { SettingsModelHandler, EquationsModelHandler } from "./app/handlers";
import { EquationService, RandomService } from "./services";

let bus = new ABus();
let appModel = new AppModel();

let randomService = new RandomService();
let equationService = new EquationService(randomService);
let settingsHandler = new SettingsModelHandler(appModel.settings, bus);
let equationsModelHandler = new EquationsModelHandler(appModel.equations, equationService, bus);

bus.Send(settingsHandler.modelToEvent(appModel.settings));

ko.applyBindings(appModel);
