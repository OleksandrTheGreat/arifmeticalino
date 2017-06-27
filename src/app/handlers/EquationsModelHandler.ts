import { ABus } from "abus";
import { SettingsChanged } from "../events";
import { EquationsModel } from "../models/EquationsModel";
import { IEquationSettings, IEquationService } from "../../services";
import { Equation } from "../../domain";

export class EquationsModelHandler {

    constructor(
        private _model: EquationsModel,
        private _equationService: IEquationService,
        private _bus: ABus
    ) {
        this.handleSettingsChanged();
        this.handleAnswer();
    }

    private _equationSettings: IEquationSettings;
    private _equation: Equation;

    private handleSettingsChanged() {

        this._bus.Subscribe(SettingsChanged, (event: SettingsChanged) => {

            this._equationSettings = {
                allowedOperations: event.allowedOperations,
                operationsCount: event.operationsCount,
                operandDimension: event.operandDimention
            };

            if (!this._equation)
                this.generateEquation();
        });
    }

    private handleAnswer(): void {

        //this._model.answerGiven.
    }

    private generateEquation(): void {

         this._equation = this._equationService.Create(this._equationSettings);
         this._model.current = this._equationService.EquationToString(this._equation);
    }
}
