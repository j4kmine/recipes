import { Component,OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  ngOnInit(){
    firebase.initializeApp({
      apiKey: "AIzaSyCBitO8_DU75n93tp1NMbpIq-pGLZuPT6Y",
      authDomain: "ng-recipe-book-69bb2.firebaseapp.com"
    });
  }
}
