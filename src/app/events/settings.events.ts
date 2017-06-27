import {} from '../../serv';
import { Operations } from "../../domain/Operations";

export class SettingsChanged {
    allowedOperations: Array<Operations>;
    operationsCount: number;
    operandDimention: number;
}
