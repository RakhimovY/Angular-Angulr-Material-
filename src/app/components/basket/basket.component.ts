import { Subscription } from 'rxjs';
import { ProductsService } from './../../services/products.service';
import { IProduct } from './../../models/products';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit {
  constructor(private ProductsService: ProductsService) {}
  @Input()
  basket: IProduct[];
  basketSubscribtion: Subscription =
    this.ProductsService.getProductsFromBasket().subscribe((data) => {
      this.basket = data;
    });

  ngOnInit() {
    this.basketSubscribtion;
  }
  ngOnDestroy(): void {
    this.basketSubscribtion.unsubscribe();
  }

  plusOneProduct(product: IProduct) {
    let findItem = this.basket.find((item) => item.id === product.id);
    if (findItem) {
      findItem.quantity += 1;
      this.ProductsService.updateProductFromBasket(findItem).subscribe(
        (data) => {}
      );
    }
  }

  minusOneProduct(product: IProduct) {
    let findItem = this.basket.find((item) => item.id === product.id);
    if (findItem) {
      if (findItem.quantity > 1) {
        findItem.quantity -= 1;
        this.ProductsService.updateProductFromBasket(findItem).subscribe(
          (data) => {}
        );
      } else {
        this.ProductsService.deleteProductFromBasket(product.id).subscribe();
        const index = this.basket.findIndex((item) => item.id === product.id);
        this.basket.splice(index, 1);
      }
    }
  }
}
