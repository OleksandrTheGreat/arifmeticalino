import { ABus } from "abus";
import { SettingsChanged, RightAnswerGiven, WrongAnswerGiven } from "../events";
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
    private _attemptsCounter = 0;

    private handleSettingsChanged() {

        this._bus.Handle(SettingsChanged, (event: SettingsChanged) => {

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

        this._model.givenAnswer.subscribe(answer => {

            if (answer === null || answer === undefined)
                return;

            this._attemptsCounter++;

            if (answer == this._equation.result) {
                this._bus.Send(new RightAnswerGiven(this._attemptsCounter));
                this.generateEquation();
                return;
            }

            if (this._attemptsCounter == 3) {
                this._bus.Send(new WrongAnswerGiven());
                this.generateEquation();
                return;
            }
        });
    }

    private generateEquation(): void {
        this._attemptsCounter = 0;
        this._equation = this._equationService.Create(this._equationSettings);
        this._model.current(this._equationService.EquationToString(this._equation));
        this._model.answer(null);

        console.log(this._model.current() + " = " + this._equation.result);
    }
}
