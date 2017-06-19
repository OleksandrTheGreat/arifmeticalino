import { Operations } from "./Oprations";

export class EquationSettings {
    constructor (
        public operandsCount: number = 2,
        public allowedOperations: Array<Operations> = [Operations.Add]
    ) {

    }
}
