import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
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
interface Sport {
  Title : string
  Description : string
  Weight : number
  Price : number
  Sport : string
  OwnerID: string
  Image: any
  id: string
}

interface Furniture {
  Title : string 
  Description : string
  Category : string 
  Color : string
  Dimension : string
  Weight : number
  Price : number
  OwnerID: string
  Image: any
  id: string
}

interface Clothing {
  Title : string 
  Description : string 
  Category : string 
  Color : string 
  Size : string 
  Price : number
  OwnerID: string
  Image: any
  id: string
}

interface Electronic {
  Title : string 
  Description : string 
  Category : string 
  Model : string 
  Dimension : string 
  Weight : number
  Price : number
  OwnerID: string
  Image: any
  id: string
}
@Component({
  selector: 'app-view-item',
  templateUrl: './view-item.component.html',
  styleUrls: ['./view-item.component.css']
})
export class ViewItemComponent extends AppComponent {

  ttitle = '';
  eedition = '';
  Ccourse_number = '';
  Ddescription = '';
  Pprice = 0;
  Ssport = "";
  Wweight = 0;
  Ccolor = "";
  Ccategory = "";
  Ddimension = "";
  Ssize = "";
  Mmodel = "";
  type = "";
  edit = "";
  constructor(public afs: AngularFirestore,public firebaseService: FirebaseService, private activatedRoute: ActivatedRoute, public storage: AngularFireStorage) {
    super(afs, firebaseService,storage);
    this.activatedRoute.queryParams.subscribe((data: any) =>{
      this.ttitle = data.title;
      this.eedition = data.edition;
      this.Ccourse_number = data.course_number;
      this.Ddescription = data.description;
      this.Pprice = data.price;
      this.Ssport = data.sport;
      this.Wweight = data.weight;
      this.Ccolor = data.color;
      this.Ccategory = data.category;
      this.Ddimension = data.dimension;
      this.Ssize = data.size;
      this.Mmodel = data.model;
      this.type = data.type;
      this.edit = data.edit;
    });
  }

