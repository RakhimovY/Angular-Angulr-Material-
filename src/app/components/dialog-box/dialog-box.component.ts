import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css'],
})
export class DialogBoxComponent implements OnInit {
  myForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    price: new FormControl(''),
    chip: new FormControl(''),
    SSD: new FormControl(''),
    memory: new FormControl(''),
    display: new FormControl(''),
  });

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit() {
    this.data = {
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
