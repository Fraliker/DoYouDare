import {Challenge} from "../models/ch";
export class ChService {
    private challenges: Challenge[] = [];

    addCh(title: string, description: string, difficulty: string) {
        this.challenges.push(new Challenge(title, description, difficulty));
        console.log(this.challenges);
    }

    getCh() {
        return this.challenges.slice();
    }

    editCh(index: number, title: string, description: string, difficulty: string) {
        this.challenges[index] = new Challenge(title, description, difficulty);
    }

    removeCh(index:number) {
        this.challenges.splice(index, 1);
    }
}
