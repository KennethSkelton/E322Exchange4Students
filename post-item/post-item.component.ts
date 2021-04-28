import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import {AppComponent} from '../app.component';


@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class FileUpload {
  key: string;
  name: string;
  url: string;
  file: File;

  constructor(file: File) {
    this.file = file;
  }
}

export class PostItemComponent extends AppComponent {
  private basePath = '/uploads';
  constructor(public afs: AngularFirestore, private storage: AngularFireStorage) {
    super(afs);
    
  }
  pushFileToStorage(fileUpload: FileUpload): Observable<number> {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);
  
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.saveFileData(fileUpload);
        });
      })
    ).subscribe();
  
    return uploadTask.percentageChanges();
  }
  saveFileData(fileUplad: FileUpload){
    
  }
  ngOnInit(): void {
  }
 
  // preview_image(event) {
  //   var reader = new FileReader();
  //   reader.onload = function(){
  //     var output = document.getElementById('output_image');
  //     output.src = reader.result;
  //   }
  //   reader.readAsDataURL(event.target.files[0]);
  // }
  resetColors(x:string){
      var y =document.getElementsByClassName("icon");
      var tip = 0;
      if(x == "sport"){
        tip = 1;
      }
      if(x == "furn"){
        tip = 2;
      }
      if(x == "cloth"){
        tip = 3;
      }
      if(x == "elect"){
        tip = 4;
      }
      var book = document.getElementById("bookButton");
      if(book != null && tip != 0){

        book.style.backgroundColor = "#5bfddd";
      }
      var sport = document.getElementById("sportButton");
      if(sport != null && tip != 1){

        sport.style.backgroundColor = "#5078ff";
      }
      var furn = document.getElementById("furnButton");
      if(furn != null && tip != 2){

        furn.style.backgroundColor = "#ffae51";
      }
      var cloth = document.getElementById("clothButton");
      if(cloth != null && tip != 3){

        cloth.style.backgroundColor = "#ff4e4e";
      }
      var elect = document.getElementById("electButton");
      if(elect != null && tip != 4){

        elect.style.backgroundColor = "#e5ff9d";
      }
     
  }
  sportShow(){
    var x = document.getElementById("sport");
    if (x != null){
      x.style.display = "block";
    }
    var z = document.getElementById("sportButton");
  if (z != null){
    z.style.backgroundColor = "#1636a0";
  }
    var y = document.getElementsByTagName("div");
    var i;
    for(i = 0;i<y.length;i++){
      if (y[i] != x && y[i] != z){
          y[i].style.display = "none";
      }
    }
    var w = document.getElementById("sportDisplay");
    if (w != null){
      w.style.display = "flex";
    }
    this.resetValues();
    this.resetColors("sport");
}
furnitureShow(){
  var x = document.getElementById("furniture");
  if (x != null){
    x.style.display = "block";
  }
  var z = document.getElementById("furnButton");
  if (z != null){
    z.style.backgroundColor = "#a06016";
  }
    var y = document.getElementsByTagName("div");
    var i;
    for(i = 0;i<y.length;i++){
      if (y[i] != x && y[i] != z){
          y[i].style.display = "none";
      }
    }
    var w = document.getElementById("furnDisplay");
    if (w != null){
      w.style.display = "flex";
    }
    this.resetValues();
    this.resetColors("furn");
}
bookShow(){
  var x = document.getElementById("book");
  if (x != null){
    x.style.display = "block";
  }
  var z = document.getElementById("bookButton");
  if (z != null){
    z.style.backgroundColor = "#16A085";
  }
  var y = document.getElementsByTagName("div");
  
  var i;
  for(i = 0;i<y.length;i++){
    if (y[i] != x && y[i] != z){
        y[i].style.display = "none";
    }
  }
  var w = document.getElementById("bookDisplay");
  if (w != null){
    w.style.display = "flex";
  }
  this.resetValues();
  this.resetColors("");
}
clothingShow(){
  var x = document.getElementById("clothing");
  if (x != null){
    x.style.display = "block";
  }
  var z = document.getElementById("clothButton");
  if (z != null){
    z.style.backgroundColor = "#a01616";
  }
    var y = document.getElementsByTagName("div");
    var i;
    for(i = 0;i<y.length;i++){
      if (y[i] != x && y[i] != z){
          y[i].style.display = "none";
      }
    }
    var w = document.getElementById("clothDisplay");
    if (w != null){
      w.style.display = "flex";
    }
    this.resetValues();
    this.resetColors("cloth");
}
electronicShow(){
  var x = document.getElementById("electronic");
  if (x != null){
    x.style.display = "block";
  }
  var z = document.getElementById("electButton");
  if (z != null){
    z.style.backgroundColor = "#bfeb48";
  }
    var y = document.getElementsByTagName("div");
    var i;
    for(i = 0;i<y.length;i++){
      if (y[i] != x && y[i] != z){
          y[i].style.display = "none";
      }
    }
    var w = document.getElementById("electDisplay");
    if (w != null){
      w.style.display = "flex";
    }
    this.resetValues();
    this.resetColors("elect");
}

}

