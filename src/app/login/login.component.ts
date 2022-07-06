import { Component, OnInit } from '@angular/core';
import { ValidacionService } from '../validaciones/validacion.service'
import { AuthService } from '../service/auth.service'
import { Router } from '@angular/router'
import Swal from 'sweetalert2'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  data: any = {}

  constructor(private validacion: ValidacionService, private auth: AuthService, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }

  ValidacioUsuario() {
    if (this.data.USUARIO) {
      this.data.USUARIO = this.validacion.validaUsuarioLogin(this.data.USUARIO)
    }
  }

  ValidacioPassword() {
    if (this.data.PASSWORD) {
      this.data.PASSWORD = this.validacion.validaUsuarioLogin(this.data.PASSWORD)
    }
  }

  Login() {
    this.spinner.show()
    if (this.data.USUARIO) {
      if (this.data.PASSWORD) {
        let datos = {
          USUARIO: this.data.USUARIO,
          PASSWORD: this.data.PASSWORD
        }
        this.auth.IniciaSecion(datos).subscribe(res => {
          this.spinner.hide()
          localStorage.setItem('USERASISTENCIA', JSON.stringify(res))
          if (localStorage.getItem('USERASISTENCIA')) {
            this.router.navigate(['/home'])
          } else {
            this.router.navigate(['/login'])
          }
        }, err => {
          if (!err.status) {
            this.spinner.hide()
            Swal.fire(
              'Sin Internet!',
              '¡Conexión de Internet Inestable! <br> Inténtalo Nuevamente',
              'warning'
            )
          }
        })
      } else {
        this.spinner.hide()
        Swal.fire(
          'Precaución!',
          'Coloca una Contraseña!',
          'warning'
        )
      }
    } else {
      this.spinner.hide()
      Swal.fire(
        'Precaución!',
        'Coloca un Usuario!',
        'warning'
      )
    }
  }
}
