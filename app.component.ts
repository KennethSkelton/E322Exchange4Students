import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import firebase from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FirebaseService } from './services/firebase.service';

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
}

interface Clothing {
  Title : string 
  Description : string 
  Category : string 
  Color : string 
  Size : string 
  Price : number
  OwnerID: string
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
}

interface Credential {
  UserName : string 
  Password : string 
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  notesCollection:AngularFirestoreCollection<Book>;
  sportsCollection:AngularFirestoreCollection<Sport>;
  furnitureCollection:AngularFirestoreCollection<Furniture>;
  clothingCollection:AngularFirestoreCollection<Clothing>;
  electronicsCollection:AngularFirestoreCollection<Electronic>;
  credentialsCollection:AngularFirestoreCollection<Credential>;

  //noteDoc: AngularFirestoreDocument<Book>;
  notes: Observable<Book[]>;
  sports: Observable<Sport[]>;
  furniture: Observable<Furniture[]>;
  clothing: Observable<Clothing[]>;
  electronics: Observable<Electronic[]>;
  credentials: Observable<Credential[]>;

  itemDoc: AngularFirestoreDocument<Book>;

  isSignedIn = false
  tempItem: string
  newContent: string
  newCourseNumbers: string
  description: string 
  edition: string
  price: number
  weight: number
  sport: string
  category : string 
  color : string
  dimension : string
  size : string
  model : string
  title = 'Exchange4Students';
  ownerid : any
  image: any
  this: any;
  userName: string 
  password: string
  id: string

  currentUserName: string

  constructor(public afs: AngularFirestore, public firebaseService : FirebaseService){

    this.notesCollection = this.afs.collection('Items')
    this.sportsCollection = this.afs.collection('Sports')
    this.furnitureCollection = this.afs.collection('Furniture')
    this.clothingCollection = this.afs.collection('Clothing')
    this.electronicsCollection = this.afs.collection('Electronic')
    this.credentialsCollection = this.afs.collection('Credential')
    this.itemDoc = this.afs.doc('Items/Book')
    //this.notes = this.notesCollection.valueChanges()
    this.sports = this.sportsCollection.valueChanges()
    this.furniture = this.furnitureCollection.valueChanges()
    this.clothing = this.clothingCollection.valueChanges()
    this.electronics = this.electronicsCollection.valueChanges()
    this.credentials = this.credentialsCollection.valueChanges()
    this.notes = this.notesCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Book;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
    

    this.tempItem = ""
    this.newContent = ""
    this.newCourseNumbers = ""
    this.sport = ""
    this.description = ""
    this.edition = ""
    this.price = 0
    this.weight = 0
    this.color = ""
    this.category = ""
    this.dimension = ""
    this.size = ""
    this.model = ""
    this.ownerid = localStorage.getItem('owner')
    this.image = ""
    this.userName = "steven" 
    this.password = ""
    this.currentUserName = ""
    this.id = ""
  }
  //https://stackoverflow.com/questions/59477088/store-images-in-firebase-storage-and-data-in-firestore
  // uploadFile(event: any) {
  //   const file = event.target.files[0];
  //   this.image = file;
  //   // const filePath = 'name-your-file-path-here';
  //   // const task = this.afs.upload(filePath, file);
  // }
  ngOnInit(){

    this.notesCollection = this.afs.collection('Items')
    this.sportsCollection = this.afs.collection('Sports')
    this.furnitureCollection = this.afs.collection('Furniture')
    this.clothingCollection = this.afs.collection('Clothing')
    this.electronicsCollection = this.afs.collection('Electronic')
    this.credentialsCollection = this.afs.collection('Credential')
   // this.noteDoc = this.afs.doc('Items/Book')
    this.notes = this.notesCollection.valueChanges()
    this.sports = this.sportsCollection.valueChanges()
    this.furniture = this.furnitureCollection.valueChanges()
    this.clothing = this.clothingCollection.valueChanges()
    this.electronics = this.electronicsCollection.valueChanges()
    this.credentials = this.credentialsCollection.valueChanges()


    if(localStorage.getItem('user')!==null){
    this.isSignedIn = true
    
    }
    else
    this.isSignedIn = false
  }
  async onSignup(email:string,password:string){
    await this.firebaseService.signup(email,password)
    if(this.firebaseService.isLoggedIn)
    this.isSignedIn = true
  }
  async onSignin(email:string,password:string){
    await this.firebaseService.signin(email,password)
    if(this.firebaseService.isLoggedIn)
    this.isSignedIn = true
  }
  handleLogout(){
      this.isSignedIn = false
  }

  // uploadFile(event) {
  //   const file = event.target.files[0];
  //   const filePath = 'name-your-file-path-here';
  //   const task = this.afs.collection.add(filePath, file);
  // }

