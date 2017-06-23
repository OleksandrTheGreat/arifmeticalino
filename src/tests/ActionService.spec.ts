import { ActionService, IActionService } from "../services/ActionService";
import { Operations } from "../domain/Operations";
import { RandomService, IRandomService } from "../services/RandomService";
import { TestCases } from "./TestExtensions";
import { Action } from "../domain/Action";

describe("ActionService", () => {

    let service: IActionService;

    beforeAll(() => {
        service = new ActionService(new RandomService());
    });

    TestCases(
        "should create action with add/multiply operations",
        [
            Operations.Add,
            Operations.Multiply
        ],
        (operation: Operations) => {

            let action = service.Create(operation, 1);

            expect(action.operation).toBe(operation);
            expect(action.operand1).toBeDefined();
            expect(action.operand2).toBeDefined();
        }
    );

    TestCases(
        "should genarate operand1 greater then operand2 for actions with substract/divide operations",
        [
            Operations.Substract,
            Operations.Divide
        ],
        (operation: Operations) => {

            let randomNumbers = [1, 2];
            let randomExecution = -1;
            let testRandomServise: IRandomService = {
                Randomize: (lower: number, upper: number): number => {
                    randomExecution++;
                    return randomNumbers[randomExecution];
                }
            };

            let service = new ActionService(testRandomServise);
            let action = service.Create(operation, 1);

            expect(action.operation).toBe(operation);
            expect(action.operand1).toBeGreaterThan(action.operand2);
        });

    TestCases(
        "should generate operands divided without rest",
        [
            {
                randomNumbers: [5, 3],
                operand1: 6,
                operand2: 3
            },
            {
                randomNumbers: [6, 4],
                operand1: 8,
                operand2: 4
            },
            {
                randomNumbers: [7, 3],
                operand1: 9,
                operand2: 3
            },
            {
                randomNumbers: [78, 9],
                operand1: 81,
                operand2: 9
            },
            {
                randomNumbers: [2, 3],
                operand1: 4,
                operand2: 2
            }
        ],
        (data: any) => {

            let randomExecution = -1;
            let testRandomServise: IRandomService = {
                Randomize: (lower: number, upper: number): number => {
                    randomExecution++;
                    return data.randomNumbers[randomExecution];
                }
            };

            let service = new ActionService(testRandomServise);
            let action = service.Create(Operations.Divide, 1);

            expect(action.operand1).toBe(data.operand1);
            expect(action.operand2).toBe(data.operand2);
        });

    it("should generate natural numbers for devide operations", () => {

        let actualLower: number;
        let testRandomServise: IRandomService = {
            Randomize: (lower: number, upper: number): number => {

                actualLower = lower;

                return 1;
            }
        };

        let service = new ActionService(testRandomServise);
        service.Create(Operations.Divide, 1);

        expect(actualLower).toBe(1);
    });

    it("should generate operand2 of dimension 1 for devide operations", () => {

        let actualUpper: number;
        let testRandomServise: IRandomService = {
            Randomize: (lower: number, upper: number): number => {

                actualUpper = upper;

                return 1;
            }
        };

        let service = new ActionService(testRandomServise);
        service.Create(Operations.Divide, 2);

        expect(actualUpper).toBe(9);
    });

    TestCases(
        "should solve action",
        [
            {
                operation: Operations.Add,
                operand1: 1,
                operand2: 2,
                result: 3
            },
            {
                operation: Operations.Substract,
                operand1: 1,
                operand2: 2,
                result: -1
            },
            {
                operation: Operations.Multiply,
                operand1: 1,
                operand2: 2,
                result: 2
            },
            {
                operation: Operations.Divide,
                operand1: 1,
                operand2: 2,
                result: 0.5
            }
        ],
        (data: any) => {

            let action = new Action();
            action.operand1 = data.operand1;
            action.operand2 = data.operand2;
            action.operation = data.operation;

            let result = service.Solve(action);

            expect(result).toBe(data.result);
        });

    TestCases(
        "should adjust action",
        [
            {
                operation: Operations.Substract,
                operand1: 1,
                operand2: 2,
                expected: {
                    operand1: 2,
                    operand2: 1
                }
            },
            {
                operation: Operations.Divide,
                operand1: 1,
                operand2: 2,
                expected: {
                    operand1: 2,
                    operand2: 1
                }
            }
        ],
        (data: any) => {

            let action = new Action();
            action.operand1 = data.operand1;
            action.operand2 = data.operand2;
            action.operation = data.operation;

            let actual = service.Adjust(action);

            expect(actual.operand1).toBe(data.expected.operand1);
            expect(actual.operand2).toBe(data.expected.operand2);
        });

    it("should solve with Actions as operands", () => {

        let action0 = new Action();
        action0.operand1 = 2;
        action0.operand2 = 1;
        action0.operation = Operations.Divide;

        let action1 = new Action();
        action1.operand1 = action0;
        action1.operand2 = 3;
        action1.operation = Operations.Substract;

        let actual = service.Solve(action1);

        expect(actual).toBe(-1);
    });

    it("should adjust substract action with Action as operands", () => {

        let action0 = new Action();
        action0.operand1 = 2;
        action0.operand2 = 1;
        action0.operation = Operations.Divide;

        let action1 = new Action();
        action1.operand1 = action0;
        action1.operand2 = 3;
        action1.operation = Operations.Substract;

        let action = service.Adjust(action1);

        let actual = service.Solve(action);

        expect(actual).toBe(1);
    });
});
