import { Component, NgModule, OnInit } from '@angular/core';
import { MainServiceService } from '../Service/main-service.service';
import { LoginRegister } from '../Model/LoginModel';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';
import { Register } from '../Model/RegisterModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  data: LoginRegister = new LoginRegister();
  authentication: boolean = false
  role!: string
  token: any
  user: Register = new Register();


  constructor(
    private service: MainServiceService,
    private router: Router,

  ) { }

  ngOnInit() {

  }

  Login() {
    this.service.Login(this.data).subscribe({
      next: resp => {
        this.token = resp
        localStorage.setItem('jwtToken', JSON.stringify(this.token))
        this.authentication = true
        //this.Auth()
        this.router.navigate(['/home'])
      },
      error: (error) => {
        swal.fire({
          icon: 'error',
          title: 'Error occurred',
          text: 'Login failed.',
          confirmButtonText: 'OK'
        });
      }
    })
  }

  // Auth() {
  //   const decodedToken: any = jwtDecode(JSON.stringify(this.token))
  //   this.role = decodedToken.role
  //   console.log(this.role)
  //   if (this.role == "ADM") {
  //     this.authentication = true
  //     this.router.navigate(['/home'])
  //   } else if (this.role == "Customer") {
  //     this.authentication = false
  //     this.router.navigate(['/home'])
  //   } else {
  //     swal.fire({
  //       icon: 'error',
  //       title: 'Error occurred',
  //       text: 'There was an error processing your request.',
  //       confirmButtonText: 'OK'
  //     });
  //   }
  // }


  Register() {
    this.service.Register(this.user).subscribe((resp: Register) => {
      swal.fire({
        icon: 'success',
        title: 'Account created Successfully',
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
          text: 'Try Again',
          confirmButtonText: 'OK'
        });
    })
  }
}