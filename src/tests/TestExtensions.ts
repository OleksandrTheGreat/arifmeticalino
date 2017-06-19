export function testCases(
    description: string,
    cases: Array<any>,
    test: Function
) : void {

    for(let i = 0; i<cases.length;i++)
    it(description, function(){
        test(cases[i]);
    });
}
