import { EventEmitter } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import {AppComponent} from '../app.component';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends AppComponent {

  @Output() isLogout = new EventEmitter<void>()
  constructor(public afs: AngularFirestore, public firebaseService : FirebaseService) {
    super(afs,firebaseService);
  }

  ngOnInit(): void {
  }
  logout(){
    this.firebaseService.logout()
    this.isLogout.emit()
  }
}
