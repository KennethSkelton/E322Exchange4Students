import { EventEmitter, Injectable } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import {AppComponent} from '../app.component';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FirebaseService } from '../services/firebase.service';
import { map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
interface Book {
  Title: string
  Course_Number: string
  Edition: string
  Description: string
  Price: number
  OwnerID: string
  Image: any
  id: string
}
@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.css']
})
@Injectable()
export class MarketplaceComponent extends AppComponent {

  constructor(public afs: AngularFirestore, public firebaseService : FirebaseService,public storage: AngularFireStorage) {
    super(afs,firebaseService, storage);
  }
    
    ngOnInit() {
      }
    
  sportShow(){
    var x = Array.from(document.getElementsByClassName('sport') as HTMLCollectionOf<HTMLElement>)
    x.forEach((element) => {
      element.style.display = "block"
    });
    var y = Array.from(document.getElementsByTagName('li') as HTMLCollectionOf<HTMLElement>)
    y.forEach((element) => {
      if(element.className != 'sport' && element.className != 'menu'){
        element.style.display = "none"
      }
    });
  }
  bookShow(){
    var x = Array.from(document.getElementsByClassName('book') as HTMLCollectionOf<HTMLElement>)
      x.forEach((element) => {
        element.style.display = "block"
      });
      var y = Array.from(document.getElementsByTagName('li') as HTMLCollectionOf<HTMLElement>)
      y.forEach((element) => {
        if(element.className != 'book' && element.className != 'menu'){
          element.style.display = "none"
        }
      });
    }
  furnitureShow(){
    var x = Array.from(document.getElementsByClassName('furniture') as HTMLCollectionOf<HTMLElement>)
    x.forEach((element) => {
      element.style.display = "block"
    });
    var y = Array.from(document.getElementsByTagName('li') as HTMLCollectionOf<HTMLElement>)
    y.forEach((element) => {
      if(element.className != 'furniture' && element.className != 'menu'){
        element.style.display = "none"
      }
    });
  }
  clothingShow(){
    var x = Array.from(document.getElementsByClassName('clothing') as HTMLCollectionOf<HTMLElement>)
    x.forEach((element) => {
      element.style.display = "block"
    });
    var y = Array.from(document.getElementsByTagName('li') as HTMLCollectionOf<HTMLElement>)
    y.forEach((element) => {
      if(element.className != 'clothing' && element.className != 'menu'){
        element.style.display = "none"
      }
    });
  }
  electronicShow(){
    var x = Array.from(document.getElementsByClassName('electronic') as HTMLCollectionOf<HTMLElement>)
    x.forEach((element) => {
      element.style.display = "block"
    });
    var y = Array.from(document.getElementsByTagName('li') as HTMLCollectionOf<HTMLElement>)
    y.forEach((element) => {
      if(element.className != 'electronic' && element.className != 'menu'){
        element.style.display = "none"
      }
    });
  }


  makeBlue(elem:any) {
    elem.style.display = "none"
  }

}
