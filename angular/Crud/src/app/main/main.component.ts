import { MyModalService } from 'src/app/Service/my-modal.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Products } from '../Model/ProductsModel';
import { MainServiceService } from '../Service/main-service.service';
import { DeleteItem } from '../Model/DeleteItem';
import swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';
import { Update } from '../Model/UpdateModal';
import { Router } from '@angular/router';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  productsList: Products[] = [];
  products: Products = new Products();
  authentication!: boolean
  authentication2!: boolean
  role!: string
  token!: string
  UpdateStock: Update = new Update()

  constructor(
    private service: MainServiceService,
    private HttpClient: HttpClient,
    private modal: MyModalService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.ProductsApi()
    this.Auth()
  }

  ProductsApi() {
    this.service.GetProdcuts().subscribe((resp: Products[]) => {
      this.productsList = resp
      this.productsList.map(x => {
        this.modal.currentValue.quantity = x.quantity
        this.modal.currentValue.price = x.price
      })
    })
  }

  Modal() {
    this.modal.openModal();
  }
  ModalUpdate(id: number, name: string, quantity: number, price: number, category: string, subCategory: string) {
    this.modal.updateValue.Id = id
    this.modal.currentValue.name = name
    this.modal.currentValue.quantity = quantity
    this.modal.currentValue.category = category
    this.modal.currentValue.subCategory = subCategory
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

  Auth() {
    const jwt = localStorage.getItem('jwtToken')
    const decodedToken: any = jwtDecode(JSON.stringify(jwt))
    this.role = decodedToken.role
    if (this.role == "ADM") {
      this.authentication = true
    } else if (this.role == "Customer") {
      this.authentication2 = true
    }
  }

  BuyProduct(id: number, price: number, quantity: number) {
    swal.fire({
      icon: 'question',
      title: 'Are you sure?',
      text: 'This action cannot be undone.',
      showCancelButton: true,
      confirmButtonText: 'Yes, proceed',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.UpdateStock.Id = id
        this.UpdateStock.Price = price
        this.UpdateStock.Quantity = quantity - 1
        this.service.Update(this.UpdateStock).subscribe((resp: Products) => {
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

  LogOut() {
    swal.fire({
      icon: 'question',
      title: 'Are you sure?',
      showCancelButton: true,
      confirmButtonText: 'Yes, proceed',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.isConfirmed) {

        this.router.navigate(['/login']); 
        localStorage.clear();
      } else {
      }
    });
  }
}





