import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MyModalComponent } from 'src/app/my-modal/my-modal.component';
import { UpdateModalComponent } from '../update-modal/update-modal.component';
import { Update } from '../Model/UpdateModal';
import { Products } from '../Model/ProductsModel';

@Injectable({
  providedIn: 'root'
})
export class MyModalService {

  updateValue: Update = new Update();
  currentValue:Products = new Products();

  constructor(private dialog: MatDialog) {}

  openModal(): void {
    this.dialog.open(MyModalComponent, {
    });
  }

  openUpdateModal(): void {
    this.dialog.open(UpdateModalComponent, {
    });
  }

}
