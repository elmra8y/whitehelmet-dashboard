import {Component, inject} from '@angular/core';
import {RouterModule, RouterOutlet} from "@angular/router";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  imports: [
    RouterOutlet,
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule
  ]
})
export class LayoutComponent {
  #authService = inject(AuthService)
  isSidebarOpen = true;

  logout() {
    this.#authService.logout();
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  changeMenuIcon(isOpen: boolean): void {
    // const btn = this.sidebar.nativeElement.querySelector('#btn');
    // if (isOpen) {
    //     this.renderer.removeClass(btn, 'bx-menu');
    //     this.renderer.addClass(btn, 'bx-menu-alt-right');
    // } else {
    //     this.renderer.removeClass(btn, 'bx-menu-alt-right');
    //     this.renderer.addClass(btn, 'bx-menu');
    // }
  }
}
