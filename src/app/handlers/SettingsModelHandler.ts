import * as ko from "knockout";

import { SettingsModel } from "../models/SettingsModel";
import { Operations } from "../../domain/Operations";

export class SettingsModelHandler {

    constructor(
        settings: SettingsModel
    ) {
        this.handleAllowedOperations(settings);
        this.handleOperationsCount(settings);
        this.handleOperandDimention(settings);

        this.previousAllowedOperations = settings.allowedOperations().slice();

        console.log(this.previousAllowedOperations)
    }

    private previousAllowedOperations: Array<string>;

    private handleAllowedOperations(settings: SettingsModel): void {

        settings.allowedOperations.subscribe((operations: Array<string>) => {

            if (!operations || operations.length == 0){
                settings.allowedOperations(this.previousAllowedOperations);
                return;
            }

            this.previousAllowedOperations = settings.allowedOperations().slice();
        });
    }

    private handleOperationsCount(settings: SettingsModel): void {

        settings.operationsCount.subscribe((operationsCount: number) => {

            let defaultOperationsCount = 20;

            if (operationsCount > defaultOperationsCount)
                settings.operationsCount(defaultOperationsCount);
        });
    }

    private handleOperandDimention(settings: SettingsModel): void {

        settings.operandDimention.subscribe((operandDimention: number) => {

            let defaultOperandDimention = 3;

            if (operandDimention > defaultOperandDimention)
                settings.operandDimention(defaultOperandDimention);
        });
    }
}
