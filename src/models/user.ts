export class User {
	constructor(
		public $key : string,
		public uid: string,
		public name: string,
		public tagline: string,
		public bio: string,
		public img: string,
		public chMade: any[],
		public chTaken: any[],
		public chDone: any[],
		public chLiked: any[],
	) {
		
	}
	
}