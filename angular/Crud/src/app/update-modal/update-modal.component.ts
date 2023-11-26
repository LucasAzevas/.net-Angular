import { Component, OnInit } from '@angular/core';
import { MyModalService } from '../Service/my-modal.service';
import { MainServiceService } from '../Service/main-service.service';
import { Products } from '../Model/ProductsModel';
import swal from 'sweetalert2';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.css']
})
export class UpdateModalComponent implements OnInit {

  quantity!: number;
  price!: number;
  name!:string;
  category!:string

  constructor(
    private myModalService: MyModalService,
    private service: MainServiceService) { }

    ngOnInit() {
      this.category = this.myModalService.currentValue.category
      this.name = this.myModalService.currentValue.name
    }

  openModal(): void {
    this.myModalService.openUpdateModal();
  }
  UpdateDataBase() {

    this.myModalService.updateValue.Quantity = this.quantity;
    this.myModalService.updateValue.Price = this.price
    if (this.myModalService.updateValue.Quantity == null && this.myModalService.updateValue.Price == null) {
      alert("Please fill in at least one fields")
    } else {
      this.service.Update(this.myModalService.updateValue).subscribe((resp: Products) => {
        swal.fire({
          icon: 'success',
          title: 'Update made successfully',
          confirmButtonText: 'OK'
        }).then(result => {
          if (result.isConfirmed) {
            setTimeout(() => {
              window.location.reload();
            });
          }
        });
      },
        error => {
          // Requisição falhou, exiba um SweetAlert2 de erro
          swal.fire({
            icon: 'error',
            title: 'Error occurred',
            text: 'There was an error processing your request.',
            confirmButtonText: 'OK'
          });
        }
      )
    }
  }
}
