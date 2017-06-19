import { Equation } from "../domain/Equation";
import { Operations } from "../domain/Oprations";
import { RandomService, IRandomService } from "./RandomService";

export interface IEquationSettings {
    operantionsCount?: number;
    allowedOperations?: Array<Operations>;
    operandDimension?: number;
}

export class EquationFactory {

    constructor(
        private randomService: IRandomService
    ) { }

    public CreateEquation(
        settings?: IEquationSettings
    ): Equation {

        let eq = new Equation();

        settings = this.adjustSettings(settings);

        eq.operations = this.generateOperations(settings.operantionsCount, settings.allowedOperations);
        eq.operands = this.generateOperands(settings.operandDimension, eq.operations);

        return eq;
    }

    private adjustSettings(
        settings: IEquationSettings
    ): IEquationSettings {

        settings = settings || {};

        settings.operantionsCount =
            !settings.operantionsCount
                ? 1
                : settings.operantionsCount;

        settings.allowedOperations =
            !settings.allowedOperations || !settings.allowedOperations.length
                ? [Operations.Add]
                : settings.allowedOperations;

        settings.operandDimension =
            !settings.operandDimension
                ? 1
                : settings.operandDimension;

        return settings;
    }

    private generateOperations(
        operantionsCount: number,
        allowedOperations: Array<Operations>
    ): Array<Operations> {

        let operations: Array<Operations> = [];

        for (let i = 0; i < operantionsCount; i++) {

            let randomOperationIndex = this.randomService.Randomise(0, allowedOperations.length - 1);

            operations.push(allowedOperations[randomOperationIndex]);
        }

        return operations;
    }

    private generateOperands(
        operandDimension: number,
        operations: Array<Operations>
    ): Array<number> {

        var operands: Array<number> = [];

        for (let i = 0; i < operations.length; i++) {

            let operation = operations[i];

            switch (operation) {

                case Operations.Divide:

                    operands[i] = operands[i] || this.generateNaturalNumber(operandDimension);
                    operands[i + 1] = operands[i + 1] || this.generateNaturalNumber(operandDimension);

                    let operand1 = operands[i];
                    let operand2 = operands[i + 1];

                    if (operand1 < operand2) {
                        operands[i] = operand2;
                        operands[i + 1] = operand1;
                    }

                    operand1 = operands[i];
                    operand2 = operands[i + 1];

                    if (!this.hasDivRest(operand1, operand2))
                        break;

                    if (!this.hasDivRest(operand1, operand2 + 1)) {
                        operands[i] = operand1;
                        operands[i + 1] = operand2 + 1;
                        break;
                    }

                    if (!this.hasDivRest(operand1 + 1, operand2)) {
                        operands[i] = operand1 + 1;
                        operands[i + 1] = operand2;
                        break;
                    }

                    break;

                default:
                    operands[i] = operands[i] || this.generateNumber(operandDimension);
                    operands[i + 1] = operands[i + 1] || this.generateNumber(operandDimension);
            }
        }

        return operands;
    }

    private generateNumber(
        dimension: number
    ): number {
        return this.randomService.Randomise(0, dimension * 10 - 1);
    }

    private generateNaturalNumber(
        dimension: number
    ): number {
        return this.randomService.Randomise(1, dimension * 10 - 1);
    }

    private hasDivRest(
        operand1: number,
        operand2: number
    ): boolean {

        let result = operand1 / operand2;
        let rest = Math.floor(result) - result;

// console.log("Op1 = " + operand1);
// console.log("Op2 = " + operand2);
// console.log("rest = " + rest);

        return rest < 0;
    }
}
