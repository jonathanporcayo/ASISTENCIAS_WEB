import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  URL: any = environment.URL

  constructor(private http: HttpClient) { }

  NuevoUsuario(x: any) {
    let res = this.http.post(this.URL + '/newUser', x)
    return res
  }

  ListaEmpleados(x: any) {
    let res = this.http.post(this.URL + '/getEmpleados', x)
    return res
  }

  BuscarFecha(x: any) {
    let res = this.http.post(this.URL + '/getEmpleados', x)
    return res
  }

}
