import {Component, OnInit} from '@angular/core'
import {NavParams, NavController} from 'ionic-angular'
import {FormGroup, FormControl, Validators} from "@angular/forms"
import {ChService} from "../../services/challenges"
import {HomePage} from "../home/home"
import {Challenge} from "../../models/ch"
import {AuthService} from "../../services/auth"
import {Camera} from "ionic-native"
import firebase from 'firebase'


@Component({
	selector: 'page-edit-challenge',
	templateUrl: 'edit-challenge.html'
})
export class EditChallengePage implements OnInit {
	mode          = 'New';
	selectOptions = ['Easy', 'Medium', 'Hard']
	chForm: FormGroup
	challenge: Challenge
	userId: string
	img: any
	public imgRef: any
	public rootRef: any
	
	
	constructor(public navParams: NavParams,
	            private chService: ChService,
	            private navCtrl: NavController,
	            private authService: AuthService) {
		
	}
	
	ngOnInit() {
		this.mode = this.navParams.get('mode'); //assign value from previous page
		this.userId = this.authService.getActiveUser().uid
		this.img = ''
		this.rootRef = firebase.storage().ref()
		if (this.mode == 'Edit') {
			this.challenge = this.navParams.get('challenge')
			// this.img = this.challenge.img
			this.imgRef = this.rootRef.child(this.challenge.$key+'.png')
			console.log(this.challenge.$key+'.png')
		}

		this.initializeForm()
	}
	
	onSubmit() {
		const value = this.chForm.value
		if (this.mode == 'Edit') {
			this.chService.editCh(this.challenge.$key, value.title, value.description, value.difficulty, value.img, this.challenge.userId)
		} else {
			this.chService.addCh(value.title, value.description, value.difficulty, value.img, this.userId)
			// this.authService.getActiveUser().getToken()
			//     .then(
			//         (token: string) => {
			//             this.chService.addCh(token, value.title, value.description, value.difficulty, value.img, this.userId)
			//                 // .subscribe(
			//                 //     () => console.log("Challenge added to FireBase"),
			//                 //     error => {
			//                 //         this.chService.handleError(error.json().error);
			//                 //     }
			//                 // )
			//         }
			//     )
		}
		
		this.chForm.reset()
		this.navCtrl.push(HomePage)
	}
	
	private initializeForm() {
		let title       = null
		let description = null
		let difficulty  = 'Medium'
		let img         = ''
		
		if (this.mode == 'Edit') {
			title       = this.challenge.title
			description = this.challenge.description
			difficulty  = this.challenge.difficulty
			img         = this.challenge.img
		}
		this.chForm = new FormGroup({
			'title': new FormControl(title, Validators.required),
			'description': new FormControl(description, Validators.required),
			'difficulty': new FormControl(difficulty, Validators.required),
			'img': new FormControl(img, Validators.required)
		});
	}
	
	onTakePhoto() {
		Camera.getPicture({
			quality : 95,
			destinationType : Camera.DestinationType.DATA_URL,
			sourceType : Camera.PictureSourceType.CAMERA,
			allowEdit : true,
			encodingType: Camera.EncodingType.PNG,
			targetWidth: 500,
			targetHeight: 500,
			saveToPhotoAlbum: true
		})
			.then(
				imageData => {
					this.img = imageData
					console.log(this.img)
					this.uploadImg(imageData)
					//this.uploadImage(this.challenge.title, imageData)
				}
			)
			.catch(
				err => {
					console.log(err)
				}
			)
	}
	
	uploadImg(img) {
		// var message = 'This is my message.';
		// this.imgRef //maybe add return .child(this.challenge.$key)
		// 	.putString(message)
		// 	.then((savedPicture) => {
		// 		this.img = savedPicture.downloadURL
		// 		console.log(this.img)
		// 	});
		
		this.imgRef //maybe add return .child(this.challenge.$key)
			.putString(img, 'base64', {contentType: 'image/png'})
			.then((savedPicture) => {
				this.img
					.set(savedPicture.downloadURL);
				console.log(this.img)
			});
	}
	
	
	
	uploadImage(name, data) {
		let promise = new Promise((res,rej) => {
			let fileName = name + ".jpg";
			let uploadTask = firebase.storage().ref(`/posts/${fileName}`).put(data);
			uploadTask.on('state_changed', function(snapshot) {
			}, function(error) {
				rej(error);
			}, function() {
				var downloadURL = uploadTask.snapshot.downloadURL;
				res(downloadURL);
			});
		});
		return promise;
	}
	
	
}
