import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
	apiKey: "AIzaSyDqK9M31J_8xR0RU3yIN524zqpZtIboh7M",
	authDomain: "do-you-dare-bc9e4.firebaseapp.com",
	databaseURL: "https://do-you-dare-bc9e4.firebaseio.com",
	storageBucket: "do-you-dare-bc9e4.appspot.com",
	messagingSenderId: "456374355832"
};

firebase.initializeApp(firebaseConfig);