export function TestCases(
    description: string,
    cases: Array<any>,
    test: (data: any) => void
): void {

    for (let i = 0; i < cases.length; i++)
        it(description, function () {
            test(cases[i]);
        });
}
