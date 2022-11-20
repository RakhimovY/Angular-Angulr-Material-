import { Subscription } from 'rxjs';
import { IProduct } from './../../models/products';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  @Input()
  product: IProduct;
  productSubscibtion: Subscription = this.route.data.subscribe((data) => {
    this.product = data['data'];
  });

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.productSubscibtion;
  }
}
