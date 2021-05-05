import { DeclareFunctionStmt } from '@angular/compiler/src/output/output_ast';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import firebase from 'firebase';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
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

interface Credential {
  UserName : string 
  Password : string 
  id: string
}
interface notification{
  sender: string
  buyer: string
  item: string
  displayMessage: string
  id: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  notesCollection:AngularFirestoreCollection<Book>;
  notesCollection2:AngularFirestoreCollection<Book>;
  sportsCollection:AngularFirestoreCollection<Sport>;
  furnitureCollection:AngularFirestoreCollection<Furniture>;
  clothingCollection:AngularFirestoreCollection<Clothing>;
  electronicsCollection:AngularFirestoreCollection<Electronic>;
  credentialsCollection:AngularFirestoreCollection<Credential>;
  notificationsCollection:AngularFirestoreCollection<notification>;
  cartCollection:AngularFirestoreCollection<any>
  //noteDoc: AngularFirestoreDocument<Book>;
  notes: Observable<Book[]>;
  notes2: Observable<Book[]>;
  sports: Observable<Sport[]>;
  furniture: Observable<Furniture[]>;
  clothing: Observable<Clothing[]>;
  electronics: Observable<Electronic[]>;
  credentials: Observable<Credential[]>;
  notifications: Observable<notification[]>;
  itemDoc: AngularFirestoreDocument<any>;
  cart: Observable<any[]>

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
  images: any
  this: any;
  userName: string 
  password: string
  id: string
  path: string
  currentUserName: string
  posts: any
  
