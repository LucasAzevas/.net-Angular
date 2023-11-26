import { Component } from '@angular/core';
import { MyModalService } from 'src/app/Service/my-modal.service';
import { InsertProducts } from '../Model/InsertModel';
import { MainServiceService } from '../Service/main-service.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-my-modal',
  templateUrl: './my-modal.component.html',
  styleUrls: ['./my-modal.component.css']
})
export class MyModalComponent {

  insert: InsertProducts = new InsertProducts();

  constructor(
    private myModalService: MyModalService,
    private service: MainServiceService) {}

  openModal(): void {
    this.myModalService.openModal();
  }

  InsertDataBase(){
    if(this.insert.category == null || this.insert.name == null || this.insert.price == null || this.insert.quantity == null){
      alert("Please fill in all the fields")
    }else{
      this.service.InsertProducts(this.insert).subscribe((resp : InsertProducts)=>{
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
    }
  }
}