  AddBook(){
    this.notesCollection.add({
      id: this.id,
      Title: this.newContent,
      Course_Number: this.newCourseNumbers,
      Edition: this.edition,
      Description: this.description,
      Price: this.price,
      OwnerID: this.ownerid,
      Image: this.image
    })
    this.resetValues()
  }
  deleteItem(item: any){
    console.log(item.id);
    this.itemDoc = this.afs.doc(`Items/${item.id}`);
    this.itemDoc.delete();
  }
  addToCart(item:any){
    this.notesCollection = this.afs.collection(`Users/${this.userName}/cart`);
    this.notesCollection.add(item);
  }
  deleteFromCart(item: any){
    console.log(item.id);
    this.itemDoc = this.afs.doc(`/Users/${this.userName}/cart/${item.id}`);
    this.itemDoc.delete();
  }
  AddSport(){
    this.sportsCollection.add({
      Title: this.newContent,
      Sport: this.sport,
      Description: this.description,
      Weight: this.weight,
      Price: this.price,
      OwnerID: this.ownerid
    })
    this.resetValues()
  }
  AddFurniture(){
    this.furnitureCollection.add({
      Title: this.newContent,
      Category: this.category,
      Color: this.color,
      Dimension: this.dimension,
      Description: this.description,
      Weight: this.weight,
      Price: this.price,
      OwnerID: this.ownerid
    })
    this.resetValues()
  }

  AddClothing(){
    this.clothingCollection.add({
      Title: this.newContent,
      Category: this.category,
      Color: this.color,
      Size: this.size,
      Description: this.description,
      Price: this.price,
      OwnerID: this.ownerid
    })
    this.resetValues()
  }

  AddElectronic(){
    this.electronicsCollection.add({
      Title: this.newContent,
      Category: this.category,
      Model: this.model,
      Dimension: this.dimension,
      Description: this.description,
      Weight: this.weight,
      Price: this.price,
      OwnerID: this.ownerid
    })
    this.resetValues()
  }

  AddCredentials(){
    this.credentialsCollection.add({
      UserName: this.userName,
      Password: this.password
    })
    this.resetValues()
  }

  checkCredentials(){
    this.credentialsCollection = this.afs.collection('Credentials', ref => {
      return ref.where('UserName', '==', this.userName).where('Password', '==', this.password)
    });
    this.credentials = this.credentialsCollection.valueChanges()
    if(this.credentials == null){
      this.resetValues()
    }
    else{
     
      this.resetValues()
    }
  }


  //All for Books
  Booksort(){
    this.notesCollection = this.afs.collection('Items');
    this.notes = this.notesCollection.valueChanges()
  }
  getBookID(){

  }
  BookTitleSort(){
    this.notesCollection = this.afs.collection('Items', ref => {
      return ref.where('Title', '==' ,this.newContent)
    });
    this.notes = this.notesCollection.valueChanges()
  }
  BookCourseNumberSort(){
    this.notesCollection = this.afs.collection('Items', ref => {
      return ref.where('Course_Number', '==' ,this.newCourseNumbers)
    });
    this.notes = this.notesCollection.valueChanges()
  }
  BookEditionSort(){
    this.notesCollection = this.afs.collection('Items', ref => {
      return ref.where('Edition', '==' ,this.edition)
    });
    this.notes = this.notesCollection.valueChanges()
  }
  BookDescriptionSort(){
    this.notesCollection = this.afs.collection('Items', ref => {
      return ref.where('Description', '==' ,this.description)
    });
    this.notes = this.notesCollection.valueChanges()
  }
  BookPriceSort(){
    this.notesCollection = this.afs.collection('Items', ref => {
      return ref.where('Price', '==' ,this.price)
    });
    this.notes = this.notesCollection.valueChanges()
  }

  //All for sports
  Sportssort(){
    this.sportsCollection = this.afs.collection('Sports');
    this.sports = this.sportsCollection.valueChanges()
  }
  SportTitleSort(){
    this.sportsCollection = this.afs.collection('Sports', ref => {
      return ref.where('Title', '==' ,this.newContent)
    });
    this.sports = this.sportsCollection.valueChanges()
  }
  SportSportSort(){
    this.sportsCollection = this.afs.collection('Sports', ref => {
      return ref.where('Sport', '==' ,this.sport)
    });
    this.sports = this.sportsCollection.valueChanges()
  }
  SportWeightSort(){
    this.sportsCollection = this.afs.collection('Sports', ref => {
      return ref.where('Weight', '==' ,this.weight)
    });
    this.sports = this.sportsCollection.valueChanges()
  }
  SportDescriptionSort(){
    this.sportsCollection = this.afs.collection('Sports', ref => {
      return ref.where('Description', '==' ,this.description)
    });
    this.sports = this.sportsCollection.valueChanges()
  }
  SportPriceSort(){
    this.sportsCollection = this.afs.collection('Sports', ref => {
      return ref.where('Price', '==' ,this.price)
    });
    this.sports = this.sportsCollection.valueChanges()
  }

  //All for furniture

