export interface IRandomService {
    Randomise(lower: number, upper: number): number;
}

export class RandomService implements IRandomService {
    public Randomise(lower: number, upper: number): number {
        return Math.floor(Math.random() * (upper - lower + 1)) + lower;
    }
}
