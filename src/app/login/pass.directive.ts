import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appPass]'
})
export class PassDirective {

  private _shown = false;

  constructor(private el: ElementRef) {
    this.setup();
  }

  toggle(span: HTMLElement) {
    this._shown = !this._shown;
    if (this._shown) {
      this.el.nativeElement.setAttribute('type', 'text');
      span.innerHTML = `<i class="bi bi-eye-slash" style="font-size: 25px; z-index: 50;  position: absolute; top:10px; left: 500px; cursor: pointer;"></i>`;
    } else {
      this.el.nativeElement.setAttribute('type', 'password');
      span.innerHTML = `<i class="bi bi-eye" style="font-size: 25px; z-index: 50;  position: absolute; top:10px; left: 500px; cursor: pointer;"></i>`;
    }
  }

  setup() {
    const parent = this.el.nativeElement.parentNode;
    const span = document.createElement('span');
    span.innerHTML = `<i class="bi bi-eye" style="font-size: 25px; z-index: 50; position: absolute; top:10px; left: 500px; cursor: pointer;"></i>`;
    span.addEventListener('click', (event) => {
      this.toggle(span);
    });
    parent.appendChild(span);
  }

}
