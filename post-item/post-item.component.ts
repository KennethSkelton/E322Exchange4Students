import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AppComponent } from '../app.component';
import { FirebaseService } from '../services/firebase.service';


@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
// class FileUpload {
//   key: string;
//   name: string;
//   url: string;
//   file: File;

//   constructor(file: File) {
//     this.file = file;
//   }
// }

export class PostItemComponent extends AppComponent {
  private basePath = '/uploads';

  images: any
  @ViewChild('myImage') myImage: any
  @ViewChild('myImageS') myImageS: any
  @ViewChild('myImageF') myImageF: any
  @ViewChild('myImageC') myImageC: any
  @ViewChild('myImageE') myImageE: any
  constructor(public afs: AngularFirestore, public firebaseService: FirebaseService, public storage: AngularFireStorage) {
    super(afs, firebaseService, storage);

    this.images = ""
  }
  upload($event: any) {
    let reader = new FileReader();
    this.image = $event.target.files[0];

    reader.onload = (e) => {
      if (e.target != null) {
        this.myImage.nativeElement.src = e.target["result"];
      }

    };
    reader.readAsDataURL($event.target.files[0]);
    this.path = $event.target.files[0];
    var str = Math.random() + this.path;
    // this.storage.upload(str,this.path);
    this.image = str;
  }
  uploadS($event: any) {
    let reader = new FileReader();
    this.image = $event.target.files[0];

    reader.onload = (e) => {
      if (e.target != null) {
        this.myImageS.nativeElement.src = e.target["result"];
      }

    };
    reader.readAsDataURL($event.target.files[0]);
    this.path = $event.target.files[0];
    var str = Math.random() + this.path;
    // this.storage.upload(str,this.path);
    this.image = str;
  }
  uploadF($event: any) {
    let reader = new FileReader();
    this.image = $event.target.files[0];

    reader.onload = (e) => {
      if (e.target != null) {
        this.myImageF.nativeElement.src = e.target["result"];
      }

    };
    reader.readAsDataURL($event.target.files[0]);
    this.path = $event.target.files[0];
    var str = Math.random() + this.path;
    // this.storage.upload(str,this.path);
    this.image = str;
  }
  uploadC($event: any) {
    let reader = new FileReader();
    this.image = $event.target.files[0];

    reader.onload = (e) => {
      if (e.target != null) {
        this.myImageC.nativeElement.src = e.target["result"];
      }

    };
    reader.readAsDataURL($event.target.files[0]);
    this.path = $event.target.files[0];
    var str = Math.random() + this.path;
    // this.storage.upload(str,this.path);
    this.image = str;
  }
  uploadE($event: any) {
    let reader = new FileReader();
    this.image = $event.target.files[0];

    reader.onload = (e) => {
      if (e.target != null) {
        this.myImageE.nativeElement.src = e.target["result"];
      }

    };
    reader.readAsDataURL($event.target.files[0]);
    this.path = $event.target.files[0];
    var str = Math.random() + this.path;
    // this.storage.upload(str,this.path);
    this.image = str;
  }
  // uploadImage(){
  //   console.log(this.path)
  //   var str = Math.random()+this.path;
  //   this.storage.upload("/files/"+str,this.path);
  //   this.image = "/files/"+str;
  // }


  // pushFileToStorage(fileUpload: FileUpload): Observable<number> {
  //   const filePath = `${this.basePath}/${fileUpload.file.name}`;
  //   const storageRef = this.storage.ref(filePath);
  //   const uploadTask = this.storage.upload(filePath, fileUpload.file);

  //   uploadTask.snapshotChanges().pipe(
  //     finalize(() => {
  //       storageRef.getDownloadURL().subscribe(downloadURL => {
  //         fileUpload.url = downloadURL;
  //         fileUpload.name = fileUpload.file.name;
  //         this.saveFileData(fileUpload);
  //       });
  //     })
  //   ).subscribe();

  //   return uploadTask.percentageChanges();
  // }
  // saveFileData(fileUplad: FileUpload){

