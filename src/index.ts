import * as ko from 'knockout';


export let viewModel = {

    settings: {
        allowedOperations: ko.observable([]),
        operationsCount: ko.observable(1),
        operandDimension: ko.observable(1)
    }


};