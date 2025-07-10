import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule
  ],
  templateUrl: './main-layout.html', // contiene el sidebar
  styleUrls: ['./main-layout.css']
})
export class MainLayoutComponent {}
