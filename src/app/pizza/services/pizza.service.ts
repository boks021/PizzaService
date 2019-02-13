import { PizzaResponse } from './../model/pizzaResponse';
import { Pizza } from './../model/pizza';
import { Injectable } from '@angular/core';
import { HttpClient , HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators' ;
import { Observable } from 'rxjs';
import { Order } from '../model/Order';



@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  constructor(private http:HttpClient) { }

 
  getAll(params?): Observable<PizzaResponse> {
    let queryParams = {};
    if(params) {
      queryParams = {
        params: new HttpParams()
            .set("discount", params.discount || "")
            .set("vegetarian", params.vegetarian || "" )
        //  .set("filter", JSON.stringify(params.filter))
        //  .set("sort" , params.sort && params.sort.toString() || "price")
        //  .set("sortDirection" , params.sortDirection && params.sortDirection.toString() || "desc")
      }
    }

    return this.http.get("http://localhost:3000/api/pizzas/", queryParams).pipe(map(response => {
      return new PizzaResponse(response);
    }));
  } 

  postOrder (order : Order): Observable<Order>{
    return this.http.post("http://localhost:3000/api/orders/" , order).pipe(map(
      response => {
        return new Order(response);
      }
    ));
  } 

}
