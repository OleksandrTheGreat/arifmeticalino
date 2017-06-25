import { Operations } from "../../domain";

export class SettingsModel {

    allowedOperations: KnockoutObservable<Array<Operations>>;
    operationsCount: KnockoutObservable<number>;
    operandDimention: KnockoutObservable<number>;

    constructor(
        allowedOperations: Array<Operations>,
        operationsCount: number,
        operandDimention: number
    ) {
        this.allowedOperations = ko.observable(allowedOperations);
        this.operationsCount = ko.observable(operationsCount);
        this.operandDimention = ko.observable(operandDimention);
    }
}
