import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  components
} from '@setrass-hn/kt';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.scss'],
})
export class ErrorsComponent implements OnInit {
  @HostBinding('class') class = 'd-flex flex-column flex-root';
  constructor(private router: Router) {}

  ngOnInit(): void {}

  routeToDashboard() {
    this.router.navigate(['dashboard']);
    setTimeout(() => {
      components.ToggleComponent.bootstrap();
      components.ScrollTopComponent.bootstrap();
      components.DrawerComponent.bootstrap();
      components.StickyComponent.bootstrap();
      components.MenuComponent.bootstrap();
      components.ScrollComponent.bootstrap();
    }, 200);
  }
}
