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

const appRoute: Routes = [
  {path: "", component: HomeComponent},
  {path: "product-list/:category", component: ProductListComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoute),
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
