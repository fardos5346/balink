import { Customer } from "../models/customer.model";
import {Injectable} from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, retry, tap, map } from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn:'root'
})
export class CustomersService {

    private customers :Customer[]=[];
    private apiurl:string = environment.apiUrl;
    constructor(private http:HttpClient){}



    public getCustomersAsync() :Observable<Customer[]>  {

        return this.http.get<Customer[]>(`${this.apiurl}/customers`).pipe(
            map((customers :Customer[]) => customers)
        );
    }

    public getCountryList() {
      return this.http.get(`${this.apiurl}/countries`);
    }


    public addCustomer(data: any) {
        return this.http.post(`${this.apiurl}/customers`, data);
    }



}
