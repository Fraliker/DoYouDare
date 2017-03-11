import {Component, OnInit} from '@angular/core'
import {NavParams, NavController} from 'ionic-angular'
import {FormGroup, FormControl, Validators} from "@angular/forms"
import {ChService} from "../../services/challenges"
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
	imgData: any
	public imgRef: any
	
	
	constructor(public navParams: NavParams,
	            private chService: ChService,
	            private navCtrl: NavController,
	            private authService: AuthService) {
		
	}
	
	ngOnInit() {
		this.mode = this.navParams.get('mode'); //assign value from previous page
		this.userId = this.authService.getActiveUser().uid
		this.imgRef = firebase.storage().ref()
		this.img = ''
		if (this.mode == 'Edit') {
			this.challenge = this.navParams.get('challenge')
			this.img = this.challenge.img
		}

		this.initializeForm()
	}
	
	onSubmit() {
		const value = this.chForm.value
		if (this.mode == 'Edit') {
			this.chService.editCh(this.challenge.$key, value.title, value.description, value.difficulty, this.challenge.img, this.challenge.userId)
		} else {
			this.chService.addCh(value.title, value.description, value.difficulty, this.userId)
				.then(
					newObject => {
						this.uploadImg(this.imgData, newObject.key)
							.then((savedPicture) => {
								this.img = savedPicture.downloadURL
								this.chService.editCh(newObject.key, value.title, value.description, value.difficulty, this.img, this.userId)
							})
					}
				)
		}
		this.chForm.reset()
		this.navCtrl.popToRoot()
	}
	
	private initializeForm() {
		let title       = null
		let description = null
		let difficulty  = 'Medium'
		
		if (this.mode == 'Edit') {
			title       = this.challenge.title
			description = this.challenge.description
			difficulty  = this.challenge.difficulty
		}
		this.chForm = new FormGroup({
			'title': new FormControl(title, Validators.required),
			'description': new FormControl(description, Validators.required),
			'difficulty': new FormControl(difficulty, Validators.required),
		});
	}
	
	onTakePhoto() {
		Camera.getPicture({
			quality : 90,
			destinationType : Camera.DestinationType.DATA_URL,
			sourceType : Camera.PictureSourceType.CAMERA,
			allowEdit : true,
			encodingType: Camera.EncodingType.PNG,
			targetWidth: 300,
			targetHeight: 200,
			//saveToPhotoAlbum: true,
			correctOrientation: false
		})
			.then(
				imageData => {
					this.imgData = imageData
					
					if (this.mode == 'Edit') {
						this.uploadImg(this.imgData, this.challenge.$key)
							.then((savedPicture) => {
								this.challenge.img = savedPicture.downloadURL
								this.img = savedPicture.downloadURL //to show it as preview
							})
					} else { this.img = "data:image/jpeg;base64," + imageData; }
				}
			)
			.catch(
				err => {
					console.log(err)
				}
			)
	}
	onChoosePhoto() {
		Camera.getPicture({
			quality : 90,
			destinationType : Camera.DestinationType.DATA_URL,
			sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
			allowEdit : true,
			encodingType: Camera.EncodingType.PNG,
			targetWidth: 300,
			targetHeight: 200,
			//saveToPhotoAlbum: true,
		})
			.then(
				imageData => {
					this.imgData = imageData
					
					if (this.mode == 'Edit') {
						this.uploadImg(this.imgData, this.challenge.$key)
							.then((savedPicture) => {
								this.challenge.img = savedPicture.downloadURL
								this.img = savedPicture.downloadURL //to show it as preview
							})
					} else { this.img = "data:image/jpeg;base64," + imageData; }
				}
			)
			.catch(
				err => {
					console.log(err)
				}
			)
	}
	
	uploadImg(img, key) {
		return this.imgRef.child(key+'.png')
			.putString(img, 'base64', {contentType: 'image/png'})
	}
}
