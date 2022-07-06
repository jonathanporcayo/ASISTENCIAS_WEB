import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  session: any
  fotoPerfil: any
  nombreUsiario: any
  fotoEntrada: any
  horaEntrada: any

  constructor(private router:Router) { 
    if (localStorage.getItem('PERFILUSER')) {
      this.session = JSON.parse(localStorage.getItem('PERFILUSER') || '')
    } else {
      this.router.navigate(['/home'])
    }
  }

  ngOnInit(): void {
    // console.log(this.session)
    this.fotoPerfil = this.session.PERFIL
    this.nombreUsiario = this.session.NOMBRE
    this.fotoEntrada = this.session.FOTO
    this.horaEntrada = this.session.HORA
  }

  atras(){
    localStorage.removeItem('PERFILUSER')
    this.router.navigate(['/home'])
  }

  Salir(){
    localStorage.clear()
    this.router.navigate(['/login'])
  }

}
