import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {UserService} from "../../services/users"
import {AuthService} from "../../services/auth"
import {User} from "../../models/user"
import {FirebaseListObservable, AngularFire} from "angularfire2"
import {FormGroup, FormControl, Validators} from "@angular/forms"
import {Camera} from "ionic-native"
import firebase from 'firebase'

@Component({
	selector: 'page-profile',
	templateUrl: 'profile.html'
})
export class ProfilePage implements OnInit {
	userId: string
	sameUser: boolean
	user: any
	name:any
	
	userForm: FormGroup
	img: any
	imgData: any
	public imgRef: any
	
	constructor(public navCtrl: NavController,
	            public navParams: NavParams,
	            private userService: UserService,
	            private authService: AuthService,
	            private af: AngularFire) {
	}
	
	ngOnInit() {
		this.imgRef = firebase.storage().ref().child('/userImg/')
		// this.initializeForm()
	}
	
	ionViewWillEnter() {
		console.log("Profile params: " + this.navParams)
		this.userId = this.navParams.get('userId')
		console.log("Profile page user: " + this.userId)
		// this.af.database.object('/users/'+this.userId)
		// 	.subscribe(user => (
		// 		this.user = user
		//
		// 	))
		this.user = this.af.database.object('/users/' + this.userId)
		this.user.subscribe(user => {
				this.name = user.name
		})
		this.sameUser = this.authService.compareUsers(this.userId)
		console.log(this.sameUser)
		console.log(this.name)
		
	}
	
	//
	// onEditUser() {
	// 	this.navCtrl.push(EditUserPage, {user: this.user})
	// }
	
	onEditProfile() {
		console.log(this.name)
	}
	
//
// 	onSubmit() {
// 		const value = this.userForm.value
//
// 		this.userService.addUser(this.user.$key, value.name, value.tagline, value.bio, this.user.img)
// //todo add toast
//
// 	}
//
// 	private initializeForm() {
// 		let name      = this.user.name
// 		let tagline   = this.user.tagline
// 		let bio       = this.user.bio
// 		this.userForm = new FormGroup({
// 			'name': new FormControl(name, Validators.required),
// 			'tagline': new FormControl(tagline, Validators.required),
// 			'bio': new FormControl(bio, Validators.required),
// 		});
// 	}
//
// 	onTakePhoto() {
// 		Camera.getPicture({
// 			quality: 90,
// 			destinationType: Camera.DestinationType.DATA_URL,
// 			sourceType: Camera.PictureSourceType.CAMERA,
// 			allowEdit: true,
// 			encodingType: Camera.EncodingType.PNG,
// 			targetWidth: 300,
// 			targetHeight: 200,
// 			//saveToPhotoAlbum: true,
// 			correctOrientation: false
// 		})
// 			.then(
// 				imageData => {
// 					this.imgData = imageData
//
// 					this.uploadImg(this.imgData, this.user.$key)
// 						.then((savedPicture) => {
// 							this.user.img = savedPicture.downloadURL
// 							this.img      = savedPicture.downloadURL //to show it as preview
// 						})
// 				}
// 			)
// 			.catch(
// 				err => {
// 					console.log(err)
// 				}
// 			)
// 	}
//
// 	onChoosePhoto() {
// 		Camera.getPicture({
// 			quality: 90,
// 			destinationType: Camera.DestinationType.DATA_URL,
// 			sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
// 			allowEdit: true,
// 			encodingType: Camera.EncodingType.PNG,
// 			targetWidth: 300,
// 			targetHeight: 300,
// 			//saveToPhotoAlbum: true,
// 		})
// 			.then(
// 				imageData => {
// 					this.imgData = imageData
//
//
// 					this.uploadImg(this.imgData, this.user.$key)
// 						.then((savedPicture) => {
// 							this.user.img = savedPicture.downloadURL
// 							this.img      = savedPicture.downloadURL //to show it as preview
// 						})
//
// 				}
// 			)
// 			.catch(
// 				err => {
// 					console.log(err)
// 				}
// 			)
// 	}
//
// 	uploadImg(img, key) {
// 		return this.imgRef.child(key + '.png')
// 			.putString(img, 'base64', {contentType: 'image/png'})
// 	}
	
}
