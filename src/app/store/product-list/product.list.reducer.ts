import { createReducer, on } from '@ngrx/store';
import * as ProductListActions from './product.list.action';

export interface ProductState {
    products: any[],
    error: string | null,
    loading: boolean
}

export const initialProductListState: ProductState = {
    products: [],
    error: null,
    loading: true
}

export const productReducer = createReducer(
    initialProductListState,
    on(ProductListActions.loadProductsSuccess, (state, {products})=> ({
        ...state,
        products,
        error: null,
        loading: false
    })),
    on(ProductListActions.loadProductsFailure, (state, {error})=> ({
        ...state,
        error: error,
        loading: false
    }))
)
