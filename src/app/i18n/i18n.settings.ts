export interface Ii18nSettings {
    operationsCount: string;
    operandDimention: string;
    allowedOperations: string;
    header: string;
    add: string;
    substract: string;
    multiply: string;
    divide: string;
}

export class i18nSettingsUA implements Ii18nSettings {
    operationsCount = "Кількість операцій";
    operandDimention = "Розрядність операнда";
    allowedOperations = "Операції";
    header = "Налаштування";
    add = "додавання";
    substract = "віднімання";
    multiply = "множення";
    divide = "ділення";
}

export class i18nSettingsEN implements Ii18nSettings {
    operationsCount = "Operations quantity";
    operandDimention = "Operand dimension";
    allowedOperations = "Operations";
    header = "Settings";
    add = "add";
    substract = "substract";
    multiply = "multiply";
    divide = "divide";
}
