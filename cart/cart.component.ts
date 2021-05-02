import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
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

  constructor(public afs: AngularFirestore, public firebaseService: FirebaseService) {
    super(afs, firebaseService);
    this.notesCollection = this.afs.collection(`Users/${this.userName}/cart`);
    this.notes = this.notesCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Book;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  ngOnInit(): void {
  }

}
