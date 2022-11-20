import { IProduct } from './../models/products';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  url: string = 'http://localhost:3000/products';
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
}
