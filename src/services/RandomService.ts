export interface IRandomService {
    Randomize(lower: number, upper: number): number;
}

export class RandomService implements IRandomService {

    public Randomize(lower: number, upper: number): number {
        return Math.floor(Math.random() * (upper - lower + 1)) + lower;
    }
}
