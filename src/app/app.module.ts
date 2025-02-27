import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { Router } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NewCollectionComponent } from './component/new-collection/new-collection.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent, HomeComponent, NewCollectionComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