  constructor(public afs: AngularFirestore, public firebaseService : FirebaseService, public storage: AngularFireStorage){

    this.notesCollection = this.afs.collection('Items')
    this.notesCollection2 = this.afs.collection('Items')
    this.sportsCollection = this.afs.collection('Sports')
    this.furnitureCollection = this.afs.collection('Furniture')
    this.clothingCollection = this.afs.collection('Clothing')
    this.electronicsCollection = this.afs.collection('Electronic')
    this.credentialsCollection = this.afs.collection('Credential')
    this.cartCollection = this.afs.collection('Items')
    this.itemDoc = this.afs.doc('Items/Book')

    this.cart = this.cartCollection.valueChanges()
    this.notes2 = this.notesCollection2.valueChanges()

    this.sports = this.sportsCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Sport;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
    this.furniture = this.furnitureCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Furniture;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
    this.clothing = this.clothingCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Clothing;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
    this.electronics = this.electronicsCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Electronic;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
    this.credentials = this.credentialsCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Credential;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
    this.notes = this.notesCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Book;
        data.id = a.payload.doc.id;
        this.loadImage(data.Image);
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
    this.path = ""
    this.posts = []

    this.images = {};
    // this.afs.collection('Items').snapshotChanges().subscribe((next) => {
    //   this.images = {};
    //   this.posts = [];

    //   next.forEach(post => {
    //     let obj = post.payload.doc.data() as;
    //     obj["id"] = post.payload.doc.id;
    //     this.posts.push(obj);

    //     this.loadImage(post.payload.doc.id);
    //   })
    // })

    this.notificationsCollection = this.afs.collection(`Users/${this.ownerid}/notification`);
    this.notifications = this.notificationsCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as notification;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
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
    this.cartCollection = this.afs.collection('Items')
   // this.noteDoc = this.afs.doc('Items/Book')
    this.notes = this.notesCollection.valueChanges()
    this.sports = this.sportsCollection.valueChanges()
    this.furniture = this.furnitureCollection.valueChanges()
    this.clothing = this.clothingCollection.valueChanges()
    this.electronics = this.electronicsCollection.valueChanges()
    this.credentials = this.credentialsCollection.valueChanges()
    this.cart = this.cartCollection.valueChanges()


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
  loadImage(post: string) {
    const ref = this.storage.ref(`/files/${post}`);
    ref.getMetadata().toPromise().then(data => {
      this.images[post] = ref.getDownloadURL();
    }, err => {
      console.error(err);
    });
  }
  // uploadFile(event) {
  //   const file = event.target.files[0];
  //   const filePath = 'name-your-file-path-here';
  //   const task = this.afs.collection.add(filePath, file);
  // }
  AddBookh(values: any){
    this.notesCollection.add({
      id: this.id,
      Title: values['title'],
      Course_Number: values['course'],
      Edition: values['edition'],
      Description:values['descrip'],
      Price: values['price'] ,
      OwnerID: this.ownerid,
      Image: values['image']
    })
  }
  AddBook($event:any){
    if(this.newContent != "" && this.newCourseNumbers != "" && this.edition != "" && this.description != "" && this.price != 0 && this.ownerid != ""){
      this.posts['title'] = this.newContent
      this.posts['course'] = this.newCourseNumbers
      this.posts['edition'] = this.edition
      this.posts['descrip'] = this.description
      this.posts['price'] = this.price
      var filepath = this.image
      const fileref = this.storage.ref(filepath)
      this.storage.upload(filepath, this.path).snapshotChanges().pipe(
        finalize(()=>{
            fileref.getDownloadURL().subscribe((url)=>{
              console.log(url);
              this.posts['image'] = url;
              this.AddBookh(this.posts);
            })
        })
      ).subscribe();
    }
    else{
      console.log("You left empty inputs!")
      /*add message on screen for user */
    }
    this.resetValues()
  }

  deleteItem(item: any){
    console.log(item.id);
    this.itemDoc = this.afs.doc(`Items/${item.id}`);
    this.itemDoc.delete();
  }
  addToCart(item:any){
    this.notesCollection = this.afs.collection(`Users/${this.ownerid}/cart`);
    this.notesCollection.add(item);
  }
  deleteFromCart(item: any){
    console.log(item.id);
    this.itemDoc = this.afs.doc(`/Users/${this.ownerid}/cart/${item.id}`);
    this.itemDoc.delete();
  }
  removeBook(item: any){
    console.log(item.id);
    this.itemDoc = this.afs.doc(`/Items/${item.id}`);
    this.itemDoc.delete();
  }
  removeSport(item: any){
    console.log(item.id);
    this.itemDoc = this.afs.doc(`/Sports/${item.id}`);
    this.itemDoc.delete();
  }
  removeFurniture(item: any){
    console.log(item.id);
    this.itemDoc = this.afs.doc(`/Furniture/${item.id}`);
    this.itemDoc.delete();
  }
  removeClothing(item: any){
    console.log(item.id);
    this.itemDoc = this.afs.doc(`/Clothing/${item.id}`);
    this.itemDoc.delete();
  }
  removeElectronic(item: any){
    console.log(item.id);
    this.itemDoc = this.afs.doc(`/Electronic/${item.id}`);
    this.itemDoc.delete();
  }
  sendNotification(){
    this.notificationsCollection = this.afs.collection(`Users/${this.ownerid}/notification`);
    
    this.cartCollection = this.afs.collection(`Users/${this.ownerid}/cart`);
    this.cart = this.cartCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as any;
        data.id = a.payload.doc.id;
        var senderNotify = this.afs.collection(`Users/${data.OwnerID}/notification`);
        this.notificationsCollection.add({
          buyer: this.ownerid,
          sender: data.OwnerID,
          item: data.Title,
          displayMessage: "test",
          id: data.id
        });
        senderNotify.add({
          buyer: this.ownerid,
          sender: data.OwnerID,
          item: data.Title,
          displayMessage: "test2",
          id: data.id
        });

        this.itemDoc = this.afs.doc(`/Users/${this.ownerid}/cart/${data.id}`);
        this.itemDoc.delete();
        
        return data;
      });

    }));
  }

  AddSporth(values: any){
    this.sportsCollection.add({
      id: this.id,
      Title : values['title'],
      Description : values['description'],
      Weight : values['weight'],
      Price : values['price'],
      Sport : values['sport'],
      OwnerID: this.ownerid,
      Image: values['image']
    })
  }

  AddSport($event:any){
    if(this.newContent != "" && this.sport != "" && this.weight != 0 && this.description != "" && this.price != 0 && this.ownerid != ""){
      this.posts['title'] = this.newContent
      this.posts['description'] = this.description
      this.posts['weight'] = this.weight
      this.posts['sport'] = this.sport
      this.posts['price'] = this.price
      var filepath = this.image
      const fileref = this.storage.ref(filepath)
      this.storage.upload(filepath, this.path).snapshotChanges().pipe(
        finalize(()=>{
            fileref.getDownloadURL().subscribe((url)=>{
              console.log(url);
              this.posts['image'] = url;
              this.AddSporth(this.posts);
            })
        })
      ).subscribe();
    }
    else{
      console.log("You left empty inputs!")
      /*add message on screen for user */
    }
    this.resetValues()
  }

  AddFurnitureh(values: any){
    this.furnitureCollection.add({
      id: this.id,
      Title : values['title'],
      Description : values['description'],
      Weight : values['weight'],
      Price : values['price'],
      Category : values['category'],
      Color : values['color'],
      Dimension : values['dimension'],
      OwnerID: this.ownerid,
      Image: values['image']
    })
  }

  AddFurniture($event:any){
    if(this.newContent != "" && this.category != "" && this.color != "" && this.weight != 0 && this.dimension != "" && this.description != "" && this.price != 0 && this.ownerid != ""){
      this.posts['title'] = this.newContent
      this.posts['description'] = this.description
      this.posts['weight'] = this.weight
      this.posts['price'] = this.price
      this.posts['category'] = this.category
      this.posts['color'] = this.color
      this.posts['dimension'] = this.dimension
      var filepath = this.image
      const fileref = this.storage.ref(filepath)
      this.storage.upload(filepath, this.path).snapshotChanges().pipe(
        finalize(()=>{
            fileref.getDownloadURL().subscribe((url)=>{
              console.log(url);
              this.posts['image'] = url;
              this.AddFurnitureh(this.posts);
            })
        })
      ).subscribe();
    }
    else{
      console.log("You left empty inputs!")
      /*add message on screen for user */
    }
    this.resetValues()
  }

  AddClothingh(values:any){
    this.clothingCollection.add({
      id: this.id,
      Title : values['title'],
      Description : values['description'],
      Price : values['price'],
      Category : values['category'],
      Color : values['color'],
      Size : values['size'],
      OwnerID: this.ownerid,
      Image: values['image']
    })
  }

  AddClothing($event:any){
    if(this.newContent != "" && this.category != "" && this.color != "" && this.size != "" && this.description != "" && this.price != 0 && this.ownerid != ""){
      this.posts['title'] = this.newContent
      this.posts['description'] = this.description
      this.posts['weight'] = this.weight
      this.posts['price'] = this.price
      this.posts['category'] = this.category
      this.posts['color'] = this.color
      this.posts['size'] = this.size
      var filepath = this.image
      const fileref = this.storage.ref(filepath)
      this.storage.upload(filepath, this.path).snapshotChanges().pipe(
        finalize(()=>{
            fileref.getDownloadURL().subscribe((url)=>{
              console.log(url);
              this.posts['image'] = url;
              this.AddClothingh(this.posts);
            })
        })
      ).subscribe();
    }
    else{
      console.log("You left empty inputs!")
      /*add message on screen for user */
    }
    this.resetValues()
  }

  AddElectronich(values:any){
    this.electronicsCollection.add({
      id: this.id,
      Title : values['title'],
      Description : values['description'],
      Price : values['price'],
      Category : values['category'],
      Model : values['model'],
      Dimension : values['dimension'],
      OwnerID: this.ownerid,
      Image: values['image'],
      Weight: values['weight']
    })
  }

  AddElectronic($event:any){
    if(this.newContent != "" && this.category != "" && this.model != "" && this.dimension != "" && this.description != "" && this.weight != 0 && this.price != 0 && this.ownerid != ""){
      this.posts['title'] = this.newContent
      this.posts['description'] = this.description
      this.posts['weight'] = this.weight
      this.posts['price'] = this.price
      this.posts['category'] = this.category
      this.posts['model'] = this.model
      this.posts['dimension'] = this.dimension
      var filepath = this.image
      const fileref = this.storage.ref(filepath)
      this.storage.upload(filepath, this.path).snapshotChanges().pipe(
        finalize(()=>{
            fileref.getDownloadURL().subscribe((url)=>{
              console.log(url);
              this.posts['image'] = url;
              this.AddElectronich(this.posts);
            })
        })
      ).subscribe();
    }
    else{
      console.log("You left empty inputs!")
      /*add message on screen for user */
    }
    this.resetValues()
  }

  AddCredentials(){
    this.credentialsCollection.add({
      id: this.id,
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