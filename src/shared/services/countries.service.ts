import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Country } from '../models/country.model';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private api = 'https://restcountries.eu/rest/v2';
  private countries :Country[]=[];
  constructor(private http: HttpClient) {}

  // getAllCountries() {


  //   return  this.http.get<Country[]>(`${this.api}/all`).pipe(map((countries :Country[]) => countries));;


  // }


}
