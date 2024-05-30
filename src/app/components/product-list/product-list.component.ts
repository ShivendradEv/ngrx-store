import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ProductListActions from '../../store/product-list/product.list.action';
import * as ProductSelectors from '../../store/product-list/product.list.selector';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {

  @Input() title: string = 'Product List Page';
  @Input() category: string = '';
  @Input() limit: string = '';
  @Input() isSlider: boolean = false;
  getCategory: string = '';
  productProps: any;
  isLoading$!: Observable<boolean>;

  Arr = Array;
  num = 5;

  customOptions: OwlOptions = {
    loop: true,
    margin: 20,
    navText: ['<', '>'],
    nav: true,
    dots: false,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
  }

  products$: Observable<any[]> | undefined;

  constructor(private store: Store<{ products: any[] }>, private route: ActivatedRoute, private router: Router) { }

  goToPDP(itemId:string) {
    this.router.navigate(['/product-details', itemId]);
  }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.getCategory = data['category'];
      if(this.getCategory !== undefined) {
        this.title = this.getCategory;
      }

      this.productProps = {
        limit: this.limit,
        category: this.getCategory || this.category
      };
      this.store.dispatch(ProductListActions.loadProducts({ props: this.productProps }));
      this.products$ = this.store.select(ProductSelectors.selecAllProducts);
      this.isLoading$ = this.store.select(ProductSelectors.selectIsLoading);
    });
  }
}
