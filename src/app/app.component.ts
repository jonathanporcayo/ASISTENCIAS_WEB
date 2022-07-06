import { Component } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'asistenciaV2';

  constructor(private router: Router) {
    if (localStorage.getItem('USERASISTENCIA')) {
      this.router.navigate(['/home'])
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
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (localStorage.getItem('USERASISTENCIA')) {
      this.router.navigate(['/home'])
          if (localStorage.getItem('ASISADMIN')) {
      this.router.navigate(['/admin'])
    } else {
      this.router.navigate(['/home'])
    }
    } else {
      this.router.navigate(['/login'])
    }
  }
}
