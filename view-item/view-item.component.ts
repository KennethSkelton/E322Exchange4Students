import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppComponent } from '../app.component';

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
  Pprice = '';
  Ssport = "";
  Wweight = 0;
  Ccolor = "";
  Ccategory = "";
  Ddimension = "";
  Ssize = "";
  Mmodel = "";
  type = "";
  edit = "";
  constructor(public afs: AngularFirestore, private activatedRoute: ActivatedRoute) {
    super(afs);
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
      this.notes = this.notesCollection.valueChanges()
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
      this.sports = this.sportsCollection.valueChanges()
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
      this.furniture = this.furnitureCollection.valueChanges()
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
      this.clothing = this.clothingCollection.valueChanges()
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
      this.electronics = this.electronicsCollection.valueChanges()
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
  getBookID(){

    const citiesRef = this.afs.collection('Items', ref => {
        return ref.where('Course_Number', '==' ,this.Ccourse_number).where('Title', '==' ,this.ttitle)
        .where('Edition', '==' ,this.eedition).where('Description', '==' ,this.Ddescription).where('Price', '==' ,this.Pprice)
      });
    const snapshot = citiesRef.get();

    snapshot.forEach(doc => {
      console.log(doc.query.get());
    });

  }

  updateBook(){
    this.getBookID()
   
    // var noteDoc = this.afs.doc('Items/'+id)
    // if(this.ttitle != ""){
    //   noteDoc.update({Title: this.ttitle})
    // }
    // if(this.eedition != ""){
    //   noteDoc.update({Edition: this.eedition})
    // }
    // if(this.Ccourse_number != ""){
    //   noteDoc.update({Course_Number: this.Ccourse_number})
    // }
    // if(this.Ddescription != ""){
    //   noteDoc.update({Description: this.Ddescription})
    // }
    // if(this.Pprice != ""){
    //   noteDoc.update({Price: this.Pprice})
    // }
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
