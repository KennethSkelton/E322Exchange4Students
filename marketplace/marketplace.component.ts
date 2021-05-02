import { EventEmitter, Injectable } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import {AppComponent} from '../app.component';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FirebaseService } from '../services/firebase.service';
@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.css']
})
@Injectable()
export class MarketplaceComponent extends AppComponent {

  constructor(public afs: AngularFirestore, public firebaseService : FirebaseService) {
    super(afs,firebaseService);
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




}

