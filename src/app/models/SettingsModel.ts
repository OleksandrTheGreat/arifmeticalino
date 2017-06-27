import * as ko from "knockout";
import { Operations } from "../../domain";

export class SettingsModel {

    allowedOperations: KnockoutObservableArray<string>;
    operationsCount: KnockoutObservable<number>;
    operandDimention: KnockoutObservable<number>;

    constructor(
        allowedOperations: Array<Operations>,
        operationsCount: number,
        operandDimention: number
    ) {
        this.allowedOperations = ko.observableArray(this.operationsTostring(allowedOperations));
        this.operationsCount = ko.observable(operationsCount);
        this.operandDimention = ko.observable(operandDimention);
    }

    private operationsTostring(operations: Array<Operations>): Array<string> {

        let result: Array<string> = [];

        operations.forEach(x => {
            result.push(x.toString());
        });

        return result;
    }
}
