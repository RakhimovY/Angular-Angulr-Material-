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

  ngOnInit() {
    this.ProductSubscribe;
  }
  ngOnDestroy() {
    if (this.ProductSubscribe) this.ProductSubscribe.unsubscribe();
  }

  openDialog(): void {
    let dialogConfig = new MatDialogConfig();
    const dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => this.postData(data));
  }

  postData(data: IProduct) {
    this.ProductsService.postProduct(data).subscribe(() => {
      this.products.push(data);
      console.log(data);
    });
  }

  deleteProduct(id: number) {
    this.ProductsService.deleteProduct(id).subscribe(() => {
      const index = this.products.findIndex((item) => item.id === id);
      this.products.splice(index, 1);
    });
  }
}
