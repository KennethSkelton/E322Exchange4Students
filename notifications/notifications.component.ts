import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { map } from 'rxjs/operators';
import { AppComponent } from '../app.component';
import { FirebaseService } from '../services/firebase.service';
interface notification{
    sender: string
    buyer: string
    displayMessage: string
}
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent extends AppComponent {

  constructor(public afs: AngularFirestore, public firebaseService: FirebaseService, public storage: AngularFireStorage) {
    super(afs, firebaseService, storage);
    
  }
  removeNotification(item: any){
    console.log(item.id);
    this.itemDoc = this.afs.doc(`/Users/${this.ownerid}/notification/${item.id}`);
    this.itemDoc.delete();
  }

  ngOnInit(): void {
  }

}
