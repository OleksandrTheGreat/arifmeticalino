import * as ko from "knockout";

export class StatisticsModel {
    answersTotal: KnockoutObservable<number> = ko.observable(0);
    rightAnswersFromFirstTryCount: KnockoutObservable<number> = ko.observable(0);
    rightAnswersFromSecondTryCount: KnockoutObservable<number> = ko.observable(0);
    rightAnswersFromThirdTryCount: KnockoutObservable<number> = ko.observable(0);
    rightAnswersCount: KnockoutComputed<number> = ko.computed(() => {
        return this.rightAnswersFromFirstTryCount() + this.rightAnswersFromSecondTryCount() + this.rightAnswersFromThirdTryCount();
    });
    wrongAnswersCount: KnockoutComputed<number> = ko.computed(() => {
        return this.answersTotal() - this.rightAnswersCount();
    });
}
