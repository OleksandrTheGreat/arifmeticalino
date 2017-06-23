import { Operations } from "../domain/Operations";
import { Equation } from "../domain/Equation";
import { IRandomService } from "./RandomService";

export interface IEquationSettings {
    operationsCount?: number;
    allowedOperations?: Array<Operations>;
    operandDimension?: number;
}

export interface IEquationService {
    Create(settings?: IEquationSettings);
    EquationToString(equation: Equation): string;
}

export class EquationService implements IEquationService {

    constructor(
        private _randomService: IRandomService
    ) { }

    Create(settings: IEquationSettings): Equation {

        let equation = new Equation();

        equation.operations = [];
        equation.operands = [];

        settings = this.adjustSettings(settings);

        for (let i = 0; i < settings.operationsCount; i++) {

            let operation = settings.allowedOperations[
                this._randomService.Randomize(0, settings.allowedOperations.length - 1)];

            equation.operations.push(operation);
            equation.operands[i] = equation.operands[i] || this.generateNumber(settings.operandDimension);
            equation.operands[i + 1] = this.generateOperand2(operation, settings);

            equation = this.adjustEquation(equation);
        }

        equation.result = this.solve(equation);

        return equation;
    }

    EquationToString(equation: Equation): string {

        if (!equation.operations || !equation.operations.length)
            return "";

        let result = "" + equation.operands[0];

        for (let i = 0; i < equation.operations.length; i++) {

            result = result
                + this.operationToString(equation.operations[i])
                + equation.operands[i + 1];
        }

        return result;
    }

    private operationToString(operation: Operations): string {

        switch (operation) {

            case Operations.Add:
                return "+";
            case Operations.Divide:
                return "/";
            case Operations.Multiply:
                return "*";
            case Operations.Substract:
                return "-";
            default:
                throw "Unknown operation \"" + operation + "\"";
        }
    }

    private adjustSettings(settings: IEquationSettings): IEquationSettings {

        let defaultOperations = [Operations.Add];
        let defaultOperandDimension = 1;
        let defaultOperationsCount = 1;

        settings = settings || {};

        settings.allowedOperations =
            (settings.allowedOperations && settings.allowedOperations.length)
                ? settings.allowedOperations
                : defaultOperations;

        settings.operandDimension = settings.operandDimension || defaultOperandDimension;
        settings.operationsCount = settings.operationsCount || defaultOperationsCount;

        return settings;
    }

    private generateOperand2(
        operation: Operations,
        settings: IEquationSettings
    ): number {

        switch(operation) {

            case Operations.Divide:
                return this.generateNumber(1, 1);
            
            case Operations.Multiply:

                return this.generateNumber(1);
            
            default:
                return this.generateNumber(settings.operandDimension);
        }
    }

    private generateNumber(
        dimension: number,
        lower: number = 0
    ): number {
        return this._randomService.Randomize(lower, dimension * 10 - 1);
    }

    private adjustEquation(
        equation: Equation
    ): Equation {

        let result: number = this.solve(equation);

        let rest = result - Math.floor(result);

        if (rest != 0) {

            //console.log("operand2 = " + equation.operands[equation.operations.length]);
            //console.log("rest = " + rest);
            //console.log("direction = " + direction);

            equation.operands[equation.operations.length] =
                equation.operands[equation.operations.length] - 1;

            return this.adjustEquation(equation);
        }

        if (result < 0) {

            equation.operands[equation.operations.length] =
                equation.operands[equation.operations.length] - 1;

            return this.adjustEquation(equation);
        }

        return equation;
    }

    private solve(equation: Equation): number {

        let equationString = this.EquationToString(equation);

        //console.log("equationString: " + equationString);

        let result = eval(equationString);
        
        //console.log("result = " + result);

        return result;
    }
}
