import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { map } from 'rxjs/operators';
import { AppComponent } from '../app.component';
import { FirebaseService } from '../services/firebase.service';
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
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent extends AppComponent {

  constructor(public afs: AngularFirestore, public firebaseService: FirebaseService, public storage: AngularFireStorage) {
    super(afs, firebaseService,storage);
    this.cartCollection = this.afs.collection(`Users/${this.ownerid}/cart`);
    this.cart = this.cartCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as any;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  ngOnInit(): void {
  }

}
