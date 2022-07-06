import { Component, OnInit } from '@angular/core';
import { ValidacionService } from '../../validaciones/validacion.service'
import { ServicioService } from '../../service/servicio.service'
import { Router } from '@angular/router'
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import Swal from 'sweetalert2'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  session: any
  tiempo: any

  constructor(private router: Router, private valida: ValidacionService, private servicio: ServicioService, private spinner: NgxSpinnerService) {
    if (localStorage.getItem('USERASISTENCIA')) {
      this.session = JSON.parse(localStorage.getItem('USERASISTENCIA') || '')
      if (localStorage.getItem('ASISADMIN')) {
        this.router.navigate(['/admin'])
      } else {
        this.router.navigate(['/home'])
      }
    } else {
      this.router.navigate(['/login'])
    }
    var tmpDate = new Date();
    var now = tmpDate.getTime();
    this.tiempo = now.toString();
  }

  data: any = {}
  URL_FOTO: any
  revicion: any = {}
  registrados: any

  title = 'gfgangularwebcam';

  public webcamImage!: WebcamImage;
  public deviceId: string | undefined;
  private trigger: Subject<void> = new Subject<void>();
  triggerSnapshot(): void {
    this.trigger.next();
  }
  handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public cameraWasSwitched(deviceId: string): void {
    // console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  ngOnInit(): void {
    // console.log(this.session)
    this.empleados()
  }

  empleados() {
    let data = {

    }
    this.servicio.ListaEmpleados(data).subscribe(res => {
      // console.log(res)
      var a = JSON.stringify(res)
      var b = JSON.parse(a)
      this.registrados = b.usuario
    })
  }

  ValinaNombre() {
    if (this.data.NOMBRE) {
      this.data.NOMBRE = this.valida.validaNombre(this.data.NOMBRE)
    }
  }

  ValidaAPATERNO() {
    if (this.data.APELLIDO_PATERNO) {
      this.data.APELLIDO_PATERNO = this.valida.validaNombre(this.data.APELLIDO_PATERNO)
    }
  }

  ValidaAMATERNO() {
    if (this.data.APELLIDO_MATERNO) {
      this.data.APELLIDO_MATERNO = this.valida.validaNombre(this.data.APELLIDO_MATERNO)
    }
  }

  VaildaFecha() {
    if (this.data.FECHA) {
      this.data.FECHA2 = this.valida.validaFecha(this.data.FECHA)
    }
  }

  ValidaNIP() {
    if (this.data.NIP) {
      var a = this.data.NIP.toString()
      if (a.length != 6) {
        this.revicion.NIP = 0
      } else {
        this.revicion.NIP = 1
      }
    }
  }

  Foto() {
    this.triggerSnapshot()
    this.URL_FOTO = this.webcamImage.imageAsDataUrl
    if (this.URL_FOTO) {

    } else {
      this.URL_FOTO = null
    }
  }

  NuevaFoto() {
    delete this.URL_FOTO
    !this.webcamImage
  }

  AgregarUsuario() {
    this.spinner.show();
    let datos = {
      NOMBRE: this.data.NOMBRE,
      APELLIDO_PATERNO: this.data.APELLIDO_PATERNO,
      APELLIDO_MATERNO: this.data.APELLIDO_MATERNO,
      FECHA: this.data.FECHA2,
      SEXO: this.data.SEXO,
      PIN: this.data.NIP,
      DEPENDENCIAID: this.session[0].USUARIOUNIADMINCLAVE,
      FOTO: this.URL_FOTO,
      FOTONAME: this.data.NOMBRE + '_' + this.data.APELLIDO_PATERNO + '_' + this.data.APELLIDO_MATERNO + '_' + this.tiempo + '/' + this.data.NOMBRE + '_' + this.data.APELLIDO_PATERNO + '_' + this.data.APELLIDO_MATERNO + '.jpeg'
    }
    this.servicio.NuevoUsuario(datos).subscribe(res => {
      this.spinner.hide();
      var a = JSON.stringify(res)
      var b = JSON.parse(a)
      if (b.status == 200 && b.message == "REGISTRO EXITOSO") {
        this.spinner.hide();
        Swal.fire(
          'Excelente!',
          'Registro Exitoso!',
          'success'
        )
        this.empleados()
        this.data = {}
      }
    }, err => {
      if (err.error.status == 400 && err.error.message == "USUARIO YA EXISTE") {
        this.spinner.hide();
        Swal.fire(
          'Precaución!',
          'El Usuario ya Existe! <br> Coloca un PIN diferente',
          'warning'
        )
        this.empleados()
      }
      if (!err.error.status) {
        this.spinner.hide()
        Swal.fire(
          'Sin Internet!',
          '¡Conexión de Internet Inestable! <br> Inténtalo Nuevamente',
          'warning'
        )
      }
    })
  }

  atras() {
    localStorage.removeItem('ASISADMIN')
    this.router.navigate(['/home'])
  }

  Salir() {
    localStorage.clear()
    this.router.navigate(['/login'])
  }
}
