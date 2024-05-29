import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {

  constructor() { }

  async getProducts(productProps?: any): Promise<any> {
    try {

      const baseUrl = 'https://dummyjson.com/products';
      let url;
      if(productProps.limit !== '' && productProps.category !== '') {
        url = `${baseUrl}/category/${productProps.category}?limit=${productProps.limit}`;
      }
      else if(productProps.limit !== '' && productProps.category == '') {
        url = `${baseUrl}?limit=${productProps.limit}`;
      }
      else if(productProps.limit == '' && productProps.category !== '') {
        url = `${baseUrl}/category/${productProps.category}`;
      }
      else {
        url = baseUrl;
      }
      
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error fetching products: ${response.statusText}`);
      }

      const data = await response.json();
      return data.products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }
}
