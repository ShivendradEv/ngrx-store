import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ProductListActions from '../../store/product-list/product.list.action';
import * as ProductSelectors from '../../store/product-list/product.list.selector';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @Input() title: string = 'Product List Page';
  @Input() category: string = '';
  @Input() limit: string = '';
  getCategory: string = '';
  productProps: any;


  products$: Observable<any[]> | undefined;

  constructor(private store: Store<{ products: any[] }>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.getCategory = data['category'];
      if (this.getCategory != undefined) {
        this.title = this.getCategory;
        this.productProps = {
          limit: this.limit,
          category: this.getCategory
        }
        this.store.dispatch(ProductListActions.loadProducts({ props: this.productProps }))
        this.products$ = this.store.select(ProductSelectors.selecAllProducts)
      }
      else {
        this.productProps = {
          limit: this.limit,
          category: this.category
        }
        this.store.dispatch(ProductListActions.loadProducts({ props: this.productProps }))
        this.products$ = this.store.select(ProductSelectors.selecAllProducts)
      }
    })
  }

  // onNext() {
  //   this.store.dispatch(ProductListActions.loadProducts({ category: "laptops" }))
  //   this.products$ = this.store.select(ProductSelectors.selecAllProducts)
  // }


}