  ngOnInit(): void {
    if(this.type == 'Book'){
      this.notesCollection = this.afs.collection('Items', ref => {
        return ref.where('Course_Number', '==' ,this.Ccourse_number).where('Title', '==' ,this.ttitle)
        .where('Edition', '==' ,this.eedition).where('Description', '==' ,this.Ddescription).where('Price', '==' ,this.Pprice)
      });
      this.notes = this.notesCollection.snapshotChanges().pipe(map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Book;
          data.id = a.payload.doc.id;
          return data;
        });
      }));
      this.sports = new Observable<any[]>();
      this.furniture = new Observable<any[]>();
      this.clothing = new Observable<any[]>();
      this.electronics = new Observable<any[]>();
      if(this.edit == 'True'){
        this.bookShow();
      }
    }
    else if(this.type == 'Sport'){
      this.sportsCollection = this.afs.collection('Sports', ref => {
        return ref.where('Weight', '==' ,this.Wweight).where('Title', '==' ,this.ttitle)
        .where('Sport', '==' ,this.Ssport).where('Description', '==' ,this.Ddescription).where('Price', '==' ,this.Pprice)
      });
      this.notes = new Observable<any[]>();
      this.sports = this.sportsCollection.snapshotChanges().pipe(map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Sport;
          data.id = a.payload.doc.id;
          return data;
        });
      }));
      this.furniture = new Observable<any[]>();
      this.clothing = new Observable<any[]>();
      this.electronics = new Observable<any[]>();
      if(this.edit == 'True'){
        this.sportShow();
      }
    }
    else if(this.type == 'Furniture'){
      this.furnitureCollection = this.afs.collection('Furniture', ref => {
        return ref.where('Weight', '==' ,this.Wweight).where('Title', '==' ,this.ttitle)
        .where('Category', '==' ,this.Ccategory).where('Description', '==' ,this.Ddescription).where('Price', '==' ,this.Pprice)
        .where('Color', '==', this.Ccolor).where('Dimension', '==', this.Ddimension)
      });
      this.notes = new Observable<any[]>();
      this.sports = new Observable<any[]>();
      this.furniture = this.furnitureCollection.snapshotChanges().pipe(map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Furniture;
          data.id = a.payload.doc.id;
          return data;
        });
      }));
      this.clothing = new Observable<any[]>();
      this.electronics = new Observable<any[]>();
      if(this.edit == 'True'){
        this.furnitureShow();
      }
    }
    else if(this.type == 'Clothing'){
      this.clothingCollection = this.afs.collection('Clothing', ref => {
        return ref.where('Size', '==' ,this.Ssize).where('Title', '==' ,this.ttitle)
        .where('Category', '==' ,this.Ccategory).where('Description', '==' ,this.Ddescription).where('Price', '==' ,this.Pprice)
        .where('Color', '==', this.Ccolor)
      });
      this.notes = new Observable<any[]>();
      this.sports = new Observable<any[]>();
      this.furniture = new Observable<any[]>();
      this.clothing = this.clothingCollection.snapshotChanges().pipe(map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Clothing;
          data.id = a.payload.doc.id;
          return data;
        });
      }));
      this.electronics = new Observable<any[]>();
      if(this.edit == 'True'){
        this.clothingShow();
      }
    }
    else if(this.type == 'Electronic'){
      this.electronicsCollection = this.afs.collection('Electronic', ref => {
        return ref.where('Weight', '==' ,this.Wweight).where('Title', '==' ,this.ttitle)
        .where('Category', '==' ,this.Ccategory).where('Description', '==' ,this.Ddescription).where('Price', '==' ,this.Pprice)
        .where('Model', '==', this.Mmodel).where('Dimension', '==', this.Ddimension)
      });
      this.notes = new Observable<any[]>();
      this.sports = new Observable<any[]>();
      this.furniture = new Observable<any[]>();
      this.clothing = new Observable<any[]>();
      this.electronics = this.electronicsCollection.snapshotChanges().pipe(map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Electronic;
          data.id = a.payload.doc.id;
          return data;
        });
      }));
      if(this.edit == 'True'){
        this.electronicShow();
      }
    }

    else{
      this.notes = new Observable<any[]>();
      this.sports = new Observable<any[]>();
      this.furniture = new Observable<any[]>();
      this.clothing = new Observable<any[]>();
      this.electronics = new Observable<any[]>();
    }
  }

  updateBook(item: any){
 
    this.itemDoc = this.afs.doc(`Items/${item.id}`);

    if(this.ttitle != ""){
      this.itemDoc.update({
        Title: this.ttitle,
        Edition: this.eedition,
        Course_Number: this.Ccourse_number,
        Description: this.Ddescription,
        Price: this.Pprice
      })
    }
  }

  updateSport(item: any){
 
    this.itemDoc = this.afs.doc(`Sports/${item.id}`);

    if(this.ttitle != ""){
      this.itemDoc.update({
        Title: this.ttitle,
        Sport: this.Ssport,
        Weight: this.Wweight,
        Description: this.Ddescription,
        Price: this.Pprice
      })
    }
  }

  updateFurniture(item: any){
 
    this.itemDoc = this.afs.doc(`Furniture/${item.id}`);

    if(this.ttitle != ""){
      this.itemDoc.update({
        Title: this.ttitle,
        Dimension: this.Ddimension,
        Weight: this.Wweight,
        Description: this.Ddescription,
        Price: this.Pprice,
        Category: this.Ccategory,
        Color: this.Ccolor
      })
    }
  }
  updateClothing(item: any){
 
    this.itemDoc = this.afs.doc(`CLothing/${item.id}`);

    if(this.ttitle != ""){
      this.itemDoc.update({
        Title: this.ttitle,
        Size: this.Ssize,
        Description: this.Ddescription,
        Price: this.Pprice,
        Category: this.Ccategory,
        Color: this.Ccolor,
      })
    }
  }

  updateElectronic(item: any){
    this.itemDoc = this.afs.doc(`Electronic/${item.id}`);

    if(this.ttitle != ""){
      this.itemDoc.update({
        Title: this.ttitle,
        Dimension: this.Ddimension,
        Description: this.Ddescription,
        Price: this.Pprice,
        Category: this.Ccategory,
        Model: this.Mmodel,
        Weight: this.Wweight
      })
    }
  }

  sportShow(){
    var x = document.getElementById("sport");
    if (x != null){
      x.style.display = "block";
    }
    var y = document.getElementsByTagName("div");
    var i;
    for(i = 0;i<y.length;i++){
      if (y[i] != x){
          y[i].style.display = "none";
      }
    }
}
furnitureShow(){
  var x = document.getElementById("furniture");
  if (x != null){
    x.style.display = "block";
  }
  var y = document.getElementsByTagName("div");
  var i;
  for(i = 0;i<y.length;i++){
    if (y[i] != x){
        y[i].style.display = "none";
    }
  }
}
bookShow(){
  var x = document.getElementById("book");
  if (x != null){
    x.style.display = "block";
  }
  var y = document.getElementsByTagName("div");
  var i;
  for(i = 0;i<y.length;i++){
    if (y[i] != x){
        y[i].style.display = "none";
    }
  }
}
clothingShow(){
  var x = document.getElementById("clothing");
  if (x != null){
    x.style.display = "block";
  }
  var y = document.getElementsByTagName("div");
  var i;
  for(i = 0;i<y.length;i++){
    if (y[i] != x){
        y[i].style.display = "none";
    }
  }
}
electronicShow(){
  var x = document.getElementById("electronic");
  if (x != null){
    x.style.display = "block";
  }
  var y = document.getElementsByTagName("div");
  var i;
  for(i = 0;i<y.length;i++){
    if (y[i] != x){
        y[i].style.display = "none";
    }
  }
}

}
