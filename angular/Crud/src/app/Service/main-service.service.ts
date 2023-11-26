import { Injectable } from '@angular/core';
import { Products } from '../Model/ProductsModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {InsertProducts} from 'src/app/Model/InsertModel'
import { DeleteItem } from '../Model/DeleteItem';
import { Update } from '../Model/UpdateModal';
@Injectable({
  providedIn: 'root'
})
export class MainServiceService {
  apiUrl = 'https://localhost:7190'; // Substitua pela URL do seu backend
  //private backendUrl = 'https://localhost:7190'; 

  constructor(private http: HttpClient) { }

   GetProdcuts(): Observable <Products[]>{

     return this.http.get<Products[]>(`${this.apiUrl}/api/Products/api/GetProducts`)
   }

   InsertProducts(params: InsertProducts): Observable <InsertProducts>{

    return this.http.post<InsertProducts>(`${this.apiUrl}/api/Products/api/InsertProducts`,  params)

   }

   Delete(id: number): Observable<Products>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete<Products>(`${this.apiUrl}/api/Products/api/DeleteProduct/${id}`, { headers: headers });
  }

  Update(params: Update): Observable<Products>{
    return this.http.put<Products>(`${this.apiUrl}/api/Products/api/UpdateProduct`, params);
  }
}
