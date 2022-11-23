import { IProduct } from './../models/products';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  url: string = 'http://localhost:3000/products';
  urlBasket: string = 'http://localhost:3000/basket';
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<IProduct[]>(this.url);
  }

  getProduct(id: number) {
    return this.http.get<IProduct>(`${this.url}/${id}`);
  }

  postProduct(product: IProduct) {
    return this.http.post<IProduct>(this.url, product);
  }

  deleteProduct(id: number) {
    return this.http.delete<IProduct>(`${this.url}/${id}`);
  }

  updateProduct(product: IProduct) {
    return this.http.put<IProduct>(`${this.url}/${product.id}`, product);
  }

  postProductToBasket(product: IProduct) {
    return this.http.post<IProduct>(this.urlBasket, product);
  }

  getProductsFromBasket() {
    return this.http.get<IProduct[]>(this.urlBasket);
  }

  updateProductFromBasket(product: IProduct) {
    return this.http.put<IProduct>(`${this.urlBasket}/${product.id}`, product);
  }

  deleteProductFromBasket(id: number) {
    return this.http.delete<IProduct>(`${this.urlBasket}/${id}`);
  }
}
