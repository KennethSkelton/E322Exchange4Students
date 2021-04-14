import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {AppComponent} from '../app.component';


@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent extends AppComponent {

  constructor(public afs: AngularFirestore) {
    super(afs);
  }

  ngOnInit(): void {
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

