import { Equation } from "../domain/Equation";
import { Operations } from "../domain/Operations";
import { EquationFactory, IEquationSettings } from "../services/EquationFactory";
import { TestCases } from "./TestExtensions";
import { RandomService, IRandomService } from "../services/RandomService";
import { ActionService } from "../services/ActionService";

describe("EquationFactory", () => {

    let factory: EquationFactory;

    beforeAll(() => {

        let randomService = new RandomService();

        factory = new EquationFactory(
            new ActionService(randomService),
            randomService
        );
    });

    it("should create an equation", () => {

        let eq = factory.Create();

        expect(eq.operations[0]).toBe(Operations.Add);
        expect(eq.result).toBe(eq.operands[0] + eq.operands[1]);
    });

    TestCases(
        "should create an equation with N actions",
        [
            {
                allowedOperations: [Operations.Substract, Operations.Add, Operations.Multiply, Operations.Substract],
                operantionsCount: 5
            }
        ],
        (data) => {

            let settings = {
                allowedOperations: data.allowedOperations,
                operantionsCount: data.operantionsCount
            };
            let eq = factory.Create(settings);

            console.log(eq)

            expect(eq.operations.length).toBe(settings.operantionsCount);
        });
});
