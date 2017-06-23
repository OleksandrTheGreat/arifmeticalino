import { Operations } from "../domain/Operations";
import { Action } from "../domain/Action";
import { IRandomService } from "./RandomService";

export interface IActionService {
    Create(operation: Operations, operandDimension: number, previousAction?: Action): Action;
    Solve(action: Action): number;
    Adjust(action: Action): Action;
}

export class ActionService implements IActionService {
    
    constructor(
        private randomService: IRandomService
    ) { }

    Create(
        operation: Operations,
        operandDimension: number = 1,
        previousAction: Action = null
    ): Action {

        let action: Action;

        switch (operation) {

            case Operations.Add:

                action = new Action();
                action.operation = operation;
                action.operand1 = previousAction || this.generateNumber(operandDimension);
                action.operand2 = this.generateNumber(operandDimension);
                
                return action;

            case Operations.Multiply:

                action = new Action();
                action.operation = operation;
                action.operand1 = previousAction || this.generateNumber(operandDimension);
                action.operand2 = this.generateNumber(operandDimension);
                
                return action;

            case Operations.Substract:

                action = new Action();
                action.operation = operation;
                action.operand1 = previousAction || this.generateNumber(operandDimension);
                action.operand2 = this.generateNumber(operandDimension);

                action = this.sortOperandsDesc(action);

                return action;

            case Operations.Divide:

                action = new Action();
                action.operation = operation;
                action.operand1 = previousAction || this.generateNumber(operandDimension, 1);
                action.operand2 = this.generateNumber(1, 1);

                action = this.sortOperandsDesc(action);
                action = this.adjustDivideActionToBeRestless(action);

                return action;

            default:
                throw "Unknown operation";
        }
    }

    Solve(action: Action): number {

        let operand1 = 
            action.operand1.constructor.name == "Action"
            ? this.Solve(action.operand1)
            : action.operand1;
        
        let operand2 = 
            action.operand2.constructor.name == "Action"
            ? this.Solve(action.operand2)
            : action.operand2;

        switch (action.operation) {

            case Operations.Add:
                return operand1 + operand2;;

            case Operations.Multiply:
                return operand1 * operand2;

            case Operations.Substract:
                return operand1 - operand2;

            case Operations.Divide:
                return operand1 / operand2;

            default:
                throw "Unknown operation";
        }
    }

    Adjust(action: Action): Action {
        
        switch(action.operation){

            case Operations.Substract:
                return this.sortOperandsDesc(action);

            case Operations.Divide:
                action = this.sortOperandsDesc(action);
                action = this.adjustDivideActionToBeRestless(action);
                return action;

            default:
                return action;
        }
    }

    private generateNumber(
        dimension: number,
        lower: number = 0
    ): number {
        return this.randomService.Randomize(lower, dimension * 10 - 1);
    }

    private sortOperandsDesc(
        action: Action
    ): Action {

        let operand1 = 
            action.operand1.constructor.name == "Action"
            ? this.Solve(action.operand1)
            : action.operand1;
        
        let operand2 = 
            action.operand2.constructor.name == "Action"
            ? this.Solve(action.operand2)
            : action.operand2;

        if (operand1 >= operand2)
            return action;

        let buf = action.operand1;

        action.operand1 = action.operand2;
        action.operand2 = buf;

        return action;
    }

    private adjustDivideActionToBeRestless(
        action: Action
    ): Action {

        if (!this.hasDivideRest(action.operand1, action.operand2))
            return action;

        action.operand1++;

        return this.adjustDivideActionToBeRestless(action);
    }

    private hasDivideRest(
        operand1: number,
        operand2: number
    ): boolean {

        let result = operand1 / operand2;
        let rest = Math.floor(result) - result;

        return rest < 0;
    }
}
