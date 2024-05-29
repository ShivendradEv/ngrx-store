import { createReducer, on } from '@ngrx/store';
import * as ProductListActions from './product.list.action';

export interface ProductState {
    products: any[],
    error: string | null
}

export const initialProductListState: ProductState = {
    products: [],
    error: null
}

export const productReducer = createReducer(
    initialProductListState,
    on(ProductListActions.loadProductsSuccess, (state, {products})=> ({
        ...state,
        products,
        error: null
    })),
    on(ProductListActions.loadProductsFailure, (state, {error})=> ({
        ...state,
        error: error
    }))
)
