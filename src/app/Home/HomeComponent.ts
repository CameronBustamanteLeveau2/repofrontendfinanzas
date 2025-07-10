import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';

@Component({
    selector: 'app-home',
    templateUrl: './HomeComponent.html',
    styleUrls: ['./HomeComponent.css'],
    standalone: true,
  imports: [MatCardModule, MatIcon],
})
export class HomeComponent {}
