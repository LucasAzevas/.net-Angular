import { MyModalService } from 'src/app/Service/my-modal.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Products } from '../Model/ProductsModel';
import { MainServiceService } from '../Service/main-service.service';
import { DeleteItem } from '../Model/DeleteItem';
import swal from 'sweetalert2';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  productsList: Products[] = [];
  products: Products = new Products();

  constructor(
    private service: MainServiceService,
    private HttpClient: HttpClient,
    private modal: MyModalService
  ) { }

  ngOnInit() {
    this.ProductsApi()
  }

  ProductsApi() {
    this.service.GetProdcuts().subscribe((resp: Products[]) => {
      this.productsList = resp
      this.productsList.map(x=>{
        this.modal.currentValue.quantity = x.quantity
        this.modal.currentValue.price = x.price
      })
    })
  }

  Modal() {
    this.modal.openModal();
  }
  ModalUpdate(id: number, name:string, quantity:number, price: number, category:string){
    this.modal.updateValue.Id = id
    this.modal.currentValue.name = name
    this.modal.currentValue.quantity = quantity
    this.modal.currentValue.category = category
    this.modal.currentValue.price = price
    this.modal.openUpdateModal();
  }

  DeleteItem(id: number) {
    swal.fire({
      icon: 'question',
      title: 'Are you sure?',
      text: 'This action cannot be undone.',
      showCancelButton: true,
      confirmButtonText: 'Yes, proceed',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.Delete(id).subscribe((resp: Products) => {
          swal.fire({
            icon: 'success',
            title: 'Request made successfully',
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
      } else if (result.dismiss === swal.DismissReason.cancel) {
      }
    });

  }
}