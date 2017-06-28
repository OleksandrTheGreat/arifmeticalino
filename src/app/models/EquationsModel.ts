import * as ko from "knockout";

export class EquationsModel {
    current: KnockoutObservable<string> = ko.observable("");
    answer: KnockoutObservable<number> = ko.observable(null);

    /*
        workaround due to KO bug with click bind: child's click event handler refers to parent via "this"
    */
    givenAnswer: KnockoutObservable<number> = ko.observable(null);

    constructor() {
        this.givenAnswer.extend({ notify: 'always' });
    }
}
