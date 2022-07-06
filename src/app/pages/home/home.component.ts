import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../../service/servicio.service'
import { Router } from '@angular/router'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  session: any
  empleados: any
  registros: any
  data: any = {}

  constructor(private router: Router, private servicio: ServicioService) {
    if (localStorage.getItem('USERASISTENCIA')) {
      this.session = JSON.parse(localStorage.getItem('USERASISTENCIA') || '')
      if (localStorage.getItem('ASISADMIN')) {
        this.router.navigate(['/admin'])
      } else {
        this.router.navigate(['/home'])
      }
      if (localStorage.getItem('PERFILUSER')) {
        this.router.navigate(['/user'])
      } else {
        this.router.navigate(['/home'])
      }
    } else {
      this.router.navigate(['/login'])
    }
  }

  ngOnInit(): void {
    this.ListaEmpleados()
  }

  ListaEmpleados() {
    delete this.registros
    delete this.empleados 
    let info = {

    }
    this.servicio.ListaEmpleados(info).subscribe(res => {
      var a = JSON.stringify(res)
      var b = JSON.parse(a)
      this.registros = b.salidas
      this.empleados = b.usuario
    }, err => {
      if (!err.error.status) {
        Swal.fire(
          'Sin Internet!',
          '¡Conexión de Internet Inestable! <br> Inténtalo Nuevamente',
          'warning'
        )
      }
    })
  }

  ValidaFecha() {
    var fecha = this.data.FECHA
    var a = fecha.toString()
    var b = a.split('-')
    this.data.FECHA2 = b[2] + '/' + b[1] + '/' + b[0].substring(2)
  }

  buscar() {
    delete this.registros
    delete this.empleados 
    let data = {
      Fecha: this.data.FECHA2
    }
    this.servicio.BuscarFecha(data).subscribe(res => {
      var a = JSON.stringify(res)
      var b = JSON.parse(a)
      this.registros = b.salidas
      this.empleados = b.usuario
    }, err => {
      if (!err.error.status) {
        Swal.fire(
          'Sin Internet!',
          '¡Conexión de Internet Inestable! <br> Inténtalo Nuevamente',
          'warning'
        )
      }
    })
  }

  VerPerfil(x: any) {
    localStorage.setItem('PERFILUSER', JSON.stringify(x))
    if (localStorage.getItem('PERFILUSER')) {
      this.router.navigate(['/user'])
    } else {
      this.router.navigate(['/home'])
    }
  }

  Admin() {
    localStorage.setItem('ASISADMIN', JSON.stringify(this.session))
    if (localStorage.getItem('ASISADMIN')) {
      this.router.navigate(['/admin'])
    } else {
      this.router.navigate(['/home'])
    }
  }

  Salir() {
    localStorage.clear()
    this.router.navigate(['/login'])
  }

}
