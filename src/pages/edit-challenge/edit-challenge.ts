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
	test: any
	
	
	constructor(public navParams: NavParams,
	            private chService: ChService,
	            private navCtrl: NavController,
	            private authService: AuthService) {
		
	}
	
	ngOnInit() {
		this.mode = this.navParams.get('mode'); //assign value from previous page
		this.userId = this.authService.getActiveUser().uid
		this.img = ''
		this.imgRef = firebase.storage().ref()
		if (this.mode == 'Edit') {
			this.challenge = this.navParams.get('challenge')
			console.log(this.challenge.$key+'.png')
		}

		this.initializeForm()
	}
	
	onSubmit() {
		const value = this.chForm.value
		if (this.mode == 'Edit') {
			this.chService.editCh(this.challenge.$key, value.title, value.description, value.difficulty, this.challenge.img, this.challenge.userId)
		} else {
			this.chService.addCh(value.title, value.description, value.difficulty, value.img, this.userId)
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
					this.uploadImg(imageData)
				}
			)
			.catch(
				err => {
					console.log(err)
				}
			)
	}
	
	uploadImg(img) {
		this.imgRef.child(this.challenge.$key+'.png')
			.putString(img, 'base64', {contentType: 'image/png'})
			.then((savedPicture) => {
				this.challenge.img = savedPicture.downloadURL
			})
	}
}
