import { Equation } from "../domain/Equation";
import { EquationSettings } from "../domain/EquationSettings";
import { Operations } from "../domain/Oprations";
import { EquationFactory } from "../services/EquationFactory";
import { testCases } from "./TestExtensions";
import { RandomService, IRandomService } from "../services/RandomService";

describe("EquationFactory", function () {

    let factory: EquationFactory;

    beforeAll(function () {
        factory = new EquationFactory(new RandomService());
    });

    it("should create equation that consists of two operands and one operation", function () {

        let eq = factory.CreateEquation();

        expect(eq.operands[0]).toBeDefined();
        expect(eq.operands[1]).toBeDefined();
        expect(eq.operations).toBeDefined();
    });

    it("should create equation with set number of operations", function () {

        let operationsCount = 5;
        let eq = factory.CreateEquation({
            operantionsCount: operationsCount
        });

        expect(eq.operations.length).toBe(operationsCount);
    });

    testCases(
        "should create equation with allowed operations",
        [
            Operations.Add,
            Operations.Divide,
            Operations.Substract,
            Operations.Multiply
        ],
        function (allowedOperation: Operations) {

            let eq = factory.CreateEquation({
                allowedOperations: [allowedOperation]
            });

            expect(eq.operations[0]).toBe(allowedOperation);
        });

    it("should generate minimum 2 operands", function () {

        let eq = factory.CreateEquation({
            operantionsCount: 1
        });

        expect(eq.operands.length).toBe(2);
    });

    it("should generate first operand greater then the second for divide operation", function () {

        let randomNumbers: Array<number> = [0, 1, 2];
        let randomRaund: number = 0;
        let testFactory: IRandomService = {
            Randomise: (lower, upper): number => {
                let num = randomNumbers[randomRaund] + 0;
                randomRaund++;
                return num;
            }
        };
        let factory = new EquationFactory(testFactory);

        let eq = factory.CreateEquation({
            allowedOperations: [Operations.Divide]
        });

        expect(eq.operands[0]).toBeGreaterThan(eq.operands[1]);
    });

    it("should generate natural operands for divide operation", function () {

        let lowerNumberRange: number;
        let testFactory: IRandomService = {
            Randomise: (lower, upper): number => {

                lowerNumberRange = lower;

                return 0;
            }
        };
        let factory = new EquationFactory(testFactory);

        let eq = factory.CreateEquation({
            allowedOperations: [Operations.Divide]
        });

        expect(lowerNumberRange).toBe(1);
    });

    testCases(
        "should generate operands diveded without rest",
        [
            {
                randomNumbers: [0, 2, 5],
                operand1: 6,
                operand2: 2
            },
            {
                randomNumbers: [0, 3, 8],
                operand1: 8,
                operand2: 4
            }
        ],
        function (data: any) {

            let randomRaund: number = 0;
            let testFactory: IRandomService = {
                Randomise: (lower, upper): number => {
                    let num = data.randomNumbers[randomRaund] + 0;
                    randomRaund++;
                    return num;
                }
            };
            let factory = new EquationFactory(testFactory);

            let eq = factory.CreateEquation({
                allowedOperations: [Operations.Divide]
            });

            expect(eq.operands[0]).toBe(data.operand1);
            expect(eq.operands[1]).toBe(data.operand2);
        }
    );
});
