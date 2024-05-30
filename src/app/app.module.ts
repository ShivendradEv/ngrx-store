import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductListService } from './services/product-list/product-list.service';
import { provideState, provideStore } from '@ngrx/store';
import { productReducer } from './store/product-list/product.list.reducer';
import { provideEffects } from '@ngrx/effects';
import { ProductListEffects } from './store/product-list/product.list.effect';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule, Routes } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

const appRoute: Routes = [
  {path: "", component: HomeComponent},
  {path: "product-list/:category", component: ProductListComponent},
  {path: "product-details/:id", component: ProductDetailsComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoute),
    BrowserAnimationsModule,
    CarouselModule 
  ],
  providers: [
    ProductListService,
    provideStore(),
    provideState({name: 'products', reducer: productReducer}),
    provideEffects(ProductListEffects)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
