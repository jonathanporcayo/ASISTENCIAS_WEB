import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  // URL: any = "http://10.1.6.18:3002/KND"
  URL: any = "https://appsb.cggedomex.gob.mx:7443/KND"

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
