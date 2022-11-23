import { DialogBoxComponent } from './../dialog-box/dialog-box.component';
import { Subscription, tap } from 'rxjs';
import { ProductsService } from './../../services/products.service';
import { IProduct } from './../../models/products';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor(
    private ProductsService: ProductsService,
    public dialog: MatDialog
  ) {}

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

  basket: IProduct[] = [];
  basketSubscribtion: Subscription =
    this.ProductsService.getProductsFromBasket().subscribe((data) => {
      this.basket = data;
      console.log('init');
    });

  ngOnInit() {
    this.ProductSubscribe;
    this.basketSubscribtion;
  }
  ngOnDestroy() {
    if (this.ProductSubscribe) this.ProductSubscribe.unsubscribe();
    if (this.basketSubscribtion) this.basketSubscribtion.unsubscribe();
  }

  openDialog(product?: IProduct): void {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = product;
    const dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        if (data && data.id) this.updateData(data);
        else this.postData(data);
      }
    });
  }

  postData(data: IProduct) {
    this.ProductsService.postProduct(data).subscribe((data) =>
      this.products.push(data)
    );
  }

  deleteProduct(id: number) {
    console.log(id);
    console.log(this.products);

    this.ProductsService.deleteProduct(id).subscribe(() => {
      const index = this.products.findIndex((item) => item.id === id);
      this.products.splice(index, 1);
    });
  }

  updateData(product: IProduct) {
    console.log('updateData: ', product);

    this.ProductsService.updateProduct(product).subscribe((data) => {
      const index = this.products.findIndex((item) => item.id === product.id);
      this.products[index] = data;
    });
  }

  addToBasket(product: IProduct) {
    console.log('basket', this.basket);

    if (this.basket.length > 0) {
      let findItem = this.basket.find((item) => item.id === product.id);
      console.log('findItem', findItem);

      if (findItem) {
        findItem.quantity += 1;
        this.ProductsService.updateProductFromBasket(findItem).subscribe(
          (data) => {
            console.log('Update : ', data);
          }
        );
      } else {
        product.quantity = 1;
        this.ProductsService.postProductToBasket(product).subscribe((data) => {
          this.basket.push(data);
          console.log('Post 1 : ', data);
        });
      }
    } else {
      product.quantity = 1;
      this.ProductsService.postProductToBasket(product).subscribe((data) => {
        this.basket.push(data);
        console.log('Post 2: ', data);
      });
    }
  }
}
