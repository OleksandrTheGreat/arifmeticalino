import { StatisticsModel } from "../models";
import { ABus } from "abus";
import { WrongAnswerGiven, RightAnswerGiven } from "../events";

export class StatisticsModelHandler {

    constructor(
        private _model: StatisticsModel,
        private _bus: ABus
    ) {

        this.handleWrongAnswerGiven();
        this.handleRightAnswerGiven();
    }

    private handleWrongAnswerGiven(): void {

        this._bus.Handle(WrongAnswerGiven, (event: WrongAnswerGiven) => {

            this._model.answersTotal(this._model.answersTotal() + 1);
        });
    }

    private handleRightAnswerGiven(): void {

        this._bus.Handle(RightAnswerGiven, (event: RightAnswerGiven) => {

            this._model.answersTotal(this._model.answersTotal() + 1);

            switch (event.attempts) {
                case 1:
                    this._model.rightAnswersFromFirstTryCount(this._model.rightAnswersFromFirstTryCount() + 1);
                    break;
                case 2:
                    this._model.rightAnswersFromSecondTryCount(this._model.rightAnswersFromSecondTryCount() + 1);
                    break;
                case 3:
                    this._model.rightAnswersFromThirdTryCount(this._model.rightAnswersFromThirdTryCount() + 1);
                    break;
                default:
                    throw "unhandled attempts";
            }
        });
    }
}