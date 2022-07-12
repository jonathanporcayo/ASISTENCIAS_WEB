import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  URL: any = environment.URL

  constructor(private http: HttpClient) { }

  IniciaSecion(x: any) {
    let res = this.http.post(this.URL + '/LOGIN', x)
    return res
  }
}
