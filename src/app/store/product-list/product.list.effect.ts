import { Injectable, Input } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { ProductListService } from 'src/app/services/product-list/product-list.service';
import * as ProductListActions from './product.list.action';

@Injectable()
export class ProductListEffects {

  constructor(
    private actions$: Actions,
    private productListService: ProductListService
  ) {}

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductListActions.loadProducts),
      mergeMap((action) => {
        const category = action.props;
        return from(this.productListService.getProducts(category)).pipe(
            map((data) => ProductListActions.loadProductsSuccess({ products: data })),
            catchError((error) =>
              of(ProductListActions.loadProductsFailure({ error }))
            )
          )
        }
        )
      ) 
  );
}
