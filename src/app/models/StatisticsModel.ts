import * as ko from "knockout";

export class StatisticsModel {
    answersTotal = 0;
    rightAnswersFromFirstTryCount = 0;
    rightAnswersFromSecondTryCount = 0;
    rightAnswersFromThirdTryCount = 0;
    rightAnswersCount: KnockoutComputed<number> = ko.computed(() => {
        return this.rightAnswersFromFirstTryCount + this.rightAnswersFromSecondTryCount + this.rightAnswersFromThirdTryCount;
    });
    wrongAnswersCount: KnockoutComputed<number> = ko.computed(() => {
        return this.answersTotal - this.rightAnswersCount();
    });
}
