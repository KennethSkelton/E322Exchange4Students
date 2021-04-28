import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { PostItemComponent } from './post-item/post-item.component';

const routes: Routes = [
  { path: '', redirectTo: 'marketplace', pathMatch: 'full'},
  { path: 'marketplace', component: MarketplaceComponent},
  { path: 'post-item', component: PostItemComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