  Furnituresort(){
    this.furnitureCollection = this.afs.collection('Furniture');
    this.furniture = this.furnitureCollection.valueChanges()
  }
  FurnitureTitleSort(){
    this.furnitureCollection = this.afs.collection('Furniture', ref => {
      return ref.where('Title', '==' ,this.newContent)
    });
    this.furniture = this.furnitureCollection.valueChanges()
  }
  FurnitureColorSort(){
    this.furnitureCollection = this.afs.collection('Furniture', ref => {
      return ref.where('Color', '==' ,this.color)
    });
    this.furniture = this.furnitureCollection.valueChanges()
  }
  FurnitureWeightSort(){
    this.furnitureCollection = this.afs.collection('Furniture', ref => {
      return ref.where('Weight', '==' ,this.weight)
    });
    this.furniture = this.furnitureCollection.valueChanges()
  }
  FurnitureDescriptionSort(){
    this.furnitureCollection = this.afs.collection('Furniture', ref => {
      return ref.where('Description', '==' ,this.description)
    });
    this.furniture = this.furnitureCollection.valueChanges()
  }
  FurniturePriceSort(){
    this.furnitureCollection = this.afs.collection('Furniture', ref => {
      return ref.where('Price', '==' ,this.price)
    });
    this.furniture = this.furnitureCollection.valueChanges()
  }
  FurnitureCategorySort(){
    this.furnitureCollection = this.afs.collection('Furniture', ref => {
      return ref.where('Category', '==' ,this.category)
    });
    this.furniture = this.furnitureCollection.valueChanges()
  }
  FurnitureDimensionSort(){
    this.furnitureCollection = this.afs.collection('Furniture', ref => {
      return ref.where('Dimension', '==' ,this.dimension)
    });
    this.furniture = this.furnitureCollection.valueChanges()
  }

  //All for Clothing
  Clothingsort(){
    this.clothingCollection = this.afs.collection('Clothing');
    this.clothing = this.clothingCollection.valueChanges()
  }
  ClothingTitleSort(){
    this.clothingCollection = this.afs.collection('Clothing', ref => {
      return ref.where('Title', '==' ,this.newContent)
    });
    this.clothing = this.clothingCollection.valueChanges()
  }
  ClothingColorSort(){
    this.clothingCollection = this.afs.collection('Clothing', ref => {
      return ref.where('Color', '==' ,this.color)
    });
    this.clothing = this.clothingCollection.valueChanges()
  }
  ClothingDescriptionSort(){
    this.clothingCollection = this.afs.collection('Clothing', ref => {
      return ref.where('Description', '==' ,this.description)
    });
    this.clothing = this.clothingCollection.valueChanges()
  }
  ClothingPriceSort(){
    this.clothingCollection = this.afs.collection('Clothing', ref => {
      return ref.where('Price', '==' ,this.price)
    });
    this.clothing = this.clothingCollection.valueChanges()
  }
  ClothingCategorySort(){
    this.clothingCollection = this.afs.collection('Clothing', ref => {
      return ref.where('Category', '==' ,this.category)
    });
    this.clothing = this.clothingCollection.valueChanges()
  }
  ClothingSizeSort(){
    this.clothingCollection = this.afs.collection('Clothing', ref => {
      return ref.where('Size', '==' ,this.size)
    });
    this.clothing = this.clothingCollection.valueChanges()
  }


  //All for Electronics
  Electronicssort(){
    this.electronicsCollection = this.afs.collection('Electronic');
    this.electronics = this.electronicsCollection.valueChanges()
  }
  ElectronicTitleSort(){
    this.electronicsCollection = this.afs.collection('Electronic', ref => {
      return ref.where('Title', '==' ,this.newContent)
    });
    this.electronics = this.electronicsCollection.valueChanges()
  }
  ElectronicDescriptionSort(){
    this.electronicsCollection = this.afs.collection('Electronic', ref => {
      return ref.where('Description', '==' ,this.description)
    });
    this.electronics = this.electronicsCollection.valueChanges()
  }
  ElectronicCategorySort(){
    this.electronicsCollection = this.afs.collection('Electronic', ref => {
      return ref.where('Category', '==' ,this.category)
    });
    this.electronics = this.electronicsCollection.valueChanges()
  }
  ElectronicModelSort(){
    this.electronicsCollection = this.afs.collection('Electronic', ref => {
      return ref.where('Model', '==' ,this.model)
    });
    this.electronics = this.electronicsCollection.valueChanges()
  }
  ElectronicDimensionSort(){
    this.electronicsCollection = this.afs.collection('Electronic', ref => {
      return ref.where('Dimension', '==' ,this.dimension)
    });
    this.electronics = this.electronicsCollection.valueChanges()
  }
  ElectronicWeightSort(){
    this.electronicsCollection = this.afs.collection('Electronic', ref => {
      return ref.where('Weight', '==' ,this.weight)
    });
    this.electronics = this.electronicsCollection.valueChanges()
  }
  ElectronicPriceSort(){
    this.electronicsCollection = this.afs.collection('Electronic', ref => {
      return ref.where('Price', '==' ,this.price)
    });
    this.electronics = this.electronicsCollection.valueChanges()
  }



  resetValues(){
    this.newContent = ""
    this.newCourseNumbers = ""
    this.sport = ""
    this.description = ""
    this.edition = ""
    this.price = 0
    this.weight = 0
    this.color = ""
    this.category = ""
    this.dimension = ""
    this.size = ""
    this.model = ""
    this.userName = ""
    this.password = ""
  }
    //this.noteDoc.update({Title: this.newContent})

}