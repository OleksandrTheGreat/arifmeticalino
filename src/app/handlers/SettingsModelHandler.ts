import * as ko from "knockout";

import { ABus } from "abus";
import { SettingsModel } from "../models/SettingsModel";
import { Operations } from "../../domain/Operations";
import { SettingsChanged } from "../events";

export class SettingsModelHandler {

    constructor(
        private _model: SettingsModel,
        private _bus: ABus
    ) {
        this.saveInitialState(_model);

        this.handleAllowedOperations(_model);
        this.handleOperationsCount(_model);
        this.handleOperandDimention(_model);
    }

    private previousAllowedOperations: Array<string>;

    private saveInitialState(settings: SettingsModel) {

        this.previousAllowedOperations = settings.allowedOperations().slice() || [Operations.Add.toString()];
    }

    private handleAllowedOperations(settings: SettingsModel): void {

        settings.allowedOperations.subscribe((operations: Array<string>) => {

            if (!operations || operations.length == 0) {
                settings.allowedOperations(this.previousAllowedOperations);
                return;
            }

            this.previousAllowedOperations = settings.allowedOperations().slice();

            this._bus.Send(this.modelToEvent(settings));
        });
    }

    private handleOperationsCount(settings: SettingsModel): void {

        settings.operationsCount.subscribe((operationsCount: number) => {

            let defaultOperationsCount = 20;

            if (operationsCount > defaultOperationsCount)
                settings.operationsCount(defaultOperationsCount);

            this._bus.Send(this.modelToEvent(settings));
        });
    }

    private handleOperandDimention(settings: SettingsModel): void {

        settings.operandDimention.subscribe((operandDimention: number) => {

            let defaultOperandDimention = 3;

            if (operandDimention > defaultOperandDimention)
                settings.operandDimention(defaultOperandDimention);

            this._bus.Send(this.modelToEvent(settings));
        });
    }

    public modelToEvent(settings: SettingsModel): SettingsChanged {

        let result = new SettingsChanged();
        result.operandDimention = settings.operandDimention();
        result.operationsCount = settings.operationsCount();
        result.allowedOperations = [];

        settings.allowedOperations().forEach(x => {
            result.allowedOperations.push(parseInt(x));
        });

        return result;
    }
}
