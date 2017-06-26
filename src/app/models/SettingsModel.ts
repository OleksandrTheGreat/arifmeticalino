import * as ko from "knockout";
import { Operations } from "../../domain";

export class SettingsModel {

    allowedOperations: KnockoutObservableArray<string>;
    operationsCount: KnockoutObservable<number>;
    operandDimention: KnockoutObservable<number>;

    constructor(
        allowedOperations: Array<string>,
        operationsCount: number,
        operandDimention: number
    ) {
        this.allowedOperations = ko.observableArray(allowedOperations);
        this.operationsCount = ko.observable(operationsCount);
        this.operandDimention = ko.observable(operandDimention);
    }
}
