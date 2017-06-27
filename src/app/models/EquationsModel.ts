import * as ko from "knockout";

export class EquationsModel {
    current: string;
    answer: number;
    
    answerGiven(answer: number): void {

        //!!!KO bug: this.answer - this points to a appModel (parent)

        console.log(answer);        
    }
}
