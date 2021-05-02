import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { ItemComponent } from './item/item.component';
import { PostItemComponent } from './post-item/post-item.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { Router, RouterModule } from '@angular/router';
import { ViewItemComponent } from './view-item/view-item.component';
import {enableProdMode} from '@angular/core';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component'
import { FirebaseService } from './services/firebase.service';
const config = {
  apiKey: "AIzaSyCaFTRcmiiD6qNy48L1fYcpRMJH96Gnhc4",
  authDomain: "exchange4students-113b5.firebaseapp.com",
  databaseURL: "https://exchange4students-113b5-default-rtdb.firebaseio.com",
  projectId: "exchange4students-113b5",
  storageBucket: "exchange4students-113b5.appspot.com",
  messagingSenderId: "103885475926",
  appId: "1:103885475926:web:61d8469e8d50ef483cabf7"
};
@NgModule({
  declarations: [
    AppComponent,
    MarketplaceComponent,
    ItemComponent,
    PostItemComponent,
    PageNotFoundComponent,
    ViewItemComponent,
    CartComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    AppRoutingModule,
    RouterModule.forRoot([
      {path: 'marketplace', component: MarketplaceComponent},
      {path: 'post-item', component: PostItemComponent},
      {path: 'view-item', component: ViewItemComponent},
      {path: 'item', component: ItemComponent},
      {path: 'cart', component: CartComponent},
      {path: 'login', component: LoginComponent},
      {path: '**', component: PageNotFoundComponent},
    ]),
  ],
  providers: [AngularFirestore, FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { 

  constructor(
    private router: Router
  ) { }
}
