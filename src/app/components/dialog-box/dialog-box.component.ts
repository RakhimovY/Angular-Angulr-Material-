import { IProduct } from './../../models/products';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss'],
})
export class DialogBoxComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  isNew: boolean = false;

  myForm: FormGroup = new FormGroup({
    id: new FormControl(this.data?.id ?? ''),
    title: new FormControl(this.data?.title ?? ''),
    price: new FormControl(this.data?.price ?? ''),
    chip: new FormControl(this.data?.configuration.chip ?? ''),
    SSD: new FormControl(this.data?.configuration.SSD ?? ''),
    memory: new FormControl(this.data?.configuration.memory ?? ''),
    display: new FormControl(this.data?.configuration.display ?? ''),
  });

  ngOnInit(): void {
    if (this.data) this.isNew = true;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit() {
    this.data = {
      id: this.myForm.value.id,
      title: this.myForm.value.title,
      price: this.myForm.value.price,
      img: 'assets/images/HA244.jpg',
      configuration: {
        chip: this.myForm.value.chip,
        SSD: this.myForm.value.SSD,
        memory: this.myForm.value.memory,
        display: this.myForm.value.display,
      },
    };
    this.dialogRef.close(this.data);
  }
}
