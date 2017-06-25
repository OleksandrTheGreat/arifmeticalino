export class StatisticsModel {
    answersCount: KnockoutObservable<number> = ko.observable(0);
    answersFromFirstTryCount: KnockoutObservable<number> = ko.observable(0);
    answersFromSecondTryCount: KnockoutObservable<number> = ko.observable(0);
    answersFromThirdTryCount: KnockoutObservable<number> = ko.observable(0);
    wrongAnswersCount: KnockoutObservable<number> = ko.observable(0);
}
