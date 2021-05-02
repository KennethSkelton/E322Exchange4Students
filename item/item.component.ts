import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {AppComponent} from '../app.component';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent extends AppComponent {


  constructor(public afs: AngularFirestore, public firebaseService: FirebaseService) {
      super(afs, firebaseService)  
  }
  ngOnInit(): void {
    this.notesCollection = this.afs.collection('Items', ref => {
      return ref.where('OwnerID', '==' ,this.ownerid)
    });
    this.sportsCollection = this.afs.collection('Sports', ref => {
      return ref.where('OwnerID', '==' ,this.ownerid)
    });
    this.furnitureCollection = this.afs.collection('Furniture', ref => {
      return ref.where('OwnerID', '==' ,this.ownerid)
    });
    this.clothingCollection = this.afs.collection('Clothing', ref => {
      return ref.where('OwnerID', '==' ,this.ownerid)
    });
    this.electronicsCollection = this.afs.collection('Electronic', ref => {
      return ref.where('OwnerID', '==' ,this.ownerid)
    });
    this.notes = this.notesCollection.valueChanges()
    this.sports = this.sportsCollection.valueChanges()
    this.furniture = this.furnitureCollection.valueChanges()
    this.clothing = this.clothingCollection.valueChanges()
    this.electronics = this.electronicsCollection.valueChanges()
  }


}
