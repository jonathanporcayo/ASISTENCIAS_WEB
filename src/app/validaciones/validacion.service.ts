import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidacionService {

  constructor() { }

  validaUsuarioLogin(x: any) {
    if (x) {
      var a = x.toString();
      var b = a.toUpperCase()
      var c = b.replace(/[^a-zA-Z0-9\-]+/g, '')
      var l = c.replace(/]/g, '')
      return x = l
    }
  }

  ValidaPassword(x: any) {
    if (x) {
      var a = x.toString();
      var b = a.toUpperCase()
      var c = b.replace(/[^a-zA-Z0-9\-\u0025\u0024\u00BF\u0026\u003F\u0021\u00A1\u0023\u0028\u0029\u002F\u003C\u003E\u0040]+/g, '')
      var d = c.replace(/]/g, '')
      return x = d
    }
  }

  validaNombre(x: any) {
    var a = x.toString();
    var b = a.trimStart()
    var c = b.toUpperCase()
    var d = c.replace(/[^a-zA-Z-\.\u00D1\u00DC ]+/g, '')
    var e = d.replace(/]/g, '')
    return x = e
  }

  validaFecha(x: any) {
    if (x) {
      var fecha = x
      var a = fecha.toString()
      var b = a.split('-')
      x = b[2] + '/' + b[1] + '/' + b[0]
      return x
    }
  }
}
