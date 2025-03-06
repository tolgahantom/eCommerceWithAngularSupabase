import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { NewCollectionComponent } from './component/new-collection/new-collection.component';
import { HomeComponent } from './pages/home/home.component';
import { CategoriesComponent } from './component/categories/categories.component';
import { MostSellComponent } from './component/most-sell/most-sell.component';
import { register } from 'swiper/element/bundle';
import { ProductsComponent } from './pages/products/products.component';
import { LeftBarComponent } from './shared/left-bar/left-bar.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { DetailComponent } from './component/detail/detail.component';
import { ProductAddComponent } from './admincomponent/product-add/product-add.component';
import { LoaderComponent } from './shared/loader/loader.component';

register();

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    NewCollectionComponent,
    CategoriesComponent,
    MostSellComponent,
    ProductsComponent,
    LeftBarComponent,
    ProductListComponent,
    ProductDetailComponent,
    DetailComponent,
    ProductAddComponent,
    LoaderComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
