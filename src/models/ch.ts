export class Challenge {
    constructor(
        public $key : string,
        public title: string,
        public description: string,
        public difficulty: string,
        public img: string,
        public userId: string,
        public rating: any[],
        public comments: any[],
    ) {

    }

}