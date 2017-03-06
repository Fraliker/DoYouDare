import {Challenge} from "../models/ch";
import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {AuthService} from "./auth";
import 'rxjs/Rx'

@Injectable()
export class ChService {
    private challenges: Challenge[] = [];

    constructor(private http: Http,
                private authService: AuthService) {

    }

    addCh(title: string, description: string, difficulty: string, img: string) {
        this.challenges.push(new Challenge(title, description, difficulty, img));
        console.log(this.challenges);
    }

    getCh() {
        return this.challenges.slice();
    }

    editCh(index: number, title: string, description: string, difficulty: string, img: string) {
        this.challenges[index] = new Challenge(title, description, difficulty, img);
    }

    removeCh(index:number) {
        this.challenges.splice(index, 1);
    }

    storeList(token: string) {
       // const userId = this.authService.getActiveUser().uid;
        console.log('https://do-you-dare-bc9e4.firebaseio.com/challenges.json?auth=' + token);
        return this.http
            .put('https://do-you-dare-bc9e4.firebaseio.com/challenges.json?auth=' + token, this.challenges)
            .map((response: Response) => {
                return response.json();
            });
    }

    fetchList() {
        //const userId = this.authService.getActiveUser().uid;
        return this.http
            .get('https://do-you-dare-bc9e4.firebaseio.com/challenges.json')
            .map((response: Response) => {
                return response.json();
            })
            .do((data) => {
                this.challenges = data
        })
    }
}
