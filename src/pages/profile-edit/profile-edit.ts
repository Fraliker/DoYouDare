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
  selector: 'page-profile-edit',
  templateUrl: 'profile-edit.html'
})
export class ProfileEditPage implements OnInit {
  userId: string
  data: any
  
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
    console.log("Profile-edit params: " + this.navParams)
    this.data = this.navParams.get('data')
    console.log("Profile-edit page user: " + this.data)
    this.imgRef = firebase.storage().ref().child('/userImg/')
    this.initializeForm()
  }
  
  ionViewWillEnter() {

  }
  
	onSubmit() {
		const value = this.userForm.value
		this.userService.addUser(this.data.$key, value.name, value.tagline, value.bio, this.data.img)
//todo add toast

	}

	private initializeForm() {
		let name      = this.data.name
		let tagline   = this.data.tagline
		let bio       = this.data.bio
		this.userForm = new FormGroup({
			'name': new FormControl(name, Validators.required),
			'tagline': new FormControl(tagline, Validators.required),
			'bio': new FormControl(bio, Validators.required),
		});
	}

	onTakePhoto() {
		Camera.getPicture({
			quality: 90,
			destinationType: Camera.DestinationType.DATA_URL,
			sourceType: Camera.PictureSourceType.CAMERA,
			allowEdit: true,
			encodingType: Camera.EncodingType.PNG,
			targetWidth: 300,
			targetHeight: 200,
			//saveToPhotoAlbum: true,
			correctOrientation: false
		})
			.then(
				imageData => {
					this.imgData = imageData

					this.uploadImg(this.imgData, this.data.$key)
						.then((savedPicture) => {
							this.data.img = savedPicture.downloadURL
							this.img      = savedPicture.downloadURL //to show it as preview
						})
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
			quality: 90,
			destinationType: Camera.DestinationType.DATA_URL,
			sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
			allowEdit: true,
			encodingType: Camera.EncodingType.PNG,
			targetWidth: 300,
			targetHeight: 300,
			//saveToPhotoAlbum: true,
		})
			.then(
				imageData => {
					this.imgData = imageData


					this.uploadImg(this.imgData, this.data.$key)
						.then((savedPicture) => {
							this.data.img = savedPicture.downloadURL
							this.img      = savedPicture.downloadURL //to show it as preview
						})

				}
			)
			.catch(
				err => {
					console.log(err)
				}
			)
	}

	uploadImg(img, key) {
		return this.imgRef.child(key + '.png')
			.putString(img, 'base64', {contentType: 'image/png'})
	}
  
}
