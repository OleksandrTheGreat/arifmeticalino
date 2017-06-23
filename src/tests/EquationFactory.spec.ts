import { TestCases } from "./TestExtensions";
import { Equation } from "../domain/Equation";
import { Operations } from "../domain/Operations";
import { RandomService, IRandomService } from "../services/RandomService";
import { EquationService, IEquationSettings, IEquationService } from "../services/EquationService";

describe("EquationFactory", () => {

    let service: IEquationService;

    let createService = (randomService: IRandomService) => {
        return new EquationService(randomService)
    };

    beforeAll(() => {
        service = createService(new RandomService());
    });

    TestCases(
        "should generate equation",
        [
            {
                settings: null,
                expected: 1
            },
            {
                settings: {
                    operationsCount: 2
                },
                expected: 2
            }
        ],
        (data) => {

            let actual = service.Create(data.settings);

            expect(actual.operations.length).toBe(data.expected);
        });

    TestCases(
        "should generate equation with positive result",
        [
            {
                randomNumbers: [0, 2, 3],
                settings: {
                    allowedOperations: [Operations.Substract]
                }
            },
            {
                randomNumbers: [0, 2, 3, 1, 2, 3],
                settings: {
                    allowedOperations: [Operations.Divide, Operations.Substract],
                    operationsCount: 2
                }
            }
        ],
        (data) => {

            //console.log("Test: ");
            //console.log(data);

            let randomizeCallCounter = -1;
            let testRandomService: IRandomService = {
                Randomize: (lower: number, upper: number): number => {
                    randomizeCallCounter++;
                    return data.randomNumbers[randomizeCallCounter];
                }
            };

            let service = createService(testRandomService);

            let actual = service.Create(data.settings);

            //console.log(service.EquationToString(actual))

            expect(actual.result).toBeGreaterThanOrEqual(0);
        });
    
    TestCases(
        "should generate equation with N operations",
        [
            {
                operationsCount: 5,
                operandDimension: 3
            }
        ],
        (data) => {

            let actual = service.Create({
                allowedOperations: [Operations.Add, Operations.Divide, Operations.Multiply, Operations.Substract],
                operationsCount: data.operationsCount,
                operandDimension: data.operandDimension
            });

            console.log(service.EquationToString(actual) + "=" + actual.result);

            expect(actual.operations.length).toBe(data.operationsCount);
        });
});
