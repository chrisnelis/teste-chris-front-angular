import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  readonly apiUrl: string;
  readonly requestOptions: any;
  public headers: any;
  userLogOn: any
  token: any

  httpOptions: { headers: HttpHeaders; } | undefined;

  constructor() {
    this.apiUrl = environment.apiUrl

    this.headers = new Headers();
    this.headers.append('Accept', 'application/json');
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', '*');
    this.requestOptions = new HttpHeaders({ headers: this.headers });

    //resgatando objeto com usuario logado.
    this.userLogOn =  this.getItem("userlog")

    //Header usado nas rotas da api
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization':  this.userLogOn?.token //token gerado pela api.
      })
    };

  }

  getItem(key: string): string | null {
    return JSON.parse(sessionStorage.getItem(key) || "[]");
  }
}
