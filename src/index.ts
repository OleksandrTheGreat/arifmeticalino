import * as ko from "knockout";
import { AppModel } from "./app/models/AppModel";
import './app/styles/index';

ko.applyBindings(new AppModel());
