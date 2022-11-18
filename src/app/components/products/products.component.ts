import { Subscription, tap } from 'rxjs';
import { ProductsService } from './../../services/products.service';
import { IProduct } from './../../models/products';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  @Input()
  product: IProduct;

  products: IProduct[] = [];
  ProductSubscribe: Subscription = this.ProductsService.getProducts()
    .pipe(
      tap((item) => {
        console.log(item);
      })
    )
    .subscribe((data) => (this.products = data));

  constructor(private ProductsService: ProductsService) {}

  ngOnInit() {
    this.ProductSubscribe;
  }

  ngOnDestroy() {
    if (this.ProductSubscribe) this.ProductSubscribe.unsubscribe();
  }
}
