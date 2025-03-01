import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { NewCollectionComponent } from './component/new-collection/new-collection.component';
import { HomeComponent } from './pages/home/home.component';
import { CategoriesComponent } from './component/categories/categories.component';
import { MostSellComponent } from './component/most-sell/most-sell.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    NewCollectionComponent,
    CategoriesComponent,
    MostSellComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
