import { Operations } from "../domain/Operations";
import { Action } from "../domain/Action";
import { Equation } from "../domain/Equation";
import { IRandomService } from "./RandomService";
import { IActionService } from "./ActionService";

export interface IEquationSettings {
    operantionsCount?: number;
    allowedOperations?: Array<Operations>;
    operandDimension?: number;
}

export class EquationFactory {

    constructor(
        private actionService: IActionService,
        private randomService: IRandomService
    ) { }

    public Create(
        settings?: IEquationSettings
    ): Equation {

        let eq = new Equation();
        let actions: Array<Action> = [];

        settings = this.adjustSettings(settings);

        eq.operations = this.generateOperations(settings);

        let action = this.createEquationAction(eq.operations.slice(), settings.operandDimension);

console.log(action)
console.log(this.actionToString(action))

        eq.operands = this.getOperands(action);

        eq.result = this.actionService.Solve(action);

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
        settings: IEquationSettings
    ): Array<Operations> {

        let operations: Array<Operations> = [];

        for (let i = 0; i < settings.operantionsCount; i++)
            operations.push(this.randomizeOperation(settings));

        return operations;
    }

    private randomizeOperation(settings: IEquationSettings): Operations {
        return settings.allowedOperations[
            this.randomService.Randomize(0, settings.allowedOperations.length - 1)];
    }

    private getOperands(
        action: Action
    ): Array<number> {

        let operands: Array<number> = [];

        let operand1 =
            action.operand1.constructor.name == "Action"
                ? this.getOperands(action.operand1)
                : action.operand1;

        let operand2 =
            action.operand2.constructor.name == "Action"
                ? this.getOperands(action.operand2)
                : action.operand2;

        operands = operands.concat(operand1);
        operands = operands.concat(operand2);

        return operands;
    }

    private createEquationAction(
        operations: Array<Operations>,
        operandDimension: number
    ): Action {

        let handledOperations: Array<number> = [];
        let action: Action;
        let equationOperationQueueIndex = 0;
        let equationOperationQueue: Array<Operations> = [
            Operations.Multiply,
            Operations.Divide,
            Operations.Substract,
            Operations.Add
        ];

        while (handledOperations.length < operations.length) {

            let operationIndex = this.getUnhandeledOperationIndex(
                operations, handledOperations, equationOperationQueue[equationOperationQueueIndex]);

            if (operationIndex == -1) {
                equationOperationQueueIndex++;

                if (equationOperationQueueIndex > equationOperationQueue.length - 1)
                    throw "Non of known operations were found in equation";

                continue;
            }

            handledOperations.push(operationIndex);

            if (!action) {
                action = this.actionService.Create(operations[operationIndex], operandDimension);
                continue;
            }

            action = this.actionService.Create(operations[operationIndex], operandDimension, action);
        }

        return action;
    }

    private getUnhandeledOperationIndex(
        operations: Array<Operations>,
        handledOperations: Array<number>,
        operation: Operations
    ) {

        for (let i = 0; i < operations.length; i++) {

            if (operations[i] != operation)
                continue;

            let isHandeled = handledOperations.filter(x => x == i).length > 0;

            if (!isHandeled)
                return i;
        }

        return -1;
    }

    private actionToString(action: Action): string {

        let operand1 =
            action.operand1.constructor.name == "Action"
                ? this.actionToString(action.operand1)
                : action.operand1;

        let operand2 =
            action.operand2.constructor.name == "Action"
                ? this.actionToString(action.operand2)
                : action.operand2;

        let eq = operand1 + this.operationToString(action.operation) + operand2;

        if (action.operation == Operations.Multiply 
            || action.operation == Operations.Divide
            || action.operation == Operations.Add)
            return eq;

        return "(" + eq + ")";
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
                throw "Unknown operation";
        }
    }
}
