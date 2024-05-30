import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductState } from "./product.list.reducer";

export const selectProductFeature = createFeatureSelector<ProductState>("products");

export const selecAllProducts = createSelector(
    selectProductFeature,
    (state: ProductState) => state.products
)

export const selecProductError = createSelector(
    selectProductFeature,
    (state: ProductState) => state.error
)

export const selectIsLoading = createSelector(
  selectProductFeature,
  (state: ProductState) => state.loading
)