  // }
  ngOnInit(): void {
  }
  resetImage(){
    this.myImage.nativeElement.src = "#"
    this.myImageS.nativeElement.src = "#"
    this.myImageF.nativeElement.src = "#"
    this.myImageC.nativeElement.src = "#"
    this.myImageE.nativeElement.src = "#"
  }
  resetColors(x: string) {
    var y = document.getElementsByClassName("icon");
    var tip = 0;
    if (x == "sport") {
      tip = 1;
    }
    if (x == "furn") {
      tip = 2;
    }
    if (x == "cloth") {
      tip = 3;
    }
    if (x == "elect") {
      tip = 4;
    }
    var book = document.getElementById("bookButton");
    if (book != null && tip != 0) {

      book.style.backgroundColor = "#ff4e4e";
    }
    var sport = document.getElementById("sportButton");
    if (sport != null && tip != 1) {

      sport.style.backgroundColor = "#ff4e4e";
    }
    var furn = document.getElementById("furnButton");
    if (furn != null && tip != 2) {

      furn.style.backgroundColor = "#ff4e4e";
    }
    var cloth = document.getElementById("clothButton");
    if (cloth != null && tip != 3) {

      cloth.style.backgroundColor = "#ff4e4e";
    }
    var elect = document.getElementById("electButton");
    if (elect != null && tip != 4) {

      elect.style.backgroundColor = "#ff4e4e";
    }

  }
  sportShow() {
    var x = document.getElementById("sport");
    if (x != null) {
      x.style.display = "block";
    }
    var z = document.getElementById("sportButton");
    if (z != null) {
      z.style.backgroundColor = "#a01616";
    }
    var y = document.getElementsByTagName("div");
    var i;
    for (i = 0; i < y.length; i++) {
      if (y[i] != x && y[i] != z) {
        y[i].style.display = "none";
      }
    }
    var w = document.getElementById("sportDisplay");
    if (w != null) {
      w.style.display = "flex";
    }
    this.resetValues();
    this.resetColors("sport");
    this.resetImage();
  }
  furnitureShow() {
    var x = document.getElementById("furniture");
    if (x != null) {
      x.style.display = "block";
    }
    var z = document.getElementById("furnButton");
    if (z != null) {
      z.style.backgroundColor = "#a01616";
    }
    var y = document.getElementsByTagName("div");
    var i;
    for (i = 0; i < y.length; i++) {
      if (y[i] != x && y[i] != z) {
        y[i].style.display = "none";
      }
    }
    var w = document.getElementById("furnDisplay");
    if (w != null) {
      w.style.display = "flex";
    }
    this.resetValues();
    this.resetColors("furn");
    this.resetImage();
  }
  bookShow() {
    var x = document.getElementById("book");
    if (x != null) {
      x.style.display = "block";
    }
    var z = document.getElementById("bookButton");
    if (z != null) {
      z.style.backgroundColor = "#a01616";
    }
    var y = document.getElementsByTagName("div");

    var i;
    for (i = 0; i < y.length; i++) {
      if (y[i] != x && y[i] != z) {
        y[i].style.display = "none";
      }
    }
    var w = document.getElementById("bookDisplay");
    if (w != null) {
      w.style.display = "flex";
    }
    this.resetValues();
    this.resetColors("");
    this.resetImage();
  }
  clothingShow() {
    var x = document.getElementById("clothing");
    if (x != null) {
      x.style.display = "block";
    }
    var z = document.getElementById("clothButton");
    if (z != null) {
      z.style.backgroundColor = "#a01616";
    }
    var y = document.getElementsByTagName("div");
    var i;
    for (i = 0; i < y.length; i++) {
      if (y[i] != x && y[i] != z) {
        y[i].style.display = "none";
      }
    }
    var w = document.getElementById("clothDisplay");
    if (w != null) {
      w.style.display = "flex";
    }
    this.resetValues();
    this.resetColors("cloth");
    this.resetImage();
  }
  electronicShow() {
    var x = document.getElementById("electronic");
    if (x != null) {
      x.style.display = "block";
    }
    var z = document.getElementById("electButton");
    if (z != null) {
      z.style.backgroundColor = "#a01616";
    }
    var y = document.getElementsByTagName("div");
    var i;
    for (i = 0; i < y.length; i++) {
      if (y[i] != x && y[i] != z) {
        y[i].style.display = "none";
      }
    }
    var w = document.getElementById("electDisplay");
    if (w != null) {
      w.style.display = "flex";
    }
    this.resetValues();
    this.resetColors("elect");
    this.resetImage();
  }

}

